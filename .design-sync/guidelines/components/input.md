# Input

Standalone text input atom. For functional forms (submit/validate/reset),
compose it inside `GridForm`/`ConnectedForm` rather than using it bare — see
`forms.md`. Bare `Input` is for standalone, non-submitted controls (live
search, single-field filters).

## Controlled vs. uncontrolled

`Input` forwards standard native input attributes — it's a normal React
controlled/uncontrolled input, nothing DS-specific to opt into:

```jsx
const { Input } = window.CodecademyGamut;

// Controlled
const [value, setValue] = useState('');
<Input value={value} onChange={(e) => setValue(e.target.value)} />;

// Uncontrolled
<Input defaultValue="initial" onChange={(e) => console.log(e.target.value)} />;
```

## Icon slot — trailing, not leading

`Input`'s `icon` prop renders an icon **on the right/trailing edge** of the
field (absolutely positioned, `right: 0`), not on the left. Pass a Gamut icon
component (from `components/icons.md`):

```jsx
const { Input } = window.CodecademyGamut;
const { SearchIcon } = window.CodecademyGamut;

<Input icon={SearchIcon} placeholder="Search…" />;
```

If `error` or `valid` is set and no custom `icon` is passed, `Input`
auto-shows a state icon in that same trailing slot (`AlertIcon` for error,
`CheckCircledIcon` for valid) — don't pass a custom `icon` alongside
`error`/`valid` unless you intend to override that default.

There's no built-in leading-icon slot on `Input` — for a leading icon,
compose one yourself with a `Box position="relative"` wrapper and an
absolutely-positioned icon on the left (via `css()`/`variant()`, not inline
`style` — see `overview-styling.md`), padding the input's `pl` to clear it.

## Sizing

`size="base" | "small"` — `"small"` also applies to `type="file"` inputs
(internally normalized to a `smallFile` variant). Verify the exact size
against the Figma design rather than relying on the default.
