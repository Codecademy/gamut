import { Path, PathValue } from '@codecademy/variance';
import { Theme } from '@emotion/react';
import get from 'lodash/get';

/**
 * Creates a function that will look up the a design token from the `theme` context of a
 * tyled component or a component that accepts theme as a prop.
 *
 * @param path Valid path for current theme
 * @returns A function that accepts an object with a keyof `theme` and looks up the
 *  value at supplied path parameter
 */

export type SafeThemeValues = Omit<
  Theme,
  '_variables' | '_tokens' | '_getColorValue' | 'modes'
>;

export function themed<P extends Path<SafeThemeValues>>(
  path: P
): (props: { theme: Theme }) => PathValue<SafeThemeValues, P> {
  return ({ theme }) => get(theme, path as string);
}
