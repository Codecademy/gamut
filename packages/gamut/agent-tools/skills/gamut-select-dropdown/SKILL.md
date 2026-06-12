---
name: gamut-select-dropdown
description: Use when implementing or auditing SelectDropdown — single/multi modes, controlled vs uncontrolled value, creatable options, FormGroup wiring, and react-select action meta. Pair with gamut-forms for FormGroup/validation patterns.
---

# Gamut SelectDropdown

Styled dropdown built on react-select. Supports single and multi-select, searchable menus, creatable options, icons, groups, and abbreviations.

Source: `@codecademy/gamut` — [SelectDropdown.tsx](https://github.com/Codecademy/gamut/blob/main/packages/gamut/src/Form/SelectDropdown/SelectDropdown.tsx)

See also: [`gamut-forms`](../gamut-forms/SKILL.md) — FormGroup wiring, error regions, and validation UX.

Storybook: [Atoms / FormInputs / SelectDropdown](https://gamut.codecademy.com/?path=/docs-atoms-forminputs-selectdropdown--docs)

---

## When to use SelectDropdown vs Select

Use `Select` for standard single-select forms with minimal bundle cost. Use `SelectDropdown` when designs specify the styled dropdown menu, search, multi-select tags, creatable options, icons, groups, or abbreviations. SelectDropdown has a larger JavaScript dependency (react-select).

---

## Controlled vs uncontrolled

SelectDropdown does **not** accept `defaultValue`.

| Mode             | Uncontrolled                                       | Controlled                                                                        |
| ---------------- | -------------------------------------------------- | --------------------------------------------------------------------------------- |
| Single           | Not supported                                      | `value` (string) + update in `onChange`                                           |
| Multi            | Omit `value` or pass non-array (`undefined`, `''`) | `value: string[]` + update in `onChange`                                          |
| Creatable single | Not supported                                      | Same as single; `onCreateOption` appends to `options`                             |
| Creatable multi  | Omit `value`; `onCreateOption` for options         | `value: string[]`; update in `onChange` on every change including `create-option` |

Single-select selection is derived from the `value` prop only — internal state is not kept. Multi-select without `value: string[]` keeps selection in internal `multiValues`.

**Controlled creatable multi pitfall:** Updating `options` alone without syncing `value` in `onChange` clears selection when options re-render.

---

## onChange contract

`onChange` receives option object(s), not `event.target.value`:

```tsx
// Single
onChange={(option) => setValue(option.value)}

// Multi
onChange={(selected) => setValue(selected.map((o) => o.value))}
```

Second argument is react-select `ActionMeta`. For creatable creates: `meta.action === 'create-option'`. Do **not** pass `onCreateOption` to react-select directly — Gamut invokes it from `changeHandler` while still forwarding `create-option` to consumer `onChange`.

---

## Creatable

- `isCreatable` forces `isSearchable: true` (TypeScript enforces this).
- `onCreateOption(inputValue)` — convenience hook to append to `options`.
- `onChange(selected, meta)` — use `meta.action === 'create-option'` to sync controlled `value` and `options` together.
- `isValidNewOption` — return `false` to hide the Add row.
- `validationMessage` — replaces menu "No options" text; mirror in `FormGroup` `error` for field-level feedback.

**Validation after blur:** react-select clears input on blur. Handle `onInputChange`: validate on `input-change`, re-validate from last typed value on `input-blur` so FormGroup error persists.

---

## FormGroup wiring

- `FormGroup` `htmlFor` must match control `id` / `name`.
- Pass `name` on SelectDropdown (required for forms).
- Pass `error` boolean when FormGroup has an error.
- Generic FormGroup live-region behavior: see [`gamut-forms`](../gamut-forms/SKILL.md).

```tsx
<FormGroup htmlFor="country" isSoloField label="Country" error={errors.country}>
  <SelectDropdown
    name="country"
    options={options}
    value={value}
    error={Boolean(errors.country)}
    onChange={(option) => setValue(option.value)}
  />
</FormGroup>
```

---

## Examples

### Single (controlled)

```tsx
const [value, setValue] = useState('us');

<SelectDropdown
  name="country"
  options={options}
  value={value}
  onChange={(option) => setValue(option.value)}
/>;
```

### Multi (uncontrolled)

```tsx
<SelectDropdown
  multiple
  name="tags"
  options={options}
  onChange={(selected) => console.log(selected)}
/>
```

### Creatable multi (uncontrolled)

```tsx
const [options, setOptions] = useState(['Apple', 'Banana']);

<SelectDropdown
  isCreatable
  multiple
  name="fruits"
  options={options}
  onCreateOption={(v) => setOptions((prev) => [...prev, v])}
/>;
```

### Creatable multi (controlled)

```tsx
const [options, setOptions] = useState(['Apple', 'Banana']);
const [value, setValue] = useState<string[]>([]);

<SelectDropdown
  isCreatable
  multiple
  name="fruits"
  options={options}
  value={value}
  onChange={(selected, meta) => {
    setValue(selected.map((o) => o.value));
    if (meta.action === 'create-option' && meta.option) {
      setOptions((prev) => [...prev, meta.option.value]);
    }
  }}
/>;
```

---

## Storybook note

Default story args include `value: ''`. Spreading `{...args}` in custom renders behaves as controlled empty single. Omit `value` when demonstrating uncontrolled multi or creatable multi.
