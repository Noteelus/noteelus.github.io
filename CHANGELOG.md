# Changelog

All notable releases of Noteelus are documented here.

## [1.0.68] - 2026-11-24

Refreshed mobile reading experience with floating islands and unified Swiss Sheet dialogs across the app.

### New
- **Refreshed mobile Pretty View & floating islands**: Seamless edge-to-edge paper canvas behind the status bar and gesture bar (Android & iOS), frosted left island (`☰ • 🔍 • +`) that auto-hides while reading and expands with liquid-volume spring physics for inline search and quick block insertion, and a draggable YouTube-PiP-style accent switch pill that hides while searching or inserting.
- **Unified Swiss Sheet dialogs**: Modernized, cohesive dialog design across encryption, app lock, Drive conflicts, and settings, including password reveal toggles and clearer destructive confirmations.

## [1.0.66] - 2026-11-24

First public beta release featuring the redesigned Liquid Glass app icon, Studio Explorer, improved travel map timelines, and smoother editor scrolling.

### New
- **New Liquid Glass app icon**: Refined edge-to-edge ruled notebook icon across macOS, Windows, Android, and iOS.
- **Studio Explorer & animated Spaces**: Sharper container hierarchy with direct container icons, color dots in Space menus, full-name hover tooltips, and animated active Space chip.
- **Travel map itinerary timelines**: Alternating centered timeline and Minimal timeline mode alongside Full and Off, with smoother map hover interaction.
- **Refined scrolling & Google Drive layout**: Auto-hiding accent-colored scrollbars in Editor and Pretty view, English Drive attachment folder naming (`Attachments`), and AI agent Drive entry files (`AGENTS.md`, `INBOX.md`, `INDEX.md`).

## [1.0.43] - 2026-11-20

Offline journey maps gain persistent camera positions and cut-paper shadows, plus crisp editor spacing and demo itineraries.

### New
- **Map camera persistence**: Your zoom level and framing inside `map-3d` and `map-2d` blocks are now remembered directly in the note header (`view=...`), keeping exports and reopening faithful.
- **Cut-paper 2D map relief**: Visited countries in the 2D Blueprint view now cast a crisp optional cut-paper shadow (`shadow=on|off`).
- **Independent line spacing**: Set separate line spacing for the raw Markdown editor and the Pretty reading pane in Settings.
- **3D & 2D travel map widget**: Draw interactive globes (`map-3d`) and architectural blueprints (`map-2d`) 100% offline using embedded Natural Earth coastlines and 7,467 built-in cities, with EXIF GPS photo parsing.

## [1.0.35] - 2026-11-18

Arc-style Spaces, multi-account Google Drive sync, and unified Google Drive settings.

### New
- **Spaces**: Group containers and folders into dedicated Spaces (Personal, Work, Travel), each with its own accent color, Space header banner, and swipe/rail switcher.
- **Multi-account Google Drive sync**: Bind distinct Google accounts to individual Spaces and export whole Spaces or folders as `.zip` archives.
- **Unified Drive card**: Cleaner Google Drive status, frameless quota bar, and quick account switcher in Settings.
- **Whole-note selection**: `Cmd/Ctrl+A` and `Shift+Click` selection across blocks in Pretty view and Editor.

## [1.0.22] - 2026-11-15

Encrypted containers, unified Files gallery, and four calibrated themes.

### New
- **Encrypted Vault Containers**: Seal any container client-side with its own password and one-time recovery key. Titles, contents, and attachments stay encrypted locally and on Google Drive.
- **Unified Files Gallery**: Browse every picture, GIF, video, audio clip, and PDF across your notes in one filterable grid and reuse attachments without duplicating files.
- **Light & Three Dark Themes**: Choose Light or three dark palettes (Graphite, Ink, and Moka) plus five Space accent colors.
- **Programmable Markdown & Charts**: Live `::var` fields, table formulas (`=sum(...)`, `=planned - spent`), cross-note values, and embedded `graph`, `graph-bar`, and `graph-pie` charts.
