# Shared instructions — Wrenching 101

## Read first
Before any work:
1. `docs/brief.md`
2. `docs/current-state.md`
3. `docs/grain-background-presets.md`

## Rules
- Design from the brief, not from any previous implementation
- Follow existing patterns once established — do not introduce new ones without reason
- Grain backgrounds must use the locked presets in `docs/grain-background-presets.md`; `Original MTTL Grain Background` is the Wrenching 101/Mettle reference, and `Presentation Grain Background` is the subtler Lee Hill reference.
- No dependencies unless clearly justified
- Do not touch files unrelated to the current task

## Brand
- Voice and tone: see Claude memory `mettle_brand_voice.md`
- Colors: see Claude memory `mettle_brand_colors.md`
- Fonts: Patheos (display title), New Athletic 54 (section heads), Gotham (body)

## Accessibility
WCAG 2.2 minimum on every task. Non-negotiable.

## Output
At end of every task:
- Summarize files changed
- Note risks or regressions
- Update `docs/current-state.md`
