# Current State — Wrenching 101

## Status
Page is built and visually approved. RSVP backend needs Vercel + env var setup before it is live. Next session: frame diagram module.

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
1. **Hero** — Patheos/red headline, New Athletic 54 tagline, tight layout
2. **Intro + RSVP row** — 2-column card layout. Left: overview + event meta (date/time/location). Right: RSVP form + 16-slot fixed attendee grid. Cards match height via flexbox stretch.
3. **Agenda** — 8 topic cards in 2-column grid (01–08)
4. **Bike frame diagram** — placeholder section with schematic grid aesthetic. Full build next session.
5. **Syllabus** — disabled placeholder button

## Design decisions (do not revisit without reason)
- New Athletic 54 is all-caps display with limited character set — no apostrophes, no Unicode. All headings and display text must use ASCII only, no contractions.
- Cards: `rgba(0, 12, 18, 0.85)` panel, `2px solid rgba(0, 170, 201, 0.38)` teal border
- Drop shadow on headline only — not in cards
- Tagline uses New Athletic 54 (same as section heads) not Gotham body
- Attendee grid: fixed 16-slot 2-column pre-allocated layout to keep RSVP card height constant
- Intro card uses `display: flex; flex-direction: column` with `flex: 1` on body to match RSVP card height

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

## Frame diagram — next session

Placeholder section exists at `/` below the agenda. Full brief forthcoming.

**Intent:** Interactive schematic of a road/gravel frame. Toggleable labels highlight specific parts with measurement lines (BB drop, head angle, stack, reach, chainstay, seat stay, fork, down tube, seat post).

**Aesthetic reference:** Iron Man end-credits wireframe style — dark background, glowing edge-detected lines, grain texture, neon-style labels.

**Tools to evaluate next session:**
- Rive — interactive animation runtime, real-time state machines, good for toggle interactions
- Spline — 3D web scenes, may be overkill or wrong tool for 2D schematic
- Custom SVG/Canvas — full control, no external dependency, matches the existing grain canvas pattern
- Other options to research: Lottie (animation playback only, no interactivity), Motion Canvas (code-based animation), plain SVG with CSS transitions

**Questions to resolve:** Whether the diagram needs 3D perspective (Spline territory) or is a clean 2D labeled schematic (SVG/Canvas territory). The Iron Man reference is 2D line art — lean toward SVG with canvas grain overlay.

## Resume here (next session)
1. Evaluate frame diagram tool options
2. Decide on approach: Rive / Spline / custom SVG
3. Build or scaffold the diagram module
4. Set up Vercel project for RSVP backend (can be done in parallel)
