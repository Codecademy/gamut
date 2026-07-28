Gamut Review — /Users/kenny.lin/Documents/eng/codecademy-eng/gamut/packages/gamut/agent-tools/skills/gamut-review-workspace/iteration-1/eval-audit-hero-section/fixture/HeroSection.tsx
══════════════════════════════════════════════════

Scope note: this is a single standalone file (plus its sibling `HeroSection.scss`), not a full project. Checks that require project-level context are not applicable and were skipped:

- Check 0 (DESIGN.md) — no project root to resolve
- Check 1 (Dependencies) — no package.json
- Check 2 (Setup: GamutProvider/ColorMode/Background/theme augmentation) — needs whole-app wiring
- Check 5 (Test setup) — no test files in scope

Import patterns
✓ Deep dist imports none found
✓ Deep src imports none found
(`import { Box } from '@codecademy/gamut'` is the public package root — compliant)

SCSS modules, className & inline style [→ gamut-system-props] [→ gamut-style-utilities] [→ gamut-color-mode]
✗ SCSS/CSS imports 1 file — migrate to system props and css()/variant()
packages/gamut/agent-tools/skills/gamut-review-workspace/iteration-1/eval-audit-hero-section/fixture/HeroSection.scss
(not a third-party vendor sheet or a global reset/shell file — this is a component-scoped stylesheet and should be migrated/deleted)
✗ className on Gamut components 1 occurrence
HeroSection.tsx:6 <Box className="hero-wrapper" ...>
(not an integration seam — `hero-wrapper` maps directly to the padding rule in HeroSection.scss, i.e. pure styling)
✗ inline style on Gamut components 1 occurrence — use system props or css()/variant()/states() with semantic tokens
HeroSection.tsx:6 <Box style={{ color: '#10162F' }}>
(no eslint-disable comment found above or on this line)

Nested selectors [→ gamut-system-props] [→ gamut-style-utilities]
✓ none found
(HeroSection.scss contains only a single flat class rule `.hero-wrapper { padding: 32px; }`; HeroSection.tsx has no styled-component/Emotion template literals to scan)

styled(GamutComponent) bypassing system props [→ gamut-system-props] [→ gamut-style-utilities]
✓ none found
(no `styled()` usage in this file)

Hardcoded colors [→ gamut-color-mode]
✗ HeroSection.tsx:6 '#10162F' → semantic: text | palette: navy / navy-800 | note: used as `color` on inline `style` for body copy inside `<Box>` — Core light convention maps this hex to `text` (body foreground); confirm against theme if not Codecademy Core
✓ Non-Gamut CSS vars none found in HeroSection.scss (no `var(--...)` usage)

Bespoke component duplication (heuristic — confirm manually) [→ gamut-component-first]
✓ none found
(plain `<h1>` inside `<Box>`; no ARIA roles, no dismiss/focus-trap logic, no component-name-matched files)

══════════════════════════════════════════════════
3 error(s), 0 warning(s) found.

Notes:

- All three findings are entangled in a single line (HeroSection.tsx:6): the SCSS import, the `className`, and the inline `style` together implement what a single `<Box>` system-prop call should do directly — e.g. `<Box p={32} color="text"><h1>Welcome to the platform</h1></Box>`, after which `HeroSection.scss` can be deleted and the `import './HeroSection.scss'` removed.
- The `<h1>` is plain HTML with no styling applied to it directly; once the wrapper migrates to props, consider whether heading typography should go through Gamut's `Typography`/`Text` component instead of a bare `<h1>`, though this wasn't flagged as a hard violation since no check in this skill targets bare heading tags outside of nested-selector CSS context.
