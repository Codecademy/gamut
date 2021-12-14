function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/* eslint-disable no-console */
var browserSupportsKeepalive = function browserSupportsKeepalive() {
  return 'keepalive' in window.Request.prototype;
};

export var createTracker = function createTracker(_ref) {
  var apiBaseUrl = _ref.apiBaseUrl,
      verbose = _ref.verbose;

  var beacon = function beacon(endpoint, data) {
    var _navigator$sendBeacon, _navigator;

    var uri = new URL(endpoint, apiBaseUrl).toString();
    var form = new FormData();

    for (var _i2 = 0, _Object$entries = Object.entries(data); _i2 < _Object$entries.length; _i2++) {
      var _ref4 = _Object$entries[_i2];

      var _ref3 = _slicedToArray(_ref4, 2);

      var k = _ref3[0];
      var v = _ref3[1];
      form.append(k, v.toString());
    } // Firefox allows users to disable navigator.sendBeacon, and very old Safari versions don't have it.


    if ((_navigator$sendBeacon = (_navigator = navigator).sendBeacon) !== null && _navigator$sendBeacon !== void 0 && _navigator$sendBeacon.call(_navigator, uri, form)) {
      return;
    } // Either way, we fall back to standard fetch if sendBeacon fails.
    // We don't mind this rejecting with an error because it's tracking, and we'll know if that starts to fail.
    // eslint-disable-next-line @typescript-eslint/no-floating-promises


    window.fetch(uri, _objectSpread({
      method: 'POST',
      body: form
    }, browserSupportsKeepalive() && {
      keepalive: true
    }));
  };

  var event = function event(category, _event, userData) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    var properties = _objectSpread(_objectSpread({}, userData), {}, {
      fullpath: window.location.pathname + window.location.search,
      search: window.location.search,
      path: window.location.pathname,
      title: window.document.title,
      url: window.location.href,
      referrer: window.document.referrer
    });

    if (verbose) {
      console.groupCollapsed("%cTracking Event Fired: ".concat(category, ":").concat(_event), 'color: #4b35ef; font-style: italic;');
      console.log({
        category: category,
        event: _event,
        properties: properties
      });
      console.groupEnd();
    } // This allows the UTM query params to get registered in the user session.


    var queryParams = window.location.search;
    beacon("/analytics/".concat(category).concat(queryParams), {
      category: category,
      event: _event,
      properties: JSON.stringify(properties),
      gdpr_safe: "".concat(options.gdprSafe)
    });
  };

  return {
    event: event,
    click: function click(data) {
      return event('user', 'click', data);
    },
    impression: function impression(data) {
      return event('user', 'impression', data);
    },
    visit: function visit(data) {
      return event('user', 'visit', data);
    },
    pushDataLayerEvent: function pushDataLayerEvent(eventName) {
      var _ref5;

      ((_ref5 = window).dataLayer || (_ref5.dataLayer = [])).push({
        event: eventName
      });
    }
  };
};