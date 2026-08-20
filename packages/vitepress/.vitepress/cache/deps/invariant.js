import { __commonJS } from './chunk-4B2QHNJT.js';

// ../../node_modules/invariant/browser.js
var require_browser = __commonJS({
  '../../node_modules/invariant/browser.js'(exports, module) {
    var invariant = function (condition, format, a, b, c, d, e, f) {
      if (true) {
        if (format === void 0) {
          throw new Error('invariant requires an error message argument');
        }
      }
      if (!condition) {
        var error;
        if (format === void 0) {
          error = new Error(
            'Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.'
          );
        } else {
          var args = [a, b, c, d, e, f];
          var argIndex = 0;
          error = new Error(
            format.replace(/%s/g, function () {
              return args[argIndex++];
            })
          );
          error.name = 'Invariant Violation';
        }
        error.framesToPop = 1;
        throw error;
      }
    };
    module.exports = invariant;
  },
});
export default require_browser();
//# sourceMappingURL=invariant.js.map
