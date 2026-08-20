import { require_baseGetTag, require_isObjectLike } from './chunk-KB4OAGHR.js';
import { require_isArray } from './chunk-ZBBJSO6M.js';
import { __commonJS } from './chunk-4B2QHNJT.js';

// ../../node_modules/lodash/isString.js
var require_isString = __commonJS({
  '../../node_modules/lodash/isString.js'(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isArray = require_isArray();
    var isObjectLike = require_isObjectLike();
    var stringTag = '[object String]';
    function isString(value) {
      return (
        typeof value == 'string' ||
        (!isArray(value) &&
          isObjectLike(value) &&
          baseGetTag(value) == stringTag)
      );
    }
    module.exports = isString;
  },
});
export default require_isString();
//# sourceMappingURL=lodash_isString.js.map
