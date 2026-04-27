# Wrenching 101 Design Principles

This file is the gate for UI decisions. Do not make layout, type, color, or component changes unless the reason can be traced to one of these rules or to an explicit user direction.

## Source Standards
- WCAG 2.2 contrast minimum: normal text should meet 4.5:1 contrast; large text should meet 3:1. Use this for body copy, forms, labels, attendee lists, and interactive controls.
  - Source: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- WCAG 2.2 text spacing: layouts must not clip, overlap, or lose function when line-height is at least 1.5, paragraph spacing is at least 2x font size, letter spacing is at least 0.12em, and word spacing is at least 0.16em.
  - Source: https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html
- WCAG 2.2 target size minimum: interactive pointer targets must be at least 24x24 CSS px or have sufficient spacing. Wrenching 101 should use larger targets for form controls because mobile use is expected.
  - Source: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html

## Layout Rules
- Use row-based grids unless content heights are intentionally matched. Do not use persistent side rails when the adjacent content is short; this creates dead space and broken row alignment.
- The first viewport must start near the top edge unless there is a real navigation/header/media reason. Do not add hero padding to create drama.
- Above-fold content order is: event title block, three topic cards, RSVP band. The RSVP band is horizontal so the grid stays aligned.
- Full-width modules are allowed for primary actions and schematic learning panels. Small cards are only for comparable content groups.
- Every card in a row must share the same top alignment, border rule, and spacing system.

## Typography Rules
- Patheos is the major title font. Use it for `Wrenching 101` and keep it in the red color family.
- New Athletic 54 is for section titles, labels, and compact headers. Use the yellow/amber color family.
- Gotham is for body, form text, attendee names, metadata, and lists.
- Body copy must default to at least 16px on desktop with a line-height near 1.5-1.6. Secondary metadata may be 13-14px only when it is not primary reading content.
- Body color is `#f8d29a` unless contrast testing against the actual background requires a stronger value.
- Do not let large display text collide with other modules, overlap columns, or create accidental wraps. If a title must wrap, the line break must be intentional and balanced.

## Color Rules
- The animated Mettle background is ambient and must not carry essential information.
- Teal is structural: schematic lines, borders, dividers, and technical UI emphasis.
- Yellow/amber is instructional and actionable: labels, section heads, and control text.
- Red/rust is display identity: major Patheos title and selective emphasis.
- Cream `#f8d29a` is reading text.

## Component Rules
- Cards use a 2px teal border and the established translucent dark fill.
- Cards should not be used as decoration. Use them for comparable modules, RSVP, and diagram panels.
- RSVP grows vertically with the attendee list by default. Do not cap it until the list is long enough to harm page scanning; if capped later, use a clearly contained scroll area or disclosure.
- Buttons and controls keep consistent text color unless an explicit state rule exists. Do not change attending/not-attending text color without defining selected, unselected, hover, and disabled states.
- Do not create buttons, tags, or controls for future systems unless the current interaction exists or the element is explicitly marked as static content.

## Implementation Checklist
- Before coding: name the rule that justifies the change.
- Before finishing: check desktop and mobile screenshots, not just build/lint.
- Check for: top dead space, grid alignment, overflow, contrast, text size, line length, tap targets, and unexplained components.
- If a decision cannot be justified by this file or a user instruction, do not implement it.
