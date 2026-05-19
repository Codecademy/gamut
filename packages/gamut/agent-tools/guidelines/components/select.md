# Select vs. SelectDropdown

`Select` is a native select suitable for most dropdown needs. Prefer `Select` over `SelectDropdown` for simple lists.

Storybook: [Atoms / Select](https://gamut.codecademy.com/?path=/docs-atoms-select--docs) · [Organisms / SelectDropdown](https://gamut.codecademy.com/?path=/docs-organisms-selectdropdown--docs)

## When to use `SelectDropdown`

Only when you need:

- Searchable/filterable options (`isSearchable`)
- Multi-select (`multiple`)
- Option subtitles, right labels, icons, abbreviations
- Grouped options with dividers and group labels
- Custom option styling

## When to use `Select`

Plain option lists with no enrichment — simpler, more performant, and more accessible.

## Sizing

Apply exact sizing from the design (e.g. `sizeVariant="small"` on `Select`) — do not rely on defaults when the source specifies a value.
