// Lightweight performance helpers (static site)
// - Pause background videos when offscreen (saves CPU + battery)
// - Respect reduced-motion / data-saver where possible

(function () {
  const prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Some browsers expose Data Saver via navigator.connection.saveData
  const saveData = Boolean(navigator.connection && navigator.connection.saveData);

  const videos = Array.from(document.querySelectorAll('video'));
  if (videos.length === 0) return;

  // Avoid aggressive preloading for decorative/background videos
  for (const v of videos) {
    if (!v.hasAttribute('preload')) v.preload = 'metadata';
    // If user prefers reduced motion or wants to save data, don't autoplay decorative videos.
    if ((prefersReducedMotion || saveData) && v.autoplay) {
      v.autoplay = false;
      v.pause();
    }
  }

  if (!('IntersectionObserver' in window)) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const v = entry.target;
        const shouldPlay = entry.isIntersecting && entry.intersectionRatio > 0.15;

        if (shouldPlay) {
          // Only attempt play if it's meant to loop/autoplay and not reduced-motion/data-saver
          if ((v.loop || v.autoplay) && !(prefersReducedMotion || saveData)) {
            const p = v.play();
            if (p && typeof p.catch === 'function') p.catch(() => {});
          }
        } else {
          v.pause();
        }
      }
    },
    { threshold: [0, 0.15, 0.5] }
  );

  for (const v of videos) io.observe(v);
})();

