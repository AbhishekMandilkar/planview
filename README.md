# Planbase

Find any AI agent plan from two weeks ago in two seconds.

Planbase is a macOS desktop app that indexes plan files from Cursor, Claude Code, and your project folders. Search by project, filter by tool, and open plans in your editor. Everything stays on your Mac — no cloud.

## Download

**Requirements:** macOS (Apple Silicon)

1. Download the latest release from [GitHub Releases](https://github.com/AbhishekMandilkar/planview/releases/latest)
2. Open the DMG and drag Planbase to Applications
3. The app is not notarized yet. After installing, run in Terminal:

```bash
xattr -cr /Applications/Planbase.app
```

## Development

Requires [Bun](https://bun.sh) 1.3+.

```bash
bun install
```

### Web (landing page + app UI)

```bash
bun run dev:web
```

Open [http://localhost:5173](http://localhost:5173). The landing page is at `/`; the app UI is at `/app`.

### Desktop

```bash
bun run dev:desktop
```

Runs the Electrobun shell with Vite HMR for the web frontend.

### Build desktop app

```bash
bun run build:desktop
```

Output goes to `apps/desktop/artifacts/`:

- `stable-macos-arm64-Planbase.dmg` — installer for GitHub Releases
- `stable-macos-arm64-Planbase.app.tar.zst` — update bundle
- `stable-macos-arm64-update.json` — update manifest

To publish a release, upload the DMG to [GitHub Releases](https://github.com/AbhishekMandilkar/planview/releases/new). The landing page download button links to `/releases/latest`.

## Project structure

```
planview/
├── apps/
│   ├── web/         # React + TanStack Router (landing page + app UI)
│   └── desktop/     # Electrobun shell, filesystem scanner, IPC
├── packages/
│   ├── ui/          # Shared shadcn/ui components
│   ├── shared/      # Shared types and utilities
│   ├── env/         # Environment validation
│   └── config/      # Shared TS config
└── vercel.json      # Web deployment (landing page only)
```

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start all apps in development mode |
| `bun run dev:web` | Web app only |
| `bun run dev:desktop` | Desktop app with HMR |
| `bun run build` | Build all apps |
| `bun run build:desktop` | Build stable macOS DMG |
| `bun run build:desktop:canary` | Build canary macOS bundle |
| `bun run check-types` | Typecheck all packages |

## Tech stack

- **Electrobun** — lightweight desktop shell
- **React 19 + Vite** — UI
- **TanStack Router** — file-based routing
- **Tailwind CSS + shadcn/ui** — styling and components
- **Bun** — package manager and runtime
