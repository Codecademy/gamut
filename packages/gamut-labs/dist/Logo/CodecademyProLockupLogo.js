function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { jsx as _jsx } from "react/jsx-runtime";
export function CodecademyProLockupLogo(props) {
  return /*#__PURE__*/_jsx("svg", _objectSpread(_objectSpread({}, props), {}, {
    viewBox: "0 0 62 26",
    xmlns: "http://www.w3.org/2000/svg",
    children: /*#__PURE__*/_jsx("path", {
      d: "M62 16H50v4h12v6H7.937v-7.883c.736 1.253 2.464 2.248 4.544 2.248 4.032 0 7.136-3.243 7.136-7.738 0-4.495-3.072-7.738-7.104-7.738-2.208 0-3.936 1.027-4.64 2.28 0-.161.064-.482.064-1.188v-.707h-4.16V26H0V0h62v16zM11.585 8.613c2.208 0 3.744 1.734 3.744 4.014 0 2.248-1.536 4.046-3.744 4.046s-3.744-1.798-3.744-4.046c0-2.28 1.536-4.014 3.744-4.014zm19.71-3.403a4.695 4.695 0 0 0-1.151-.128c-1.824 0-3.232.963-3.808 2.536V5.274h-4.032V19.98h4.16v-7.032c0-2.569.96-3.564 3.072-3.564h1.76V5.21zm9.088 15.155c4.352 0 7.84-3.243 7.84-7.738 0-4.495-3.488-7.738-7.84-7.738s-7.84 3.243-7.84 7.738c0 4.495 3.488 7.738 7.84 7.738zm0-11.752c2.144 0 3.648 1.702 3.648 4.014 0 2.28-1.504 4.013-3.648 4.013-2.176 0-3.68-1.733-3.68-4.013 0-2.312 1.504-4.014 3.68-4.014z",
      fill: "currentColor",
      fillRule: "evenodd"
    })
  }));
}