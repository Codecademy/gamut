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

## CI (GitHub Actions)

Workflow [`.github/workflows/cursor-plugins.yml`](../.github/workflows/cursor-plugins.yml) runs on pull requests and pushes to `main` when **Cursor-related paths** change: [`.cursor/`](../.cursor/) (monorepo rules/skills), `gamut-cursor-plugins/`, [`.cursor-plugin/`](../.cursor-plugin/), or the workflow/script. You can also run it manually via **Actions → Cursor plugins → Run workflow**. It uses Node (see [`.nvmrc`](../.nvmrc)) and runs [`.github/scripts/validate-cursor-plugins.mjs`](../.github/scripts/validate-cursor-plugins.mjs); the job **fails** (red PR check) if validation errors are reported.

Checks:

- Root [`.cursor-plugin/marketplace.json`](../.cursor-plugin/marketplace.json) is valid JSON with `name`, `owner.name`, and a non-empty `plugins` list.
- Each plugin `source` directory exists and contains `.cursor-plugin/plugin.json` whose `name` matches the marketplace entry and whose `version` is semver.
- Each plugin has `rules/*.mdc` and/or `skills/*/SKILL.md` with YAML frontmatter including `description` (and `name` for skills).
- Monorepo [`.cursor/rules/*.mdc`](../.cursor/rules) and [`.cursor/skills/*/SKILL.md`](../.cursor/skills) use the same frontmatter requirements when those paths exist.
- **Pull requests only** (second workflow step, `if: github.event_name == 'pull_request'`): if any file under a marketplace plugin `source` tree (e.g. `gamut-cursor-plugins/gamut-core/`) differs from the PR base commit, that plugin’s `.cursor-plugin/plugin.json` **version** must be **strictly greater** than on the base (semver). New plugins with no prior `plugin.json` on the base are exempt from the comparison. The layout step does not run this check; it is `node …/validate-cursor-plugins.mjs --pr-version-bumps`.

It does **not** call Cursor’s marketplace API, install plugins in Cursor, or lint Markdown body content beyond those structural checks.

## Human tasks (not automated)

- **Public marketplace**: Submit or update listings per [Publish to Cursor Marketplace](https://cursor.com/marketplace/publish) (open source and review requirements apply).
- **Update review**: Changes to plugins on the public marketplace are **manually reviewed** before users receive updates; plan for latency. See [Marketplace security](https://cursor.com/help/security-and-privacy/marketplace-security.md).
- **Team marketplace**: Import the repo (or fork) in the Cursor dashboard (**Settings → Plugins → Team Marketplaces**), assign required vs optional plugins per group, and confirm installs on a developer machine (see §5 below).
- **Version bumps**: When you change rules, skills, or `plugin.json` metadata in a meaningful way, bump semver in each affected `gamut-*/.cursor-plugin/plugin.json` so teams can tell updates apart.

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

- [Publish to Cursor Marketplace](https://cursor.com/marketplace/publish) (public; open source and review required)—a human step; CI does not publish.
- Or attach this repository as a **team marketplace** in the Cursor dashboard (also configured outside CI).

## Versioning

Bump `version` in each `gamut-*/.cursor-plugin/plugin.json` together when content changes materially.
