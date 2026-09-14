# DatePicker — supplemental (not in the generated `.prompt.md`)

`DatePicker.prompt.md` truncates before its "Locale" section (source doc
exceeds the per-component doc size cap) — this file covers what's cut.

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
