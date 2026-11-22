interface YouTubePlayer {
  getOptions(): string[];
  unloadModule(name: string): void;
}

interface YouTubeApi {
  Player: new (frame: HTMLIFrameElement, config: { events: Record<string, (event: { target: YouTubePlayer }) => unknown> }) => YouTubePlayer;
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

export function playYouTubeFrame(frame: HTMLIFrameElement, embedUrl: string) {
  const url = new URL(embedUrl);
  url.searchParams.set("origin", window.location.origin);
  frame.src = url.href;

  // If the API cannot load the video still plays; captions then follow the viewer's own settings.
  loadYouTubeApi().then((api) => {
    new api.Player(frame, { events: { onReady: (event) => hideCaptionsOnce(event.target) } });
  }, () => {});
}
