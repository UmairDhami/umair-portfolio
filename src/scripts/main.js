// ============================================================
// Animation runtime — Lenis smooth scroll + GSAP ScrollTrigger
// Content is fully visible by default; JS enhances with motion.
// Honours prefers-reduced-motion.
// ============================================================
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* -------- 1. Smooth scrolling (Lenis) -------- */
if (!reduceMotion) {
  const lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
    wheelMultiplier: 1,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Make in-page anchor links use Lenis
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target, { offset: -20, duration: 1.1 });
        }
      }
    });
  });
}

/* -------- 2. Animations -------- */
function initAnimations() {
  if (reduceMotion) return;

  // 2a. Hero headline — split into words and float up on load
  const heroTitle = document.querySelector('[data-hero-title]');
  if (heroTitle) {
    splitWords(heroTitle);
    gsap.from(heroTitle.querySelectorAll('.word'), {
      yPercent: 120,
      opacity: 0,
      duration: 1,
      ease: 'expo.out',
      stagger: 0.06,
      delay: 0.1,
    });
  }

  // 2b. Hero supporting elements
  gsap.from('.hero-eye, .hero .sub, .hero .cta, .hero .meta', {
    opacity: 0,
    y: 22,
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.08,
    delay: 0.5,
  });
  gsap.from('.hero .visual', {
    opacity: 0,
    scale: 0.94,
    duration: 1.1,
    ease: 'expo.out',
    delay: 0.35,
  });

  // 2c. Generic scroll reveals
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 34,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' },
    });
  });

  // 2d. Project cards — scale + settle, lightly staggered per row
  gsap.utils.toArray('.pcard').forEach((card, i) => {
    gsap.fromTo(
      card,
      { opacity: 0, y: 44, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: (i % 3) * 0.08,
        scrollTrigger: { trigger: card, start: 'top 90%' },
      }
    );
  });

  // 2e. Section headings — subtle upward drift as they enter
  gsap.utils.toArray('.sechead h2, .about h2').forEach((h) => {
    gsap.from(h, {
      yPercent: 18,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: h, start: 'top 92%' },
    });
  });

  ScrollTrigger.refresh();
}

/* -------- helpers -------- */
function splitWords(el) {
  const walk = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach((part) => {
          if (part.trim() === '') {
            frag.appendChild(document.createTextNode(part));
          } else {
            const outer = document.createElement('span');
            outer.style.display = 'inline-block';
            outer.style.overflow = 'hidden';
            outer.style.verticalAlign = 'top';
            const inner = document.createElement('span');
            inner.className = 'word';
            inner.textContent = part;
            outer.appendChild(inner);
            frag.appendChild(outer);
          }
        });
        node.replaceChild(frag, child);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        // keep inline accents (e.g. .grad) but still split their words
        walk(child);
      }
    });
  };
  walk(el);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnimations);
} else {
  initAnimations();
}

// Recalculate triggers once web fonts have loaded (heights shift)
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => ScrollTrigger.refresh());
}
