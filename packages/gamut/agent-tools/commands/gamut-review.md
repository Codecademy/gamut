---
description: Use this command when auditing existing code for Gamut usage — dependencies, GamutProvider, deep imports, hardcoded hex colors, and test patterns — and you need a consolidated report with pointers to the matching Gamut skills.
argument-hint: [path]
allowed-tools: Read Glob Grep
---

This is an audit of **existing code** at **`$ARGUMENTS`** (default: current working directory). Your job is to find violations and misuse, not to generate new code.

Use `DESIGN.md` at the project root as the authoritative reference for the product's design intent, token names, and component patterns. This file is distributed as `DESIGN.Codecademy.md` or `DESIGN.Percipio.md` from the `@codecademy/gamut` agent-tools package and renamed to `DESIGN.md` by the consuming project. When a finding maps to a skill, note it in the report so the developer knows where to get remediation guidance.

Run all five checks below, then print a single consolidated report using the format at the end of this file.

---

## Check 1 — Dependencies

Read `package.json` (and `package.json` in `$ARGUMENTS` if a path was given). Inspect `dependencies`, `devDependencies`, and `peerDependencies` combined.

| Package                    | Expectation                                             |
| -------------------------- | ------------------------------------------------------- |
| `@codecademy/gamut`        | **Required** — core component library                   |
| `@codecademy/gamut-styles` | Recommended — design tokens and theme primitives        |
| `@codecademy/variance`     | Recommended — style-prop system used by Gamut internals |

---

## Check 2 — Setup

Search source files (`.ts`, `.tsx`, `.js`, `.jsx`) for these symbols. Skip `node_modules`, `dist`, `.next`, `build`, `.turbo`.

| Symbol          | Expectation                                                         |
| --------------- | ------------------------------------------------------------------- |
| `GamutProvider` | **Required** — must appear at least once (app root wrapper)         |
| `ColorMode`     | Recommended — enables semantic light/dark theming                   |
| `Background`    | Recommended — semantic surface color via `@codecademy/gamut-styles` |

For each found symbol report the first file path where it appears.

---

## Check 3 — Import patterns

Grep source files for any of these patterns. Each match is an error.

| Pattern                         | Reason                                                                  |
| ------------------------------- | ----------------------------------------------------------------------- |
| `@codecademy/gamut/dist/`       | Deep dist import — bypasses public API and breaks on internal refactors |
| `@codecademy/gamut/src/`        | Deep src import — not part of the published package                     |
| `@codecademy/gamut-styles/src/` | Deep src import — use the package root                                  |
| `@codecademy/variance/src/`     | Deep src import — use the package root                                  |

Report each violation as `file:line`.

---

## Check 4 — Hardcoded colors (semantic-first)

**Rule:** Inline hex literals in application UI code are violations. Remediation is **not** “replace hex with `navy-800`” — prefer **semantic ColorMode tokens** (`text`, `background`, `primary`, …) so light/dark and theme switches stay correct. Reserve **raw palette tokens** for colors that must stay fixed and for **`bg` on `<Background>`** from `@codecademy/gamut-styles` (section surfaces with content).

Align findings with project docs and Storybook:

- [@codecademy/gamut agent-tools `guidelines/foundations/color.md`](https://github.com/Codecademy/gamut/blob/main/packages/gamut/agent-tools/guidelines/foundations/color.md) — decision guide and semantic tables.
- [Foundations / ColorMode](https://gamut.codecademy.com/?path=/docs-foundations-colormode--page) — aliases per mode; `<Background>` behavior.
- [Meta / Best practices](https://gamut.codecademy.com/?path=/docs-meta-best-practices--page) — semantic colors + `css` / `variant` / `states` from `gamut-styles`.
- Foundations / Theme stories (Core, Admin, Platform, Percipio, LX Studio) — verify hex ↔ semantic if the product is not Codecademy Core.

**Theme context:** Infer from `GamutProvider` / app config / root `DESIGN.md` (from `DESIGN.Codecademy.md`, `DESIGN.Percipio.md`, or `DESIGN.LXStudio.md`). If unknown, **assume Codecademy Core** semantics below and add a report note to confirm against the correct theme Storybook page.

**Discovery:** Grep source files (`.ts`, `.tsx`, `.js`, `.jsx`, `.css`, `.scss`, `.less`) for inline hex literals (`#RGB` or `#RRGGBB`). Comparison is case-insensitive. Skip `node_modules`, `dist`, `.next`, `build`, `.turbo` (same spirit as other checks).

### Workflow (each hex match)

1. **Context** — Inspect the surrounding line(s): CSS property (`color`, `background`, `border-color`, …), JSX prop (`color`, `bg`, `borderColor`, SVG fill), or asset. Note whether the subtree is a **section with content** (candidate for `<Background>` + palette `bg`) vs component chrome (prefer semantics).
2. **Identify palette** — Normalize hex (case-insensitive); map to a Gamut palette name using **Appendix A** below. If missing from the appendix, match against `DESIGN.md` / `packages/gamut-styles` palette definitions.
3. **Recommend semantic first** — Use **Appendix B** (Core **light** literals from `color.md`) plus role:
   - Body / UI foreground → `text`; strong emphasis → `text-accent`.
   - Page or card fill → `background` / `background-primary` / state surfaces (`background-success`, `background-warning`, `background-error`).
   - CTAs, links, hyper accents → `primary` (+ `primary-hover` on hover); toggles / checkboxes → `interface`.
   - Ghost / secondary buttons → `secondary`.
   - Destructive → `danger` / `danger-hover`.
   - Dividers / outlines → `border-primary` / `border-secondary` / `border-tertiary`.
   - Inline feedback copy → `feedback-error` / `feedback-success` / `feedback-warning`.
   - **Disambiguation:** `#FFD300` — warning copy → `feedback-warning`; yellow accent on top of primary-colored surfaces → `primary-inverse`.
   - Same hex can map to multiple semantics (e.g. `#10162F` → `text` vs `border-primary` vs `secondary`): pick from **property + component role**.
4. **When palette-only is OK** — **`bg` prop on `<Background>`** (`<Background bg="hyper">`, etc.) is the primary place for **fixed surface** palette colors on sections (see `color.md` decision guide + ColorMode docs). After replacing hex there, use a **named palette token**, not hex. **Exceptions** (flag with rationale): charts/data viz, third-party widgets, exported static illustrations — still prefer tokens over hex when feasible.

**Severity:** Hex on adaptive UI (random wrappers, `styled-components`, inline `style`) → **error**. Hex inside documented exceptions → **warning** with note.

**Reporting:** For each match outside token definition files:

`file:line  'HEX'  →  semantic: <token(s)> | palette: <token> | note: <theme/disambiguation>`

Use `semantic: (n/a)` only when no semantic applies (e.g. pure illustration); still give `palette: …`. If unmappable: `→  no Gamut token`.

Ignore hex inside design token definition files (e.g. `variables/colors.ts`, `_colors.scss`) — source of truth, not violations.

### Appendix B — Core light: hex → suggested semantic (shortcut)

Use with step 3; verify for non-Core themes. Opacity variants in `color.md` are not listed here — keep using the named semantic token.

| Hex (normalized) | Typical semantic direction                                                                                               |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `#10162f`        | `text`, `border-primary`, or `secondary` (by role)                                                                       |
| `#0a0d1c`        | `text-accent`                                                                                                            |
| `#ffffff`        | `background` (fills), `secondary` (inverse ghost on dark — rare in light-only grep context)                              |
| `#fff0e5`        | `background-primary`                                                                                                     |
| `#f5ffe3`        | `background-success`                                                                                                     |
| `#fffae5`        | `background-warning`                                                                                                     |
| `#fbf1f0`        | `background-error`                                                                                                       |
| `#3a10e5`        | `primary`, `interface` (controls vs marketing CTA — prefer `primary` for links/buttons)                                  |
| `#5533ff`        | `primary-hover`, `interface-hover`                                                                                       |
| `#ffd300`        | `feedback-warning` or `primary-inverse` (see disambiguation above)                                                       |
| `#cca900`        | Often pairs with hover in dark mode; in light UI as literal hex → check palette appendix (`yellow-400`) then assign role |
| `#e91c11`        | `danger`                                                                                                                 |
| `#be1809`        | `danger-hover`, `feedback-error`                                                                                         |
| `#008a27`        | `feedback-success`                                                                                                       |

Hexes with **no row above** still get **Appendix A** palette id + role-based semantic guess (e.g. blue scale → often decorative or legacy marketing; prefer design review unless mapping clearly to `primary`).

### Appendix A — Hex → palette token (identification only)

Case-insensitive. Use to label `palette:` in the report; **do not** stop at this step without Appendix B / role triage.

| Hex       | Token                      |
| --------- | -------------------------- |
| `#000000` | `black`                    |
| `#ffffff` | `white`                    |
| `#10162f` | `navy` / `navy-800`        |
| `#0a0d1c` | `navy-900`                 |
| `#fff0e5` | `beige-100`                |
| `#f5fcff` | `blue-0`                   |
| `#d3f2ff` | `blue-100`                 |
| `#66c4ff` | `blue-300`                 |
| `#3388ff` | `blue-400`                 |
| `#1557ff` | `blue-500`                 |
| `#1d2340` | `blue-800`                 |
| `#f5ffe3` | `green-0`                  |
| `#eafdc6` | `green-100`                |
| `#aee938` | `green-400` / `lightGreen` |
| `#008a27` | `green-700`                |
| `#151c07` | `green-900`                |
| `#fffae5` | `yellow-0`                 |
| `#cca900` | `yellow-400`               |
| `#ffd300` | `yellow-500` / `yellow`    |
| `#211b00` | `yellow-900`               |
| `#fff5ff` | `pink-0`                   |
| `#f966ff` | `pink-400` / `pink`        |
| `#fbf1f0` | `red-0`                    |
| `#e85d7f` | `red-300`                  |
| `#dc5879` | `red-400` / `paleRed`      |
| `#e91c11` | `red-500` / `red`          |
| `#be1809` | `red-600`                  |
| `#280503` | `red-900`                  |
| `#ffe8cc` | `orange-100`               |
| `#ff8c00` | `orange-500` / `orange`    |
| `#5533ff` | `hyper-400`                |
| `#3a10e5` | `hyper-500` / `hyper`      |
| `#f5f5f5` | `gray-100`                 |
| `#eeeeee` | `gray-200`                 |
| `#e0e0e0` | `gray-300`                 |
| `#9e9e9e` | `gray-600`                 |
| `#616161` | `gray-800`                 |
| `#424242` | `gray-900`                 |
| `#fffbf8` | `beige-0`                  |
| `#8a7300` | `gold-800` / `gold`        |
| `#d14900` | `orange-800`               |
| `#ca00d1` | `pink-800`                 |
| `#006d82` | `teal-500` / `teal`        |
| `#b3ccff` | `purple-300` / `purple`    |

---

## Check 5 — Test setup

Grep test files (`**/__tests__/**/*.{ts,tsx}`, `**/*.test.{ts,tsx}`, `**/*.spec.{ts,tsx}`) for these patterns. Skip `node_modules`, `dist`.

| Pattern                                               | Verdict                               | Reason                                                                                                                                                                                                                                                  |
| ----------------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `jest.mock\(.*@codecademy/gamut`                      | **Error**                             | Manual mocking bypasses theme context and produces false-positive tests; prefer **`setupRtl`** from `@codecademy/gamut-tests` (or a harness + **`setupRtl`**); use raw **`MockGamutProvider`** + **`render`** only for rare one-offs or Storybook mocks |
| `jest.mock\(.*@codecademy/gamut-styles`               | **Error**                             | Same issue as above — mocking gamut-styles breaks token resolution                                                                                                                                                                                      |
| `from '@codecademy/gamut-tests'`                      | Good — report count of files using it | Correct import for `setupRtl` and `MockGamutProvider`                                                                                                                                                                                                   |
| `from 'component-test-setup'` (without gamut-tests)   | **Warning**                           | Should import `setupRtl` from `@codecademy/gamut-tests`, not directly from `component-test-setup` — the gamut-tests wrapper adds `MockGamutProvider` automatically                                                                                      |
| `new GamutProvider` or `<GamutProvider` in test files | **Warning**                           | Prefer **`setupRtl`**; use **`MockGamutProvider`** (sets `useCache={false}`, `useGlobals={false}`) in harnesses or stories, not **`GamutProvider`** directly                                                                                            |

Skill reference for remediation: `gamut-testing`

---

## Output format

```
Gamut Review — <absolute path>
══════════════════════════════════════════════════

Dependencies
  ✓  @codecademy/gamut            <version>
  ⚠  @codecademy/gamut-styles     not found — recommended
  ✗  @codecademy/variance         not found — recommended

Setup
  ✓  GamutProvider   found (src/App.tsx)
  ⚠  ColorMode       not found — use ColorMode for light/dark theming  [→ gamut-color-mode]
  ⚠  Background      not found — use <Background> for semantic surfaces  [→ gamut-color-mode]

Import patterns
  ✓  Deep dist imports         none found
  ✗  Deep src imports          2 occurrences
       src/Thing.tsx:7
       src/Other.tsx:12

Hardcoded colors                                                         [→ gamut-color-mode]
  ✗  src/Card.tsx:22   '#10162F'  →  semantic: text | palette: navy-800 | note: Core light body copy
  ⚠  src/Hero.tsx:14   '#1557FF'  →  semantic: primary (if link/CTA) | palette: blue-500 | note: no exact semantic; confirm theme
  ⚠  src/Nav.tsx:8     '#BADA55'  →  semantic: (n/a) | palette: — | note: no Gamut token

Test setup                                                               [→ gamut-testing]
  ✓  @codecademy/gamut-tests   used in 12 test files
  ✗  jest.mock(@codecademy/gamut)   2 occurrences — remove; prefer setupRtl (or harness + setupRtl)
       src/components/Foo/__tests__/Foo.test.tsx:3
       src/components/Bar/__tests__/Bar.test.tsx:5
  ⚠  direct component-test-setup import   1 occurrence — import from @codecademy/gamut-tests
       src/components/Baz/__tests__/Baz.test.tsx:2

══════════════════════════════════════════════════
<N> error(s), <N> warning(s) found.   (or "All checks passed." if none)
```

Icons: `✓` = pass, `⚠` = warning (recommended, not required), `✗` = error (required).
`[→ skill-name]` annotations indicate which Gamut skill has remediation guidance for that category.

After printing the report, offer one sentence of prioritized next-step advice based on what was found.
