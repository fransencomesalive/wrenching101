# Current State — Wrenching 101

## Status
Page is live at `wrenching101.mettlecycling.com`. RSVP backend live. Submit button enabled with test data. Before invites go out: reset blob and disable submit button.

## BROKEN: OG Share Image — needs fix next session

Multiple attempts were made to get the OG share image working. None were verified as working in FB debugger.

### What was tried and failed
1. `app/opengraph-image.tsx` using next/og — endpoint generated 200 image/png per curl, but FB debugger never showed the image. Likely cause: FB scraper timeout on SVG-to-PNG rendering via satori/resvg serverless cold start.
2. Various redesigns of the same endpoint — wrong approach (bug fix not redesign).
3. Static PNG via sharp — `public/og-image.png` generated (1200x630, all dims visible, no labels, dark background). All OG tags now point to `https://wrenching101.mettlecycling.com/og-image.png`. Dynamic endpoint removed.

### Current state
- `public/og-image.png` is committed and deployed.
- All three pages point to it: `/`, `/wrenching101-index`, `/wrenching101-slides`.
- **NOT VERIFIED** in FB debugger — session ended before confirmation.
- If still broken: check that `/og-image.png` is publicly accessible, check FB debugger error message, try iMessage or Twitter card validator as alternative test.

### OG tag values (correct, verified via curl)
- `og:title`: Presented by Mettle Cycling
- `og:description`: An intro for cyclists who ride confidently and wrench... less so.
- `og:image`: `https://wrenching101.mettlecycling.com/og-image.png`

---

## INCOMPLETE: Mobile styling — needs verification next session

### What was done
- `gate.css`: Added `@media (max-width: 600px)` — title `clamp(36px, 12vw, 60px)`, form `calc(100vw - 48px)`.
- `slides.css`: Added `@media (max-width: 768px)` — nav buttons 48x48px, pip strip hidden, nav padding reduced.

### What was NOT done — Claude's failure
- **Mobile was never verified at 320/375/390px before shipping.** This is a hard-coded mandatory rule that was violated twice in the same session.
- Gate page: title fix applied, but no visual confirmation that it renders correctly on small screens.
- Slides: JS proportional scaling handles content, but the nav fix was not verified on actual mobile viewport.
- No check was done for text overflow, clipping, or interaction issues at any mobile breakpoint.

### What next session must do
1. Open `/wrenching101-index` at 320px, 375px, 390px — confirm title fits, form is usable.
2. Open `/wrenching101-slides` at 375px — confirm nav arrows are tappable, counter is visible, no layout breakage.
3. Fix anything that doesn't pass visual check before calling it done.

---

## Presentation — LIVE 2026-04-29

- `/wrenching101-index` — password gate (password: `Wr3nch`)
- `/wrenching101-slides` — 89-slide deck, 1920x1080, proportional JS scaling
- All CSS/JS paths absolute (`/presentation/css/...`, `/presentation/js/...`)
- Footer "Take-home curriculum" links to `/wrenching101-index`

### Pending
- Image placeholders (15+ slides): batch AI image generation needed
- Visual verification pass before event
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
1. Verify OG image shows in FB debugger — scrape `https://wrenching101.mettlecycling.com/` and both presentation URLs
2. Verify mobile layout at 320/375/390px for gate and slides nav
3. Fix anything broken from items 1 and 2
4. Reset blob and disable submit before invites go out
5. Image placeholder generation (15+ slides)
