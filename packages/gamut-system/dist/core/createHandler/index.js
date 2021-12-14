function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import { identity } from 'lodash';
import { createDirectionalStyleTemplate, createResponsiveStyleTemplate, createStandardStyleTemplate } from '../../styleTemplates';
var STYLE_TEMPLATE_GENERATORS = {
  directional: createDirectionalStyleTemplate,
  standard: createStandardStyleTemplate
};
export var createHandler = function createHandler(config) {
  // Prop configs may choose between standard style templates and the fancy directional properties.
  // By default, we assume no value transformations ("identity") and standard templates.
  var _config$transformValu = config.transformValue,
      transformValue = _config$transformValu === void 0 ? identity : _config$transformValu,
      _config$dependentProp = config.dependentProps,
      dependentProps = _config$dependentProp === void 0 ? [] : _config$dependentProp,
      propName = config.propName,
      _config$type = config.type,
      type = _config$type === void 0 ? 'standard' : _config$type; // These are all the possible prop names that this function could be responsible for.
  // These will be passed to style functions to indicate which props should be computed.

  var propNames = [propName].concat(_toConsumableArray(dependentProps)); // Use the requested template generator to create the style template function.
  // This is the *inner* function that takes in a single prop description and produces CSS.

  var styleTemplate = STYLE_TEMPLATE_GENERATORS[type](_objectSpread(_objectSpread({}, config), {}, {
    propName: propName,
    transformValue: transformValue
  })); // Create a container to place composed style templates in.
  // This only contains our one requested style template to start, but might be added to later,
  // if compose combines this with other templates.

  var styleTemplates = _defineProperty({}, propName, styleTemplate); // Using our style templates, create a responsive property for the prop names and template,
  // which will be a function that takes in an object of prop descriptions and returns valid CSS.
  // We also assign the prop names and original template as members (for composition later).


  return Object.assign(createResponsiveStyleTemplate({
    propNames: propNames,
    styleTemplates: styleTemplates
  }), {
    propNames: propNames,
    styleTemplates: styleTemplates
  });
};