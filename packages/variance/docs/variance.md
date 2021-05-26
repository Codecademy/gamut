## `createVariant` + `createCss`

Creates `css` and `variant` functions that are typed and locked to the specific configuration.

```tsx
const config = {
  m: { property: 'margin' },
  p: { property: 'padding' },
} as const;
const varianceInstance = variance.withTheme(theme);

const variant = varianceInstance.createVariant(config);
const css = varianceInstance.createCss(config);
```

## `css`

A standalone theme aware method that accepts and object of system props and returns the correct style object. Is cached after being called with theme once, preventing more expensive calculations.

**Usage**

```tsx
const CoolStuff = styled.a(
  css({
    margin: [16, 24],
  })
);
```

## `variant`

Built on top of `css` that accepts a number of mutually exclusive states a component can be in. Options include:

- `prop`: The prop key that variants should be. Defaults to `variant`
- `defaultVariant`: The default variant that will be used if none is specified.
- `base`: A system CSS object that is shared (and overrided) by all variants. This will not be applied if no variant / default variant has been specified.
- `variants` (required): A map of keys to each possible state.
  - `key`: The name of the variant to be a possible option of the prop.
  - `value`: The system CSS Object to be applied if the variant has been selected.

**Usage**

```tsx
const Anchor = styled.a(
  variant({
    defaultVariant: 'interface',
    variants: {
      interface: {
        color: 'text',
      },
      inline: {
        color: 'primary',
      },
    },
  })
);
```

## Property Passthrough

This change lets us configure anything that is likely to be non dynamic but required for a complete and discrete style. The typings for both `variant` and `css` accept all properties that are not present on the passed configuration.

**These are still guaranteed to be typesafe by CSSType.**

These props can only be the value specified and will not accept values with the responsive syntax.

```tsx
const List = styled.ul(
  variant({
    key: 'listVariant',
    variants: {
      vertical: {
        listStyle: 'none', // not a system prop but valid
        p: 0,
        m: 0,
      },
      emoji: {
        listStyleType: '\1F44D', // not
        pr: [12, 24],
        m: 0,
      },
    },
  })
);
```

When generating the styles the function will ignore the all props not specified by our configuration and simply pass them through to the result CSSObject.

## Selector Syntax

All `css` and `variant` functions are typed to accept a single level of selectors.

1. If the style key matches a defined system prop it will allow the responsive syntax
2. If it is a valid CSS property it will allow any valid CSSType value for the property.
3. If it is none of these we assume that it is a valid selector and accept a valid configuration of 1 & 2.

This lets you specify scoped selector syntax for anything not matching a valid CSS prop or system property. This with the addition of the CSS Passthrough will allows us to create complete variants for much more complex css as scale. And create robust sharable utilities.

```tsx
const Anchor = styled.a(
  variant({
    variants: {
      interface: {
        color: 'navy',
        '&:hover': {
          textDecoration: 'none',
          border: '2px solid currentColor',
          borderWidth: { md: '4px' }, // Responsive syntax party town
        },
      },
      inline: {
        color: 'hyper',
        transition: 'scale 150ms ease',
        '&:hover': {
          textDecoration: 'underline',
          transform: 'scale(1.2)', // static properties work here too!
        },
      },
    },
  })
);
```

### Typings

```tsx
export type SelectorMap<Props, System> = {
  [K in keyof Props]?: SelectorProps<Props[K], System>;
};

export type SelectorProps<Props, System> = {
  [K in keyof Props]?: K extends keyof System
    ? System[K] // System Property Types
    : K extends keyof PropertyTypes
    ? PropertyTypes[K] // Any Valid CSS Prop
    : Omit<PropertyTypes, keyof System> & System; // No Match Opens a single level of nesting for System + General CSS;
};
```
