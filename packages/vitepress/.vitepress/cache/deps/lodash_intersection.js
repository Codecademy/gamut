import {
  require_arrayIncludes,
  require_arrayIncludesWith,
} from './chunk-KUYNNVNS.js';
import {
  require_baseRest,
  require_isArrayLikeObject,
} from './chunk-VPWSID2I.js';
import './chunk-P2SXEXRM.js';
import { require_SetCache, require_cacheHas } from './chunk-67PVUVG4.js';
import { require_baseUnary } from './chunk-DJ6AUZB2.js';
import './chunk-X4575NEQ.js';
import './chunk-DSHCLZZZ.js';
import './chunk-PY63MGA6.js';
import './chunk-MRFDMUT5.js';
import './chunk-ESHVIK4X.js';
import { require_arrayMap } from './chunk-6LPT7FQ7.js';
import './chunk-C4YMECY4.js';
import './chunk-PG56PVWR.js';
import './chunk-KB4OAGHR.js';
import { __commonJS } from './chunk-4B2QHNJT.js';

// ../../node_modules/lodash/_baseIntersection.js
var require_baseIntersection = __commonJS({
  '../../node_modules/lodash/_baseIntersection.js'(exports, module) {
    var SetCache = require_SetCache();
    var arrayIncludes = require_arrayIncludes();
    var arrayIncludesWith = require_arrayIncludesWith();
    var arrayMap = require_arrayMap();
    var baseUnary = require_baseUnary();
    var cacheHas = require_cacheHas();
    var nativeMin = Math.min;
    function baseIntersection(arrays, iteratee, comparator) {
      var includes = comparator ? arrayIncludesWith : arrayIncludes,
        length = arrays[0].length,
        othLength = arrays.length,
        othIndex = othLength,
        caches = Array(othLength),
        maxLength = Infinity,
        result = [];
      while (othIndex--) {
        var array = arrays[othIndex];
        if (othIndex && iteratee) {
          array = arrayMap(array, baseUnary(iteratee));
        }
        maxLength = nativeMin(array.length, maxLength);
        caches[othIndex] =
          !comparator && (iteratee || (length >= 120 && array.length >= 120))
            ? new SetCache(othIndex && array)
            : void 0;
      }
      array = arrays[0];
      var index = -1,
        seen = caches[0];
      outer: while (++index < length && result.length < maxLength) {
        var value = array[index],
          computed = iteratee ? iteratee(value) : value;
        value = comparator || value !== 0 ? value : 0;
        if (
          !(seen
            ? cacheHas(seen, computed)
            : includes(result, computed, comparator))
        ) {
          othIndex = othLength;
          while (--othIndex) {
            var cache = caches[othIndex];
            if (
              !(cache
                ? cacheHas(cache, computed)
                : includes(arrays[othIndex], computed, comparator))
            ) {
              continue outer;
            }
          }
          if (seen) {
            seen.push(computed);
          }
          result.push(value);
        }
      }
      return result;
    }
    module.exports = baseIntersection;
  },
});

// ../../node_modules/lodash/_castArrayLikeObject.js
var require_castArrayLikeObject = __commonJS({
  '../../node_modules/lodash/_castArrayLikeObject.js'(exports, module) {
    var isArrayLikeObject = require_isArrayLikeObject();
    function castArrayLikeObject(value) {
      return isArrayLikeObject(value) ? value : [];
    }
    module.exports = castArrayLikeObject;
  },
});

// ../../node_modules/lodash/intersection.js
var require_intersection = __commonJS({
  '../../node_modules/lodash/intersection.js'(exports, module) {
    var arrayMap = require_arrayMap();
    var baseIntersection = require_baseIntersection();
    var baseRest = require_baseRest();
    var castArrayLikeObject = require_castArrayLikeObject();
    var intersection = baseRest(function (arrays) {
      var mapped = arrayMap(arrays, castArrayLikeObject);
      return mapped.length && mapped[0] === arrays[0]
        ? baseIntersection(mapped)
        : [];
    });
    module.exports = intersection;
  },
});
export default require_intersection();
//# sourceMappingURL=lodash_intersection.js.map
