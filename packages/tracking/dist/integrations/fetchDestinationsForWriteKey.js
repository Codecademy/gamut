import _regeneratorRuntime from "@babel/runtime/regenerator";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

export var fetchDestinationsForWriteKey = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref) {
    var writeKey, onError, response, destinations, _iterator, _step, destination;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            writeKey = _ref.writeKey, onError = _ref.onError;
            _context.prev = 1;
            _context.next = 4;
            return fetch("https://cdn.segment.com/v1/projects/".concat(writeKey, "/integrations"));

          case 4:
            response = _context.sent;

            if (response.ok) {
              _context.next = 8;
              break;
            }

            onError("Failed to fetch integrations for write key ".concat(writeKey, ": HTTP ").concat(response.status, " ").concat(response.statusText));
            return _context.abrupt("return", []);

          case 8:
            _context.next = 10;
            return response.json();

          case 10:
            destinations = _context.sent;
            _iterator = _createForOfIteratorHelper(destinations);

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                destination = _step.value;
                destination.id = destination.creationName;
                delete destination.creationName;
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            return _context.abrupt("return", destinations);

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](1);
            onError("Unknown error fetching Segment destinations for write key ".concat(writeKey, ": ").concat(_context.t0));
            return _context.abrupt("return", []);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 16]]);
  }));

  return function fetchDestinationsForWriteKey(_x) {
    return _ref2.apply(this, arguments);
  };
}();