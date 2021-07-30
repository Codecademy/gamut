import { isObject } from 'lodash';

/**
 * Returns an exhaustive list of all possible paths of an object T for keys K.
 * Possibilities are returned as `k1.k2.k3`.
 */
export type FindPath<T, K extends keyof T, D extends string = '.'> = K extends
  | string
  | number
  ? T[K] extends Record<string | number, any>
    ? T[K] extends ArrayLike<any>
      ? K | `${K}${D}${FindPath<T[K], Exclude<keyof T[K], keyof any[]>, D>}`
      : K | `${K}${D}${FindPath<T[K], keyof T[K], D>}`
    : K
  : never;

/** Returns valid paths of object T */
export type Path<T, D extends string = '.'> = FindPath<T, keyof T, D> | keyof T;

/** Returns the value of a valid path P `k1.k2.k3` in object T */
export type PathValue<
  T,
  P extends Path<T, D>,
  D extends string = '.'
> = P extends `${infer K}${D}${infer Rest}`
  ? K extends keyof T
    ? Rest extends Path<T[K], D>
      ? PathValue<T[K], Rest, D>
      : never
    : never
  : P extends keyof T
  ? T[P]
  : never;

/** Check if path has a primitive end value and return only the union of end paths */
export type PathToLiteral<
  T,
  K extends Path<T, D>,
  D extends string = '.',
  Base extends string = ''
> = PathValue<T, K, D> extends string | number
  ? K extends string | number
    ? K extends `${infer BasePath}${D}${Base}`
      ? BasePath
      : K
    : never
  : never;

/**
 * Reduce all paths to a single map of paths with primitive values removing all extra non stateful paths
 * { path: { sub: 1 } } => { 'path-sub': 1 }
 *
 */
export type LiteralPaths<
  T extends Record<string | number, any>,
  D extends string = '.',
  Base extends string = ''
> = {
  [K in Path<T, D> as PathToLiteral<T, K, D, Base>]: PathValue<
    T,
    PathToLiteral<T, K, D>,
    D
  >;
};

export function flattenScale<
  T extends Record<string | number, any>,
  P extends string
>(object: T, path?: P): LiteralPaths<T, '-', '_'> {
  return Object.keys(object).reduce((carry, key) => {
    const nextKey = path ? `${path}${key === '_' ? '' : `-${key}`}` : key;
    const current = object[key];
    if (isObject(current)) {
      return {
        ...carry,
        ...flattenScale(current, nextKey),
      };
    }
    return {
      ...carry,
      [nextKey]: object[key],
    };
  }, {} as LiteralPaths<T, '-', '_'>);
}
