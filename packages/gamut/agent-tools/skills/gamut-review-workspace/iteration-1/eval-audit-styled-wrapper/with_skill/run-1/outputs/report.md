Gamut Review — .../gamut-review-workspace/iteration-1/eval-audit-styled-wrapper/fixture/CardShells.tsx
══════════════════════════════════════════════════

Scope note: single-file fixture, not a full project. Skipped: Check 0 (DESIGN.md),
Check 1 (Dependencies), Check 2 (Setup), Check 5 (Test setup) — all require project context.
No DESIGN.md was found, so Hardcoded colors below is low confidence (Appendix A/B only,
Codecademy Core semantics not assumed).

Import patterns
✓ Deep dist/src imports none found

SCSS modules, className & inline style [→ gamut-system-props] [→ gamut-style-utilities] [→ gamut-color-mode]
✓ none found (no SCSS/CSS imports, no className, no inline style on Gamut components)

Nested selectors [→ gamut-system-props] [→ gamut-style-utilities]
✓ none found

styled(GamutComponent) bypassing system props [→ gamut-system-props] [→ gamut-style-utilities]
File imports `Box` from `@codecademy/gamut` (line 1) — both wrappers are in scope.

✗ CardShells.tsx:7 styled(Box)`...` — display: flex, flex-direction: column, padding: 16px
Every property has a direct system-prop equivalent. Delete the wrapper; use `FlexBox`
(display: flex → FlexBox, not Box + display) with flexDirection="column" and p={16}
directly on the JSX element.

✗ CardShells.tsx:15 styled(Box)(css({...})) — background: radial-gradient(...), padding: 24
Syntactically this is the "compliant" escape-hatch form (wrapped in css(), not a raw
template/object), so a literal grep for styled(Box)`/ styled(Box)({ would miss it.
       On inspection it doesn't need the escape hatch at all:`background`(unlike`bg`) has
       no token scale and accepts any CSS value as-is, so the gradient string is already valid
       passed directly as a `background`prop — it does not by itself justify styled().`padding`
is likewise directly expressible as p={24}. Reclassify as ✗ error (not the "partially
expressible" ⚠ case): delete the wrapper, use
background="radial-gradient(circle, #3A10E5 0%, transparent 100%)" and p={24} on Box.

Hardcoded colors [→ gamut-color-mode] ⚠ low confidence — no DESIGN.md
✗ CardShells.tsx:17 '#3A10E5' → semantic: primary (if meant to echo brand/CTA hue) |
palette: hyper-500 / hyper | note: lives inside a styled(Box) gradient on adaptive UI
(not a documented palette-only surface like <Background bg="...">), so per the
semantic-first rule this is an error, not a warning. If the glow is intentionally a
fixed decorative accent independent of theme, palette token hyper-500 (once moved to
the `background` prop above) is an acceptable fallback — confirm against the correct
theme Storybook page before choosing between `primary` and `hyper-500`.

Test setup — skipped (no test files in scope)

Bespoke component duplication (heuristic) [→ gamut-component-first]
✓ none found — no ARIA roles, no component/file-name mismatches, no hand-rolled
dismiss/focus-trap logic

══════════════════════════════════════════════════
3 error(s), 0 warning(s) found.
