function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { assign, entries, isArray, isObject, set, values } from 'lodash';
import { BASE, DEFAULT_MEDIA_QUERIES } from './constants';
export function createResponsiveStyleTemplate(_ref) {
  var propNames = _ref.propNames,
      styleTemplates = _ref.styleTemplates;
  return function (_ref2) {
    var _ref2$theme = _ref2.theme,
        theme = _ref2$theme === void 0 ? {} : _ref2$theme,
        props = _objectWithoutProperties(_ref2, ["theme"]);

    var _theme$breakpoints = theme.breakpoints,
        breakpoints = _theme$breakpoints === void 0 ? DEFAULT_MEDIA_QUERIES : _theme$breakpoints;
    var breakpointOrder = [BASE].concat(_toConsumableArray(Object.keys(breakpoints)));
    var responsive = {}; // Iterate through all responsible props and create a base style configuration.

    propNames.forEach(function (propName) {
      var propertyValue = props[propName]; // Handle responsive configurations properly.

      switch (_typeof(propertyValue)) {
        case 'string':
        case 'number':
          // If no extra styles exist add this to the lowest breakpoint
          return set(responsive, [BASE, propName], propertyValue);

        case 'object':
          {
            // Add to the config if it is an array of prop values
            if (isArray(propertyValue)) {
              return propertyValue.forEach(function (value, mediaIndex) {
                if (value !== undefined) {
                  return set(responsive, [breakpointOrder[mediaIndex], propName], value);
                }
              });
            } // Add to the config if it is an object of sizes / values


            if (isObject(propertyValue)) {
              return entries(propertyValue).forEach(function (_ref3) {
                var _ref4 = _slicedToArray(_ref3, 2),
                    mediaSize = _ref4[0],
                    value = _ref4[1];

                set(responsive, [mediaSize, propName], value);
              });
            }
          }
      }
    });
    var styles = {}; // Iterate through each breakpoints sorted props

    entries(responsive).forEach(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2),
          breakpoint = _ref6[0],
          bpProps = _ref6[1];

      var templates = values(styleTemplates); // TODO: Only call the templateFns we have props for.1

      templates.forEach(function (styleFunction) {
        if (!styleFunction) return;
        var templateStyles = styleFunction(_objectSpread(_objectSpread({}, bpProps), {}, {
          theme: theme
        })); // Smallest sizes are always on by default

        if (breakpoint === breakpointOrder[0]) {
          styles = assign(styles, templateStyles);
        } else {
          // For all sizes higher, create a new media object.
          var breakpointKey = breakpoints[breakpoint];
          styles[breakpointKey] = assign(styles[breakpointKey], templateStyles);
        }
      });
    });
    return styles;
  };
}