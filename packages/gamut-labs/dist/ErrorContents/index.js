function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { Anchor, Box, Text } from '@codecademy/gamut';
import React from 'react';
export var ErrorContents = function ErrorContents(_ref) {
  var supportInformation = _ref.supportInformation;
  return /*#__PURE__*/React.createElement(Box, {
    maxWidth: "40rem",
    my: 96,
    mx: "auto",
    as: "main"
  }, /*#__PURE__*/React.createElement(Text, {
    as: "h1",
    fontSize: 44
  }, "Something has gone wrong"), /*#__PURE__*/React.createElement(Text, {
    as: "p",
    my: 16
  }, "We're sorry, and our best are working to fix this. In the meantime, have you tried the following?"), /*#__PURE__*/React.createElement(Box, {
    as: "ul"
  }, /*#__PURE__*/React.createElement("li", null, "Refreshing this page."), /*#__PURE__*/React.createElement("li", null, "Clearing your browser cache.")), /*#__PURE__*/React.createElement(Text, {
    as: "p"
  }, "If that doesn't help, please let us know on our", ' ', /*#__PURE__*/React.createElement(Anchor, {
    href: "https://help.codecademy.com/hc/en-us"
  }, "Help Center"), "!"), supportInformation && /*#__PURE__*/React.createElement(Box, {
    as: "details",
    fontSize: 16,
    textColor: "gray-900"
  }, /*#__PURE__*/React.createElement(Box, {
    as: "summary",
    mt: 48,
    mb: 8
  }, "Support information"), supportInformation.map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        key = _ref3[0],
        value = _ref3[1];

    return /*#__PURE__*/React.createElement(Text, {
      as: "code",
      display: "block",
      fontSize: "small",
      key: key
    }, key, ": ", value);
  })));
};