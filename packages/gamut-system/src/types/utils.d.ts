/** Utility  */
export declare type UnionToIntersection<Union> = (
  Union extends any ? (k: Union) => void : never
) extends (k: infer Intersection) => void
  ? Intersection
  : never;
export declare type NeverUnknown<Value> = Value extends string
  ? Value
  : Value extends number
  ? Value
  : Value extends unknown
  ? never
  : Value;
export declare type SafeLookup<MaybeArray> = MaybeArray extends Readonly<
  unknown[]
>
  ? MaybeArray[number]
  : never;
export declare type SafeMapKey<MaybeMap> = MaybeMap extends Readonly<
  Record<string, unknown>
>
  ? keyof MaybeMap
  : never;
export declare type WeakRecord<T extends string | number | symbol, K> = Partial<
  Record<T, K>
>;
