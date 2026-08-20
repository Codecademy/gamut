import { require_baseGetTag, require_isObjectLike } from './chunk-KB4OAGHR.js';
import { __commonJS } from './chunk-4B2QHNJT.js';

// ../../node_modules/lodash/_isIndex.js
var require_isIndex = __commonJS({
  '../../node_modules/lodash/_isIndex.js'(exports, module) {
    var MAX_SAFE_INTEGER = 9007199254740991;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    function isIndex(value, length) {
      var type = typeof value;
      length = length == null ? MAX_SAFE_INTEGER : length;
      return (
        !!length &&
        (type == 'number' || (type != 'symbol' && reIsUint.test(value))) &&
        value > -1 &&
        value % 1 == 0 &&
        value < length
      );
    }
    module.exports = isIndex;
  },
});

// ../../node_modules/lodash/_baseIsArguments.js
var require_baseIsArguments = __commonJS({
  '../../node_modules/lodash/_baseIsArguments.js'(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var argsTag = '[object Arguments]';
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag;
    }
    module.exports = baseIsArguments;
  },
});

// ../../node_modules/lodash/isArguments.js
var require_isArguments = __commonJS({
  '../../node_modules/lodash/isArguments.js'(exports, module) {
    var baseIsArguments = require_baseIsArguments();
    var isObjectLike = require_isObjectLike();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var isArguments = baseIsArguments(
      /* @__PURE__ */ (function () {
        return arguments;
      })()
    )
      ? baseIsArguments
      : function (value) {
          return (
            isObjectLike(value) &&
            hasOwnProperty.call(value, 'callee') &&
            !propertyIsEnumerable.call(value, 'callee')
          );
        };
    module.exports = isArguments;
  },
});

export { require_isIndex, require_isArguments };
//# sourceMappingURL=chunk-J7QHC2UB.js.map
