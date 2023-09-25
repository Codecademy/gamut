function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import cx from 'classnames';
import * as React from 'react';

// eslint-disable-next-line gamut/no-css-standalone
import styles from './styles/index.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
export var AppBarSection = function AppBarSection(_ref) {
  var _cx;
  var position = _ref.position,
    className = _ref.className,
    children = _ref.children;
  var classes = cx(styles.section, (_cx = {}, _defineProperty(_cx, styles.sectionRight, position === 'right'), _defineProperty(_cx, styles.sectionLeft, position === 'left'), _defineProperty(_cx, styles.sectionCenter, position === 'center'), _cx), className);
  return /*#__PURE__*/_jsx("div", {
    className: classes,
    children: children
  });
};