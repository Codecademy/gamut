Gamut Review — /Users/kenny.lin/Documents/eng/codecademy-eng/gamut/packages/gamut/agent-tools/skills/gamut-review-workspace/iteration-1/eval-audit-bespoke-modal/fixture/CustomConfirm.tsx
══════════════════════════════════════════════════

Scope note: this audit targets a single standalone file (not a project root). Checks that require
project-level artifacts (package.json, app-wide setup grep, test files) are marked N/A rather than
scored, per the instruction to skip checks that need a full project.

DESIGN.md [Check 0]
N/A no project root to resolve — single-file audit, not scored

Dependencies [Check 1]
N/A no package.json in scope for a single-file audit

Setup [Check 2]
N/A requires a project-wide grep for GamutProvider/ColorMode/Background/theme
augmentation; not meaningful for one isolated file. (For reference: this
file itself contains none of these symbols and imports nothing from any
`@codecademy/gamut*` package.)

Import patterns [Check 3]
✓ Deep dist imports none found
✓ Deep src imports none found
(only import in the file is `react`; no @codecademy/gamut\* imports at all)

SCSS modules, className & inline style [→ gamut-system-props] [→ gamut-style-utilities] [→ gamut-color-mode]
✓ SCSS/CSS imports none found
✓ className on Gamut components none found — file contains no Gamut component usage
✗ inline style on plain JSX elements 2 occurrences — use system props or css()/variant()/states() with semantic tokens
CustomConfirm.tsx:28 <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)' }}>
CustomConfirm.tsx:32 <div style={{ background: 'white', padding: 24, margin: '100px auto', width: 400 }}>
Note: neither `<div>` is a recognized Gamut component name, so these are reported under the
"bare JSX tag" branch of Step 3 rather than the named-component list — but the values
(fixed-position overlay, hardcoded backdrop opacity, hardcoded 'white' fill, raw pixel
padding/margin/width) are exactly what a `Box`/`Overlay` with system props and semantic
tokens would express instead. No eslint-disable comment precedes either line.

Nested selectors [→ gamut-system-props] [→ gamut-style-utilities]
✓ none found — file contains no styled-component/Emotion template literals to inspect

styled(GamutComponent) bypassing system props [→ gamut-system-props] [→ gamut-style-utilities]
✓ none found — file contains no `from '@codecademy/gamut'` import, so this check's scope
(styled(PascalCaseGamutComponent)) does not apply

Hardcoded colors [→ gamut-color-mode]
✓ Hex literals none found — grep for `#RGB`/`#RRGGBB` in this file returns no matches
⚠ Related note (outside this check's hex-literal scope, informational only):
CustomConfirm.tsx:28 background: 'rgba(0,0,0,0.5)' — hardcoded scrim color, not a hex
literal so the formal Check 4 pattern doesn't catch it, but same
underlying problem: no ColorMode token, no dark-mode adaptation.
A Gamut `Overlay`/`Modal` backdrop would resolve this automatically.
CustomConfirm.tsx:32 background: 'white' — hardcoded CSS color keyword; nearest semantic
direction would be `background` (surface fill) if migrated to a
system prop, but not scored as a Check 4 violation since it is not
a hex value.

Test setup [→ gamut-testing]
N/A not a test file (no `__tests__`, `.test.`, or `.spec.` in scope)

Bespoke component duplication (heuristic — confirm manually) [→ gamut-component-first]
⚠ CustomConfirm.tsx:27 role="dialog" with no Modal/Dialog import — likely reinventing
`@codecademy/gamut`'s `Modal`/`Dialog` (decision table: "Confirm/cancel dialog, free-form
modal, multi-step wizard" → `Modal`, `Dialog`; see gamut-modal skill). Needs manual
confirmation — a genuinely one-off product surface can look identical to this pattern match.
⚠ CustomConfirm.tsx:16-20 hand-rolled Escape-key dismiss logic (`e.key === 'Escape'` +
`document.addEventListener('keydown', ...)`), no `Overlay`/`FocusTrap`/`PopoverContainer`
import in the file — this is exactly the dismiss/focus convention those primitives centralize.
Needs manual confirmation.
⚠ CustomConfirm.tsx:29,33 hand-rolled outside-click dismiss via backdrop `onClick={onClose}` +
inner `onClick={(e) => e.stopPropagation()}` — functionally the same "click outside to
close" pattern the grep signature targets, implemented via React handlers instead of a
document-level `addEventListener('click', ...)` + `.contains()` check. Flagged as the same
category of duplication (no `Overlay`/`FocusTrap`/`PopoverContainer`); confirm manually since
it doesn't literally match the check's grep pattern.
(Filename check: "CustomConfirm.tsx" does not match any of the enumerated Gamut component
filenames — Modal, Dialog, Dropdown, Tooltip, Popover, Menu, Toast, Accordion, Tabs, Pagination,
Avatar, Badge, Tag — so Check 6 Step 2 has no match here. Check 6 Step 4, SCSS-named-after-a-
component, is also N/A — no stylesheet files in scope.)

Overall read: this component is a hand-built confirm/cancel dialog — full-screen fixed backdrop,
centered panel, Escape-to-close, click-outside-to-close, Confirm/Cancel buttons — which is close
to a line-for-line description of what `@codecademy/gamut`'s `Modal`/`Dialog` already provides,
including the accessible dialog semantics, focus trap, and backdrop dismiss conventions that this
file reimplements without a focus trap at all (no focus management/restoration visible). Worth a
manual comparison against `Modal`/`Dialog` before treating this as a deliberate one-off. See
gamut-modal skill for the props/usage pattern to migrate to.

══════════════════════════════════════════════════
2 error(s), 3 warning(s) found.
