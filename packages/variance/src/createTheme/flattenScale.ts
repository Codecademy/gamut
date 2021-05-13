import { isObject } from 'lodash';

/**
 * Returns an exhaustive list of all possible paths of an object T for keys K.
 * Possibilities are returned as `k1.k2.k3`.
 */
export type FindPath<T, K extends keyof T> = K extends string | number
  ? T[K] extends Record<string | number, any>
    ? T[K] extends ArrayLike<any>
      ? K | `${K}-${FindPath<T[K], Exclude<keyof T[K], keyof any[]>>}`
      : K | `${K}-${FindPath<T[K], keyof T[K]>}`
    : K
  : never;

/** Returns valid paths of object T */
export type Path<T> = FindPath<T, keyof T> | keyof T;

/** Returns the value of a valid path P `k1.k2.k3` in object T */
export type PathValue<
  T,
  P extends Path<T>
> = P extends `${infer K}-${infer Rest}`
  ? K extends keyof T
    ? Rest extends Path<T[K]>
      ? PathValue<T[K], Rest>
      : never
    : never
  : P extends keyof T
  ? T[P]
  : never;

/** Check if path has a primitive end value and return only the union of end paths */
export type PathToLiteral<T, K extends Path<T>> = PathValue<T, K> extends
  | string
  | number
  ? K extends string | number
    ? K
    : never
  : never;

/**
 * Reduce all paths to a single map of paths with primitive values removing all extra non stateful paths
 * { path: { sub: 1 } } => { 'path-sub': 1 }
 *
 */
export type LiteralPaths<T extends Record<string | number, any>> = {
  [K in Path<T> as PathToLiteral<T, K>]: PathValue<T, PathToLiteral<T, K>>;
};

export function flattenObject<
  T extends Record<string | number, any>,
  P extends string
>(object: T, path?: P): LiteralPaths<T> {
  return Object.keys(object).reduce((carry, key) => {
    const nextKey = path ? `${path}-${key}` : key;
    const current = object[key];
    if (isObject(current)) {
      return {
        ...carry,
        ...flattenObject(current, nextKey),
      };
    }
    return {
      ...carry,
      [nextKey]: object[key],
    };
  }, {} as LiteralPaths<T>);
}
