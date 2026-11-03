// ============================================================
// Animation runtime — preloader + Lenis smooth scroll + GSAP ScrollTrigger
// Content is fully visible by default; JS enhances with motion.
// Honours prefers-reduced-motion and never leaves the page hidden.
// ============================================================
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const preloader = document.getElementById('preloader');

// Safety: if GSAP is unavailable or motion is reduced, reveal the page immediately.
if (!window.gsap || reduceMotion) {
  if (preloader) preloader.remove();
} else {
  gsap.registerPlugin(ScrollTrigger);
  boot();
}

function boot() {
  /* -------- Smooth scrolling (Lenis) -------- */
  let lenis = null;
  if (window.Lenis) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -20, duration: 1.1 });
      else target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* -------- Scroll-triggered reveals (independent of the preloader) -------- */
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      opacity: 0, y: 34, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%' },
    });
  });
  gsap.utils.toArray('.pcard').forEach((c, i) => {
    gsap.fromTo(c,
      { opacity: 0, y: 44, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out', delay: (i % 3) * 0.08,
        scrollTrigger: { trigger: c, start: 'top 92%' } });
  });

  /* -------- Preloader, then hero intro -------- */
  if (preloader) {
    document.documentElement.style.overflow = 'hidden';
    if (lenis) lenis.stop();

    const counter = { v: 0 };
    const countEl = document.getElementById('pl-count');
    gsap.timeline()
      .to('#pl-fill', { width: '100%', duration: 1.3, ease: 'power1.inOut' }, 0)
      .to(counter, {
        v: 100, duration: 1.3, ease: 'power1.inOut',
        onUpdate: () => { if (countEl) countEl.textContent = Math.round(counter.v); },
      }, 0)
      .to('.pl-inner', { opacity: 0, y: -12, duration: 0.4, ease: 'power2.in' }, '+=0.15')
      .to('#preloader', { yPercent: -100, duration: 0.85, ease: 'expo.inOut' }, '-=0.08')
      .add(() => {
        document.documentElement.style.overflow = '';
        if (lenis) lenis.start();
        preloader.classList.add('done');
        preloader.remove();
        heroIntro();
        ScrollTrigger.refresh();
      });
  } else {
    heroIntro();
  }

  // Recalculate triggers once web fonts have loaded (heights shift)
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
}

/* -------- Hero entrance -------- */
function heroIntro() {
  const title = document.querySelector('[data-hero-title]');
  if (title) {
    splitHeading(title);
    gsap.from(title.querySelectorAll('.word'), {
      yPercent: 120, duration: 1, ease: 'expo.out', stagger: 0.06, delay: 0.05,
    });
    const gradline = title.querySelector('.gradline');
    if (gradline) {
      const n = title.querySelectorAll('.word').length;
      gsap.from(gradline, { opacity: 0, duration: 0.9, ease: 'power2.out', delay: 0.05 + n * 0.06 });
    }
  }
  gsap.from('.hero-eye, .hero .sub, .hero .cta, .hero .meta', {
    opacity: 0, y: 22, duration: 0.9, ease: 'power3.out', stagger: 0.08, delay: 0.35,
  });
  gsap.from('.hero .visual', { opacity: 0, scale: 0.94, duration: 1.1, ease: 'expo.out', delay: 0.2 });
}

/* -------- helpers -------- */
// Splits plain text into sliding words, but leaves gradient/element spans
// intact (as a single fading unit) so background-clip:text keeps working
// and long phrases wrap naturally on small screens.
function splitHeading(el) {
  const frag = document.createDocumentFragment();
  [...el.childNodes].forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      node.textContent.split(/(\s+)/).forEach((part) => {
        if (part === '') return;
        if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
        const outer = document.createElement('span');
        outer.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:top';
        const inner = document.createElement('span');
        inner.className = 'word';
        inner.style.display = 'inline-block';
        inner.textContent = part;
        outer.appendChild(inner);
        frag.appendChild(outer);
      });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      node.classList.add('gradline'); // keep gradient intact; fade it in
      frag.appendChild(node);
    }
  });
  el.innerHTML = '';
  el.appendChild(frag);
}
