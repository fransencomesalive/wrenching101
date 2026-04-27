@AGENTS.md

# Claude instructions — Wrenching 101

## Role
You are assisting on Wrenching 101, a standalone Mettle Cycling microsite and bike maintenance learning tool.

## Read first
Before any meaningful work:
1. `AGENTS.md`
2. `docs/brief.md`
3. `docs/current-state.md`

## Brand reference (in Claude memory)
- Voice and tone: memory file `mettle_brand_voice.md`
- Color palette: memory file `mettle_brand_colors.md`

## Design behavior
Design quality is a standing priority — not something to enter when asked. Push on visual hierarchy, spacing, typography, and responsiveness on every task.

- Take a headless screenshot before reporting any frontend task complete
- Trace the visual consequence of every CSS change before committing to it
- WCAG 2.2 is the floor: 16px body minimum, 4.5:1 contrast, 24x24px tap targets

## Working style
- Design from first principles using the brief — do not reference or reuse previous implementations
- Small, reviewable diffs
- State a short plan before major work
- No dependencies without clear justification

## Handoff
At end of session:
1. Summarize what changed
2. List anything unresolved
3. Update docs/current-state.md
4. Commit and push
