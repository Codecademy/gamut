# DatePicker — supplemental (not in the generated `.prompt.md`)

`DatePicker.prompt.md` truncates before its "Locale" section (source doc
exceeds the per-component doc size cap) — this file covers what's cut.

## Validation

Typed segment input is validated on entry. Invalid input shows a localized error message, and the failure is reported with one of these reasons: `incomplete`, `invalid-month`, `invalid-day`, `date-rollover`, `disabled-date`, `range-contains-disabled-date`, `invalid-date`. Don't hand-roll date parsing or error text for typed input.

## Translations and quick actions

- `translations` overrides the built-in UI strings (merged over the defaults).
- `quickActions` replaces the default quick-action buttons. Pass `null` to remove them entirely.

## Locale

Use the `locale` prop to set the DatePicker's locale — defaults to the
runtime's default locale. Accepts a [BCP 47 language tag](https://developer.mozilla.org/en-US/docs/Glossary/BCP_47_language_tag)
(e.g. `"en-US"`, `"fr-FR"`) or an `Intl.Locale` object.

`DatePicker` uses the `Intl` API to internationalize most of the component
automatically — you don't need to hand-translate these:

- `Intl.Locale` + `getWeekInfo` — which day starts the calendar.
- `Intl.DateTimeFormat` — segment order/separators for inputs; month+year in
  the header; short/long weekday names in the grid; formatted day-cell
  `aria-label`.
- `Intl.RelativeTimeFormat` — default quick-action labels (yesterday/today/
  tomorrow) and previous/next month navigation tooltip text.
