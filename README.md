# ICP 2026 — Physics Discipline, Khulna University
Conference landing page (single page, fully responsive).

## Folder structure
```
project/
├── index.html
├── assets/
│   ├── css/
│   │   ├── style.css        (all design + components)
│   │   └── responsive.css   (breakpoint overrides)
│   ├── js/
│   │   └── script.js        (navbar, countdown, counters, lightbox, forms...)
│   ├── image/
│   │   ├── logo.png          ← put Physics Discipline logo here
│   │   ├── ku-logo.png        ← put Khulna University logo here
│   │   ├── hero-bg.jpg        ← put a conference/hall photo here
│   │   ├── speakers/          ← speaker photos
│   │   └── gallery/           ← gallery photos
│   └── vendor/                (empty — all libraries load from CDN, see below)
```

## Replacing placeholder images
Every image currently points either to `assets/image/...` (your real logos —
just drop files in with the exact names above) or to `https://picsum.photos/...`
(temporary stock photos for hero, about, speakers, gallery, sponsors).

To swap a Picsum photo for a real one, just replace the `src="https://picsum.photos/..."`
with your own file path, e.g. `assets/image/speakers/head-of-department.jpg`.
Every image container uses fixed `aspect-ratio` / `object-fit: cover`, so the
layout will **not** break regardless of the new image's dimensions.

Logo `<img>` tags include `onerror="this.style.display='none'"` so the layout
stays clean even before you upload the real logo files.

## Color palette
Derived from a blue + orange + white academic palette (defined as CSS custom
properties at the top of `style.css` under `:root`). Once you share the actual
Physics Discipline logo, the hex values in `:root` (`--blue-800`, `--orange-500`,
etc.) can be fine-tuned to match it exactly — every color in the site pulls from
those variables, so it's a one-place change.

## Conference date (countdown)
Edit one line in `assets/js/script.js`:
```js
targetDate: new Date("2026-12-10T09:00:00+06:00").getTime(),
```

## Libraries used (loaded via CDN in index.html)
Bootstrap 5.3, jQuery, AOS, Animate.css, Remixicon, Swiper.js, Typed.js,
Vanilla-Tilt, CountUp.js — no React/Vue/Angular/Tailwind, per the brief.
Because CDNs are used, an internet connection is required when viewing the
page (this also keeps the project lightweight — no local vendor files to
manage or update).

## Notes
- The contact and registration forms are front-end only (no backend) — they
  validate and show a success state. Wire them to your mail service or a
  form endpoint (e.g. Formspree, PHP mailer) when ready to go live.
- Google Map is a plain embed pointed at Khulna University; swap the `src` for
  a precise pinned location once available.
