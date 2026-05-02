# Grain Background Presets

These are locked background references for future Mettle/MTTL, Wrenching 101, Lee Hill Labs, and presentation work. When Randall asks for a grain background from Mettle, MTTL, Wrenching 101, Lee Hill Labs, or similar phrasing, use one of these two presets and change only the hex color values unless he explicitly asks to alter motion, opacity, density, blur, node count, or radii.

## Original MTTL Grain Background

Use this for the original Mettle/MTTL/Wrenching 101 background: fuller, more active, and more visibly textured.

- Mesh nodes: 8 locked nodes.
- Node locks: `(0.55,0.75,dd)`, `(0.20,0.30,66)`, `(0.38,0.52,99)`, `(0.50,0.68,cc)`, `(0.52,0.70,cc)`, `(0.18,0.28,55)`, `(0.48,0.65,cc)`, `(0.15,0.25,44)`.
- Motion: velocity multiplier `0.00025`; mesh updates every 2 animation frames; bounce at `0.05` and `0.95`.
- Gradient stops: `0 = node hex + a0`, `0.55 = node hex + 55`, `1 = node hex + 00`.
- Canvas blur: `90px`.
- Grain: updates every 3 animation frames; density `pixelWidth * pixelHeight * 0.02`; pixel RGBA `255, 225, 160, 90`.
- Grain CSS: `mix-blend-mode: screen`; no extra opacity reduction.
- Variable values: node hex colors and base fill color.

## Presentation Grain Background

Use this for the Lee Hill Labs-style presentation background: quieter, subtler, and better for investor/civic decks.

- Mesh nodes: 6 locked nodes.
- Node locks: `(0.55,0.75,aa)`, `(0.42,0.62,bb)`, `(0.34,0.50,88)`, `(0.34,0.54,88)`, `(0.32,0.48,77)`, `(0.26,0.40,99)`.
- Motion: velocity multiplier `0.00022`; mesh updates every 2 animation frames; bounce at `0.04` and `0.96`.
- Gradient stops: `0 = node hex + a0`, `0.55 = node hex + 44`, `1 = node hex + 00`.
- Canvas blur: `80px`.
- Grain: updates every 3 animation frames; density `pixelWidth * pixelHeight * 0.015`; pixel RGBA `255, 238, 204, 70`.
- Grain CSS: `mix-blend-mode: screen`; opacity `0.42`.
- Variable values: node hex colors and base fill color.

## Usage Rule

Do not tune these values during replication. A palette swap is not permission to change grain density, blur, motion speed, radii, alpha stops, node count, or canvas opacity. If a new variation is needed, document it as a third named preset before using it.
