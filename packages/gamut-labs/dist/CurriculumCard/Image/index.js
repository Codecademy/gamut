import _styled from "@emotion/styled/base";
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { variant } from '@codecademy/gamut-styles';
import { useState } from 'react';
import * as React from 'react';
import { useIsomorphicLayoutEffect } from 'react-use';
import { BASE_STATIC_ASSET_PATH } from '../../remoteAssets/components';
import { jsx as _jsx } from "react/jsx-runtime";
var variants = variant({
  base: {
    display: 'block',
    margin: '0 auto'
  },
  variants: {
    "default": {
      width: 160
    },
    small: {
      width: 111
    }
  }
});
var StyledImg = /*#__PURE__*/_styled("img", {
  target: "emh806i0",
  label: "StyledImg"
})(variants, process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9DdXJyaWN1bHVtQ2FyZC9JbWFnZS9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBdUJrQiIsImZpbGUiOiIuLi8uLi8uLi9zcmMvQ3VycmljdWx1bUNhcmQvSW1hZ2UvaW5kZXgudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdmFyaWFudCB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0LXN0eWxlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUlzb21vcnBoaWNMYXlvdXRFZmZlY3QgfSBmcm9tICdyZWFjdC11c2UnO1xuXG5pbXBvcnQgeyBCQVNFX1NUQVRJQ19BU1NFVF9QQVRIIH0gZnJvbSAnLi4vLi4vcmVtb3RlQXNzZXRzL2NvbXBvbmVudHMnO1xuXG5jb25zdCB2YXJpYW50cyA9IHZhcmlhbnQoe1xuICBiYXNlOiB7XG4gICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICBtYXJnaW46ICcwIGF1dG8nLFxuICB9LFxuICB2YXJpYW50czoge1xuICAgIGRlZmF1bHQ6IHtcbiAgICAgIHdpZHRoOiAxNjAsXG4gICAgfSxcbiAgICBzbWFsbDoge1xuICAgICAgd2lkdGg6IDExMSxcbiAgICB9LFxuICB9LFxufSk7XG5cbmNvbnN0IFN0eWxlZEltZyA9IHN0eWxlZC5pbWcodmFyaWFudHMpO1xuXG50eXBlIFByb2dyZXNzU3RhdGUgPSAnaW5Qcm9ncmVzcycgfCAnY29tcGxldGVkJztcblxuY29uc3QgZ2V0UGxhY2Vob2xkZXJBc3NldFBhdGggPSAocGF0aFByb2dyZXNzU3RhdGU/OiBQcm9ncmVzc1N0YXRlKSA9PiB7XG4gIGNvbnN0IHByb2dyZXNzU3RhdGUgPSBwYXRoUHJvZ3Jlc3NTdGF0ZSA/IGAtJHtwYXRoUHJvZ3Jlc3NTdGF0ZX1gIDogJyc7XG4gIHJldHVybiBgJHtCQVNFX1NUQVRJQ19BU1NFVF9QQVRIfS9jdXJyaWN1bHVtL3BhdGgvcGxhY2Vob2xkZXIke3Byb2dyZXNzU3RhdGV9LnN2Z2A7XG59O1xuXG5leHBvcnQgdHlwZSBJbWFnZVByb3BzID0ge1xuICBpbWFnZTogc3RyaW5nO1xuICBwcm9ncmVzc1N0YXRlPzogUHJvZ3Jlc3NTdGF0ZTtcbiAgaXNTbWFsbD86IGJvb2xlYW47XG59O1xuXG5leHBvcnQgY29uc3QgSW1hZ2U6IFJlYWN0LkZDPEltYWdlUHJvcHM+ID0gKHtcbiAgaW1hZ2UsXG4gIHByb2dyZXNzU3RhdGUsXG4gIGlzU21hbGwsXG59KSA9PiB7XG4gIGNvbnN0IFtyZWFkeSwgc2V0UmVhZHldID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICAvKiogRGVsYXkgaW5pdGlhbCByZW5kZXIgb25jZSB0byBlbnN1cmUgdGhhdCByZWh5ZHJhdGlvbiBkb2VzIG5vdCBjb25mbGljdCB3aXRoIHBvcnRhbCBtb3VudGluZyAqL1xuICB1c2VJc29tb3JwaGljTGF5b3V0RWZmZWN0KCgpID0+IHtcbiAgICBzZXRSZWFkeSh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKTtcbiAgfSwgW10pO1xuXG4gIGlmICghcmVhZHkpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IGFkZERlZmF1bHRJbWFnZVNvdXJjZSA9IChldmVudDogUmVhY3QuU3ludGhldGljRXZlbnQpID0+IHtcbiAgICBpZiAoIWVycm9yKSB7XG4gICAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbWFnZUVsZW1lbnQpLm9uZXJyb3IgPSBudWxsO1xuICAgICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MSW1hZ2VFbGVtZW50KS5zcmMgPSBnZXRQbGFjZWhvbGRlckFzc2V0UGF0aChcbiAgICAgICAgcHJvZ3Jlc3NTdGF0ZVxuICAgICAgKTtcbiAgICAgIHNldEVycm9yKHRydWUpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxTdHlsZWRJbWdcbiAgICAgIHZhcmlhbnQ9e2lzU21hbGwgPyAnc21hbGwnIDogJ2RlZmF1bHQnfVxuICAgICAgc3JjPXtpbWFnZX1cbiAgICAgIGFsdD1cIlwiXG4gICAgICBvbkVycm9yPXthZGREZWZhdWx0SW1hZ2VTb3VyY2V9XG4gICAgLz5cbiAgKTtcbn07XG4iXX0= */");
var getPlaceholderAssetPath = function getPlaceholderAssetPath(pathProgressState) {
  var progressState = pathProgressState ? "-".concat(pathProgressState) : '';
  return "".concat(BASE_STATIC_ASSET_PATH, "/curriculum/path/placeholder").concat(progressState, ".svg");
};
export var Image = function Image(_ref) {
  var image = _ref.image,
    progressState = _ref.progressState,
    isSmall = _ref.isSmall;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    ready = _useState2[0],
    setReady = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    error = _useState4[0],
    setError = _useState4[1];
  /** Delay initial render once to ensure that rehydration does not conflict with portal mounting */
  useIsomorphicLayoutEffect(function () {
    setReady(typeof document !== 'undefined');
  }, []);
  if (!ready) return null;
  var addDefaultImageSource = function addDefaultImageSource(event) {
    if (!error) {
      event.target.onerror = null;
      event.target.src = getPlaceholderAssetPath(progressState);
      setError(true);
    }
  };
  return /*#__PURE__*/_jsx(StyledImg, {
    variant: isSmall ? 'small' : 'default',
    src: image,
    alt: "",
    onError: addDefaultImageSource
  });
};