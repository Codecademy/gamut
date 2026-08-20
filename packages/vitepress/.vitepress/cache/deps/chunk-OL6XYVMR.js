import { require_isArguments, require_isIndex } from './chunk-J7QHC2UB.js';
import { require_isLength } from './chunk-PY63MGA6.js';
import { require_castPath, require_toKey } from './chunk-OWCHAVWX.js';
import { require_isArray } from './chunk-ZBBJSO6M.js';
import { __commonJS } from './chunk-4B2QHNJT.js';

// ../../node_modules/lodash/_baseHasIn.js
var require_baseHasIn = __commonJS({
  '../../node_modules/lodash/_baseHasIn.js'(exports, module) {
    function baseHasIn(object, key) {
      return object != null && key in Object(object);
    }
    module.exports = baseHasIn;
  },
});

// ../../node_modules/lodash/_hasPath.js
var require_hasPath = __commonJS({
  '../../node_modules/lodash/_hasPath.js'(exports, module) {
    var castPath = require_castPath();
    var isArguments = require_isArguments();
    var isArray = require_isArray();
    var isIndex = require_isIndex();
    var isLength = require_isLength();
    var toKey = require_toKey();
    function hasPath(object, path, hasFunc) {
      path = castPath(path, object);
      var index = -1,
        length = path.length,
        result = false;
      while (++index < length) {
        var key = toKey(path[index]);
        if (!(result = object != null && hasFunc(object, key))) {
          break;
        }
        object = object[key];
      }
      if (result || ++index != length) {
        return result;
      }
      length = object == null ? 0 : object.length;
      return (
        !!length &&
        isLength(length) &&
        isIndex(key, length) &&
        (isArray(object) || isArguments(object))
      );
    }
    module.exports = hasPath;
  },
});

// ../../node_modules/lodash/hasIn.js
var require_hasIn = __commonJS({
  '../../node_modules/lodash/hasIn.js'(exports, module) {
    var baseHasIn = require_baseHasIn();
    var hasPath = require_hasPath();
    function hasIn(object, path) {
      return object != null && hasPath(object, path, baseHasIn);
    }
    module.exports = hasIn;
  },
});

export { require_hasIn };
//# sourceMappingURL=chunk-OL6XYVMR.js.map
