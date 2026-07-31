import {
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ElementType,
  createElement,
  forwardRef,
} from 'react';

/* ESCAPE HATCH #2 — runtime `styled` for genuinely dynamic, prop-dependent
 * styles that a static extractor can't evaluate (e.g. `width: ${percent}%`,
 * `color: $active ? primary : disabled`). This is the small residual from the
 * usage survey (mono's ~825 prop-interpolated `styled` sites).
 *
 * It preserves the `styled(Tag)(props => styles)` AUTHORING SHAPE but applies the
 * computed flat style object as an inline `style` — forfeiting zero-runtime for
 * THIS component only. Transient style-only props are named `$foo` and stripped
 * from the DOM (same convention as styled-components). For dynamic styles that
 * need pseudo-selectors, use `variant()`/`states()` (static) instead — this hatch
 * is for dynamic VALUES.
 *
 * The idiomatic zero-runtime alternative is an inline CSS variable
 * (`style={{ '--x': v }}` + a static class using `var(--x)`); this factory keeps
 * the old call-site shape for a drop-in codemod target. */
export const styledDynamic =
  <T extends ElementType>(Component: T) =>
  <P extends Record<`$${string}`, unknown>>(
    styleFn: (props: P) => CSSProperties
  ) =>
    forwardRef<unknown, ComponentPropsWithoutRef<T> & P>((props, ref) => {
      const dynamicStyle = styleFn(props as unknown as P);

      // strip `$`-prefixed transient props so they don't leak onto the DOM node
      const domProps: Record<string, unknown> = { ref };
      for (const [key, value] of Object.entries(props)) {
        if (!key.startsWith('$')) domProps[key] = value;
      }
      domProps.style = {
        ...dynamicStyle,
        ...(props as { style?: CSSProperties }).style,
      };

      return createElement(Component, domProps);
    });
