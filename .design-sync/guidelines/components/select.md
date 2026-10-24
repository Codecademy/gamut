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

## Controlled vs. uncontrolled

`Select` is a native controlled/uncontrolled `<select>` — pass `value` +
`onChange` for controlled, or `defaultValue` for uncontrolled (defaults to
`''` if omitted). `options` accepts either a string array or a
`Record<label, value>` object — both get parsed into `<option>` elements
internally; you don't hand-write `<option>` children.

```jsx
const { Select } = window.CodecademyGamut;

// Controlled, options as array
const [value, setValue] = useState('');
<Select
  value={value}
  onChange={(e) => setValue(e.target.value)}
  options={['Small', 'Medium', 'Large']}
/>;

// Uncontrolled, options as label→value map
<Select
  defaultValue="md"
  options={{ Small: 'sm', Medium: 'md', Large: 'lg' }}
/>;
```

## Icon slot

`Select` has **no `icon` prop** — the chevron indicator is built in
automatically (`ArrowChevronDownIcon` at `sizeVariant="base"`,
`MiniChevronDownIcon` at `sizeVariant="small"`) and isn't customizable. If a
design calls for an additional leading icon inside the control, that's a
`SelectDropdown` use case (it supports icons on options), not `Select`.
