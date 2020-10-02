# Responsive Properties

By default, all `system` generated style functions accept responsive configurations. Responsive configurations are two basic shape a map of breakpoint aliases / values or an array of values:

```tsx
export type MediaQueryArray<Value> = [Value?, Value?, Value?, Value?, Value?];

export type MediaQueryMap<Value> = {
  xs?: Value;
  sm?: Value;
  md?: Value;
  lg?: Value;
  xl?: Value;
};

export type ResponsiveProp<Value> =
  | Value
  | MediaQueryArray<Value>
  | MediaQueryMap<Value>;
```

What this looks like in practice:

```tsx
const Box = styled.div`
  ${display}
`

// Array Syntax
<Box display={['none', ,'block']} />

// Alias Syntax
<Box display={{ xs: 'none', md: 'block' }} />
```

This will generate styles that are specific to your configured breakpoints. In our case mobile-first, `xs < sm < md < lg < xl` in order of specificity.

Output (where `md === 1024px`) :

```scss
.#{emotionHash} {
  display: 'none';

  @media (min-width: 1024px) {
    display: 'block';
  }
}
```
