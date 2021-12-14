function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { entries, keys, mapValues, merge, pick, uniq, values } from 'lodash';
import * as BaseConfig from '../../props';
import { compose } from '../compose';
import { createHandler } from '../createHandler';
import { getDefaultPropKey } from '../utils';

var _create = function create(config) {
  // Initializes the return object
  var systemShape = {
    properties: {}
  }; // Merge the the default prop configurations and user defined ones together.

  var propGroups = merge(BaseConfig, config || {}); // Iterate over all the property groups

  entries(propGroups).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        groupKey = _ref2[0],
        groupProps = _ref2[1];

    // Create the style functions (handlers) for each of the specifieed properties.
    var propHandlers = mapValues(groupProps, createHandler); // Create a composed group handler for the group (handles all group properties at once)

    var groupHandler = compose.apply(void 0, _toConsumableArray(values(propHandlers))); // Add them to the default props group.

    systemShape.properties = _objectSpread(_objectSpread({}, systemShape.properties), propHandlers); // Add the composite group handler to the correct propGroups key

    systemShape[groupKey] = groupHandler;
  }); // Initialize the createVariant API inside the closure to ensure that we have access to all the possible handlers

  var createVariant = function createVariant(config) {
    var variants = (config === null || config === void 0 ? void 0 : config.variants) || config;
    var propKey = (config === null || config === void 0 ? void 0 : config.prop) || 'variant';
    var defaultKey = config === null || config === void 0 ? void 0 : config["default"]; // Collect the props the resulting variant function will be responsible for templating.

    var props = uniq(values(variants).reduce(function (carry, variant) {
      return carry.concat(keys(variant));
    }, []).map(function (prop) {
      return getDefaultPropKey(prop);
    })); // Pick the correct handlers from the system (closure specific) and create a composite.

    var handlers = pick(systemShape.properties, props);
    var variantHandler = compose.apply(void 0, _toConsumableArray(values(handlers))); // Return the variant function

    return function (props) {
      var variantProps = variants[props[propKey] || defaultKey];
      return variantHandler(_objectSpread(_objectSpread({}, variantProps), {}, {
        theme: props.theme
      }));
    };
  }; // add the function to the returned object


  systemShape.variant = createVariant;
  return systemShape;
};

export var system = {
  create: function create(config) {
    return _create(config);
  },
  withTheme: function withTheme() {
    return {
      create: function create(config) {
        return _create(config);
      }
    };
  }
};