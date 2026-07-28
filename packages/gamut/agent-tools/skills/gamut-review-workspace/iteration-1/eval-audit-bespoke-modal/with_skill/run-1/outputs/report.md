Gamut Review — /Users/kenny.lin/Documents/eng/codecademy-eng/gamut/packages/gamut/agent-tools/skills/gamut-review-workspace/iteration-1/eval-audit-bespoke-modal/fixture/CustomConfirm.tsx
══════════════════════════════════════════════════

Scope note: audit root is a single standalone file (fixture), not a project checkout. Checks that require project-level artifacts (package.json, DESIGN.md, app-root wiring, test files) are marked N/A below rather than scored, per the single-file audit instructions.

DESIGN.md
— N/A no project root to resolve; this is a single-file audit, not a project checkout

Dependencies
— N/A no package.json present at audit root (single-file audit) — skipped per instructions

Setup
— N/A (reduced relevance) GamutProvider / ColorMode / Background / theme augmentation are app-root/project concerns; none appear in this file, which is expected for a single leaf component and is not itself a violation.
Note: the file does use TypeScript (typed props via `interface CustomConfirmProps`), so if/when this component is reviewed in its real project, Check 2's "Theme augmentation" row should still be verified there.

Import patterns
✓ Deep dist imports none found
✓ Deep src imports none found
Note: the file contains no import from @codecademy/gamut, @codecademy/gamut-styles, or @codecademy/variance at all — see "Bespoke component duplication" below; this is the root cause of most findings in this report.

SCSS modules, className & inline style [→ gamut-system-props] [→ gamut-style-utilities] [→ gamut-color-mode]
✓ SCSS/CSS imports none found
✓ className on Gamut components none found (no Gamut components imported/used)
✗ inline style on JSX elements 2 occurrences — hardcoded layout/color values on plain <div>s that should be a Gamut Modal/Overlay (or, at minimum, Box) using system props and semantic tokens
CustomConfirm.tsx:28 <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)' }}> — backdrop; Gamut's Modal/Overlay provides this scrim for free
CustomConfirm.tsx:32 <div style={{ background: 'white', padding: 24, margin: '100px auto', width: 400 }}> — dialog surface; hardcoded 'white' fill and pixel literals instead of a semantic bg/p/layout system props

Nested selectors [→ gamut-system-props] [→ gamut-style-utilities]
✓ none found (no styled/Emotion template literals in this file)

styled(GamutComponent) bypassing system props [→ gamut-system-props] [→ gamut-style-utilities]
✓ none found (styled is not imported/used)

Hardcoded colors [→ gamut-color-mode]
✓ no hex literals (#RGB/#RRGGBB) found
⚠ CustomConfirm.tsx:28 'rgba(0,0,0,0.5)' → semantic: (n/a — scrim) | palette: — | note: not a hex literal so outside Check 4's strict discovery pattern, but the same class of problem as the inline-style finding above: a hand-set backdrop color that a Gamut Modal/Overlay would supply via its own scrim styling, no token needed
⚠ CustomConfirm.tsx:32 'white' → semantic: background | palette: white | note: literal CSS color keyword; if this stays a bespoke element, prefer bg="background" on a Box/Card rather than the keyword

Test setup [→ gamut-testing]
— N/A this is a component file, not a test file; no **tests**/.test./.spec. files exist alongside it in this fixture

Bespoke component duplication (heuristic — confirm manually) [→ gamut-component-first]
✗ CustomConfirm.tsx:27 role="dialog" with no Modal/Dialog import from @codecademy/gamut — this is a hand-rolled confirmation dialog; strongly recommend Modal (see decision table in gamut-component-first)
✗ CustomConfirm.tsx:14-21 manual Escape-key dismiss (e.key === 'Escape' + document.addEventListener('keydown', ...)) with no Overlay/FocusTrap/PopoverContainer import — Gamut's Modal/Overlay already implements Escape-to-close
⚠ CustomConfirm.tsx:29,33 manual outside-click dismiss (backdrop onClick={onClose} + inner content onClick={(e) => e.stopPropagation()}) — same class of hand-rolled dismiss logic as the Escape handler; Gamut's Modal/Overlay/PopoverContainer handles outside-click dismissal internally, so this doesn't need to be reimplemented (flagged as a warning since it's a variant of the literal addEventListener('click', ...) pattern the check greps for, but functionally identical)
⚠ CustomConfirm.tsx (whole file) filename CustomConfirm.tsx does not literally match the Check 6 Step 2 filename list (Modal, Dialog, Dropdown, Tooltip, Popover, Menu, Toast, Accordion, Tabs, Pagination, Avatar, Badge, Tag), so the filename-matching heuristic doesn't fire — but the component's actual behavior (role="dialog", overlay + centered surface, Escape/outside-click dismiss, confirm/cancel actions) is exactly a confirmation modal. Worth flagging manually alongside the Step 1/3 hits above rather than relying on filename alone.
⚠ CustomConfirm.tsx:36-37 plain <button> elements for Cancel/Confirm actions instead of Gamut FillButton/StrokeButton/TextButton — not one of Check 6's named grep patterns, but the same "duplicating what the library already provides" signal; flagging as an additional observation for the manual review, not a formal check hit.
Missing accessibility: no focus trap and no explicit aria-modal/labelling wiring (e.g. aria-labelledby/aria-describedby) accompanies the hand-set role="dialog" — another gap that Gamut's Modal closes out of the box. Noted here since it strengthens the case for Modal over the bespoke implementation, not as a separate formal check.

══════════════════════════════════════════════════
3 error(s), 6 warning(s) found.
