# Styling Rules

- **Never use inline `style` attributes, and never use Emotion's inline `css` prop.** All styling must use system props
  or Gamut tokens — never the `style` JSX attribute, an inline `css={...}` prop on an element, or hardcoded values. Use `css()`/`variant()`/`states()` composed on a `styled` component instead of writing `css={...}` inline.
- **Use system props shorthand** for layout and spacing. Prefer abbreviated
  prop names over long-form equivalents.
- **Never use SCSS/CSS modules or `className`** on a Gamut component
  (`Box`, `FlexBox`, `Text`, `FillButton`, etc.) for styling — bypasses
  `ColorMode` token propagation and system-prop composition. `className` is
  acceptable only as an integration seam a third-party library requires —
  call it out explicitly when used (see Departures below), never as a
  styling mechanism.
- **Avoid nested selectors** in styled/Emotion template literals (bare tag
  selectors, `${Component} { }` child selectors) — style the target
  directly with system props or `as`, not from a parent wrapper.

**If a case looks like it needs inline `style`, it almost never does** —
`css()`/`variant()`/`states()` (below) cover effectively everything system
props don't, including things that feel like edge cases:

- _Absolute-positioned icon inside an `Input`_ — not a `style={{ position:
'absolute' }}` job. Use `system.positioning` props (`position`, `top`,
  `left`) directly on a wrapping `Box`, or `css({ position: 'absolute', ... })`
  if the positioning is conditional/branching.
- _Fixed control widths that don't map to a spacing token_ — still a system
  prop (`width="240px"` works with any CSS length, not just scale values) or
  `css({ width: '240px' })`, not `style`.

If you genuinely hit something neither system props nor `css()`/`variant()`/
`states()` can express, that's a Departures case (below) — say so explicitly,
don't silently reach for `style`.

## System props shorthand

| Long form       | Shorthand |
| --------------- | --------- |
| `margin`        | `m`       |
| `marginTop`     | `mt`      |
| `marginRight`   | `mr`      |
| `marginBottom`  | `mb`      |
| `marginLeft`    | `ml`      |
| `marginX`       | `mx`      |
| `marginY`       | `my`      |
| `padding`       | `p`       |
| `paddingTop`    | `pt`      |
| `paddingRight`  | `pr`      |
| `paddingBottom` | `pb`      |
| `paddingLeft`   | `pl`      |
| `paddingX`      | `px`      |
| `paddingY`      | `py`      |

Use `mb={16}`, not `marginBottom={16}` or `style={{ marginBottom: 16 }}`.

## Border and color shorthand

| Category | Props                                                                                                            |
| -------- | ---------------------------------------------------------------------------------------------------------------- |
| Borders  | `border`, `borderTop`, `borderRight`, `borderBottom`, `borderLeft`, `borderColor`, `borderWidth`, `borderRadius` |
| Colors   | `bg` (background), `textColor`, `color`                                                                          |

Values are Gamut tokens — `borderColor="navy-300"`, `bg="background-primary"`, `textColor="text-secondary"`. Never raw hex.

**Availability varies by component.** These props are fully available on layout primitives (`Box`, `FlexBox`, `Text`, `Background`).

## System prop groups

`Box`, `FlexBox`, and `GridBox` compose several theme-connected prop groups at once.

| Group                | Covers                                                | Key props                                                                        |
| -------------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------- |
| `system.layout`      | dimensions, display, overflow, flex/grid item props   | `display`, `width`, `height`, `overflow*`, `flexGrow`, `gridColumn`, `alignSelf` |
| `system.space`       | margin/padding on the spacing scale                   | see shorthand table above                                                        |
| `system.color`       | foreground/background/border colors, theme-restricted | `color`, `textColor`, `bg`, `borderColor`                                        |
| `system.typography`  | text styling on theme scales                          | `fontFamily`, `fontSize`, `fontWeight`, `lineHeight`, `textAlign`                |
| `system.border`      | border width/style/radius/color                       | `border`, `borderRadius`, `borderWidth`                                          |
| `system.flex`        | flexbox child/container props                         | `flex`, `flexDirection`, `alignItems`, `justifyContent`, `gap`                   |
| `system.grid`        | CSS Grid container/child props                        | `gridTemplateColumns`, `gridTemplateAreas`, `gridArea`                           |
| `system.positioning` | position and offsets                                  | `position`, `top`, `left`, `zIndex`                                              |
| `system.shadow`      | box/text shadow                                       | `boxShadow`, `textShadow`                                                        |

### Responsive values

All system props accept responsive values, mobile-first (min-width queries), as an object or array:

```jsx
<Box width={{ _: '100%', sm: '50%', md: '33%' }} px={{ _: 8, md: 16 }} />
<Box width={['100%', , '50%']} p={[8, 16, , 24]} />
```

`_` is the base (no breakpoint). Container-query keys (`c_xs`…`c_xl`) apply to a containment context instead of the viewport — the parent must set `containerType="inline-size"`.

## `css()`, `variant()`, `states()` — for anything system props can't express

When a style can't be expressed as a system prop, compose it with `css()`, `variant()`, or `states()` (available on `window.CodecademyGamut`) alongside `styled` from Emotion — these read from the same token scales as system props (semantic colors track `ColorMode` and theme).

```jsx
const { css, variant, states } = window.CodecademyGamut;

// css() — static style object
const styledBox = css({ bg: 'navy-400', p: 4 });

// variant() — mutually exclusive modes
const linkVariant = variant({
  base: { p: 4 },
  defaultVariant: 'interface',
  variants: {
    interface: { color: 'text', '&:hover': { color: 'text-accent' } },
    inline: { color: 'primary', '&:hover': { color: 'secondary' } },
  },
});

// states() — independent boolean toggles
const boxStates = states({
  base: { mx: 4, my: 8, p: 16 },
  disabled: { bg: 'background-disabled', color: 'text-disabled' },
});
```

Prefer semantic color keys (`primary`, `text`) over raw palette tokens (`navy-400`) so styles track `ColorMode` and theme switches.

## Departures — call out deviations, don't ship them silently

If a build genuinely can't follow one of the rules above — no semantic token fits a required color, a third-party integration needs `className` — say so explicitly (e.g. "using hex `#...` here because no semantic token matches this color; flag for design review"). A silent departure looks system-compliant when it isn't.

This applies to the _request_ as much as the output: if the designer/user asks for something outside system props, tokens, or semantic tokens (an exact hex, an arbitrary pixel value off the spacing scale, a one-off font size), tell them explicitly that it deviates from the system before implementing it. Don't silently comply with an off-system request, and don't silently coerce it to the nearest token without saying so — either way, the person asking should know the system was departed from.
