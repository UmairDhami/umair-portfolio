# Umair Saleem — Portfolio

A fast, animated developer portfolio built with **Astro**, **GSAP (ScrollTrigger)**, and **Lenis** smooth scroll. Dark-modern design, component-based, SEO-friendly, and ready to deploy.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:4321
```

Build for production:

```bash
npm run build    # outputs to ./dist
npm run preview  # preview the production build locally
```

> Requires Node.js 18.20.8, 20.3.0, or 22+.

---

## Make it yours

Everything you'll edit lives in two folders — no need to touch the components.

### 1. Your details
`src/data/content.js` → `profile` object: name, title, email, phone, location, and your **LinkedIn / GitHub** URLs (currently `#`). Stats, services, experience, toolkit, and education are in the same file.

### 2. Your projects
`src/data/projects.js` — one object per project. To show a real screenshot instead of the gradient placeholder:

1. Drop the image in `public/images/` (e.g. `lazydayz.jpg`)
2. Set `image: '/images/lazydayz.jpg'` on that project
3. Add the live site to `url: 'https://...'` to make the card clickable

### 3. Your photo
1. Save it as `public/images/umair.jpg`
2. In `src/components/Hero.astro`, replace the placeholder block (the `.portrait` contents) with:
   ```html
   <img src="/images/umair.jpg" alt="Umair Saleem" />
   ```

### 4. Colors & fonts
All design tokens are at the top of `src/styles/global.css` (`:root`). Change `--violet`, `--bg`, fonts, etc. in one place.

---

## Project structure

```
src/
  data/
    content.js        # profile, stats, services, experience, toolkit, education
    projects.js       # the 9 projects (+ your real screenshots/URLs)
  components/         # one .astro file per section
  layouts/Layout.astro
  pages/index.astro   # assembles the page
  scripts/main.js     # GSAP + Lenis animation runtime
  styles/global.css   # design tokens + all styles
public/images/        # your photo and project screenshots
```

## Animations (`src/scripts/main.js`)

- **Lenis** smooth scrolling, wired into GSAP's ticker
- **Hero** headline splits into words and floats up on load
- **Scroll reveals** on every `[data-reveal]` element
- **Project cards** scale + settle, staggered per row
- **Section headings** drift up as they enter
- Fully disabled under `prefers-reduced-motion`

Tweak timings/easing in `main.js`; add a reveal to any element by giving it `data-reveal`.

---

## Deploy

Static output — host anywhere. Easiest:

- **Vercel** or **Netlify**: connect the repo, framework preset = **Astro**, done.
- Or run `npm run build` and upload the `dist/` folder to any static host.

Set your real domain in `astro.config.mjs` (`site:`) for correct SEO/meta.
