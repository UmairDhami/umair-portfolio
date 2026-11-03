// ============================================================
// Work gallery — click a thumbnail to open a modal that
// auto-scrolls the full-page screenshot top → bottom → top,
// continuously. Pauses while the viewer scrolls manually.
// No external dependency; honours prefers-reduced-motion.
// ============================================================
const modal = document.getElementById('work-modal');

if (modal) {
  const vp = document.getElementById('wm-view');
  const img = document.getElementById('wm-img');
  const domainEl = document.getElementById('wm-domain');
  const visitEl = document.getElementById('wm-visit');
  const closeBtn = document.getElementById('wm-close');
  const backdrop = modal.querySelector('.wm-backdrop');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const DOWN_SECONDS = 11; // time to traverse a full page one way
  const HOLD = 900;        // pause (ms) at each end
  let rafId = null, lastTs = null, dir = 1, holdUntil = 0, paused = false, resumeTimer = null, lastFocus = null;

  function step(ts) {
    if (lastTs === null) lastTs = ts;
    const dt = (ts - lastTs) / 1000;
    lastTs = ts;
    const max = vp.scrollHeight - vp.clientHeight;
    if (!paused && max > 4 && ts >= holdUntil) {
      const speed = max / DOWN_SECONDS; // px per second, scaled to page length
      let n = vp.scrollTop + dir * speed * dt;
      if (n >= max) { n = max; dir = -1; holdUntil = ts + HOLD; }
      else if (n <= 0) { n = 0; dir = 1; holdUntil = ts + HOLD; }
      vp.scrollTop = n;
    }
    rafId = requestAnimationFrame(step);
  }

  function startScroll() {
    stopScroll();
    if (reduce) return; // let the viewer scroll manually instead
    dir = 1; lastTs = null; holdUntil = performance.now() + 600;
    rafId = requestAnimationFrame(step);
  }
  function stopScroll() {
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    paused = false; clearTimeout(resumeTimer);
  }

  function open(data) {
    lastFocus = document.activeElement;
    domainEl.textContent = data.domain || '';
    if (data.url) { visitEl.href = data.url; visitEl.hidden = false; } else { visitEl.hidden = true; }
    vp.scrollTop = 0;
    img.alt = (data.name || 'Website') + ' full page preview';
    img.src = data.full;
    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add('open'));
    document.documentElement.style.overflow = 'hidden';
    closeBtn.focus();
    const begin = () => { vp.scrollTop = 0; startScroll(); };
    if (img.complete && img.naturalHeight) begin();
    else img.onload = begin;
  }

  function close() {
    modal.classList.remove('open');
    stopScroll();
    document.documentElement.style.overflow = '';
    window.setTimeout(() => {
      modal.hidden = true;
      img.src = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }, 360);
  }

  // Open from any gallery card
  document.querySelectorAll('[data-work]').forEach((btn) => {
    btn.addEventListener('click', () => {
      try { open(JSON.parse(btn.getAttribute('data-work'))); } catch (e) { /* ignore */ }
    });
  });

  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.hidden) close(); });

  // Pause auto-scroll while the viewer scrolls, resume after they stop
  function nudge() {
    paused = true;
    clearTimeout(resumeTimer);
    resumeTimer = window.setTimeout(() => { paused = false; lastTs = null; }, 1600);
  }
  vp.addEventListener('wheel', nudge, { passive: true });
  vp.addEventListener('touchmove', nudge, { passive: true });
}
