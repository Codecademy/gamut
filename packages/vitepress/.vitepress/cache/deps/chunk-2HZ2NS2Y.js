// ../../node_modules/get-nonce/dist/es2015/index.js
var currentNonce;
var setNonce = function (nonce) {
  currentNonce = nonce;
};
var getNonce = function () {
  if (currentNonce) {
    return currentNonce;
  }
  if (typeof __webpack_nonce__ !== 'undefined') {
    return __webpack_nonce__;
  }
  return void 0;
};

export { setNonce, getNonce };
//# sourceMappingURL=chunk-2HZ2NS2Y.js.map
