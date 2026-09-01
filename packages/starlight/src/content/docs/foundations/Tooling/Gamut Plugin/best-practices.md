---
title: Best practices
description: How to use Gamut agent tools, DESIGN.md, and the gamut-review skill effectively in app repos.
---

## Recommended setup

From your app repo root, install the plugin with the theme matching your product:

```sh
gamut plugin install cursor --theme core
```

Use `percipio`, `lxstudio`, `admin`, or `platform` when that matches your product. Refresh after upgrading `@codecademy/gamut`:

```sh
gamut plugin update cursor --theme core --force
```

## Which artifact to use when

| Artifact                         | Where it lives                             | Used for                                                                                                   |
| -------------------------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `DESIGN.md` (from `DESIGN.*.md`) | App repo root                              | Coding agents and `gamut-review` — product tokens, semantic roles, patterns.                               |
| `skills/`                        | Cursor/Claude after `gamut plugin install` | Task playbooks — invoke for focused work (theming, ColorMode, buttons, layout, forms, auditing, and more). |
| `rules/`                         | Cursor/Claude after install                | Always-on guardrails for Gamut code, like accessibility.                                                   |

## Audit with gamut-review

Before large PRs, or when onboarding an existing codebase, run the `gamut-review` skill. It checks for `DESIGN.md`, Gamut dependencies, `GamutProvider`, import patterns, hardcoded hex colors, and test conventions. Without `DESIGN.md` at the repo root, its color findings are lower-confidence — install with `--theme`, or copy the matching `DESIGN.*.md` manually.

## Agent skills

### Exported skills

Installed into app repos via `gamut plugin install`, from [`packages/gamut/agent-tools/skills/`](https://github.com/Codecademy/gamut/tree/main/packages/gamut/agent-tools/skills/):

- `gamut-review` — codebase audit playbook, including `styled()` wrappers that bypass system props and bespoke components that duplicate existing ones.
- `gamut-component-first` — check for an existing Gamut component before building bespoke UI; the proactive counterpart to `gamut-review`.
- `gamut-theming` — theme selection, `GamutProvider`, `theme.d.ts`.
- `gamut-color-mode` — ColorMode and semantic color.
- `gamut-buttons` — button atoms, variants, disabled patterns.
- `gamut-modal` — Modal/Dialog composition, dismiss and focus-trap behavior.
- `gamut-z-index` — the z-index scale and stacking order across floating/portalled components.
- `gamut-list` — List, ListRow, ListCol primitives for custom layouts.
- `gamut-menu` — Menu, MenuItem, MenuSeparator for action, navigation, and floating menus.
- `gamut-datatable` — DataTable for sortable/filterable bulk data comparison.
- `gamut-datalist` — DataList for item management with expansion and selection.
- `gamut-select-dropdown` — SelectDropdown single/multi modes, controlled value, and FormGroup wiring.
- `gamut-layout` — spacing scale, breakpoints, page grid.
- `gamut-system-props` — `system.*`/`Box`.
- `gamut-style-utilities` — `css`, `variant`, `states`.
- `gamut-typography`, `gamut-forms`, `gamut-accessibility`, `gamut-testing`.

### Contributor-only skills

Available only in the Gamut repo itself, never exported — read natively from [`.claude/skills/`](https://github.com/Codecademy/gamut/tree/main/.claude/skills/) by Claude Code, and by Cursor via its Claude-compatibility path.

- `gamut-create-skill` — blueprint playbook for authoring a new Gamut agent skill from scratch.

## Design-to-code (Figma MCP)

MCP-generated code is experimental — always validate and adapt it before shipping. See [Figma MCP](/foundations/tooling/figma/figma-mcp/) for setup and prompting. [Code Connect](/foundations/tooling/figma/code-connect/) improves MCP output when a design uses connected Gamut components.
