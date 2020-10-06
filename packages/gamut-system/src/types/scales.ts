export type ScaleArray = Readonly<unknown[]>;

export type ScaleMap = Readonly<Record<string | number, unknown>>;

export type SystemScales = ScaleArray | ScaleMap | Readonly<string>;
