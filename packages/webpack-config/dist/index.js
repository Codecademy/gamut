'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loader = exports.loaders = undefined;

var _loaders2 = require('./loaders');

Object.defineProperty(exports, 'loader', {
  enumerable: true,
  get: function () {
    function get() {
      return _loaders2.loader;
    }

    return get;
  }()
});

var _loaders3 = _interopRequireDefault(_loaders2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports.loaders = _loaders3['default'];
//# sourceMappingURL=index.js.map