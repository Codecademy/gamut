import { require_isObject } from './chunk-PG56PVWR.js';
import { require_baseGetTag } from './chunk-KB4OAGHR.js';
import { __commonJS } from './chunk-4B2QHNJT.js';

// ../../node_modules/lodash/isFunction.js
var require_isFunction = __commonJS({
  '../../node_modules/lodash/isFunction.js'(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObject = require_isObject();
    var asyncTag = '[object AsyncFunction]';
    var funcTag = '[object Function]';
    var genTag = '[object GeneratorFunction]';
    var proxyTag = '[object Proxy]';
    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return (
        tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag
      );
    }
    module.exports = isFunction;
  },
});

export { require_isFunction };
//# sourceMappingURL=chunk-C4YMECY4.js.map
