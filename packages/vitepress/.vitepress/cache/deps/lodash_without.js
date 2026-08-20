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

// ../../node_modules/lodash/_baseDifference.js
var require_baseDifference = __commonJS({
  '../../node_modules/lodash/_baseDifference.js'(exports, module) {
    var SetCache = require_SetCache();
    var arrayIncludes = require_arrayIncludes();
    var arrayIncludesWith = require_arrayIncludesWith();
    var arrayMap = require_arrayMap();
    var baseUnary = require_baseUnary();
    var cacheHas = require_cacheHas();
    var LARGE_ARRAY_SIZE = 200;
    function baseDifference(array, values, iteratee, comparator) {
      var index = -1,
        includes = arrayIncludes,
        isCommon = true,
        length = array.length,
        result = [],
        valuesLength = values.length;
      if (!length) {
        return result;
      }
      if (iteratee) {
        values = arrayMap(values, baseUnary(iteratee));
      }
      if (comparator) {
        includes = arrayIncludesWith;
        isCommon = false;
      } else if (values.length >= LARGE_ARRAY_SIZE) {
        includes = cacheHas;
        isCommon = false;
        values = new SetCache(values);
      }
      outer: while (++index < length) {
        var value = array[index],
          computed = iteratee == null ? value : iteratee(value);
        value = comparator || value !== 0 ? value : 0;
        if (isCommon && computed === computed) {
          var valuesIndex = valuesLength;
          while (valuesIndex--) {
            if (values[valuesIndex] === computed) {
              continue outer;
            }
          }
          result.push(value);
        } else if (!includes(values, computed, comparator)) {
          result.push(value);
        }
      }
      return result;
    }
    module.exports = baseDifference;
  },
});

// ../../node_modules/lodash/without.js
var require_without = __commonJS({
  '../../node_modules/lodash/without.js'(exports, module) {
    var baseDifference = require_baseDifference();
    var baseRest = require_baseRest();
    var isArrayLikeObject = require_isArrayLikeObject();
    var without = baseRest(function (array, values) {
      return isArrayLikeObject(array) ? baseDifference(array, values) : [];
    });
    module.exports = without;
  },
});
export default require_without();
//# sourceMappingURL=lodash_without.js.map
