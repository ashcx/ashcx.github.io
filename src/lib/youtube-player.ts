interface YouTubePlayer {
  getOptions(): string[];
  getPlayerState(): number;
  unloadModule(name: string): void;
  pauseVideo(): void;
}

interface YouTubePlayerEvent {
  target: YouTubePlayer;
  data: number;
}

interface YouTubeApi {
  Player: new (frame: HTMLIFrameElement, config: { events: Record<string, (event: YouTubePlayerEvent) => unknown> }) => YouTubePlayer;
}

declare global {
  interface Window {
    YT?: YouTubeApi;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<YouTubeApi> | undefined;

function loadYouTubeApi(): Promise<YouTubeApi> {
  apiPromise ??= new Promise((resolve, reject) => {
    const chained = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      chained?.();
      if (window.YT) resolve(window.YT);
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.onerror = () => reject(new Error("YouTube iframe API failed to load"));
    document.head.append(script);
  });
  return apiPromise;
}

const CAPTIONS_POLL_MS = 250;
const CAPTIONS_POLL_LIMIT = 120;

// The captions module is listed a moment after playback starts and no event announces it, so poll
// until it appears. A video without a caption track never lists it, hence the limit. Unloading
// once leaves the viewer free to switch captions on again from the player's own CC button.
function hideCaptionsOnce(player: YouTubePlayer) {
  let ticks = 0;
  const timer = window.setInterval(() => {
    const listed = player.getOptions().includes("captions");
    if (listed) player.unloadModule("captions");
    if (listed || ++ticks >= CAPTIONS_POLL_LIMIT) window.clearInterval(timer);
  }, CAPTIONS_POLL_MS);
}

const ENDED = 0;
const PLAYING = 1;
const PAUSED = 2;
const BUFFERING = 3;
const STALE_PLAYING_MS = 1500;

interface Entry {
  // Undefined until YouTube reports the player ready, and a player that is not ready cannot be paused.
  player?: YouTubePlayer;
  // A PLAYING message before this time came from before the pause, so it must not claim playback.
  staleUntil: number;
  // True when the pause is confirmed by a later PAUSED or ENDED message, which ends the stale period early.
  endsAtPause: boolean;
}

const entries = new Map<HTMLIFrameElement, Entry>();
let current: HTMLIFrameElement | undefined;

function markStale(entry: Entry, endsAtPause: boolean) {
  entry.staleUntil = performance.now() + STALE_PLAYING_MS;
  entry.endsAtPause = endsAtPause;
}

function claim(frame: HTMLIFrameElement) {
  current = frame;
  for (const [other, entry] of entries) {
    if (other === frame) continue;
    // Only a video that is playing or about to play has a PLAYING message that could race the pause.
    const state = entry.player?.getPlayerState();
    if (state === PLAYING || state === BUFFERING) markStale(entry, true);
    entry.player?.pauseVideo();
  }
}

export function playYouTubeFrame(frame: HTMLIFrameElement, embedUrl: string) {
  const url = new URL(embedUrl);
  url.searchParams.set("origin", window.location.origin);

  // Claim on the click: autoplay starts before the API attaches, so the first PLAYING event never arrives.
  const entry: Entry = { staleUntil: 0, endsAtPause: false };
  entries.set(frame, entry);
  claim(frame);
  frame.src = url.href;

  // If the API cannot load the video still plays; captions then follow the viewer's own settings and
  // videos are no longer paused when another starts.
  loadYouTubeApi().then((api) => {
    new api.Player(frame, {
      events: {
        onReady: (event) => {
          entry.player = event.target;
          if (current !== frame) {
            // Autoplay can still start just after ready, and no message reliably confirms this pause.
            markStale(entry, false);
            event.target.pauseVideo();
          }
          hideCaptionsOnce(event.target);
        },
        // A viewer pressing play inside a paused video claims playback. A PLAYING message while the video is
        // marked stale was already in flight when it was paused, or is its autoplay starting late.
        onStateChange: (event) => {
          if (event.data === PLAYING) {
            if (current !== frame && performance.now() < entry.staleUntil) event.target.pauseVideo();
            else claim(frame);
          } else if (entry.endsAtPause && (event.data === PAUSED || event.data === ENDED)) {
            entry.staleUntil = 0;
          }
        }
      }
    });
  }, () => {});
}
