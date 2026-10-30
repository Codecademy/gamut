Gamut Review — /Users/kenny.lin/Documents/eng/codecademy-eng/gamut/packages/gamut/agent-tools/skills/gamut-review-workspace/iteration-1/eval-audit-styled-wrapper/fixture/CardShells.tsx
══════════════════════════════════════════════════

Scope note: this is a single-file audit (not a full project). The following
checks require project-level context that isn't available for a standalone
file and were skipped rather than scored: Check 0 (DESIGN.md — no project
root), Check 1 (Dependencies — no package.json), Check 2 (Setup — no app
root to search for GamutProvider/ColorMode/Background/theme augmentation;
the file contains no `states()`/`variant()` usage so the conditional
StyleProps check doesn't apply either), Check 5 (Test setup — not a test
file). Checks 3, 3b, 3c, 3d, 4, and 6 apply to any source file and were run
in full.

Because there is no DESIGN.md / theme context, the Check 4 color mapping
below uses the Appendix A/B tables as a best-available heuristic — treat the
semantic suggestion as low-confidence and confirm against the actual
product theme before applying.

Import patterns
✓ Deep dist imports none found
✓ Deep src imports none found

SCSS modules, className & inline style [→ gamut-system-props] [→ gamut-style-utilities] [→ gamut-color-mode]
✓ SCSS/CSS imports none found
✓ className on Gamut components none found
✓ inline style on Gamut components none found

Nested selectors [→ gamut-system-props] [→ gamut-style-utilities]
✓ none found

styled(GamutComponent) bypassing system props [→ gamut-system-props] [→ gamut-style-utilities]
✗ styled(Box) raw CSS 1 occurrence — every property has a prop equivalent
CardShells.tsx:7 styled(Box)`display: flex; flex-direction: column; padding: 16px;`
— display, flex-direction, padding → delete wrapper; use FlexBox (not Box) with
flexDirection="column" and p={16} directly on the JSX element. `display: flex`
is the specific case the skill calls out to become FlexBox rather than a
`display` prop on Box.

✗ styled(Box)(css(...)) raw CSS via css() 1 occurrence — every property has a prop equivalent, despite using css()
CardShells.tsx:15 styled(Box)(css({ background: 'radial-gradient(...)', padding: 24 }))
— the code comment claims "the gradient isn't expressible as a prop," but that's
incorrect: unlike `bg` (which is token-scale-constrained), `background` takes any
raw CSS value as-is, so a gradient string is already valid passed directly as
`background="radial-gradient(circle, #3A10E5 0%, transparent 100%)"`. `padding`
maps directly to `p={24}`. Because both properties in this block have direct prop
equivalents, the `styled()` wrapper (and the css() escape hatch inside it) is
unnecessary — delete it and pass `background` and `p` as props on `Box` directly.
(Using css() is normally the compliant way to hold a property that truly can't be
a prop; it doesn't get a pass here because nothing in this block actually requires
it.)

Hardcoded colors [→ gamut-color-mode] ⚠ low confidence — no DESIGN.md / theme context for this single-file audit
✗ CardShells.tsx:17 '#3A10E5' → semantic: primary (if this glow should track brand/CTA color and adapt with ColorMode) | palette: hyper-500 | note: used as a literal inside a `radial-gradient(...)` string passed through `styled(Box)(css({...}))` — decorative gradient CSS in a styled-component wrapper is "adaptive UI" per the check's severity rule, so this is an error rather than a documented exception; confirm with design whether the glow is meant to always render this exact brand purple (in which case use the palette token `hyper-500` explicitly, not a raw hex) or should shift with theme/dark mode (in which case use the semantic `primary` token). Either way, replace the hex literal — do not leave it as `#3A10E5`.

Bespoke component duplication (heuristic — confirm manually) [→ gamut-component-first]
✓ none found — no ARIA roles, no filenames matching a Gamut component name, no hand-rolled dismiss logic, no stylesheets in this file.

══════════════════════════════════════════════════
3 error(s), 0 warning(s) found.

Next step: both exports in this file can be deleted as `styled()` wrappers entirely — replace `CardShell` with `<FlexBox flexDirection="column" p={16}>` and `GlowShell` with `<Box background="radial-gradient(circle, <token-or-hex-per-design-review> 0%, transparent 100%)" p={24}>`, resolving the hardcoded-color finding as part of the same edit.
