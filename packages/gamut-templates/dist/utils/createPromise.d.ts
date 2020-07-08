export declare type CreatedPromise<T> = {
    innerPromise: Promise<T>;
    reject: (reason?: any) => void;
    resolve: (value?: T | PromiseLike<T> | undefined) => void;
};
/**
 * @returns A new `Promise` along with its `resolve` and `reject`.
 *
 * @remarks
 * Yes, the 'executor' passed to a Promise is executed immediately.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#Parameters
 */
export declare const createPromise: <T>() => CreatedPromise<T>;
