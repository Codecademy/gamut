import { __commonJS } from './chunk-4B2QHNJT.js';

// ../../node_modules/lodash/isLength.js
var require_isLength = __commonJS({
  '../../node_modules/lodash/isLength.js'(exports, module) {
    var MAX_SAFE_INTEGER = 9007199254740991;
    function isLength(value) {
      return (
        typeof value == 'number' &&
        value > -1 &&
        value % 1 == 0 &&
        value <= MAX_SAFE_INTEGER
      );
    }
    module.exports = isLength;
  },
});

export { require_isLength };
//# sourceMappingURL=chunk-PY63MGA6.js.map
