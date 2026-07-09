# Select vs. SelectDropdown

Gamut's `Select` is a lightweight native select element suitable for most dropdown needs. **Prefer `Select` over `SelectDropdown` for simple dropdowns.**

## When to use `SelectDropdown`

Only use `SelectDropdown` when you need advanced features:

- Searchable/filterable options (`isSearchable`)
- Multi-select (`multiple`)
- Option subtitles
- Right labels
- Icons
- Abbreviations
- Grouped options with dividers and group labels
- Other custom option styling

## When to use `Select`

For a plain list of options with no enrichment, `Select` is simpler, more performant, and more accessible.

## Sizing

Verify sizing and variant props from the Figma design. For example, if the design specifies `sizeVariant="small"` on `Select`, apply that exact prop in code rather than relying on defaults.
