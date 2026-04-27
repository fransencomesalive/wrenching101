# Current State — Wrenching 101

## Status
Page is built and visually approved. RSVP backend needs Vercel + env var setup before it is live. Frame diagram is built but has two interaction bugs that must be fixed next session.

## Stack
- Next.js 16 App Router, TypeScript strict, CSS Modules
- Local: `http://localhost:3000`
- Production: `wrenching101.mettlecycling.com` (Vercel project not yet created)
- Repo: `https://github.com/fransencomesalive/wrenching101.git`
- Packages added this session: `resend`, `@vercel/kv`

## Fonts
Licensed fonts live in `public/fonts/` — not committed to git. Must be copied manually on each machine:
```
New Athletic M54.ttf
Gotham-Light.otf   Gotham-Medium.otf   Gotham-Bold.otf
Gotham-BookItalic.otf   Gotham-MediumItalic.otf
Patheos-Regular.otf
```

## Page structure (built)
1. **Hero** — Patheos/red headline, New Athletic 54 tagline with "Presented by Mettle Cycling" in amber appended at end, tight layout
2. **Intro + RSVP row** — 2-column card layout. Left: overview + event meta (date/time/location). Right: RSVP form + 16-slot fixed attendee grid. Cards match height via flexbox stretch.
3. **Agenda** — 8 topic cards in 2-column grid (01–08)
4. **Bike frame diagram** — interactive SVG diagram with glow/flicker effects. See below.
5. **Syllabus** — disabled placeholder button

## Design decisions (do not revisit without reason)
- New Athletic 54 is all-caps display with limited character set — no apostrophes, no Unicode. All headings and display text must use ASCII only, no contractions.
- Cards: `rgba(0, 12, 18, 0.85)` panel, `2px solid rgba(0, 170, 201, 0.38)` teal border
- Drop shadow on headline only — not in cards
- Tagline uses New Athletic 54 (same as section heads) not Gotham body
- Attendee grid: fixed 16-slot 2-column pre-allocated layout to keep RSVP card height constant
- Intro card uses `display: flex; flex-direction: column` with `flex: 1` on body to match RSVP card height

## Frame diagram — built, two bugs outstanding

### Architecture
- SVG source: `public/diagrams/BikeGeo-chart.svg` — user-created, layered
- Server component: `app/BikeGeometryDiagram.tsx` — reads SVG from disk at build time, passes to client
- Client component: `app/BikeGeometryClient.tsx` — all DOM interaction via useEffect + dangerouslySetInnerHTML
- Styles: `app/BikeGeometryDiagram.module.css`

### SVG layer naming convention
- `Bike_Frame` — single compound path, teal `#00a7c5`, gets pulsing glow animation
- `Wheels-cockpit` — darker `#35342d` reference layer, no animation
- `{part}-button` — clickable label groups (12 total, in lower frame area)
- `{part}-dim` — measurement annotation lines, hidden until activated
- `{id}-dotted` — amber dashed reference lines, shown at 0.75 opacity when active

### Button → dim/dotted mapping (confirmed from SVG)
| Button key   | Letter | Dim layer        | Dotted layer(s)                                        |
|--------------|--------|------------------|--------------------------------------------------------|
| Stack        | A      | Stack-dim        | —                                                      |
| Reach        | B      | Reach-dim        | —                                                      |
| ForkOffest   | C      | —                | forkoffset-dotted                                      |
| Trail        | D      | Trail-dim        | —                                                      |
| STangle      | F      | seattubeangle    | seattube-dotted                                        |
| HTLength     | G      | HTlength-dim     | —                                                      |
| HTangle      | H      | HTangle-dim      | HTangle-dotted                                         |
| EffTT        | I      | effectiveTT-dim  | EffTT-dotted                                           |
| Chainstay    | J      | Chainstay-dim    | —                                                      |
| Wheelbase    | K      | Wheelbase-dim    | wheelbase-dotted, wheelbase1-dotted, wheelbase2-dotted |
| BBdrop       | L      | BBdrop-dim       | —                                                      |
| FrontCenter  | N      | FrontCenter-dim  | —                                                      |

Note: `seattubeangle` is the dim layer for STangle — it is missing the `-dim` suffix in the SVG. This is intentional.

### Effects (working)
- `#Bike_Frame` pulses with a teal `drop-shadow` glow (CSS animation injected via `<style>` tag in component)
- Scan line: CSS `::after` on `.diagramArea`, sweeps top-to-bottom every 8s
- Background grid overlay via `::before`

### Bugs to fix next session — START HERE
Two interaction bugs that could not be resolved before context limit:

**1. Button toggle is broken — buttons do not turn off**
The intended behavior: each button is a toggle — click to activate (show dim/dotted), click again to deactivate (hide dim/dotted). Multiple buttons can be active simultaneously. Currently, clicking a button activates it but clicking again does NOT deactivate it.

The toggle logic in `BikeGeometryClient.tsx`:
```ts
const handler = () =>
  setActive(prev =>
    prev.includes(part) ? prev.filter(p => p !== part) : [...prev, part]
  )
```
This is correct in isolation. The suspected cause: the bounding-box `<rect>` appended to each button group in the mount `useEffect` may be receiving the click but the state closure over `active` is stale (the handler closes over the initial empty array, not the current state). Since `prev =>` functional update is used, this SHOULD be fine — but the rect's click event may be firing twice (once on rect, once bubbling to `<g>`) causing toggle to immediately cancel itself.

**Recommended fix approach:**
Add `e.stopPropagation()` to the handler AND ensure the hitRect does not double-fire:
```ts
const handler = (e: Event) => {
  e.stopPropagation()
  setActive(prev =>
    prev.includes(part) ? prev.filter(p => p !== part) : [...prev, part]
  )
}
btn.addEventListener('click', handler)
// also add the same handler directly to hitRect INSTEAD of the group
// OR: do not add handler to btn at all, only to hitRect
```
Better yet: attach the click listener only to the hitRect, not to the `<g>`. This eliminates any double-fire:
```ts
hitRect.addEventListener('click', handler)
// Do NOT call: btn.addEventListener('click', handler)
```

**2. Multi-select not working**
Related to bug 1 — state is `string[]`, the UI should allow multiple buttons active simultaneously. Once the toggle is fixed this should work automatically since state is an array.

### Desc bar (working once bugs fixed)
- Shows `{letter} — {desc}` for each active measurement, sorted by letter code
- Multiple active = multiple rows
- Empty state shows placeholder text
- Body copy: 14px / font-weight 300 / Gotham

### Dotted line logic — review after bugs fixed
User flagged dotted line behavior may need adjustment after interaction is working. Defer until toggle is confirmed working.

## RSVP backend — TO DO before launch

The frontend and API route are complete. The following infrastructure must be set up:

- [ ] Create Vercel project and connect to `github.com/fransencomesalive/wrenching101`
- [ ] Add Vercel KV store to the project
- [ ] Run `vercel env pull` locally to get `KV_REST_API_URL` and `KV_REST_API_TOKEN`
- [ ] Create Resend account at resend.com
- [ ] Add `mettlecycling.com` domain to Resend and verify DNS
- [ ] Add `RESEND_API_KEY` env var in Vercel project settings
- [ ] Add domain `wrenching101.mettlecycling.com` to Vercel project and point DNS
- [ ] Test RSVP submission end-to-end: form → KV storage → email to randall@mettlecycling.com

API route: `app/api/rsvp/route.ts` — gracefully no-ops if env vars are missing (returns `[]` on GET, skips KV/email on POST without crashing)

## Resume here (next session)
1. **Fix toggle bug** — attach click listener to hitRect only (not to `<g>`), verify toggle works, verify multi-select works
2. **Review dotted line behavior** — user flagged this for review after toggle is confirmed
3. Set up Vercel project for RSVP backend (can be done in parallel)
