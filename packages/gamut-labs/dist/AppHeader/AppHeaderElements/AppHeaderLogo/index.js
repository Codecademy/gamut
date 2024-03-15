function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { Anchor, Logo } from '@codecademy/gamut';
import React, { useEffect, useState } from 'react';
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
      var shouldShowMini = window.innerWidth <= 1260 && window.innerWidth >= 1200; // avoid unnecessary setState actions if val doesnt change

      if (showMini !== shouldShowMini) {
        setShowMini(shouldShowMini);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Remove event listener on cleanup

    return function () {
      return window.removeEventListener('resize', handleResize);
    };
  }, [item.checkMini, showMini]);
  return /*#__PURE__*/React.createElement(Anchor, {
    variant: "interface",
    "data-testid": item.dataTestId,
    py: 4,
    onClick: function onClick(event) {
      return action(event, item);
    },
    href: item.href,
    tabIndex: "0",
    role: "menuitem"
  }, /*#__PURE__*/React.createElement(Logo, {
    color: "currentColor",
    variant: item.checkMini && showMini ? 'mini' : item.pro ? 'pro' : 'default',
    height: 27,
    verticalAlign: "text-bottom"
  }));
};