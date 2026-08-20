import { require_flatRest } from './chunk-L2YNWXN5.js';
import { require_assignValue } from './chunk-USBSOQYR.js';
import './chunk-X4575NEQ.js';
import './chunk-USMCKF2P.js';
import './chunk-DSHCLZZZ.js';
import { require_hasIn } from './chunk-OL6XYVMR.js';
import './chunk-7BTKAB6I.js';
import { require_isIndex } from './chunk-J7QHC2UB.js';
import './chunk-PY63MGA6.js';
import './chunk-MRFDMUT5.js';
import {
  require_baseGet,
  require_castPath,
  require_toKey,
} from './chunk-OWCHAVWX.js';
import './chunk-MEZUONTE.js';
import './chunk-ESHVIK4X.js';
import './chunk-6LPT7FQ7.js';
import './chunk-C4YMECY4.js';
import { require_isObject } from './chunk-PG56PVWR.js';
import './chunk-KB4OAGHR.js';
import './chunk-ZBBJSO6M.js';
import { __commonJS } from './chunk-4B2QHNJT.js';

// ../../node_modules/lodash/_baseSet.js
var require_baseSet = __commonJS({
  '../../node_modules/lodash/_baseSet.js'(exports, module) {
    var assignValue = require_assignValue();
    var castPath = require_castPath();
    var isIndex = require_isIndex();
    var isObject = require_isObject();
    var toKey = require_toKey();
    function baseSet(object, path, value, customizer) {
      if (!isObject(object)) {
        return object;
      }
      path = castPath(path, object);
      var index = -1,
        length = path.length,
        lastIndex = length - 1,
        nested = object;
      while (nested != null && ++index < length) {
        var key = toKey(path[index]),
          newValue = value;
        if (
          key === '__proto__' ||
          key === 'constructor' ||
          key === 'prototype'
        ) {
          return object;
        }
        if (index != lastIndex) {
          var objValue = nested[key];
          newValue = customizer ? customizer(objValue, key, nested) : void 0;
          if (newValue === void 0) {
            newValue = isObject(objValue)
              ? objValue
              : isIndex(path[index + 1])
              ? []
              : {};
          }
        }
        assignValue(nested, key, newValue);
        nested = nested[key];
      }
      return object;
    }
    module.exports = baseSet;
  },
});

// ../../node_modules/lodash/_basePickBy.js
var require_basePickBy = __commonJS({
  '../../node_modules/lodash/_basePickBy.js'(exports, module) {
    var baseGet = require_baseGet();
    var baseSet = require_baseSet();
    var castPath = require_castPath();
    function basePickBy(object, paths, predicate) {
      var index = -1,
        length = paths.length,
        result = {};
      while (++index < length) {
        var path = paths[index],
          value = baseGet(object, path);
        if (predicate(value, path)) {
          baseSet(result, castPath(path, object), value);
        }
      }
      return result;
    }
    module.exports = basePickBy;
  },
});

// ../../node_modules/lodash/_basePick.js
var require_basePick = __commonJS({
  '../../node_modules/lodash/_basePick.js'(exports, module) {
    var basePickBy = require_basePickBy();
    var hasIn = require_hasIn();
    function basePick(object, paths) {
      return basePickBy(object, paths, function (value, path) {
        return hasIn(object, path);
      });
    }
    module.exports = basePick;
  },
});

// ../../node_modules/lodash/pick.js
var require_pick = __commonJS({
  '../../node_modules/lodash/pick.js'(exports, module) {
    var basePick = require_basePick();
    var flatRest = require_flatRest();
    var pick = flatRest(function (object, paths) {
      return object == null ? {} : basePick(object, paths);
    });
    module.exports = pick;
  },
});
export default require_pick();
//# sourceMappingURL=lodash_pick.js.map
