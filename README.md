# Wrenching 101

Standalone Next.js microsite for `wrenching101.mettlecycling.com`.

## Setup (any machine)

```bash
git clone https://github.com/fransencomesalive/wrenching101.git ~/Sites/wrenching101
cd ~/Sites/wrenching101
npm install
```

### Fonts

Licensed fonts are **not committed to the repo**. Copy them manually to `public/fonts/` before running the dev server. Required files:

```
public/fonts/
  New Athletic M54.ttf
  Gotham-Light.otf
  Gotham-Medium.otf
  Gotham-Bold.otf
  Gotham-BookItalic.otf
  Gotham-MediumItalic.otf
  Patheos-Regular.otf
```

### Run dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- Next.js App Router
- TypeScript (strict)
- CSS Modules
- Hosted on Vercel (auto-deploy from `main`)

## Project structure

```
app/              # Next.js App Router — pages and components
docs/             # Project brief, current state, design decisions
public/fonts/     # Licensed fonts (not committed — see Setup)
public/rive/      # Rive animation files (future)
public/diagrams/  # Source diagram assets (future)
```

## Cross-machine workflow

- Mac Studio and MacBook Air both use `~/Sites/wrenching101`
- `git pull` before starting any session
- Commit and push at end of every session
- Claude reads `docs/current-state.md` at session start — keep it updated

## Context for Claude / Codex

Read in this order before any work:
1. `CLAUDE.md` / `AGENTS.md`
2. `docs/brief.md`
3. `docs/current-state.md`
