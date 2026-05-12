# @codecademy/gamut-agent-tools

Static assets and a small **CLI** for AI-assisted development against the [Gamut](https://github.com/Codecademy/gamut) design system: Cursor/Claude plugin manifests, **skills**, **rules**, **guidelines**, **commands**, and product-specific **DESIGN** references.

## Install

Add it as a **development dependency** so skills, rules, and the CLI stay out of production bundles:

```bash
yarn add -D @codecademy/gamut-agent-tools
# or
npm install --save-dev @codecademy/gamut-agent-tools
```

If you truly need this package in a production `dependencies` tree (unusual), use `yarn add` / `npm install` without the dev flag.

The published binary is **`gamut-agent-tools`**. After install, run it via `yarn gamut-agent-tools`, `npx gamut-agent-tools`, or your package manager’s bin path.

**`--help`** on the CLI prints a short summary; full detail lives in this README.

## CLI overview

All subcommands use the shape:

```text
gamut-agent-tools plugin <subcommand> [target] [options]
```

The first argument after the binary must be **`plugin`**.

### Subcommands

| Subcommand | Purpose                                                                         |
| ---------- | ------------------------------------------------------------------------------- |
| `install`  | Install assets into Cursor, Claude Code, or a Figma-oriented `guidelines/` tree |
| `remove`   | Remove a prior installation for the chosen target                               |
| `update`   | Re-run `install` in place (same flags as install)                               |
| `list`     | Show status for cursor / claude / figma                                         |

### Targets

| Target   | Default?                  | Behavior                                                                                               |
| -------- | ------------------------- | ------------------------------------------------------------------------------------------------------ |
| `cursor` | yes (when target omitted) | Copies scoped content into Cursor local plugins (see `.cursor-plugin/plugin.json`)                     |
| `claude` |                           | Registers and installs via `claude plugin …` using `.claude-plugin/marketplace.json`                   |
| `figma`  |                           | Copies `guidelines/` from this package to a destination derived from `--output` or `figma.config.json` |

### Scopes (Cursor only: `install` / `update`)

| Scope      | Meaning                                                                                                |
| ---------- | ------------------------------------------------------------------------------------------------------ |
| `all`      | Default — install all top-level content dirs except ignored ones (e.g. `.claude-plugin`, `guidelines`) |
| `skills`   | Only `skills/`                                                                                         |
| `rules`    | Only `rules/`                                                                                          |
| `commands` | Only `commands/`                                                                                       |
| `agents`   | Only `agents/`                                                                                         |

### Options

| Option                | Subcommands                             | Meaning                                                                                                                                                                                           |
| --------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--scope <scope>`     | `install`, `update`                     | Cursor scope (see table above). Ignored for claude/figma where not applicable.                                                                                                                    |
| `--output <path>`     | `install figma`, `remove figma`, `list` | **Figma:** explicit path. For install: destination **directory** for `guidelines/` (parent of the folder you want). For remove/list: path to **`DESIGN.md`** or related when not using discovery. |
| `--plugin-dir <path>` | all                                     | Override the **source** directory (defaults to the root of the installed `@codecademy/gamut-agent-tools` package — the assets shipped with the CLI).                                              |

### Default plugin source

Unless you pass `--plugin-dir`, the CLI uses the **installed package root** of `@codecademy/gamut-agent-tools` (the copy on disk next to this `bin/` tree). You do not need to resolve the package from cwd.

### Environment

| Variable                | Effect                                                                                                                                                              |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CURSOR_INSTALL_METHOD` | If set to something other than `copy`, Cursor install uses a **symlink** of the whole source tree instead of copying (dev convenience). Default behavior is `copy`. |
| `CURSOR_PLUGINS_LOCAL`  | Overrides the base directory for Cursor local plugins (default: `~/.cursor/plugins/local`).                                                                         |

## Examples

```bash
# Cursor — full install (default)
gamut-agent-tools plugin install

# Cursor — skills only
gamut-agent-tools plugin install cursor --scope skills

# Claude Code
gamut-agent-tools plugin install claude

# Figma — explicit guidelines destination
gamut-agent-tools plugin install figma --output /path/to/your/project/guidelines

# Figma — discover figma.config.json upward from cwd
gamut-agent-tools plugin install figma

# Status
gamut-agent-tools plugin list
gamut-agent-tools plugin list --output ./docs/DESIGN.md

# Remove / refresh
gamut-agent-tools plugin remove claude
gamut-agent-tools plugin update cursor --scope rules
```

### Custom or unreleased source tree

```bash
gamut-agent-tools plugin install cursor --plugin-dir /path/to/checkout/packages/gamut-agent-tools
```

## Package layout

| Path              | Purpose                                                                                |
| ----------------- | -------------------------------------------------------------------------------------- |
| `bin/`            | `gamut-agent-tools` CLI entry (`bin/cli.mjs`) and implementation                       |
| `skills/`         | Agent skills (e.g. theming, typography, accessibility)                                 |
| `rules/`          | Rule files (e.g. accessibility)                                                        |
| `guidelines/`     | Written guidelines for foundations and components (Figma install target)               |
| `commands/`       | Command specs (e.g. `gamut-review`)                                                    |
| `agents/`         | Placeholder for future agent definitions                                               |
| `DESIGN*.md`      | Product design references; consumers often copy one to `DESIGN.md` at the project root |
| `.cursor-plugin/` | Cursor local plugin manifest                                                           |
| `.claude-plugin/` | Claude plugin manifest and marketplace metadata                                        |

## Repository

Published from the [Codecademy/gamut](https://github.com/Codecademy/gamut) monorepo. Versioning and release are handled in CI like other `@codecademy/*` packages in this repo.
