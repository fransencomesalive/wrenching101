# Current State — Wrenching 101

## Status
Page is live at `wrenching101.mettlecycling.com`. RSVP backend live (Vercel Blob + silent submit, no email client prompt). Submit button is currently enabled with test data in the blob. Before sending invites: reset blob data and disable submit button until date is confirmed.

## Stack
- Next.js App Router, TypeScript strict, CSS Modules
- Local: `http://localhost:3000`
- Production: `wrenching101.mettlecycling.com` (Vercel project: `wrenching101` under `fransencomesalive-4748s-projects`)
- Repo: `https://github.com/fransencomesalive/wrenching101.git`
- Packages: `@vercel/blob`

## Fonts
Licensed fonts ARE committed to git. No manual copy needed on new machines.

## Page structure
1. **Hero** — Patheos/red headline (full-width fill), New Athletic 54 tagline
2. **Intro + RSVP row** — 2-column card grid, stacks to 1-column on mobile
3. **Agenda** — 8 topic cards in 2-column grid, stacks to 1-column on mobile
4. **Bike frame diagram** — interactive SVG with click-to-reveal measurements
5. **Footer** — links row: Mettle Cycling (link), Take-home curriculum, Syllabus coming soon

## Design decisions (do not revisit without reason)
- New Athletic 54: all-caps display, limited character set, ASCII only, no contractions
- Cards: `rgba(0, 12, 18, 0.85)` panel, `2px solid rgba(0, 170, 201, 0.38)` teal border
- Drop shadow on headline only, never in cards
- Tagline uses New Athletic 54, not Gotham
- Attendee grid: two-column layout, ATTENDING / NOT ATTENDING headers in cream display font
- Attendee names: 13px, weight 700, `var(--w-muted)` color
- No em dashes anywhere in copy, ever

## Headline (full-width fill)
- Sized via `HeadlineAutosize.tsx` — client component that measures actual rendered text width and sets font-size to fill the maxWidth container exactly
- CSS fallback: `clamp(58px, calc(8.894vw - 4.27px), 105px)` (corrected before JS hydrates)
- Hero container uses same `min(1180px, calc(100% - 48px))` as all other sections on all breakpoints

## Mobile layout
- All grids collapse to 1-column at 700px
- Diagram intro text: `position: static` on mobile

## Frame diagram
### Architecture
- SVG source: `public/diagrams/BikeGeo-chart.svg`
- Server component: `app/BikeGeometryDiagram.tsx` — reads SVG at build time
- Client component: `app/BikeGeometryClient.tsx` — React synthetic onClick on container div, imperative innerHTML injection via useEffect

### Interaction
- Click any label to reveal its measurement and description
- Multiple labels can be active simultaneously
- Active labels dim inactive ones to 0.3 opacity
- Toggle: click active label again to deactivate
- Desc bar at bottom shows letter + description for each active measurement
- Below each description: a 2-row × 3-col Road/Gravel/Cyclocross comparison table (teal-bordered grid, `var(--w-muted)` text, headers 15% larger than values)

### Comparison table
- Data from `docs/frame-geometry-research.md` (Codex handoff)
- Fixed `max-width: 390px; width: 100%` — desktop centers at 390px, mobile shrinks to fit
- Below 440px: font drops to 10px, padding reduces to 7px/4px
- All 12 measurements have table data

### Mobile label scaling
- SCALE = 1.32 (1.15 baseline × 1.15)
- 4 label columns evenly distributed across full SVG width (MARGIN=40, gap calculated dynamically)
- Rows within each column spread by ROW_EXTRA_SPACE=20 SVG units (middle row anchored, top/bottom offset ±20)
- Breakpoint: svgWidth > 800 skips mobile transforms

### Effects
- `#Bike_Frame` pulses with teal glow animation
- Scan line sweeps top-to-bottom every 8s
- Background grid overlay

## Footer
- "Mettle Cycling" links to `https://www.mettlecycling.com` (opens new tab)
- "Take-home curriculum" and "Syllabus coming soon" are muted text placeholders
- On mobile: dot separators hide, items stack vertically

## RSVP backend — LIVE

Storage: Vercel Blob private store (`wrenching101-rsvps`, `store_1PpvAB2cFZVg5Y8O`).
`BLOB_READ_WRITE_TOKEN` set in Vercel env vars (all environments). Local `.env.local` pulled via `vercel env pull`.

Email notification: none (no Resend, no mailto). Form submits silently; attendee list updates live on the page.

- `app/api/rsvp/route.ts` — GET reads blob, POST appends entry and writes blob back
- `app/RSVPSection.tsx` — ATTENDING / NOT ATTENDING two-column layout; submit is currently enabled

### To reset blob data (run from wrenching101 dir):
```js
// seed_tmp.mjs
import { put } from '@vercel/blob';
await put('rsvps.json', '[]', { access: 'private', addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json', token: 'BLOB_READ_WRITE_TOKEN_VALUE' });
```

## Resume here (next session)
1. Reset blob to `[]` and disable submit button before invites go out
2. Re-enable submit button once date is confirmed and invites are ready (see memory reminder)
3. Review diagram dotted line behavior (flagged for review, deferred)
4. Any remaining polish issues on the diagram (mobile label layout improved but may need further tuning after live review)
