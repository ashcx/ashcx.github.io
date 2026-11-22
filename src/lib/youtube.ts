const EMBED_PLAYER_DEFAULTS = {
  autoplay: "1",
  playsinline: "1",
  rel: "0",
  disablekb: "1",
  iv_load_policy: "3",
  cc_load_policy: "0",
  color: "white",
  enablejsapi: "1"
} as const;

export function youtubeEmbedUrl(videoId: string): string {
  const params = new URLSearchParams(EMBED_PLAYER_DEFAULTS);
  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?${params}`;
}
