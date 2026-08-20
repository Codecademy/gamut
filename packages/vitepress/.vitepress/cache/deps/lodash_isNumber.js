import { require_baseGetTag, require_isObjectLike } from './chunk-KB4OAGHR.js';
import { __commonJS } from './chunk-4B2QHNJT.js';

// ../../node_modules/lodash/isNumber.js
var require_isNumber = __commonJS({
  '../../node_modules/lodash/isNumber.js'(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var numberTag = '[object Number]';
    function isNumber(value) {
      return (
        typeof value == 'number' ||
        (isObjectLike(value) && baseGetTag(value) == numberTag)
      );
    }
    module.exports = isNumber;
  },
});
export default require_isNumber();
//# sourceMappingURL=lodash_isNumber.js.map
