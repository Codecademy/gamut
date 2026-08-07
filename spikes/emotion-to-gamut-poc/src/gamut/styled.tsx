import type { CSSObject, ThemeProps } from '@codecademy/variance';
import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type ForwardRefExoticComponent,
  type RefAttributes,
  createElement,
  forwardRef,
} from 'react';

import { systemPropNames } from './props';
import { inject } from './sheet';
import { useTheme } from './theme';

/* `styled` with Emotion's composed call shape — `styled(C)(a, b, c)` — where each
 * argument is a `(props) => CSSObject` from css()/variant()/states() or written by
 * hand. Identical signature, so call sites change only their import. */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StyleFn = (props: any) => CSSObject;

export type StyledComponent<
  T extends ElementType,
  P
> = ForwardRefExoticComponent<
  Omit<ComponentPropsWithoutRef<T>, keyof P> & P & RefAttributes<unknown>
> & {
  /** Emotion's `withComponent` — same styles, different element. */
  withComponent: <N extends ElementType>(next: N) => StyledComponent<N, P>;
};

const isPlainObject = (v: unknown): v is CSSObject =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

// deep merge, later wins — the precedence Emotion gives composed arguments
const merge = (target: CSSObject, source: CSSObject): CSSObject => {
  Object.entries(source).forEach(([key, val]) => {
    const existing = (target as Record<string, unknown>)[key];
    (target as Record<string, unknown>)[key] =
      isPlainObject(val) && isPlainObject(existing)
        ? merge({ ...existing }, val)
        : val;
  });
  return target;
};

const STYLES = Symbol.for('gamut.styles');
const TARGET = Symbol.for('gamut.target');
type Meta = { [STYLES]?: StyleFn[]; [TARGET]?: ElementType };

export type StyledOptions = { shouldForwardProp?: (prop: string) => boolean };

/* Which props the style functions read — variance parsers and our css/variant/
 * states wrappers all report this, so state props are filtered automatically. */
const consumedProps = (fns: StyleFn[]) => {
  const consumed = new Set<string>();
  fns.forEach((fn) =>
    (fn as { propNames?: string[] }).propNames?.forEach((n) => consumed.add(n))
  );
  return consumed;
};

/* Emotion's rule (string tags filter style props, component targets forward
 * everything) plus: `$`-prefixed transient props and any consumed prop never
 * reach the DOM. */
const defaultForward =
  (target: ElementType, consumed: Set<string>) => (prop: string) => {
    if (prop.startsWith('$') || consumed.has(prop)) return false;
    return typeof target === 'string' ? !systemPropNames.has(prop) : true;
  };

const styledFactory =
  <T extends ElementType>(Component: T, options: StyledOptions = {}) =>
  <P extends object = Record<never, never>>(
    ...styleFns: StyleFn[]
  ): StyledComponent<T, P> => {
    const meta = Component as unknown as Meta;

    /* Extending an already-styled component flattens into ONE class rather than
     * relying on stylesheet order — more deterministic than Emotion. */
    const target = (meta[TARGET] ?? Component) as ElementType;
    const fns = [...(meta[STYLES] ?? []), ...styleFns];
    const consumed = consumedProps(fns);
    const shouldForward =
      options.shouldForwardProp ?? defaultForward(target, consumed);

    const Styled = forwardRef<unknown, Record<string, unknown>>(
      (props, ref) => {
        const theme = useTheme();

        const resolved = fns.reduce<CSSObject>(
          (acc, fn) => merge(acc, fn({ ...props, theme } as ThemeProps)),
          {}
        );

        const className = [inject(resolved), props.className]
          .filter(Boolean)
          .join(' ');

        const domProps: Record<string, unknown> = { ref, className };
        Object.entries(props).forEach(([key, val]) => {
          if (key !== 'className' && shouldForward(key)) domProps[key] = val;
        });

        return createElement(target, domProps);
      }
    );

    Styled.displayName = `styled(${
      typeof target === 'string' ? target : 'Component'
    })`;

    const withMeta = Styled as unknown as Meta & {
      withComponent: <N extends ElementType>(next: N) => StyledComponent<N, P>;
    };
    withMeta[STYLES] = fns;
    withMeta[TARGET] = target;
    withMeta.withComponent = <N extends ElementType>(next: N) =>
      styledFactory(next)<P>(...fns);

    return Styled as unknown as StyledComponent<T, P>;
  };

/* ---- `styled.div\`…\`` template literals -------------------------------------
 * mono has 234 of these. A small CSS-block parser covers them, including
 * `${props => …}` interpolation. Not a full CSS grammar; no comments or at-rules.
 * -------------------------------------------------------------------------- */

const camel = (p: string) =>
  p.startsWith('--')
    ? p
    : p.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());

const addDecl = (out: Record<string, unknown>, chunk: string) => {
  const i = chunk.indexOf(':');
  if (i === -1) return;
  const prop = chunk.slice(0, i).trim();
  const val = chunk.slice(i + 1).trim();
  if (prop && val) out[camel(prop)] = val;
};

const parseCss = (input: string): CSSObject => {
  const out: Record<string, unknown> = {};
  let buffer = '';
  let selector = '';
  let depth = 0;

  for (const char of input) {
    if (char === '{') {
      if (depth === 0) {
        selector = buffer.trim();
        buffer = '';
      } else buffer += char;
      depth += 1;
    } else if (char === '}') {
      depth -= 1;
      if (depth === 0) {
        out[selector] = parseCss(buffer);
        buffer = '';
      } else buffer += char;
    } else if (char === ';' && depth === 0) {
      addDecl(out, buffer);
      buffer = '';
    } else buffer += char;
  }

  if (depth === 0 && buffer.trim()) addDecl(out, buffer);
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
      interpolations.forEach((raw, i) => {
        const val = typeof raw === 'function' ? raw(props) : raw;
        source += `${val ?? ''}${strings[i + 1]}`;
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
