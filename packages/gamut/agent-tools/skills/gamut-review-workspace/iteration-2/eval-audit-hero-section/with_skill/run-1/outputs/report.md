Gamut Review — /Users/kenny.lin/Documents/eng/codecademy-eng/gamut/packages/gamut/agent-tools/skills/gamut-review-workspace/iteration-1/eval-audit-hero-section/fixture/HeroSection.tsx
══════════════════════════════════════════════════
Scope note: audit root is a single standalone file (HeroSection.tsx) plus its sibling HeroSection.scss — not a full project. Checks that require project-level artifacts (package.json, project-wide GamutProvider wiring, tsconfig, test suite) are marked N/A rather than pass/fail.

DESIGN.md
✗ missing No DESIGN.md found next to the fixture. Run: gamut plugin install cursor --theme <core|percipio|lxstudio|…> (or copy the matching DESIGN.\*.md and rename it). [blocking for color audit — Check 4 findings below use low-confidence, theme-unverified language as a result]

Dependencies
N/A — no package.json at the audit root (single-file audit); dependency check skipped.

Setup
N/A (partial) — this is a leaf presentational component, not an app root, so GamutProvider/ColorMode/Background/theme augmentation would not be expected to appear here. None of these symbols appear in the file; not flagged as violations for that reason, but note that Background (semantic surface) would be a reasonable replacement for the hand-rolled hero surface — see Hardcoded colors below.

Import patterns
✓ Deep dist imports none found
✓ Deep src imports none found

SCSS modules, className & inline style [→ gamut-system-props] [→ gamut-style-utilities] [→ gamut-color-mode]
✗ SCSS/CSS imports 1 file — migrate to system props and css()/variant()
HeroSection.scss (imported at HeroSection.tsx:3; only rule is `.hero-wrapper { padding: 32px; }`, directly expressible as a p={32} system prop)
✗ className on Gamut components 1 occurrence
HeroSection.tsx:6 <Box className="hero-wrapper">
✗ inline style on Gamut components 1 occurrence — use system props or css()/variant()/states() with semantic tokens
HeroSection.tsx:6 <Box style={{ color: '#10162F' }}>

Nested selectors [→ gamut-system-props] [→ gamut-style-utilities]
✓ none found (HeroSection.scss has a single flat class rule; no bare tag selectors, `*` selectors, or ${Component} interpolations)

styled(GamutComponent) bypassing system props [→ gamut-system-props] [→ gamut-style-utilities]
✓ none found (no styled() usage in this file)

Hardcoded colors [→ gamut-color-mode]
⚠ low confidence — no DESIGN.md
✗ HeroSection.tsx:6 '#10162F' → semantic: text (low confidence — read as body/heading foreground color on a content wrapper; could also be border-primary or secondary depending on actual usage, per Appendix B disambiguation) | palette: navy-800 | note: verify against the correct theme Storybook page before applying; also flagged above as an inline-style violation on a Gamut component (double-counted deliberately — two distinct problems on one line: bypassing the variance system, and a hardcoded literal instead of a token)
Non-Gamut CSS vars: none found in HeroSection.scss (no var(--...) usage)

Test setup [→ gamut-testing]
N/A — no test files present for this component (no **tests**, .test., or .spec. files in the audit scope).

Bespoke component duplication (heuristic — confirm manually) [→ gamut-component-first]
✓ none found - No suspicious ARIA roles (dialog/menu/tooltip/listbox/alert). - Filename "HeroSection" does not match a known Gamut component name (Modal, Dialog, Dropdown, Tooltip, Popover, Menu, Toast, Accordion, Tabs, Pagination, Avatar, Badge, Tag). - No hand-rolled dismiss/focus-trap logic. - HeroSection.scss is not named after a Gamut component.

Additional observation (outside the formal Check 1–6 list, informational only — not counted in the tally)
ℹ HeroSection.tsx:7 <h1>Welcome to the platform</h1> is a bare native heading, not a Gamut typography component. Consider Gamut's Typography/Heading component (see gamut-typography) so heading styles stay on the token scale rather than relying on browser/user-agent defaults. Not a scored violation under this skill's checks, flagged for awareness only.

══════════════════════════════════════════════════
4 error(s), 0 warning(s) found.
