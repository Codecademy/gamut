function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import { CodecademyLogo } from './CodecademyLogo';
import { CodecademyPremiumLogo } from './CodecademyPremiumLogo';
import { CodecademyProAltLogo } from './CodecademyProAltLogo';
import { CodecademyProgramLogo } from './CodecademyProgramLogo';
import { CodecademyProLockupLogo } from './CodecademyProLockupLogo';
import { CodecademyProLogo } from './CodecademyProLogo';
import { CodecademyProMonoLogo } from './CodecademyProMonoLogo';
import { jsx as _jsx } from "react/jsx-runtime";
var defaultProps = {
  height: 32,
  type: 'default'
};
var logos = {
  pro: CodecademyProLogo,
  proAlt: CodecademyProAltLogo,
  proLockup: CodecademyProLockupLogo,
  proMono: CodecademyProMonoLogo,
  program: CodecademyProgramLogo,
  premium: CodecademyPremiumLogo,
  "default": CodecademyLogo
};
export function Logo(_ref) {
  var type = _ref.type,
    props = _objectWithoutProperties(_ref, ["type"]);
  var LogoTag = logos[type] || CodecademyLogo;
  return /*#__PURE__*/_jsx(LogoTag, _objectSpread({}, props));
}
Logo.defaultProps = defaultProps;