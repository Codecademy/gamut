import _styled from "@emotion/styled/base";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { variant } from '@codecademy/gamut-styles';
import React, { useState } from 'react';
import { useIsomorphicLayoutEffect } from 'react-use';
import { BASE_STATIC_ASSET_PATH } from '../../remoteAssets/components';
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

var StyledImg = _styled("img", {
  target: "emh806i0",
  label: "StyledImg"
})(variants, process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9DdXJyaWN1bHVtQ2FyZC9JbWFnZS9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBc0JrQiIsImZpbGUiOiIuLi8uLi8uLi9zcmMvQ3VycmljdWx1bUNhcmQvSW1hZ2UvaW5kZXgudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdmFyaWFudCB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0LXN0eWxlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VJc29tb3JwaGljTGF5b3V0RWZmZWN0IH0gZnJvbSAncmVhY3QtdXNlJztcblxuaW1wb3J0IHsgQkFTRV9TVEFUSUNfQVNTRVRfUEFUSCB9IGZyb20gJy4uLy4uL3JlbW90ZUFzc2V0cy9jb21wb25lbnRzJztcblxuY29uc3QgdmFyaWFudHMgPSB2YXJpYW50KHtcbiAgYmFzZToge1xuICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgbWFyZ2luOiAnMCBhdXRvJyxcbiAgfSxcbiAgdmFyaWFudHM6IHtcbiAgICBkZWZhdWx0OiB7XG4gICAgICB3aWR0aDogMTYwLFxuICAgIH0sXG4gICAgc21hbGw6IHtcbiAgICAgIHdpZHRoOiAxMTEsXG4gICAgfSxcbiAgfSxcbn0pO1xuXG5jb25zdCBTdHlsZWRJbWcgPSBzdHlsZWQuaW1nKHZhcmlhbnRzKTtcblxudHlwZSBQcm9ncmVzc1N0YXRlID0gJ2luUHJvZ3Jlc3MnIHwgJ2NvbXBsZXRlZCc7XG5cbmNvbnN0IGdldFBsYWNlaG9sZGVyQXNzZXRQYXRoID0gKHBhdGhQcm9ncmVzc1N0YXRlPzogUHJvZ3Jlc3NTdGF0ZSkgPT4ge1xuICBjb25zdCBwcm9ncmVzc1N0YXRlID0gcGF0aFByb2dyZXNzU3RhdGUgPyBgLSR7cGF0aFByb2dyZXNzU3RhdGV9YCA6ICcnO1xuICByZXR1cm4gYCR7QkFTRV9TVEFUSUNfQVNTRVRfUEFUSH0vY3VycmljdWx1bS9wYXRoL3BsYWNlaG9sZGVyJHtwcm9ncmVzc1N0YXRlfS5zdmdgO1xufTtcblxuZXhwb3J0IHR5cGUgSW1hZ2VQcm9wcyA9IHtcbiAgaW1hZ2U6IHN0cmluZztcbiAgcHJvZ3Jlc3NTdGF0ZT86IFByb2dyZXNzU3RhdGU7XG4gIGlzU21hbGw/OiBib29sZWFuO1xufTtcblxuZXhwb3J0IGNvbnN0IEltYWdlOiBSZWFjdC5GQzxJbWFnZVByb3BzPiA9ICh7XG4gIGltYWdlLFxuICBwcm9ncmVzc1N0YXRlLFxuICBpc1NtYWxsLFxufSkgPT4ge1xuICBjb25zdCBbcmVhZHksIHNldFJlYWR5XSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgLyoqIERlbGF5IGluaXRpYWwgcmVuZGVyIG9uY2UgdG8gZW5zdXJlIHRoYXQgcmVoeWRyYXRpb24gZG9lcyBub3QgY29uZmxpY3Qgd2l0aCBwb3J0YWwgbW91bnRpbmcgKi9cbiAgdXNlSXNvbW9ycGhpY0xheW91dEVmZmVjdCgoKSA9PiB7XG4gICAgc2V0UmVhZHkodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyk7XG4gIH0sIFtdKTtcblxuICBpZiAoIXJlYWR5KSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBhZGREZWZhdWx0SW1hZ2VTb3VyY2UgPSAoZXZlbnQ6IFJlYWN0LlN5bnRoZXRpY0V2ZW50KSA9PiB7XG4gICAgaWYgKCFlcnJvcikge1xuICAgICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MSW1hZ2VFbGVtZW50KS5vbmVycm9yID0gbnVsbDtcbiAgICAgIChldmVudC50YXJnZXQgYXMgSFRNTEltYWdlRWxlbWVudCkuc3JjID0gZ2V0UGxhY2Vob2xkZXJBc3NldFBhdGgoXG4gICAgICAgIHByb2dyZXNzU3RhdGVcbiAgICAgICk7XG4gICAgICBzZXRFcnJvcih0cnVlKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8U3R5bGVkSW1nXG4gICAgICB2YXJpYW50PXtpc1NtYWxsID8gJ3NtYWxsJyA6ICdkZWZhdWx0J31cbiAgICAgIHNyYz17aW1hZ2V9XG4gICAgICBhbHQ9XCJcIlxuICAgICAgb25FcnJvcj17YWRkRGVmYXVsdEltYWdlU291cmNlfVxuICAgIC8+XG4gICk7XG59O1xuIl19 */");

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

  return /*#__PURE__*/React.createElement(StyledImg, {
    variant: isSmall ? 'small' : 'default',
    src: image,
    alt: "",
    onError: addDefaultImageSource
  });
};