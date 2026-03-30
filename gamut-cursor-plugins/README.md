# Gamut Cursor plugins

Three [Cursor plugins](https://cursor.com/docs/plugins) for teams using the [Gamut](https://gamut.codecademy.com/) design system:

| Plugin | Folder | Purpose |
| --- | --- | --- |
| **codecademy-gamut** | `gamut-core/` | Layout, system props, `gamut-styles` utilities, ESLint alignment, Storybook links |
| **codecademy-gamut-a11y** | `gamut-a11y/` | WCAG-minded usage, keyboard/focus, ARIA, composition patterns |
| **codecademy-gamut-themes** | `gamut-themes/` | `ColorMode`, `Background`, semantic tokens, hooks, platform themes |

Library authors working **inside** the [Codecademy/gamut](https://github.com/Codecademy/gamut) repository should use the monorepo skill `.cursor/skills/gamut-library-authoring/` and `.cursor/rules/gamut-library.mdc` (not shipped in these plugins).

## Multi-plugin marketplace

When this folder lives inside the **Gamut monorepo**, the Team Marketplace manifest is at the **repository root**: [`.cursor-plugin/marketplace.json`](../.cursor-plugin/marketplace.json). It points at `gamut-cursor-plugins/gamut-core`, `gamut-a11y`, and `gamut-themes`.

If you **extract** `gamut-cursor-plugins/` to its own Git repository, move `.cursor-plugin/marketplace.json` to that repo root and set each plugin `source` to `gamut-core`, `gamut-a11y`, and `gamut-themes` (no prefix).

Admins can mark **codecademy-gamut** as required and **a11y** / **themes** as optional or required per distribution group. See [Team marketplaces](https://cursor.com/docs/plugins).

## Testing instructions

Use these steps whenever you change plugin content and need to confirm Cursor loads rules and skills correctly. See [Creating plugins — Test plugins locally](https://cursor.com/docs/plugins#test-plugins-locally).

### 1. Install plugins locally (symlink)

Each published plugin must be its **own folder** under `~/.cursor/plugins/local/`, with `.cursor-plugin/plugin.json` at that folder’s root (the `gamut-core`, `gamut-a11y`, and `gamut-themes` directories satisfy that).

From a clone of this repo, adjust `GAMUT_ROOT` and run:

```bash
GAMUT_ROOT="/path/to/gamut"   # e.g. ~/code/gamut

mkdir -p ~/.cursor/plugins/local
ln -sfn "$GAMUT_ROOT/gamut-cursor-plugins/gamut-core" ~/.cursor/plugins/local/codecademy-gamut
ln -sfn "$GAMUT_ROOT/gamut-cursor-plugins/gamut-a11y" ~/.cursor/plugins/local/codecademy-gamut-a11y
ln -sfn "$GAMUT_ROOT/gamut-cursor-plugins/gamut-themes" ~/.cursor/plugins/local/codecademy-gamut-themes
```

Using **`-n`** forces the symlink name; the **folder name** under `local/` can match the plugin `name` in `plugin.json` (here: `codecademy-gamut`, etc.) for clarity.

Alternatively **copy** the three folders into `~/.cursor/plugins/local/` if you prefer not to symlink.

### 2. Reload Cursor

- Restart the Cursor app, **or**
- Command Palette → **Developer: Reload Window**

### 3. Verify in Settings

1. Open **Settings** (e.g. `Cmd+Shift+J` on macOS).
2. **Rules** — Confirm entries from the plugins appear (e.g. `gamut-consumer`, `gamut-accessibility`, `gamut-theming`). Set modes (**Always** / **Agent Decides** / **Manual**) as your team prefers.
3. **Skills** — Confirm **gamut-consumer**, **gamut-accessibility**, and **gamut-theming** are listed (under Agent Decides / manual invocation per your Cursor version).

### 4. Smoke-test behavior

- Open any **`.tsx` / `.jsx`** file (matches rule `globs`).
- Start a chat and invoke a skill by name if supported (e.g. `/gamut-consumer` or the skill picker), or rely on **Agent Decides** so the agent can attach the skill when the description matches.
- Confirm the agent references Gamut patterns (Storybook links, `GridForm`/`ConnectedForm`, `ColorMode`/`Background`, etc.) when relevant.

### 5. Team Marketplace (optional)

If you validate **multi-plugin import** from this repo:

1. Dashboard → **Settings** → **Plugins** → **Team Marketplaces** → **Import** (Teams / Enterprise).
2. Use the **GitHub URL of the Gamut repo** (or a fork) so root [`.cursor-plugin/marketplace.json`](../.cursor-plugin/marketplace.json) is discovered.
3. After import, confirm all three plugins parse; assign **required** vs **optional** per distribution group.
4. On a developer machine, open the marketplace panel and install or confirm auto-install.

### 6. Monorepo-only pieces (not in these plugins)

With the **Gamut** repo open, `.cursor/skills/gamut-library-authoring/` and `.cursor/rules/gamut-library.mdc` apply to library work. They are **not** loaded via the three symlinks above—test those by opening this repo and checking **Rules** / **Skills** for the monorepo paths.

### Troubleshooting

- **Nothing appears after symlink** — Confirm each path is a directory containing `.cursor-plugin/plugin.json` and `rules/` / `skills/` as expected; reload the window again.
- **Wrong content** — You may be pointing at an old clone; recreate symlinks with `ln -sfn`.
- **Marketplace vs local** — Team Marketplace import does not replace `~/.cursor/plugins/local/` testing; use symlinks for the fastest iteration on file edits.

## Publishing

- [Publish to Cursor Marketplace](https://cursor.com/marketplace/publish) (public; open source and review required).
- Or attach this repository as a **team marketplace** in the Cursor dashboard.

## Versioning

Bump `version` in each `gamut-*/.cursor-plugin/plugin.json` together when content changes materially.
