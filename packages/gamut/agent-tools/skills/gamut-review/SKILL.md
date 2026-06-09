---
name: gamut-review
description: Use this skill when auditing existing code for Gamut usage — dependencies, GamutProvider, deep imports, SCSS modules, className on Gamut components, nested selectors, hardcoded hex colors, non-Gamut CSS variables, and test patterns — and you need a consolidated report with pointers to matching Gamut skills.
---

# Gamut Review

Audit existing code at the path the user provides (default: current working directory). Find violations and misuse; do not generate new code.

When `DESIGN.md` is present at the audit root, use it as the authoritative reference for product design intent, token names, and component patterns. It is copied from `DESIGN.Codecademy.md`, `DESIGN.Percipio.md`, or `DESIGN.LXStudio.md` in `@codecademy/gamut` agent-tools (via `gamut plugin install --theme <name>`). When a finding maps to a skill, note it in the report so the developer knows where to get remediation guidance.

Run Check 0 first, then Checks 1–5, then print a single consolidated report using the format at the end of this file.

Remediation skills: [`gamut-theming`](../gamut-theming/SKILL.md) · [`gamut-color-mode`](../gamut-color-mode/SKILL.md) · [`gamut-system-props`](../gamut-system-props/SKILL.md) · [`gamut-style-utilities`](../gamut-style-utilities/SKILL.md) · [`gamut-typography`](../gamut-typography/SKILL.md) · [`gamut-testing`](../gamut-testing/SKILL.md)

---

## Check 0 — DESIGN.md present

Resolve the audit root from the user's path if provided, otherwise the current working directory. Look for `DESIGN.md` at that root (not inside `node_modules` or package subfolders unless the audit path is explicitly that folder).

| Result  | Action                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Found   | Report `✓ DESIGN.md present (<path>)`. Proceed with Checks 1–5 using this file for product/theme context.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Missing | Report `✗ DESIGN.md not found` as a blocking finding. Include remediation: from the repo root run `gamut plugin install cursor --theme core` (or `percipio`, `lxstudio`, `admin`, `platform`; also `claude`), or manually copy the matching `DESIGN.*.md` from `@codecademy/gamut` agent-tools and rename to `DESIGN.md`. Still run Checks 1–3 and 5. For Check 4, list hex violations with `palette:` / `semantic:` only where Appendix A/B apply without product YAML — prefix the Hardcoded colors section with `⚠ low confidence — no DESIGN.md` and do not assume Codecademy Core semantics; do not use Appendix B shortcuts as authoritative. |

---

## Check 1 — Dependencies

Read `package.json` at the audit root. Inspect `dependencies`, `devDependencies`, and `peerDependencies` combined.

| Package                    | Expectation                                                                                                                                                                                                                                                                                                                                                                                                      |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@codecademy/gamut`        | Required — core component library                                                                                                                                                                                                                                                                                                                                                                                |
| `@codecademy/gamut-styles` | Recommended — design tokens and theme primitives                                                                                                                                                                                                                                                                                                                                                                 |
| `@codecademy/variance`     | Recommended — style-prop system used by Gamut internals                                                                                                                                                                                                                                                                                                                                                          |
| `@codecademy/gamut-kit`    | Acceptable alternative meta-package — re-exports `@codecademy/gamut`, `@codecademy/gamut-styles`, `@codecademy/variance`, and more. Treat its presence as satisfying the three rows above; do not separately flag those packages as missing. **Caveat:** requires npm or yarn with `nodeLinker: node-modules`; not compatible with yarn Plug'n'Play. Flag as ⚠ warning if `.yarnrc.yml` shows `nodeLinker: pnp`. |

---

## Check 2 — Setup

First detect whether the project uses TypeScript by checking for `tsconfig.json` at the audit root or `typescript` in `package.json` `dependencies`/`devDependencies`. Use this to set severity for the Theme augmentation row below.

Search source files (`.ts`, `.tsx`, `.js`, `.jsx`) for these symbols. Skip `node_modules`, `dist`, `.next`, `build`, `.turbo`.

| Symbol                            | Expectation                                                                                                                                                                                                                                                                                                                             |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GamutProvider`                   | Required — must appear at least once (app root wrapper)                                                                                                                                                                                                                                                                                 |
| `ColorMode`                       | Recommended — enables semantic light/dark theming                                                                                                                                                                                                                                                                                       |
| `Background`                      | Recommended — semantic surface color via `@codecademy/gamut-styles`                                                                                                                                                                                                                                                                     |
| `declare module '@emotion/react'` | **Required if TypeScript** — `Theme` must be augmented with the active theme type (e.g. `CoreTheme`) so scale props type-check correctly; grep `.d.ts` and `.ts`/`.tsx` source files for this string. **Recommended if not TypeScript** — note that adopting TypeScript is recommended and that `theme.d.ts` will be needed when it is. |

For each found symbol report the first file path where it appears.

**Conditional — `StyleProps` with `states()`/`variant()`**: If source files contain `states(` or `variant(` from `@codecademy/gamut-styles`, check whether component prop interfaces use `StyleProps<typeof ...>` from `@codecademy/variance`. When `states()`/`variant()` are present but `StyleProps` is absent from associated component interfaces, report as ⚠ warning: `StyleProps not used — state/variant props may be untyped`. Remediation: `import { StyleProps } from '@codecademy/variance'` and add `extends StyleProps<typeof myStates>` to the component interface. Skill reference: [`gamut-style-utilities`](../gamut-style-utilities/SKILL.md).

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

## Check 3b — SCSS/CSS module imports and className on Gamut components

Gamut components are styled via the variance system (system props, `css()`, `variant()`, `states()` from `@codecademy/gamut-styles`). Importing SCSS/CSS modules and passing `className` to Gamut components bypasses this system entirely, breaks ColorMode token propagation, and prevents system props from composing correctly.

**Step 1 — SCSS/CSS module imports**

Grep source files (`.ts`, `.tsx`, `.js`, `.jsx`) for:

```
import .* from '.*\.(scss|css)'
```

Skip `node_modules`, `dist`. Each match is an error unless:

- The import targets a third-party stylesheet (e.g. a carousel or date-picker vendor sheet that cannot be replaced) — flag as ⚠ warning with note "third-party vendor styles".
- The file is a global reset or application shell (not a component) — flag as ⚠ warning.

Report the count and list of files. If there are more than 5 files, group by directory and report totals rather than listing every file.

**Step 2 — className on Gamut components**

Grep source files for `className=` appearing on any of the core Gamut component names in the same JSX element opening tag. The known Gamut components to check:

```
Box, FlexBox, Column, LayoutGrid, GridBox, Card, Text, Anchor,
FillButton, StrokeButton, TextButton, CTAButton, IconButton, Toggle,
List, ListRow, ListCol, Background, Disclosure
```

Pattern (grep, case-sensitive):

```
<(Box|FlexBox|Column|LayoutGrid|GridBox|Card|Text|Anchor|FillButton|StrokeButton|TextButton|CTAButton|IconButton|Toggle|List|ListRow|ListCol|Background|Disclosure)\b[^>]*\bclassName=
```

Each match is an error. Report as `file:line  <ComponentName className={...}>`.

Severity note: `className` is not always forbidden — some Gamut components accept it for integration with third-party tools (e.g. passing a class to an external drag-and-drop library). Downgrade to ⚠ warning only when the usage is clearly an integration seam, not styling.

Remediation: replace SCSS module rules with system props directly on the Gamut component — use semantic ColorMode tokens as values (`color="text"`, `bg="background"`, `borderColor="border-primary"`, etc.) rather than hardcoded hex or palette names; use `css()`, `variant()`, or `states()` from `@codecademy/gamut-styles` (with `styled` from `@emotion/styled`) for styles not expressible as system props; delete the SCSS file when all rules are migrated.

Skill references: [`gamut-system-props`](../gamut-system-props/SKILL.md) · [`gamut-style-utilities`](../gamut-style-utilities/SKILL.md) · [`gamut-color-mode`](../gamut-color-mode/SKILL.md)

---

## Check 3c — Nested selectors

Nested selectors inside styled-component or Emotion template literals cause hard-to-isolate side effects and make consistent updates difficult. The [Gamut Best Practices](https://gamut.codecademy.com/?path=/docs-meta-best-practices--page) page flags two kinds as "at your own risk": tag selectors and Gamut component selectors.

**Step 1 — Tag selectors**

Grep source files (`.ts`, `.tsx`, `.js`, `.jsx`) for bare HTML tag names appearing as CSS selector lines inside styled-component or Emotion template literals. Skip `node_modules`, `dist`, `.next`, `build`, `.turbo`.

- Pattern A (named tags):
  ```
  ^\s*(div|span|p|ul|li|ol|a|img|h[1-6]|table|thead|tbody|tr|td|th|form|section|header|footer|nav|main)\s*\{
  ```
- Pattern B (universal selector):
  ```
  ^\s*\*\s*\{
  ```
  False-positive risk: `*` appears in JSDoc comment bodies (` * {`). Post-filter matches where the line is a comment (starts with `//` or matches `\s*\*\s`). For remaining matches, verify context before marking as a violation.

Do NOT include SVG primitive tag names (`path`, `rect`, `circle`, `line`, `polyline`, `svg`) — styled SVG primitives in icon and form components are normal and not the target of this rule.

Exemptions (downgrade to `ℹ note`, not warning):

- Files that import `Global` from `@emotion/react` — intentional global reset/injection stylesheets.
- Files whose name matches `*reboot*`, `*reset*`, `*global*`, or `*base-styles*`.

**Step 2 — Gamut component selectors**

Grep source files for a Gamut component name appearing as a CSS selector (i.e., followed by a rule block) inside a template literal:

```
\$\{(Box|FlexBox|GridBox|Column|LayoutGrid|Card|Text|Anchor|FillButton|StrokeButton|TextButton|CTAButton|IconButton|Toggle|List|ListRow|ListCol|Background|Disclosure)\}[^{]*\{
```

Each match means the component is being targeted as a child CSS selector from a parent styled wrapper rather than styled directly. Report as `file:line  ${ComponentName} { ... }`.

Severity note: `&:pseudo ${ComponentName}` (pseudo-class combinator preceding the interpolation) is lower risk — downgrade those to ⚠ warning with a note to verify scope. Bare `${ComponentName} { }` selector blocks are the primary target.

**Severity:** ⚠ warning for all matches (per Best Practices: "you may still do so, but at your own risk").

**Remediation:** For tag-selector violations, replace the nested wrapper with a Gamut layout component (`FlexBox`, `GridBox`) and move styles to system props on each child. For Gamut component selector violations, pass system props directly to the component (`alignSelf`, `mt`, etc.) rather than targeting it from a parent wrapper. Where dynamic behavior spans multiple children, prefer `css()` with `variant()` or `states()` keyed to data attributes or boolean props on the parent.

Skill references: [`gamut-system-props`](../gamut-system-props/SKILL.md) · [`gamut-style-utilities`](../gamut-style-utilities/SKILL.md)

---

## Check 4 — Hardcoded colors (semantic-first)

Rule: Inline hex literals in application UI code are violations. Remediation is not “replace hex with `navy-800`” — prefer semantic ColorMode tokens (`text`, `background`, `primary`, …) so light/dark and theme switches stay correct. Reserve raw palette tokens for colors that must stay fixed and for `bg` on `<Background>` from `@codecademy/gamut-styles` (section surfaces with content).

Align findings with project docs and Storybook:

- [`gamut-color-mode`](../gamut-color-mode/SKILL.md) skill — semantic alias tables and decision guide.
- [Foundations / ColorMode](https://gamut.codecademy.com/?path=/docs-foundations-colormode--page) — aliases per mode; `<Background>` behavior.
- [Meta / Best practices](https://gamut.codecademy.com/?path=/docs-meta-best-practices--page) — semantic colors + `css` / `variant` / `states` from `gamut-styles`.
- Foundations / Theme stories (Core, Admin, Platform, Percipio, LX Studio) — verify hex ↔ semantic if the product is not Codecademy Core.

Theme context: If Check 0 passed, infer product/theme from root `DESIGN.md` and `GamutProvider` / app config. If Check 0 failed, follow the low-confidence rules in Check 0 — do not assume Codecademy Core semantics. If `DESIGN.md` exists but theme is still unclear, add a report note to confirm against the correct theme Storybook page.

Discovery: Grep source files (`.ts`, `.tsx`, `.js`, `.jsx`, `.css`, `.scss`, `.less`) for inline hex literals (`#RGB` or `#RRGGBB`). Comparison is case-insensitive. Skip `node_modules`, `dist`, `.next`, `build`, `.turbo` (same spirit as other checks).

### Workflow (each hex match)

1. Context — Inspect the surrounding line(s): CSS property (`color`, `background`, `border-color`, …), JSX prop (`color`, `bg`, `borderColor`, SVG fill), or asset. Note whether the subtree is a section with content (candidate for `<Background>` + palette `bg`) vs component chrome (prefer semantics).
2. Identify palette — Normalize hex (case-insensitive); map to a Gamut palette name using Appendix A below. If missing from the appendix, match against `DESIGN.md` / `packages/gamut-styles` palette definitions.
3. Recommend semantic first — Use Appendix B (Core light literals) plus role:
   - Body / UI foreground → `text`; strong emphasis → `text-accent`.
   - Page or card fill → `background` / `background-primary` / state surfaces (`background-success`, `background-warning`, `background-error`).
   - CTAs, links, hyper accents → `primary` (+ `primary-hover` on hover).
   - Ghost / secondary buttons → `secondary`.
   - Destructive → `danger` / `danger-hover`.
   - Dividers / outlines → `border-primary` / `border-secondary` / `border-tertiary`.
   - Inline feedback copy → `feedback-error` / `feedback-success` / `feedback-warning`.
   - Disambiguation: `#FFD300` — warning copy → `feedback-warning`; yellow accent on top of primary-colored surfaces → `primary-inverse`.
   - Same hex can map to multiple semantics (e.g. `#10162F` → `text` vs `border-primary` vs `secondary`): pick from property + component role.
4. When palette-only is OK — `bg` prop on `<Background>` (`<Background bg="hyper">`, etc.) is the primary place for fixed surface palette colors on sections. After replacing hex there, use a named palette token, not hex. Exceptions (flag with rationale): charts/data viz, third-party widgets, exported static illustrations — still prefer tokens over hex when feasible.

Severity: Hex on adaptive UI (random wrappers, `styled-components`, inline `style`) → error. Hex inside documented exceptions → warning with note.

Reporting: For each match outside token definition files:

`file:line  'HEX'  →  semantic: <token(s)> | palette: <token> | note: <theme/disambiguation>`

Use `semantic: (n/a)` only when no semantic applies (e.g. pure illustration); still give `palette: …`. If unmappable: `→  no Gamut token`.

Ignore hex inside design token definition files (e.g. `variables/colors.ts`, `_colors.scss`) — source of truth, not violations.

### Appendix B — Core light: hex → suggested semantic (shortcut)

Use with step 3; verify for non-Core themes.

| Hex (normalized) | Typical semantic direction                                                                                               |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `#10162f`        | `text`, `border-primary`, or `secondary` (by role)                                                                       |
| `#0a0d1c`        | `text-accent`                                                                                                            |
| `#ffffff`        | `background` (fills), `secondary` (inverse ghost on dark — rare in light-only grep context)                              |
| `#fff0e5`        | `background-primary`                                                                                                     |
| `#f5ffe3`        | `background-success`                                                                                                     |
| `#fffae5`        | `background-warning`                                                                                                     |
| `#fbf1f0`        | `background-error`                                                                                                       |
| `#3a10e5`        | `primary`                                                                                                                |
| `#5533ff`        | `primary-hover`                                                                                                          |
| `#ffd300`        | `feedback-warning` or `primary-inverse` (see disambiguation above)                                                       |
| `#cca900`        | Often pairs with hover in dark mode; in light UI as literal hex → check palette appendix (`yellow-400`) then assign role |
| `#e91c11`        | `danger`                                                                                                                 |
| `#be1809`        | `danger-hover`, `feedback-error`                                                                                         |
| `#008a27`        | `feedback-success`                                                                                                       |

Hexes with no row above still get Appendix A palette id + role-based semantic guess (e.g. blue scale → often decorative or legacy marketing; prefer design review unless mapping clearly to `primary`).

### Appendix A — Hex → palette token (identification only)

Case-insensitive. Use to label `palette:` in the report; do not stop at this step without Appendix B / role triage.

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

### Step 2 — Non-Gamut CSS custom properties (SCSS/CSS/Less files)

After the hex scan, grep `.scss`, `.css`, and `.less` files for `var(--` occurrences. For each custom property name found, classify it:

_Gamut-issued variables_ — skip these:

- `--color-*` (ColorMode semantic aliases)
- `--space*` (spacing scale)
- `--font*` (font-size scale)
- `--lineHeight*` (line-height scale)
- `--borderWidth*` (border-width tokens)
- `--fontFamily*` (font-family tokens)
- `--fontWeight*` (font-weight tokens)

_Non-Gamut variables_ — flag these:
Any other name — especially camel-cased semantic names like `--darkNeutralColor`, `--whiteColor`, `--lightPrimaryColor`, `--colorNavy800`, `--borderGreyColor` — indicates a parallel token system (Skillsoft/Percipio globals, legacy design tokens, or ad-hoc project variables). These variables are NOT set by `GamutProvider`/`ColorMode` and will be undefined inside a Gamut-scoped tree unless the host shell also loads them.

Severity: ✗ error for color-semantic variables (invisible in tests/Storybook without the host stylesheet); ⚠ warning for spacing/sizing variables that duplicate Gamut scale tokens.

Reporting: count unique non-Gamut variable names and list the top offenders with frequency. Do not enumerate every call-site — just the variable names and usage counts. Suggest the nearest Gamut semantic alias where obvious (e.g. `--darkNeutralColor` → `--color-text`, `--whiteColor` → `--color-background`).

---

## Check 5 — Test setup

Grep test files (`**/__tests__/**/*.{ts,tsx}`, `**/*.test.{ts,tsx}`, `**/*.spec.{ts,tsx}`) for these patterns. Skip `node_modules`, `dist`.

| Pattern                                               | Verdict                               | Reason                                                                                                                                                                                                                                  |
| ----------------------------------------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `jest.mock\(.*@codecademy/gamut`                      | Error                                 | Manual mocking bypasses theme context and produces false-positive tests; prefer `setupRtl` from `@codecademy/gamut-tests` (or a harness + `setupRtl`); use raw `MockGamutProvider` + `render` only for rare one-offs or Storybook mocks |
| `jest.mock\(.*@codecademy/gamut-styles`               | Error                                 | Same issue as above — mocking gamut-styles breaks token resolution                                                                                                                                                                      |
| `from '@codecademy/gamut-tests'`                      | Good — report count of files using it | Correct import for `setupRtl` and `MockGamutProvider`                                                                                                                                                                                   |
| `from 'component-test-setup'` (without gamut-tests)   | Warning                               | Should import `setupRtl` from `@codecademy/gamut-tests`, not directly from `component-test-setup` — the gamut-tests wrapper adds `MockGamutProvider` automatically                                                                      |
| `new GamutProvider` or `<GamutProvider` in test files | Warning                               | Prefer `setupRtl`; use `MockGamutProvider` (sets `useCache={false}`, `useGlobals={false}`) in harnesses or stories, not `GamutProvider` directly                                                                                        |
| `jest.mock\(.*[Gg]amut[Pp]rovider`                    | Warning                               | Mocking any file whose path contains `GamutProvider` (including project-internal wrappers) strips Emotion/theme context; prefer `setupRtl` from `@codecademy/gamut-tests`                                                               |

Skill reference for remediation: [`gamut-testing`](../gamut-testing/SKILL.md)

---

## Output format

```
Gamut Review — <absolute path>
══════════════════════════════════════════════════

DESIGN.md
  ✓  present   <path>/DESIGN.md
  ✗  missing   run: gamut plugin install cursor --theme <core|percipio|lxstudio|…>  [blocking for color audit]

Dependencies
  ✓  @codecademy/gamut            <version>
  ⚠  @codecademy/gamut-styles     not found — recommended
  ✗  @codecademy/variance         not found — recommended

Setup
  ✓  GamutProvider   found (src/App.tsx)
  ⚠  ColorMode       not found — use ColorMode for light/dark theming  [→ gamut-color-mode]
  ⚠  Background      not found — use <Background> for semantic surfaces  [→ gamut-color-mode]
  ✗  Theme augmentation   not found — create src/theme.d.ts extending CoreTheme  [→ gamut-theming]
  (⚠ if TypeScript not detected: TypeScript not detected — recommended to adopt TypeScript; add src/theme.d.ts extending CoreTheme when you do  [→ gamut-theming])

Import patterns
  ✓  Deep dist imports         none found
  ✗  Deep src imports          2 occurrences
       src/Thing.tsx:7
       src/Other.tsx:12

SCSS modules & className                             [→ gamut-system-props] [→ gamut-style-utilities]
  ✗  SCSS/CSS imports   14 files — migrate to system props and css()/variant()
       src/components/Card/Card.scss
       src/components/Nav/Nav.scss   (+ 12 more)
  ✗  className on Gamut components   9 occurrences
       src/components/Card/Card.tsx:14   <Box className={styles.wrapper}>
       src/components/Nav/Nav.tsx:7      <Text className={styles.title}>

Nested selectors                                    [→ gamut-system-props] [→ gamut-style-utilities]
  ⚠  Tag selectors   3 occurrences — replace with system props or layout components (FlexBox, GridBox)
       src/components/Nav/Nav.tsx:18   div { ... }
       src/components/Hero/Hero.tsx:9    * { ... }  (verify scope — may be JSDoc false positive)
  ⚠  Gamut component selectors   1 occurrence — use system props directly instead
       src/components/Layout/Layout.tsx:12   ${Box} { align-self: start; }
  (or: ✓  none found)

Hardcoded colors                                                         [→ gamut-color-mode]
  ✗  src/Card.tsx:22   '#10162F'  →  semantic: text | palette: navy-800 | note: Core light body copy
  ⚠  src/Hero.tsx:14   '#1557FF'  →  semantic: primary (if link/CTA) | palette: blue-500 | note: no exact semantic; confirm theme
  ⚠  src/Nav.tsx:8     '#BADA55'  →  semantic: (n/a) | palette: — | note: no Gamut token
  ✗  Non-Gamut CSS vars   --darkNeutralColor (8 uses), --whiteColor (5 uses)  →  --color-text, --color-background

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
