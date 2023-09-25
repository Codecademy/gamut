function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { Anchor, Logo } from '@codecademy/gamut';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
export var AppHeaderLogo = function AppHeaderLogo(_ref) {
  var action = _ref.action,
    item = _ref.item;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    showMini = _useState2[0],
    setShowMini = _useState2[1];
  useEffect(function () {
    if (!item.checkMini) {
      return;
    }
    var handleResize = function handleResize() {
      var shouldShowMini = window.innerWidth <= 1260 && window.innerWidth >= 1200;
      // avoid unnecessary setState actions if val doesnt change
      if (showMini !== shouldShowMini) {
        setShowMini(shouldShowMini);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    // Remove event listener on cleanup
    return function () {
      return window.removeEventListener('resize', handleResize);
    };
  }, [item.checkMini, showMini]);
  return /*#__PURE__*/_jsx(Anchor, {
    variant: "interface",
    "data-testid": item.dataTestId,
    py: 4,
    onClick: function onClick(event) {
      return action(event, item);
    },
    href: item.href,
    tabIndex: "0",
    role: "menuitem",
    children: /*#__PURE__*/_jsx(Logo, {
      color: "currentColor",
      variant: item.checkMini && showMini ? 'mini' : item.pro ? 'pro' : 'default',
      height: 27,
      verticalAlign: "text-bottom"
    })
  });
};