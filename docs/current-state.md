# Current State - Wrenching 101

## Project Summary
Wrenching 101 is a standalone Next.js microsite for `wrenching101.mettlecycling.com`. It is separate from Lab26 and should only be added to Lab26 later as an external featured link.

## Current Stack
- Framework: Next.js 16 App Router
- React: 19
- TypeScript: strict
- Package manager: npm
- Local path: `/Users/randallfransen/Sites/wrenching101`
- Local URL: `http://localhost:3000`

## Current UI State
- Animated Mettle/RECON-style background: `app/MettleBackground.tsx`
- Fonts loaded from `public/fonts/` in `app/globals.css` — includes Gotham-MediumItalic (weight 500 italic) added this session
- Homepage content: `app/page.tsx`
- Main styling: `app/wrenching101.module.css`

### Layout (row-based, approved this session)
1. Hero: title block (`titleBlock` wrapper for h1 + credit), summary, date/meta
2. Three aligned content cards (overview, agenda, diagram system)
3. RSVP row — two peer cards side by side:
   - Left: RSVP form card (`rsvpCard`) with intro heading + form
   - Right: Who's going card (`goingSection`) with two sub-cards — Attending and Not Attending
4. Full-width schematic panel

### Key decisions made this session
- "Hosted by Mettle Cycling" is a right-aligned italic credit below the title, aligned to the right edge of the rendered title text via `titleBlock { width: fit-content }`
- RSVP form and who's-going list are separate peer cards, not a single shared card
- Who's going is split by status (attending / not attending) as two sub-cards within `goingSection`
- `goingCard` sub-cards use a lighter 1px teal border and subtle dark fill — they're nested within a full card, not standalone
- `.schematic` has `position: relative` (was missing — bug fixed this session)
- `.choiceRow label` uses `display: flex` for centering (was using non-functional `place-items`)
- Card h2 sizes reduced from 38px max to 22px; schematic h2 30px; RSVP intro h2 18px
- Mobile title reduced to `clamp(40px, 11.5vw, 70px)` to prevent mid-word break on "WRENCHING"
- Dev implementation notes must never appear as visible page content (removed this session)
- "Mettle Cycling presents" kicker above title removed; replaced by the right-aligned credit
- Title shadow treatment unchanged (user approved, not to be touched)

## Current Design Rules
- Follow `docs/design-principles.md` before making layout, type, color, or component changes
- Use browser screenshots at desktop and mobile before claiming fixes are correct
- Do not guess at visual decisions — trace consequences of every CSS change
- Patheos: title font, red family
- New Athletic 54: section headers and labels, amber family
- Gotham: body, forms, attendee lists, metadata, bullets
- Body copy minimum 16px on desktop
- RSVP list grows naturally — no cap unless explicitly requested
- RSVP control text stays amber unless a full state system is defined

## Validation Status
- `npm run lint`: passes
- `npm run build`: passes
- Visual review: desktop and mobile screenshots taken and verified this session

## Open Work
- Implement real RSVP persistence (database or serverless function)
- Add email notification to `randall@mettlecycling.com` on RSVP submit
- Replace placeholder attendee data with live responses
- Add source diagrams to `public/diagrams/`
- Build first Rive schematic proof of concept
- Add actual downloadable syllabus when ready
- Add Lab26 external listing only when explicitly requested
- No git repository initialized yet — needs `git init`, GitHub remote, and `.gitignore` before next session

## Resume Here
Layout and visual decisions are approved. Next work is either:
1. RSVP backend (persistence + email)
2. Rive schematic integration
3. Initializing git and pushing to GitHub
