// ../../node_modules/@vidstack/react/dev/chunks/vidstack-Zc3I7oOd.js
var videoIdRE =
  /(?:youtu\.be|youtube|youtube\.com|youtube-nocookie\.com)\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|)((?:\w|-){11})/;
var posterCache = /* @__PURE__ */ new Map();
var pendingFetch = /* @__PURE__ */ new Map();
function resolveYouTubeVideoId(src) {
  var _a;
  return (_a = src.match(videoIdRE)) == null ? void 0 : _a[1];
}
async function findYouTubePoster(videoId, abort) {
  if (posterCache.has(videoId)) return posterCache.get(videoId);
  if (pendingFetch.has(videoId)) return pendingFetch.get(videoId);
  const pending = new Promise(async (resolve) => {
    const sizes = ['maxresdefault', 'sddefault', 'hqdefault'];
    for (const size of sizes) {
      for (const webp of [true, false]) {
        const url = resolveYouTubePosterURL(videoId, size, webp),
          response = await fetch(url, {
            mode: 'no-cors',
            signal: abort.signal,
          });
        if (response.status < 400) {
          posterCache.set(videoId, url);
          resolve(url);
          return;
        }
      }
    }
  })
    .catch(() => '')
    .finally(() => pendingFetch.delete(videoId));
  pendingFetch.set(videoId, pending);
  return pending;
}
function resolveYouTubePosterURL(videoId, size, webp) {
  const type = webp ? 'webp' : 'jpg';
  return `https://i.ytimg.com/${
    webp ? 'vi_webp' : 'vi'
  }/${videoId}/${size}.${type}`;
}

export { resolveYouTubeVideoId, findYouTubePoster };
//# sourceMappingURL=chunk-7GLVTHO3.js.map
