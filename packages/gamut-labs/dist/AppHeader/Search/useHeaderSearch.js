function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { IconButton } from '@codecademy/gamut';
import { SearchIcon } from '@codecademy/gamut-icons';
import { useState } from 'react';
import { AnimatedHeaderZone } from '../shared';
import { SearchPane } from './SearchPane';
import { jsx as _jsx } from "react/jsx-runtime";
export var useHeaderSearch = function useHeaderSearch(_ref) {
  var onEnable = _ref.onEnable,
    onSearch = _ref.onSearch,
    onTrackingClick = _ref.onTrackingClick;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isSearchVisible = _useState2[0],
    setIsSearchVisible = _useState2[1];
  var toggleSearch = function toggleSearch() {
    if (!isSearchVisible) {
      onEnable();
    }
    setIsSearchVisible(function (oldIsSearchVisible) {
      return !oldIsSearchVisible;
    });
  };
  return [{
    id: 'search',
    type: 'render-element',
    renderElement: function renderElement() {
      return /*#__PURE__*/_jsx(IconButton, {
        "aria-label": "Search Codecademy Content",
        "data-testid": "header-search",
        tabIndex: "-1",
        onClick: toggleSearch,
        icon: SearchIcon,
        role: "menuitem",
        variant: "interface"
      });
    }
  }, /*#__PURE__*/_jsx(AnimatedHeaderZone, {
    visible: isSearchVisible,
    children: /*#__PURE__*/_jsx(SearchPane, {
      onSearch: onSearch,
      onTrackingClick: onTrackingClick,
      toggleSearch: toggleSearch
    })
  })];
};