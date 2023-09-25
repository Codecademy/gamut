function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { Anchor, Box, Text } from '@codecademy/gamut';
import * as React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var ErrorContents = function ErrorContents(_ref) {
  var supportInformation = _ref.supportInformation;
  return /*#__PURE__*/_jsxs(Box, {
    maxWidth: "40rem",
    my: 96,
    mx: "auto",
    as: "main",
    children: [/*#__PURE__*/_jsx(Text, {
      as: "h1",
      fontSize: 44,
      children: "Something has gone wrong"
    }), /*#__PURE__*/_jsx(Text, {
      as: "p",
      my: 16,
      children: "We're sorry, and our best are working to fix this. In the meantime, have you tried the following?"
    }), /*#__PURE__*/_jsxs(Box, {
      as: "ul",
      children: [/*#__PURE__*/_jsx("li", {
        children: "Refreshing this page."
      }), /*#__PURE__*/_jsx("li", {
        children: "Clearing your browser cache."
      })]
    }), /*#__PURE__*/_jsxs(Text, {
      as: "p",
      children: ["If that doesn't help, please let us know on our", ' ', /*#__PURE__*/_jsx(Anchor, {
        href: "https://help.codecademy.com/hc/en-us",
        children: "Help Center"
      }), "!"]
    }), supportInformation && /*#__PURE__*/_jsxs(Box, {
      as: "details",
      fontSize: 16,
      textColor: "gray-900",
      children: [/*#__PURE__*/_jsx(Box, {
        as: "summary",
        mt: 48,
        mb: 8,
        children: "Support information"
      }), supportInformation.map(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
          key = _ref3[0],
          value = _ref3[1];
        return /*#__PURE__*/_jsxs(Text, {
          as: "code",
          display: "block",
          fontSize: "small",
          children: [key, ": ", value]
        }, key);
      })]
    })]
  });
};