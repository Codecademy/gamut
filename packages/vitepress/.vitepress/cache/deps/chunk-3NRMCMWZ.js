import { require_overArg } from './chunk-GODEWNY3.js';
import { require_baseGetTag, require_isObjectLike } from './chunk-KB4OAGHR.js';
import { __commonJS } from './chunk-4B2QHNJT.js';

// ../../node_modules/lodash/_getPrototype.js
var require_getPrototype = __commonJS({
  '../../node_modules/lodash/_getPrototype.js'(exports, module) {
    var overArg = require_overArg();
    var getPrototype = overArg(Object.getPrototypeOf, Object);
    module.exports = getPrototype;
  },
});

// ../../node_modules/lodash/isPlainObject.js
var require_isPlainObject = __commonJS({
  '../../node_modules/lodash/isPlainObject.js'(exports, module) {
    var baseGetTag = require_baseGetTag();
    var getPrototype = require_getPrototype();
    var isObjectLike = require_isObjectLike();
    var objectTag = '[object Object]';
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var objectCtorString = funcToString.call(Object);
    function isPlainObject(value) {
      if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
        return false;
      }
      var proto = getPrototype(value);
      if (proto === null) {
        return true;
      }
      var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
      return (
        typeof Ctor == 'function' &&
        Ctor instanceof Ctor &&
        funcToString.call(Ctor) == objectCtorString
      );
    }
    module.exports = isPlainObject;
  },
});

export { require_getPrototype, require_isPlainObject };
//# sourceMappingURL=chunk-3NRMCMWZ.js.map
