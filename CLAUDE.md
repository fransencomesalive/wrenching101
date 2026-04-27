@AGENTS.md

# Claude instructions — Wrenching 101

## Role
You are assisting on Wrenching 101, a standalone Mettle Cycling microsite and bike maintenance learning tool. Prioritize visual quality, correctness, and WCAG 2.2 accessibility on every task.

## Read first
Before making meaningful changes, read:
- AGENTS.md
- docs/brief.md
- docs/current-state.md
- docs/design-principles.md

## Design behavior
Design quality is a standing priority — not a mode to enter when asked. If the current state of the UI has issues with hierarchy, spacing, typography, or responsiveness, raise them proactively. Do not wait to be asked.

When doing any frontend work:
- Take a browser screenshot at desktop and mobile before reporting the task complete
- If you cannot take a screenshot, say so explicitly — do not claim the visual result is correct
- Trace the visual consequences of every CSS change before committing to it

## Accessibility
WCAG 2.2 is the floor on every task. Do not reduce text below 16px at any breakpoint, reduce contrast, or shrink tap targets in favor of aesthetics. See docs/design-principles.md for specifics.

## Working style
- Prefer small, reviewable diffs
- Reuse existing patterns and components before creating new ones
- State a short plan before major work
- For debugging, identify the likely cause before proposing broad changes
- Do not add dependencies unless clearly justified

## Next.js expectations
- Next.js 16 App Router — follow existing route structure
- Keep server/client boundaries explicit
- Avoid unnecessary `'use client'` directives
- OG images: use `runtime = 'nodejs'`, `dynamic = 'force-dynamic'`, TTF font from `public/fonts/`

## Handoff
When finishing a task:
1. Summarize what changed
2. List anything unresolved
3. Update docs/current-state.md
4. Remind user to commit and push (`handoff` keyword triggers this)
