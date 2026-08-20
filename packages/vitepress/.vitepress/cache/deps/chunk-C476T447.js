import { require_baseForOwn } from './chunk-G24TPY7K.js';
import { require_isArrayLike } from './chunk-DJ6AUZB2.js';
import { __commonJS } from './chunk-4B2QHNJT.js';

// ../../node_modules/lodash/_createBaseEach.js
var require_createBaseEach = __commonJS({
  '../../node_modules/lodash/_createBaseEach.js'(exports, module) {
    var isArrayLike = require_isArrayLike();
    function createBaseEach(eachFunc, fromRight) {
      return function (collection, iteratee) {
        if (collection == null) {
          return collection;
        }
        if (!isArrayLike(collection)) {
          return eachFunc(collection, iteratee);
        }
        var length = collection.length,
          index = fromRight ? length : -1,
          iterable = Object(collection);
        while (fromRight ? index-- : ++index < length) {
          if (iteratee(iterable[index], index, iterable) === false) {
            break;
          }
        }
        return collection;
      };
    }
    module.exports = createBaseEach;
  },
});

// ../../node_modules/lodash/_baseEach.js
var require_baseEach = __commonJS({
  '../../node_modules/lodash/_baseEach.js'(exports, module) {
    var baseForOwn = require_baseForOwn();
    var createBaseEach = require_createBaseEach();
    var baseEach = createBaseEach(baseForOwn);
    module.exports = baseEach;
  },
});

export { require_baseEach };
//# sourceMappingURL=chunk-C476T447.js.map
