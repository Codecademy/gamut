import { Theme } from '@emotion/react';
import { get } from 'lodash';

/**
 * Returns an exhaustive list of all possible paths of an object T for keys K.
 * Possibilities are returned as `k1.k2.k3`.
 */
type FindPath<T, K extends keyof T> = K extends string | number
  ? T[K] extends Record<string | number, any>
    ? T[K] extends ArrayLike<any>
      ? K | `${K}.${FindPath<T[K], Exclude<keyof T[K], keyof any[]>>}`
      : K | `${K}.${FindPath<T[K], keyof T[K]>}`
    : K
  : never;

/** Returns valid paths of object T */
type Path<T> = FindPath<T, keyof T> | keyof T;

/** Returns the value of a valid path P `k1.k2.k3` in object T */
type PathValue<T, P extends Path<T>> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? Rest extends Path<T[K]>
      ? PathValue<T[K], Rest>
      : never
    : never
  : P extends keyof T
  ? T[P]
  : never;

/**
 * Creates a function that will look up the a design token from the `theme` context of a
 * tyled component or a component that accepts theme as a prop.
 *
 * @param path Valid path for current theme
 * @returns A function that accepts an object with a keyof `theme` and looks up the
 *  value at supplied path parameter
 */

export function themed<P extends Path<Theme>>(
  path: P
): (props: { theme: Theme }) => PathValue<Theme, P> {
  return ({ theme }) => get(theme, path);
}
