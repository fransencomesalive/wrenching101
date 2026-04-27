# Shared project instructions — Wrenching 101

## Read first
Before changing code, read:
- README.md
- docs/brief.md
- docs/current-state.md
- docs/design-principles.md

## Project goals
- Standalone Next.js microsite for `wrenching101.mettlecycling.com`
- Mettle Cycling event tool and bike maintenance learning surface
- Keep the site stable and deployable at all times
- Keep diffs small unless a larger refactor is explicitly requested

## Tool context
Claude is the primary tool for this project. Codex may be used for time-limited sessions or code auditing. When picking up after a Codex session, audit visual output carefully — Codex does not apply design judgment and may produce code that builds and lints correctly but looks wrong or regresses visual quality. Always verify screenshots before accepting a Codex session's output.

## Design mandate — standing priority on every task
Design is never in a final or approved state unless the user explicitly says so in those words. Visual quality is a standing requirement, not something to request separately.

Before finishing any task that touches UI:
- Check visual hierarchy: clear reading order?
- Check spacing: consistent with the established system?
- Check typography: correct font, size, weight, color per docs/design-principles.md?
- Check alignment: cards, columns, and text edges clean?
- Check responsiveness: holds at mobile and desktop?
- Push on the design. If something looks weak or off, say so and propose a fix.

WCAG 2.2 is the accessibility floor on every task. Text size (16px body minimum at all breakpoints), contrast (4.5:1 normal / 3:1 large), and tap target size (24×24px minimum) are non-negotiable. Creative judgment and taste are welcome above those floors — do not shrink text or reduce contrast in favor of aesthetics.

A task that passes lint and build but produces weak visual output is not done.

## Rules
- Follow docs/design-principles.md before making any layout, type, color, or component change
- Reuse patterns before creating new ones
- Do not add dependencies unless clearly justified
- Avoid touching unrelated files
- Preserve behavior unless the task explicitly changes it
- Call out assumptions instead of silently making them
- Never describe a design decision as "approved" in docs — describe what was decided and why, not that it is settled

## Documentation updates
Update docs/current-state.md when:
- A task is completed
- A decision is made
- Architecture changes
- There is important follow-up work

Update docs/design-principles.md when:
- Visual rules change
- New shared patterns are introduced

## Output format
At the end of a task:
- Summarize files changed
- Summarize risks or regressions to watch for
- Note follow-up work
