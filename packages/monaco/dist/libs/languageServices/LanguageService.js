import _regeneratorRuntime from "@babel/runtime/regenerator";
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
export var LanguageServices = /*#__PURE__*/function () {
  function LanguageServices(creators) {
    _classCallCheck(this, LanguageServices);
    _defineProperty(this, "services", new Map());
    this.creators = creators;
  }
  _createClass(LanguageServices, [{
    key: "use",
    value: function () {
      var _use = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(languageId, framework) {
        var getCreator, existingService, creator, service;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                getCreator = this.creators.get(languageId);
                if (getCreator) {
                  _context.next = 3;
                  break;
                }
                return _context.abrupt("return", {});
              case 3:
                existingService = this.services.get(languageId);
                if (!existingService) {
                  _context.next = 6;
                  break;
                }
                return _context.abrupt("return", existingService);
              case 6:
                _context.next = 8;
                return getCreator();
              case 8:
                creator = _context.sent;
                service = creator["default"](framework);
                this.services.set(languageId, service);
                return _context.abrupt("return", service);
              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function use(_x, _x2) {
        return _use.apply(this, arguments);
      }
      return use;
    }()
  }]);
  return LanguageServices;
}();