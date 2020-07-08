/**
 * @returns A new `Promise` along with its `resolve` and `reject`.
 *
 * @remarks
 * Yes, the 'executor' passed to a Promise is executed immediately.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#Parameters
 */
export var createPromise = function createPromise() {
  var resolve;
  var reject;
  var innerPromise = new Promise(function (innerResolve, innerReject) {
    resolve = innerResolve;
    reject = innerReject;
  });
  return {
    innerPromise: innerPromise,
    reject: reject,
    resolve: resolve
  };
};