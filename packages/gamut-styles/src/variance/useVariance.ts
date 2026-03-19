import { AbstractProps, CSSObject, ThemeProps } from '@codecademy/variance';
import isPropValid from '@emotion/is-prop-valid';
import { __unsafe_useEmotionCache, useTheme } from '@emotion/react';
import { serializeStyles } from '@emotion/serialize';
import { insertStyles } from '@emotion/utils';
import merge from 'lodash/merge';

/**
 * A variance parser produced by `variance.create()` or `variance.compose()`.
 * It has a `propNames` array listing every CSS system prop it handles.
 */
interface AbstractParser {
  (props: AbstractProps): CSSObject;
  propNames: string[];
}

/**
 * A style function that accepts themed props and returns a CSSObject.
 * This includes both `AbstractParser` instances (which have `propNames`) and
 * plain style functions created by `css()`, `variant()`, or `states()`.
 */
type StyleFn = ((props: ThemeProps) => CSSObject) | AbstractParser;

/**
 * Checks whether a style function is an `AbstractParser` with a `propNames` list.
 */
function isAbstractParser(fn: StyleFn): fn is AbstractParser {
  return 'propNames' in fn && Array.isArray((fn as AbstractParser).propNames);
}

/**
 * Collects all system prop names from parsers that expose `propNames`.
 */
function collectPropNames(parsers: StyleFn[]): Set<string> {
  const names = new Set<string>();
  for (const parser of parsers) {
    if (isAbstractParser(parser)) {
      for (const name of parser.propNames) {
        names.add(name);
      }
    }
  }
  return names;
}

export interface UseVarianceResult {
  /** The merged Emotion class name (incoming className + generated styles). */
  className: string;
  /** Props with system props and non-HTML-valid props removed, ready to spread onto a DOM element. */
  rest: Record<string, unknown>;
}

/**
 * A React hook that processes system/variance props into an Emotion class name
 * and returns the remaining DOM-safe props.
 *
 * @param props - The component's full props object.
 * @param parsers - One or more variance parsers or style functions to apply.
 * @returns `{ className, rest }` where `rest` is safe to spread onto a DOM element.
 *
 * @example
 * ```tsx
 * const MyBox = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
 *   const { className, rest } = useVariance(props, boxProps, sharedStates);
 *   return <div ref={ref} {...rest} className={className} />;
 * });
 * ```
 */
export function useVariance(
  props: Record<string, unknown>,
  ...parsers: StyleFn[]
): UseVarianceResult {
  const theme = useTheme();
  const cache = __unsafe_useEmotionCache();

  // Run each parser with the theme-enriched props and merge all CSSObjects.
  const propsWithTheme: ThemeProps = { ...props, theme };
  const cssObjects = parsers.map((parser) => parser(propsWithTheme));
  const merged: CSSObject = merge({}, ...cssObjects);

  // Serialize and inject the merged styles into the active Emotion cache.
  let generatedClassName = '';
  if (cache !== null && Object.keys(merged).length > 0) {
    const serialized = serializeStyles([merged], cache.registered);
    insertStyles(cache, serialized, false);
    generatedClassName = `${cache.key}-${serialized.name}`;
  }

  // Merge any incoming className with the generated one.
  const incomingClassName =
    typeof props.className === 'string' ? props.className : '';
  const className = [incomingClassName, generatedClassName]
    .filter(Boolean)
    .join(' ');

  // Build the `rest` object: exclude `theme`, `className`, system prop names,
  // and any props that are not valid HTML attributes.
  const systemPropNames = collectPropNames(parsers);

  const rest: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(props)) {
    if (key === 'className' || key === 'theme') continue;
    if (systemPropNames.has(key)) continue;
    if (!isPropValid(key)) continue;
    rest[key] = value;
  }
  // Add the merged className last so it is always present and reflects
  // both any incoming className and the generated Emotion class name.
  rest.className = className;

  return { className, rest };
}
