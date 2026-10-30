## Gamut Review — CardShells.tsx

File: `/Users/kenny.lin/Documents/eng/codecademy-eng/gamut/packages/gamut/agent-tools/skills/gamut-review-workspace/iteration-1/eval-audit-styled-wrapper/fixture/CardShells.tsx`

**Scope note:** Standalone file audit — Checks 0 (DESIGN.md), 1 (Dependencies), 2 (Setup), and 5 (Test setup) were skipped as they require full-project context. Checks 3, 3b, 3c, 3d, 4, and 6 were applied.

**Import patterns (Check 3):** ✓ none found — imports are `@codecademy/gamut`, `@codecademy/gamut-styles`, `@emotion/styled` (public roots, no `/dist/` or `/src/` deep imports).

**SCSS/className/inline style (Check 3b):** ✓ none found.

**Nested selectors (Check 3c):** ✓ none found.

**styled(GamutComponent) bypassing system props (Check 3d) — the core finding:**

- `CardShells.tsx:7` — `` styled(Box)`display: flex; flex-direction: column; padding: 16px;` `` → **✗ error**. This matches Step 2's tagged-template violation pattern. Every property (`display`, `flex-direction`, `padding`) has a direct system-prop equivalent. Since `display: flex` is present, the recommendation is specifically `FlexBox` (not `Box` + a `display` prop): delete the wrapper, use `<FlexBox flexDirection="column" p={16} />`.
- `CardShells.tsx:15` — `styled(Box)(css({...}))` → this outer syntax is the **compliant** form per Step 2 (character after `(` is `css(`, not a backtick/`{`), so it is not itself a wrapper violation. Worth noting: per the skill's own aside, the gradient in `background` is expressible as a plain `background` prop as-is (no token scale, takes any CSS value) — the gradient alone never justified reaching for `css()`/`styled()`.
- `CardShells.tsx:18` — `css({ background: '...', padding: 24 })` → **✗ error** under Step 4. `padding` is the raw CSS property name, not the variance alias `p`; `getStaticCss` passes unrecognized keys straight through as unscaled literals, so `24` bypasses the spacing scale entirely regardless of the value written — a functional bug, not a style nit. `background` in the same block is correctly _not_ flagged (it has no token scale, so there's no alias it's "missing"). Fix: `padding: 24` → `p: 24`. Once corrected, note that both properties (gradient `background`, and `p`) are individually prop-expressible, so the whole `styled()/css()` wrapper for `GlowShell` may be unnecessary — consider `<Box background="radial-gradient(...)" p={24} />` directly unless a named reusable shell is required.

**Hardcoded colors (Check 4):** ⚠ low confidence — no DESIGN.md/theme context for this standalone file.

- `CardShells.tsx:17` — `'#3A10E5'` → palette: `hyper-500`/`hyper` (Appendix A); semantic: `primary` (Appendix B, unverified — confirm theme). This hex is a gradient stop hardcoded in application code (not a token-definition file), so it's a Check 4 violation independent of the Step 4 finding above (that finding was about the wrapper mechanics; this one is about the literal color value itself). Gradients can't collapse to a single semantic token string, but if this glow should track ColorMode/theme, pull the stop color from the theme's hyper/primary token rather than hardcoding it — or confirm it's an intentional fixed decorative exception.

**Bespoke component duplication (Check 6):** ✓ none found — no ARIA roles, no filename collision with Check 6's component-name list (`Card` isn't on that list), no hand-rolled dismiss logic, no colliding stylesheets.

**Tally: 3 error(s), 0 warning(s) found.**
