export declare type AllUnionKeys<T> = T extends any ? keyof T : never;
export declare type KeyFromUnion<T, K> = T extends any ? K extends keyof T ? T[K] : never : never;
export declare type Key<T> = T extends string ? T : never;
