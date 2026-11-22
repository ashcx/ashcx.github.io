interface YouTubePlayer {
  getOptions(): string[];
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

const PLAYING = 1;
const STALE_PLAYING_MS = 1500;

interface Entry {
  // Undefined until YouTube reports the player ready, and a player that is not ready cannot be paused.
  player?: YouTubePlayer;
  pausedAt: number;
}

const entries = new Map<HTMLIFrameElement, Entry>();
let current: HTMLIFrameElement | undefined;

function pause(entry: Entry) {
  entry.pausedAt = performance.now();
  entry.player?.pauseVideo();
}

function claim(frame: HTMLIFrameElement) {
  current = frame;
  for (const [other, entry] of entries) {
    if (other !== frame) pause(entry);
  }
}

export function playYouTubeFrame(frame: HTMLIFrameElement, embedUrl: string) {
  const url = new URL(embedUrl);
  url.searchParams.set("origin", window.location.origin);

  // Claim on the click: autoplay starts before the API attaches, so the first PLAYING event never arrives.
  const entry: Entry = { pausedAt: -Infinity };
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
          if (current !== frame) pause(entry);
          hideCaptionsOnce(event.target);
        },
        // A viewer pressing play inside a paused video claims playback. A PLAYING message right after this code
        // paused the video was already in flight, or is its autoplay starting late, so it must not claim it back.
        onStateChange: (event) => {
          if (event.data !== PLAYING) return;
          if (current !== frame && performance.now() - entry.pausedAt < STALE_PLAYING_MS) event.target.pauseVideo();
          else claim(frame);
        }
      }
    });
  }, () => {});
}
