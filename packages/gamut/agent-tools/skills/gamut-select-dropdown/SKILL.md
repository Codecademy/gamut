---
name: gamut-select-dropdown
description: Use when implementing or auditing SelectDropdown — single/multi modes, controlled vs uncontrolled value, creatable options, FormGroup wiring, and onChange contract. Pair with gamut-forms for error live regions, ConnectedForm, and field-level validation.
---

# Gamut SelectDropdown

Styled dropdown built on react-select.

Source: `@codecademy/gamut` — [SelectDropdown.tsx](https://github.com/Codecademy/gamut/blob/main/packages/gamut/src/Form/SelectDropdown/SelectDropdown.tsx)

See also: [`gamut-forms`](../gamut-forms/SKILL.md) — FormGroup wiring, error regions, and validation UX.

Storybook: [Atoms / FormInputs / SelectDropdown](https://gamut.codecademy.com/?path=/docs-atoms-forminputs-selectdropdown--docs)

---

## When to use SelectDropdown vs Select

Use `Select` for standard single-select forms with minimal bundle cost. Use `SelectDropdown` when designs specify the styled dropdown menu, search, multi-select tags, creatable options, icons, groups, or abbreviations. `SelectDropdown` has a larger JavaScript dependency (react-select).

---

## Options

`options` accepts an array of plain strings or option objects. `value` is always a string and references an option's `value`.

The table below shows the keys and value types for an option object:

| Field          | Type                              | Required | Notes                                                                |
| -------------- | --------------------------------- | -------- | -------------------------------------------------------------------- |
| `label`        | `string`                          | yes      | Display text                                                         |
| `value`        | `string`                          | yes      | Unique string; what `value` / `string[]` reference                   |
| `disabled`     | `boolean`                         | no       | Option cannot be selected                                            |
| `subtitle`     | `string`                          | no       | Secondary text below the label                                       |
| `rightLabel`   | `string`                          | no       | Text on the right side of the option                                 |
| `icon`         | icon component from `gamut-icons` | no       | A `@codecademy/gamut-icons` component                                |
| `abbreviation` | `string`                          | no       | Short text shown in the input while the full label shows in the menu |

Grouped options: `{ label, options: [...], divider? }` (extends react-select `GroupBase`; `divider` draws a rule above the group).

---

## Controlled vs uncontrolled

`SelectDropdown` does **not** accept `defaultValue`.

| Mode             | Uncontrolled                                       | Controlled                                                                        |
| ---------------- | -------------------------------------------------- | --------------------------------------------------------------------------------- |
| Single           | Not supported                                      | `value` (string) + update in `onChange`                                           |
| Multi            | Omit `value` or pass non-array (`undefined`, `''`) | `value: string[]` + update in `onChange`                                          |
| Creatable single | Not supported                                      | Same as single; `onCreateOption` appends to `options`                             |
| Creatable multi  | Omit `value`; `onCreateOption` for options         | `value: string[]`; update in `onChange` on every change including `create-option` |

Single-select selection is derived from the `value` prop only — internal state is not kept. Multi-select without `value: string[]` keeps selection in internal `multiValues`.

**Controlled creatable multi pitfall:** Updating `options` alone without syncing `value` in `onChange` clears selection when options re-render.

### When to use uncontrolled (multi only)

Uncontrolled multi is appropriate when:

- No other part of the UI needs to react to the current selection (no live summary, no dependent field, no enabled/disabled button).
- You only need the value at form submission — via `FormData`, a submit handler reading the DOM, or react-hook-form's `getValues`.
- Simplicity is the priority; omitting `value` means one less piece of state to manage.

```tsx
// Good fit: a "tags" field where only the submitted array matters
<SelectDropdown
  multiple
  name="tags"
  options={tagOptions}
  onCreateOption={(v) => setTagOptions((prev) => [...prev, v])}
/>
```

### When to use controlled

Use controlled when:

- Another part of the UI must reflect the current selection in real time (summary text, a filtered list, an enable/disable condition).
- You need to pre-populate from an API response, reset on cancel, or sync with a form library like react-hook-form.
- You are using single-select (the only supported mode for single).

```tsx
// Good fit: pre-populate from API, clear on cancel, show live summary
const [selected, setSelected] = useState<string[]>(initialValues);

<SelectDropdown
  multiple
  name="languages"
  options={languageOptions}
  value={selected}
  onChange={(opts) => setSelected(opts.map((o) => o.value))}
/>
<p>Selected: {selected.join(', ') || 'none'}</p>
```

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
- SelectDropdown already announces its "No options" text (default or `validationMessage`) to screen readers via a debounced, standalone live region — react-select's own live region stays silent while `options` is empty, so this fills that gap, including mid-fetch states. Don't build a separate announcement for this; just set `validationMessage`.

**Validation after blur:** react-select clears input on blur before `onBlur` fires, so the value is gone by the time you'd validate it. Store the last typed value in a ref and re-validate from it on `input-blur`:

```tsx
const lastInput = useRef('');

<SelectDropdown
  isCreatable
  onInputChange={(value, { action }) => {
    if (action === 'input-change') lastInput.current = value;
    if (action === 'input-blur') validate(lastInput.current);
  }}
/>;
```

---

## FormGroup wiring

- `FormGroup` `htmlFor` must match SelectDropdown's `name` — **not** `id`. Unlike plain `Select`, SelectDropdown's `id`/`htmlFor` prop only sets the id of react-select's outer wrapper `<div>` (not labelable); the actual focusable combobox input always takes its id from `inputId`, which is `name`. A label pointed at `id` instead of `name` silently breaks the label/input association whenever the two differ.
- Pass `name` on SelectDropdown (required for forms, and it doubles as the accessible id target).
- Rely on FormGroupLabel's `htmlFor`/`id` connection for the accessible label — this is the standard HTML pattern and preferred method. Do not use `aria-label` when a FormGroupLabel is present, as it overrides the visible label.
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

## Styling & layout props

| Prop                | Type                     | Default  | Notes                                                     |
| ------------------- | ------------------------ | -------- | --------------------------------------------------------- |
| `size`              | `'small' \| 'medium'`    | `medium` | Control height/density                                    |
| `shownOptionsLimit` | `1`–`6`                  | `6`      | Visible options before the menu scrolls                   |
| `inputWidth`        | `string \| number`       | —        | Width of the input independent of the menu                |
| `dropdownWidth`     | `string \| number`       | —        | Width of the menu independent of the input                |
| `menuAlignment`     | `'left' \| 'right'`      | `left`   | Menu edge alignment                                       |
| `zIndex`            | `number`                 | auto     | Menu z-index                                              |
| `inputProps`        | `{ hidden?, combobox? }` | —        | `data-*` / `aria-*` only, forwarded to the input elements |

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
