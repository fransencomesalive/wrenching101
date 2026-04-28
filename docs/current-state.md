# Current State — Wrenching 101

## Status
Page is live at `wrenching101.mettlecycling.com`. Mobile layout has been audited and corrected. RSVP backend (Vercel KV + Resend) is still not set up — frontend and API route are complete and waiting on infrastructure.

## Stack
- Next.js App Router, TypeScript strict, CSS Modules
- Local: `http://localhost:3000`
- Production: `wrenching101.mettlecycling.com` (Vercel project: `wrenching101` under `fransencomesalive-4748s-projects`)
- Repo: `https://github.com/fransencomesalive/wrenching101.git`
- Packages: `resend`, `@vercel/kv`

## Fonts
Licensed fonts ARE committed to git. No manual copy needed on new machines.

## Page structure
1. **Hero** — Patheos/red headline, New Athletic 54 tagline
2. **Intro + RSVP row** — 2-column card grid, stacks to 1-column on mobile
3. **Agenda** — 8 topic cards in 2-column grid, stacks to 1-column on mobile
4. **Bike frame diagram** — interactive SVG with click-to-reveal measurements
5. **Footer** — links row: Mettle Cycling (link), Take-home curriculum, Syllabus coming soon

## Design decisions (do not revisit without reason)
- New Athletic 54: all-caps display, limited character set, ASCII only, no contractions
- Cards: `rgba(0, 12, 18, 0.85)` panel, `2px solid rgba(0, 170, 201, 0.38)` teal border
- Drop shadow on headline only, never in cards
- Tagline uses New Athletic 54, not Gotham
- Attendee grid: fixed 16-slot 2-column pre-allocated layout
- No em dashes anywhere in copy, ever

## Mobile layout (audited this session)
- Headline: `white-space: nowrap`, `clamp(26px, 8.2vw, 90px)`, hero container uses `calc(100% - 16px)` on mobile to give headline more horizontal room while keeping the rest of the page at standard padding
- Headline font width was measured with fonttools: "Wrenching 101" in Patheos = 11.243em. 8.2vw fits single-line with safe margin at 320/375/390px.
- Diagram intro text: `position: static` on mobile (was absolute, overlapped the SVG)
- All grids collapse to 1-column at 700px

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

Email notification: `mailto:` link opened client-side after successful POST, same pattern as Flanders26. No Resend, no API key needed. Pre-fills subject and body with name + status.

- `app/api/rsvp/route.ts` — GET reads blob, POST appends entry and writes blob back
- `app/RSVPSection.tsx` — opens `mailto:randall@mettlecycling.com` after successful POST

## Resume here (next session)
1. Review diagram dotted line behavior (user flagged for review)
2. Any remaining mobile or polish issues
