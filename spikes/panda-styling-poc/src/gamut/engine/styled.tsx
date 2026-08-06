import type { CSSObject, ThemeProps } from '@codecademy/variance';
import {
  type ComponentPropsWithoutRef,
  type ComponentType,
  type ElementType,
  type ForwardRefExoticComponent,
  type RefAttributes,
  createElement,
  forwardRef,
} from 'react';

import { systemPropNames } from './props';
import { inject } from './sheet';
import { useNonce, useTheme } from './theme';

/* `styled` with the Emotion composed call shape — `styled(C)(a, b, c)` — where
 * each argument is a `(props) => CSSObject` produced by css()/variant()/states()
 * or written by hand. This is the whole point of the spike: the shape is
 * preserved exactly, so existing call sites move by changing one import. */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StyleFn = (props: any) => CSSObject;

export type StyledComponent<
  T extends ElementType,
  P
> = ForwardRefExoticComponent<
  Omit<ComponentPropsWithoutRef<T>, keyof P> & P & RefAttributes<unknown>
> & {
  /** Emotion's `withComponent` — same styles, different render target. */
  withComponent: <N extends ElementType>(next: N) => StyledComponent<N, P>;
};

const isPlainObject = (value: unknown): value is CSSObject =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

// deep merge, later wins — the precedence Emotion gives composed arguments
const merge = (target: CSSObject, source: CSSObject): CSSObject => {
  Object.entries(source).forEach(([key, value]) => {
    const existing = (target as Record<string, unknown>)[key];
    (target as Record<string, unknown>)[key] =
      isPlainObject(value) && isPlainObject(existing)
        ? merge({ ...existing }, value)
        : value;
  });
  return target;
};

const STYLES = Symbol.for('gamut.styles');
const TARGET = Symbol.for('gamut.target');

type StyledMeta = { [STYLES]?: StyleFn[]; [TARGET]?: ElementType };

export type StyledOptions = { shouldForwardProp?: (prop: string) => boolean };

/* Which props a style function reads. variance parsers (`variance.create`) expose
 * this natively; props.ts adds it to css/variant/states. */
const consumedProps = (fns: StyleFn[]) => {
  const consumed = new Set<string>();
  fns.forEach((fn) =>
    (fn as { propNames?: string[] }).propNames?.forEach((name) =>
      consumed.add(name)
    )
  );
  return consumed;
};

/* Emotion semantics plus two improvements: `$`-prefixed transient props never
 * reach the DOM (the styled-components convention the spike's styledDynamic
 * already uses), and any prop a style function declared it consumes is filtered
 * automatically — so `styledOptions([...])` lists don't need porting. */
const defaultForward =
  (target: ElementType, consumed: Set<string>) => (prop: string) => {
    if (prop.startsWith('$') || consumed.has(prop)) return false;
    return typeof target === 'string' ? !systemPropNames.has(prop) : true;
  };

const displayNameOf = (target: ElementType) =>
  typeof target === 'string'
    ? target
    : (target as ComponentType).displayName ??
      (target as ComponentType).name ??
      'Component';

const styledFactory =
  <T extends ElementType>(Component: T, options: StyledOptions = {}) =>
  <P extends object = Record<never, never>>(
    ...styleFns: StyleFn[]
  ): StyledComponent<T, P> => {
    const meta = Component as unknown as StyledMeta;

    /* Extending an already-styled component flattens into ONE class instead of
     * relying on cascade order — strictly more deterministic than Emotion, where
     * override precedence depends on stylesheet insertion order. */
    const target = (meta[TARGET] ?? Component) as ElementType;
    const fns = [...(meta[STYLES] ?? []), ...styleFns];

    /* Recomputed from the whole chain, not inherited — extending adds style fns
     * with their own consumed props, which a parent's filter can't know about. */
    const shouldForward =
      options.shouldForwardProp ?? defaultForward(target, consumedProps(fns));

    const Styled = forwardRef<unknown, Record<string, unknown>>(
      (props, ref) => {
        const theme = useTheme();
        const nonce = useNonce();

        const resolved = fns.reduce<CSSObject>(
          (acc, fn) => merge(acc, fn({ ...props, theme } as ThemeProps)),
          {}
        );

        const className = [inject(resolved, nonce), props.className]
          .filter(Boolean)
          .join(' ');

        const domProps: Record<string, unknown> = { ref, className };
        Object.entries(props).forEach(([key, value]) => {
          if (key !== 'className' && shouldForward(key)) domProps[key] = value;
        });

        return createElement(target, domProps);
      }
    );

    Styled.displayName = `styled(${displayNameOf(target)})`;

    const withMeta = Styled as unknown as StyledMeta & {
      withComponent: <N extends ElementType>(next: N) => StyledComponent<N, P>;
    };
    withMeta[STYLES] = fns;
    withMeta[TARGET] = target;

    /* Kept because it's used 379 times in mono alone (mostly
     * `Box.withComponent('img')`) and costs nothing here: styles and target are
     * already tracked separately. Accepts component targets too
     * (`iFrameWrapper.withComponent(CardElement)`). Prefer `as` in new code. */
    withMeta.withComponent = <N extends ElementType>(next: N) =>
      styledFactory(next)<P>(...fns);

    return Styled as unknown as StyledComponent<T, P>;
  };

/* ---------------------------------------------------------------------------
 * Template-literal support (`styled.div`...``)
 *
 * codemod-feasibility.md classes this shape as permanently UNSUPPORTED under
 * static extraction — 234 sites in mono, 56 in platform, "no static-analysis
 * cleverness closes that gap." A runtime engine closes it with a small parser,
 * which is the single biggest divergence between the two migration paths.
 * Deliberately minimal: no at-rule or comment handling.
 * ------------------------------------------------------------------------- */

const camel = (prop: string) =>
  prop.startsWith('--')
    ? prop
    : prop.replace(/-([a-z])/g, (_, char: string) => char.toUpperCase());

const addDeclaration = (out: Record<string, unknown>, chunk: string) => {
  const split = chunk.indexOf(':');
  if (split === -1) return;
  const prop = chunk.slice(0, split).trim();
  const value = chunk.slice(split + 1).trim();
  if (prop && value) out[camel(prop)] = value;
};

const parseCss = (input: string): CSSObject => {
  const out: Record<string, unknown> = {};
  let buffer = '';
  let selector = '';
  let depth = 0;

  for (let i = 0; i < input.length; i += 1) {
    const char = input[i];

    if (char === '{') {
      if (depth === 0) {
        selector = buffer.trim();
        buffer = '';
      } else {
        buffer += char;
      }
      depth += 1;
      continue;
    }

    if (char === '}') {
      depth -= 1;
      if (depth === 0) {
        out[selector] = parseCss(buffer);
        buffer = '';
      } else {
        buffer += char;
      }
      continue;
    }

    if (char === ';' && depth === 0) {
      addDeclaration(out, buffer);
      buffer = '';
      continue;
    }

    buffer += char;
  }

  if (depth === 0 && buffer.trim()) addDeclaration(out, buffer);
  return out as CSSObject;
};

export type Interpolation =
  | string
  | number
  | null
  | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | ((props: any) => unknown);

type TemplateTag<T extends ElementType> = <
  P extends object = Record<never, never>
>(
  strings: TemplateStringsArray,
  ...interpolations: Interpolation[]
) => StyledComponent<T, P>;

const templateFactory =
  <T extends ElementType>(target: T): TemplateTag<T> =>
  <P extends object = Record<never, never>>(
    strings: TemplateStringsArray,
    ...interpolations: Interpolation[]
  ) =>
    styledFactory(target)<P>((props) => {
      let source = strings[0];
      interpolations.forEach((raw, index) => {
        // function interpolations are exactly the prop-dependent case
        const value = typeof raw === 'function' ? raw(props) : raw;
        source += `${value ?? ''}${strings[index + 1]}`;
      });
      return parseCss(source);
    });

type StyledFactory = typeof styledFactory & {
  [Tag in keyof JSX.IntrinsicElements]: TemplateTag<Tag>;
};

/** `styled(Component)(…)` and `styled.div\`…\`` from one export, as Emotion. */
export const styled = new Proxy(styledFactory, {
  get: (base, tag: string, receiver) =>
    Reflect.has(base, tag)
      ? Reflect.get(base, tag, receiver)
      : templateFactory(tag as keyof JSX.IntrinsicElements),
}) as StyledFactory;
