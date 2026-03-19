import isPropValid from '@emotion/is-prop-valid';
import { ClassNames } from '@emotion/react';
import { ElementType, forwardRef } from 'react';
import * as React from 'react';

type AnyProps = Record<string, any>;
/** A style argument can be a function taking props+theme and returning a style object,
 *  or a plain style object (including SerializedStyles from `@emotion/react`'s css tag). */
type StyleArg =
  | ((props: AnyProps) => AnyProps | ((props: AnyProps) => AnyProps))
  | AnyProps;

export interface CreateComponentOptions {
  shouldForwardProp?: (prop: PropertyKey) => boolean;
}

/**
 * A factory that creates a polymorphic, theme-aware React component by composing
 * variance style functions. Replaces the `styled()` + `styledOptions()` pattern
 * from `@emotion/styled` using `@emotion/react`'s cache-aware `ClassNames` helper.
 *
 * @example
 * // Instead of:
 * const Badge = styled('div', styledOptions)<BadgeProps>(badgeProps, colorVariants);
 *
 * // Use:
 * const Badge = createComponent('div', styledOptions)<BadgeProps>(badgeProps, colorVariants);
 */
/** Pick up base element/component props. For HTML string elements, exclude the deprecated
 *  `color` attribute to avoid conflicts with variance system's `color` prop. */
type BasePropsOf<El extends ElementType> =
  El extends keyof JSX.IntrinsicElements
    ? Omit<React.ComponentPropsWithoutRef<El>, 'color'>
    : React.ComponentPropsWithoutRef<El>;

export function createComponent<El extends ElementType>(
  defaultElement: El,
  options?: CreateComponentOptions
) {
  const shouldForwardPropFn = options?.shouldForwardProp;

  return function applyStyles<Props extends object>(
    ...styleFns: StyleArg[]
  ): React.ForwardRefExoticComponent<
    Props & BasePropsOf<El> & { as?: ElementType; className?: string } & React.RefAttributes<unknown>
  > {
    // Pre-collect prop names from parsers that expose them (variance parsers).
    const parserPropNames = new Set<string>(
      styleFns.flatMap((fn) => (fn as any).propNames ?? [])
    );

    const Component = forwardRef<
      unknown,
      Props & BasePropsOf<El> & { as?: ElementType; className?: string }
    >(({ as: As = defaultElement, className, ...props }: any, ref) => {
      const isStringAs = typeof As === 'string';
      const elementProps: AnyProps = {};

      for (const [key, value] of Object.entries(props)) {
        // Props consumed by parsers are never forwarded to the DOM.
        if (parserPropNames.has(key)) continue;

        if (isStringAs) {
          // For DOM elements: respect shouldForwardProp or fall back to isPropValid.
          const forward = shouldForwardPropFn
            ? shouldForwardPropFn(key)
            : isPropValid(key);
          if (forward) {
            elementProps[key] = value;
          }
        } else {
          // For component elements: forward everything; the component handles
          // its own prop filtering internally.
          elementProps[key] = value;
        }
      }

      return (
        <ClassNames>
          {({ css: emotionCss, cx, theme }) => {
            const classStyles = styleFns.map((fn) => {
              // Call the style function with all component props + the active theme.
              const result =
                typeof fn === 'function' ? fn({ ...props, theme }) : fn;
              // Handle the `(props) => css({...})` pattern where a variance css()
              // function is called inside a style function and returns another function.
              return typeof result === 'function'
                ? result({ ...props, theme })
                : result;
            });

            const generatedClassName = cx(
              emotionCss(classStyles as any),
              className
            );

            return (
              <As ref={ref} className={generatedClassName} {...elementProps} />
            );
          }}
        </ClassNames>
      );
    });

    Component.displayName = `createComponent(${
      typeof defaultElement === 'string'
        ? defaultElement
        : (defaultElement as any).displayName ||
          (defaultElement as any).name ||
          'Component'
    })`;

    return Component as any;
  };
}
