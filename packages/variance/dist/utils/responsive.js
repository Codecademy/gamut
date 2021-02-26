function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import intersection from 'lodash/intersection';
var BREAKPOINT_KEYS = ['base', 'xs', 'sm', 'md', 'lg', 'xl'];
/**
 * Destructures the themes breakpoints into an ordered structure to traverse
 */

export var parseBreakpoints = function parseBreakpoints(theme) {
  var breakpoints = theme === null || theme === void 0 ? void 0 : theme.breakpoints;
  if (!breakpoints) return null;
  var xs = breakpoints.xs,
      sm = breakpoints.sm,
      md = breakpoints.md,
      lg = breakpoints.lg,
      xl = breakpoints.xl;
  return {
    map: breakpoints,
    array: [xs, sm, md, lg, xl]
  };
};
export var isMediaArray = function isMediaArray(val) {
  return Array.isArray(val);
};
export var isMediaMap = function isMediaMap(val) {
  return intersection(Object.keys(val), BREAKPOINT_KEYS).length > 0;
};
export var objectParser = function objectParser(value, props, config, breakpoints) {
  var styles = {};
  var styleFn = config.styleFn,
      prop = config.prop;

  var base = value.base,
      rest = _objectWithoutProperties(value, ["base"]); // the keyof 'base' is base styles


  if (base) Object.assign(styles, styleFn(base, prop, props)); // Map over remaining keys and merge the corresponding breakpoint styles
  // for that property.

  Object.keys(rest).forEach(function (bp) {
    var breakpointKey = breakpoints === null || breakpoints === void 0 ? void 0 : breakpoints[bp];
    if (!breakpointKey) return;
    Object.assign(styles, _defineProperty({}, breakpointKey, styleFn(rest[bp], prop, props)));
  });
  return styles;
};
export var arrayParser = function arrayParser(value, props, config, breakpoints) {
  var styles = {};
  var styleFn = config.styleFn,
      prop = config.prop;

  var _value = _toArray(value),
      base = _value[0],
      rest = _value.slice(1); // the first index is base styles


  if (base) Object.assign(styles, styleFn(base, prop, props)); // Map over each value in the array and merge the corresponding breakpoint styles
  // for that property.

  rest.forEach(function (val, i) {
    var breakpointKey = breakpoints[i];
    if (!breakpointKey) return;
    Object.assign(styles, _defineProperty({}, breakpointKey, styleFn(val, prop, props)));
  });
  return styles;
};