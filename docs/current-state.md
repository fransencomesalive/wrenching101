# Current State — Wrenching 101

## Status
Page is live at `wrenching101.mettlecycling.com`. RSVP backend live. Submit button enabled with test data. Before invites go out: reset blob and disable submit button.

## BLOCKING: OG Share Image — one manual step remaining

### Root cause (2026-04-29 diagnosis)
All previous OG attempts failed because **Vercel Authentication was enabled on the project**, causing the site to return 403 to all unauthenticated requests including Facebook's scraper and iMessage. The OG tags, image, and URLs were correct the entire time. The problem was access, not content.

### What is in place (correct, committed, deployed)
- `public/og-image.png` — 1200×630 PNG, the bike geometry diagram, 94KB
- OG tags in `layout.tsx` (root page), `index.html` (gate), `slides.html` (curriculum)
- All three point to `https://wrenching101.mettlecycling.com/og-image.png`
- `og:url`, `og:image:width: 1200`, `og:image:height: 630` all present

### One step remaining — manual, Vercel dashboard
Go to Vercel → wrenching101 project → Settings → Deployment Protection → toggle **Vercel Authentication OFF** → Save.

After saving: run the FB sharing debugger on `https://wrenching101.mettlecycling.com/` and hit "Scrape Again". Preview should appear.

---

## Mobile — Fixed and pushed (2026-04-29), needs visual verification

### What was done
- `slides.css`: `@media (max-width: 768px)` — nav buttons 48x48px, pip strip hidden, nav padding reduced, **`slide-stage` gets `padding-bottom: 82px`** so flex centering stays above the nav
- `slides.js`: scale calculation now subtracts actual nav height from `window.innerHeight` before computing scale — prevents slide from growing into the nav area
- `slides.js`: swipe gesture support added — horizontal swipe > 40px threshold advances or retreats slides
- `gate.css`: `@media (max-width: 600px)` — title `clamp(36px, 12vw, 60px)`, form `calc(100vw - 48px)`

### Still needs visual verification
Open on an actual phone before sharing any links:
1. `/wrenching101-index` at 320px, 375px, 390px — title fits, form usable, gate functions
2. `/wrenching101-slides` at 375px portrait and landscape — slide content visible, nav clear, swipe works, no overlap

---

## Presentation — LIVE 2026-04-29

- `/wrenching101-index` — password gate (password: `Wr3nch`)
- `/wrenching101-slides` — 89-slide deck, 1920x1080, proportional JS scaling
- All CSS/JS paths absolute (`/presentation/css/...`, `/presentation/js/...`)
- Footer "Take-home curriculum" links to `/wrenching101-index`

### Pending
- Image placeholders (15+ slides): batch AI image generation needed
- Review diagram dotted line behavior (deferred)

---

## Stack
- Next.js App Router, TypeScript strict, CSS Modules
- Local: `http://localhost:3000`
- Production: `wrenching101.mettlecycling.com` (Vercel, `fransencomesalive-4748s-projects`)
- Repo: `https://github.com/fransencomesalive/wrenching101.git`
- Packages: `@vercel/blob`

## Fonts
Licensed fonts committed to git. No manual copy needed.

## Design decisions (do not revisit without reason)
- New Athletic 54: all-caps display, ASCII only, no apostrophes, no contractions
- Cards: `rgba(0, 12, 18, 0.85)` panel, `2px solid rgba(0, 170, 201, 0.38)` teal border
- Drop shadow on headline only, never in cards
- No em dashes anywhere

## RSVP backend — LIVE
- Vercel Blob: `wrenching101-rsvps`, `store_1PpvAB2cFZVg5Y8O`
- `BLOB_READ_WRITE_TOKEN` in Vercel env vars
- To reset: `put('rsvps.json', '[]', { access: 'private', addRandomSuffix: false, allowOverwrite: true, ... })`

## Resume here (next session)
1. **Turn off Vercel Authentication** (Vercel dashboard → wrenching101 → Settings → Deployment Protection → toggle off → Save)
2. Verify OG in FB debugger after step 1
3. Visual mobile check on phone: gate at 320/375/390px, slides portrait and landscape
4. Reset blob and disable submit before invites go out
5. Image placeholder generation (15+ slides)
