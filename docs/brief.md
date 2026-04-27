# Wrenching 101 — Project Brief

## Event overview
Mettle Cycling hosts educational seminars on basic bike mechanics and maintenance, historically geared toward women in cycling. Wrenching 101 is the next iteration — an evening for cyclists who ride well but wrench less effectively.

**Production URL:** wrenching101.mettlecycling.com
**Event date:** May 12 (subject to change — stored as a string in page.tsx, easy to update)
**Time / location:** TBD — shown as placeholders on the page

## Page purpose
Single-page event microsite. May be reused for future editions.

## Audience
Cyclists who are confident on the bike but less experienced with maintenance, setup, and troubleshooting. Not beginners — people who have been riding but haven't prioritized learning the mechanical side.

## Sections

### Hero
- Kicker: "Presented by Mettle Cycling"
- H1: "Wrenching 101" (Patheos / red / drop shadow)
- Tagline: "An intro for cyclists who ride confidently and wrench... less so."
- Overview body copy: 2–3 sentences on what the evening covers
- Event meta: date / time / location (date shown, time and location TBD)

### Agenda
Eight topics. First seven from the brief, eighth added (pre-ride checks — natural addition):
1. Bike types and geometry — road, gravel, cyclocross
2. Frame materials — carbon, steel, aluminum
3. Fit basics — riding position, pain points, weight distribution
4. Drivetrain types — road 2x, gravel/cx 1x, gear ratios
5. Drivetrain maintenance — cleaning, lube, waxed chain advantage
6. Tire talk — larger tires, rolling resistance, contact patch
7. Adjustments and diagnosis — mechanical and electronic
8. Pre-ride checks — two-minute routine, most common failure points

Agenda items also serve as the curriculum outline for a take-home syllabus (separate document, separate task). The page shows top-level topics; the syllabus has full teaching notes.

### RSVP
- Name input (required)
- Radio: Going / Not going (both tracked)
- Submit → email notification to randall@mettlecycling.com via Resend
- After submit: confirmation message + public list of attendees (going only)
- List visible before submission too
- Backend: Vercel KV (list storage) + Resend (email)
- See docs on env vars below

### Bike frame diagram (placeholder)
- Full-width section with Iron Man end-credits aesthetic: schematic line art, grain/glow effect
- Interactive when built: diagram of frame showing measurements (BB drop, head tube, fork, seat stay, chain stay, down tube, seat post, angles)
- Toggleable labels: each label highlights the relevant part with a measurement line
- Separate brief forthcoming for implementation (Rive or custom SVG/canvas)

### Syllabus download (placeholder)
- Disabled button — "Syllabus coming soon"
- Will link to downloadable PDF when ready

## Design system
- Colors: see mettle_brand_colors.md in Claude memory
- Fonts: Patheos (title/red), New Athletic 54 (section heads/amber), Gotham (body/cream)
- Background: same animated mesh gradient + grain canvas as RECON
- Cards: dark panel (rgba(0,12,18,0.92)), teal border (rgba(0,170,201,0.32))
- Drop shadow on hero headline — NOT in cards

## Technical stack
- Next.js App Router
- TypeScript strict
- CSS Modules
- Vercel KV: list key `wrenching101:rsvps`, each entry `{name, status, timestamp}`
- Resend: from `noreply@mettlecycling.com` (domain must be verified in Resend dashboard)

## Environment variables required
```
KV_REST_API_URL          — from Vercel KV store (vercel env pull after linking)
KV_REST_API_TOKEN        — from Vercel KV store
RESEND_API_KEY           — from resend.com
```

## Component schematics (deferred)
Randall has component PDFs (rear derailleur, cranks, pedals, etc.) for potential future module. Significant effort to build — deferred until after launch.

## Vercel setup
- No Vercel project exists yet as of 2026-04-27
- Steps when ready: create project → link KV store → add domain `wrenching101.mettlecycling.com` → pull env vars locally

## Voice and tone
See mettle_brand_voice.md. Irreverent, welcoming, concise. Not "beginner-friendly." Normalizes not knowing. Earns every word.
