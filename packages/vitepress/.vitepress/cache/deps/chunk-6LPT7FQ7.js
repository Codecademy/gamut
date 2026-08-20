import { __commonJS } from './chunk-4B2QHNJT.js';

// ../../node_modules/lodash/_arrayMap.js
var require_arrayMap = __commonJS({
  '../../node_modules/lodash/_arrayMap.js'(exports, module) {
    function arrayMap(array, iteratee) {
      var index = -1,
        length = array == null ? 0 : array.length,
        result = Array(length);
      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }
    module.exports = arrayMap;
  },
});

export { require_arrayMap };
//# sourceMappingURL=chunk-6LPT7FQ7.js.map
