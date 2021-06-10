import { Theme } from '@emotion/react';
import { isObject, merge } from 'lodash';

import { CSSObject } from '../types/props';

/**
 * Returns an type of any object with { key: 'var(--key) }
 */
export type KeyAsVariable<
  T extends Record<string, any>,
  Prefix extends string
> = {
  [V in keyof T]: `var(--${Prefix}-${Extract<V, string>})`;
};

const templateBreakpoints = (
  value: string | number | CSSObject,
  alias: string,
  theme: Theme | undefined
) => {
  if (isObject(value)) {
    const { _, base, ...rest } = value;
    const css = {
      [alias]: _ ?? base,
    };

    if (theme) {
      const { breakpoints } = theme;
      Object.keys(breakpoints).forEach((key) => {
        css[breakpoints[key as keyof typeof breakpoints]] = {
          [alias]: rest[key],
        };
      });
    }

    return css;
  }
  return { [alias]: value };
};

type SerializedTokensInput = Record<
  string,
  string | number | CSSObject | SerializedTokensInputRecursive
>;

interface SerializedTokensInputRecursive {
  [i: number]: SerializedTokensInput;
  [i: string]: SerializedTokensInput;
}

export const serializeTokens = <
  T extends SerializedTokensInput,
  Prefix extends string
>(
  tokens: T,
  prefix: Prefix,
  theme: Theme | undefined
): {
  tokens: KeyAsVariable<T, Prefix>;
  variables: CSSObject;
} => {
  const tokenReferences = {} as Record<string, string>;
  const tokenVariables: CSSObject = {};

  Object.keys(tokens).forEach((key) => {
    const varName = `--${prefix}-${key}`;
    tokenReferences[key] = `var(${varName})`;

    merge(tokenVariables, templateBreakpoints(tokens[key], varName, theme));
  });

  return {
    tokens: tokenReferences as KeyAsVariable<T, Prefix>,
    variables: tokenVariables,
  };
};
