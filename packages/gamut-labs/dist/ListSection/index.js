import _styled from "@emotion/styled/base";
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
import { theme } from '@codecademy/gamut-styles';
import { Children, useState } from 'react';
import * as React from 'react';
import { PageSection } from '..';
import { jsx as _jsx } from "react/jsx-runtime";
var UnstyledUnorderedList = /*#__PURE__*/_styled("ul", {
  target: "e1ycur4z1",
  label: "UnstyledUnorderedList"
})(process.env.NODE_ENV === "production" ? {
  name: "v5al3",
  styles: "list-style:none;padding:0;margin:0"
} : {
  name: "v5al3",
  styles: "list-style:none;padding:0;margin:0",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9MaXN0U2VjdGlvbi9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMkJ1QyIsImZpbGUiOiIuLi8uLi9zcmMvTGlzdFNlY3Rpb24vaW5kZXgudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgV2l0aENoaWxkcmVuUHJvcCB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0JztcbmltcG9ydCB7IHRoZW1lIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQtc3R5bGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IENoaWxkcmVuLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgUGFnZVNlY3Rpb24sIFNlY3Rpb25CdXR0b24gfSBmcm9tICcuLic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGlzdFNlY3Rpb25Qcm9wcyBleHRlbmRzIFdpdGhDaGlsZHJlblByb3Age1xuICB0aXRsZTogc3RyaW5nO1xuICBoZWFkZXJCdXR0b24/OiBTZWN0aW9uQnV0dG9uO1xuICBoZWFkZXJTZWNvbmRhcnlCdXR0b24/OiBTZWN0aW9uQnV0dG9uO1xuICAvKipcbiAgICogTnVtYmVyIG9mIGl0ZW1zIHRvIGJlIGluaXRhbGx5IGRpc3BsYXllZFxuICAgKlxuICAgKiBAcmVtYXJrc1xuICAgKiBJZiB0aGUgaW5pdGlhbCBkaXNwbGF5IGFtb3VudCBtYXRjaGVzIHRoZSBudW1iZXIgb2YgbGlzdCBpdGVtcywgU2hvdyBBbGwgYnV0dG9uIHdpbGwgbm90IGFwcGVhci5cbiAgICovXG4gIGluaXRpYWxEaXNwbGF5QW1vdW50PzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBPcHRpb25hbCBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgY2FsbGVkIHdoZW4gdGhlIHVzZXIgY2xpY2tzIHRoZSBcIlNob3cgQWxsXCIgLyBcIlNob3cgbGVzc1wiIGJ1dHRvbi5cbiAgICogVGhpcyBpcyB1c3VhbGx5IHVzZWQgZm9yIHRoaW5ncyBsaWtlIG1ldHJpY3MgdHJhY2tpbmcuXG4gICAqL1xuICBvblNob3dBbGxPckxlc3NDbGljaz86IChzaG93QWxsOiBib29sZWFuKSA9PiB2b2lkO1xufVxuXG5jb25zdCBVbnN0eWxlZFVub3JkZXJlZExpc3QgPSBzdHlsZWQudWxgXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbmA7XG5cbmNvbnN0IFN0eWxlZExpc3RJdGVtID0gc3R5bGVkLmxpYFxuICAmOm5vdCg6bGFzdC1jaGlsZCkge1xuICAgIG1hcmdpbi1ib3R0b206ICR7dGhlbWUuc3BhY2luZ1syNF19O1xuICB9XG5gO1xuXG5leHBvcnQgY29uc3QgTGlzdFNlY3Rpb246IFJlYWN0LkZDPExpc3RTZWN0aW9uUHJvcHM+ID0gKHtcbiAgdGl0bGUsXG4gIGhlYWRlckJ1dHRvbixcbiAgaGVhZGVyU2Vjb25kYXJ5QnV0dG9uLFxuICBpbml0aWFsRGlzcGxheUFtb3VudCA9IDMsXG4gIG9uU2hvd0FsbE9yTGVzc0NsaWNrLFxuICBjaGlsZHJlbixcbn0pID0+IHtcbiAgY29uc3QgW3Nob3dBbGwsIHNldFNob3dBbGxdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IGhhbmRsZVNob3dBbGwgPSAoKSA9PiB7XG4gICAgb25TaG93QWxsT3JMZXNzQ2xpY2s/Lighc2hvd0FsbCk7XG4gICAgc2V0U2hvd0FsbCghc2hvd0FsbCk7XG4gIH07XG5cbiAgY29uc3QgcmVuZGVyTGlzdEl0ZW1zID0gKCkgPT4ge1xuICAgIGNvbnN0IGxpc3RJdGVtcyA9IENoaWxkcmVuLm1hcChcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgKGNoaWxkKSA9PiAhIWNoaWxkICYmIDxTdHlsZWRMaXN0SXRlbT57Y2hpbGR9PC9TdHlsZWRMaXN0SXRlbT5cbiAgICApPy5maWx0ZXIoQm9vbGVhbik7XG5cbiAgICBpZiAoIWxpc3RJdGVtcykgcmV0dXJuIG51bGw7XG4gICAgaWYgKHNob3dBbGwpIHJldHVybiBsaXN0SXRlbXM7XG4gICAgcmV0dXJuIGxpc3RJdGVtcy5zbGljZSgwLCBpbml0aWFsRGlzcGxheUFtb3VudCk7XG4gIH07XG5cbiAgY29uc3QgcmVuZGVyRm9vdGVyQnV0dG9uID0gKCkgPT4ge1xuICAgIGlmIChDaGlsZHJlbi50b0FycmF5KGNoaWxkcmVuKS5sZW5ndGggPD0gaW5pdGlhbERpc3BsYXlBbW91bnQpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IGJ1dHRvblRleHQgPSBgU2hvdyAke3Nob3dBbGwgPyAnTGVzcycgOiAnQWxsJ31gO1xuICAgIHJldHVybiB7XG4gICAgICB0ZXh0OiBidXR0b25UZXh0LFxuICAgICAgb25DbGljazogaGFuZGxlU2hvd0FsbCxcbiAgICAgICdhcmlhLWxhYmVsJzogYCR7YnV0dG9uVGV4dH0sICR7dGl0bGV9YCxcbiAgICB9O1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPFBhZ2VTZWN0aW9uXG4gICAgICB0aXRsZT17dGl0bGV9XG4gICAgICBmb290ZXJCdXR0b249e3JlbmRlckZvb3RlckJ1dHRvbigpfVxuICAgICAgaGVhZGVyQnV0dG9uPXtoZWFkZXJCdXR0b259XG4gICAgICBoZWFkZXJTZWNvbmRhcnlCdXR0b249e2hlYWRlclNlY29uZGFyeUJ1dHRvbn1cbiAgICA+XG4gICAgICA8VW5zdHlsZWRVbm9yZGVyZWRMaXN0IGFyaWEtbGFiZWw9e3RpdGxlfSBhcmlhLWxpdmU9XCJwb2xpdGVcIj5cbiAgICAgICAge3JlbmRlckxpc3RJdGVtcygpfVxuICAgICAgPC9VbnN0eWxlZFVub3JkZXJlZExpc3Q+XG4gICAgPC9QYWdlU2VjdGlvbj5cbiAgKTtcbn07XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});
var StyledListItem = /*#__PURE__*/_styled("li", {
  target: "e1ycur4z0",
  label: "StyledListItem"
})("&:not(:last-child){margin-bottom:", theme.spacing[24], ";}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9MaXN0U2VjdGlvbi9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaUNnQyIsImZpbGUiOiIuLi8uLi9zcmMvTGlzdFNlY3Rpb24vaW5kZXgudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgV2l0aENoaWxkcmVuUHJvcCB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0JztcbmltcG9ydCB7IHRoZW1lIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQtc3R5bGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IENoaWxkcmVuLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgUGFnZVNlY3Rpb24sIFNlY3Rpb25CdXR0b24gfSBmcm9tICcuLic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGlzdFNlY3Rpb25Qcm9wcyBleHRlbmRzIFdpdGhDaGlsZHJlblByb3Age1xuICB0aXRsZTogc3RyaW5nO1xuICBoZWFkZXJCdXR0b24/OiBTZWN0aW9uQnV0dG9uO1xuICBoZWFkZXJTZWNvbmRhcnlCdXR0b24/OiBTZWN0aW9uQnV0dG9uO1xuICAvKipcbiAgICogTnVtYmVyIG9mIGl0ZW1zIHRvIGJlIGluaXRhbGx5IGRpc3BsYXllZFxuICAgKlxuICAgKiBAcmVtYXJrc1xuICAgKiBJZiB0aGUgaW5pdGlhbCBkaXNwbGF5IGFtb3VudCBtYXRjaGVzIHRoZSBudW1iZXIgb2YgbGlzdCBpdGVtcywgU2hvdyBBbGwgYnV0dG9uIHdpbGwgbm90IGFwcGVhci5cbiAgICovXG4gIGluaXRpYWxEaXNwbGF5QW1vdW50PzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBPcHRpb25hbCBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgY2FsbGVkIHdoZW4gdGhlIHVzZXIgY2xpY2tzIHRoZSBcIlNob3cgQWxsXCIgLyBcIlNob3cgbGVzc1wiIGJ1dHRvbi5cbiAgICogVGhpcyBpcyB1c3VhbGx5IHVzZWQgZm9yIHRoaW5ncyBsaWtlIG1ldHJpY3MgdHJhY2tpbmcuXG4gICAqL1xuICBvblNob3dBbGxPckxlc3NDbGljaz86IChzaG93QWxsOiBib29sZWFuKSA9PiB2b2lkO1xufVxuXG5jb25zdCBVbnN0eWxlZFVub3JkZXJlZExpc3QgPSBzdHlsZWQudWxgXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbmA7XG5cbmNvbnN0IFN0eWxlZExpc3RJdGVtID0gc3R5bGVkLmxpYFxuICAmOm5vdCg6bGFzdC1jaGlsZCkge1xuICAgIG1hcmdpbi1ib3R0b206ICR7dGhlbWUuc3BhY2luZ1syNF19O1xuICB9XG5gO1xuXG5leHBvcnQgY29uc3QgTGlzdFNlY3Rpb246IFJlYWN0LkZDPExpc3RTZWN0aW9uUHJvcHM+ID0gKHtcbiAgdGl0bGUsXG4gIGhlYWRlckJ1dHRvbixcbiAgaGVhZGVyU2Vjb25kYXJ5QnV0dG9uLFxuICBpbml0aWFsRGlzcGxheUFtb3VudCA9IDMsXG4gIG9uU2hvd0FsbE9yTGVzc0NsaWNrLFxuICBjaGlsZHJlbixcbn0pID0+IHtcbiAgY29uc3QgW3Nob3dBbGwsIHNldFNob3dBbGxdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IGhhbmRsZVNob3dBbGwgPSAoKSA9PiB7XG4gICAgb25TaG93QWxsT3JMZXNzQ2xpY2s/Lighc2hvd0FsbCk7XG4gICAgc2V0U2hvd0FsbCghc2hvd0FsbCk7XG4gIH07XG5cbiAgY29uc3QgcmVuZGVyTGlzdEl0ZW1zID0gKCkgPT4ge1xuICAgIGNvbnN0IGxpc3RJdGVtcyA9IENoaWxkcmVuLm1hcChcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgKGNoaWxkKSA9PiAhIWNoaWxkICYmIDxTdHlsZWRMaXN0SXRlbT57Y2hpbGR9PC9TdHlsZWRMaXN0SXRlbT5cbiAgICApPy5maWx0ZXIoQm9vbGVhbik7XG5cbiAgICBpZiAoIWxpc3RJdGVtcykgcmV0dXJuIG51bGw7XG4gICAgaWYgKHNob3dBbGwpIHJldHVybiBsaXN0SXRlbXM7XG4gICAgcmV0dXJuIGxpc3RJdGVtcy5zbGljZSgwLCBpbml0aWFsRGlzcGxheUFtb3VudCk7XG4gIH07XG5cbiAgY29uc3QgcmVuZGVyRm9vdGVyQnV0dG9uID0gKCkgPT4ge1xuICAgIGlmIChDaGlsZHJlbi50b0FycmF5KGNoaWxkcmVuKS5sZW5ndGggPD0gaW5pdGlhbERpc3BsYXlBbW91bnQpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IGJ1dHRvblRleHQgPSBgU2hvdyAke3Nob3dBbGwgPyAnTGVzcycgOiAnQWxsJ31gO1xuICAgIHJldHVybiB7XG4gICAgICB0ZXh0OiBidXR0b25UZXh0LFxuICAgICAgb25DbGljazogaGFuZGxlU2hvd0FsbCxcbiAgICAgICdhcmlhLWxhYmVsJzogYCR7YnV0dG9uVGV4dH0sICR7dGl0bGV9YCxcbiAgICB9O1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPFBhZ2VTZWN0aW9uXG4gICAgICB0aXRsZT17dGl0bGV9XG4gICAgICBmb290ZXJCdXR0b249e3JlbmRlckZvb3RlckJ1dHRvbigpfVxuICAgICAgaGVhZGVyQnV0dG9uPXtoZWFkZXJCdXR0b259XG4gICAgICBoZWFkZXJTZWNvbmRhcnlCdXR0b249e2hlYWRlclNlY29uZGFyeUJ1dHRvbn1cbiAgICA+XG4gICAgICA8VW5zdHlsZWRVbm9yZGVyZWRMaXN0IGFyaWEtbGFiZWw9e3RpdGxlfSBhcmlhLWxpdmU9XCJwb2xpdGVcIj5cbiAgICAgICAge3JlbmRlckxpc3RJdGVtcygpfVxuICAgICAgPC9VbnN0eWxlZFVub3JkZXJlZExpc3Q+XG4gICAgPC9QYWdlU2VjdGlvbj5cbiAgKTtcbn07XG4iXX0= */"));
export var ListSection = function ListSection(_ref) {
  var title = _ref.title,
    headerButton = _ref.headerButton,
    headerSecondaryButton = _ref.headerSecondaryButton,
    _ref$initialDisplayAm = _ref.initialDisplayAmount,
    initialDisplayAmount = _ref$initialDisplayAm === void 0 ? 3 : _ref$initialDisplayAm,
    onShowAllOrLessClick = _ref.onShowAllOrLessClick,
    children = _ref.children;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    showAll = _useState2[0],
    setShowAll = _useState2[1];
  var handleShowAll = function handleShowAll() {
    onShowAllOrLessClick === null || onShowAllOrLessClick === void 0 ? void 0 : onShowAllOrLessClick(!showAll);
    setShowAll(!showAll);
  };
  var renderListItems = function renderListItems() {
    var _Children$map;
    var listItems = (_Children$map = Children.map(children, function (child) {
      return !!child && /*#__PURE__*/_jsx(StyledListItem, {
        children: child
      });
    })) === null || _Children$map === void 0 ? void 0 : _Children$map.filter(Boolean);
    if (!listItems) return null;
    if (showAll) return listItems;
    return listItems.slice(0, initialDisplayAmount);
  };
  var renderFooterButton = function renderFooterButton() {
    if (Children.toArray(children).length <= initialDisplayAmount) return null;
    var buttonText = "Show ".concat(showAll ? 'Less' : 'All');
    return {
      text: buttonText,
      onClick: handleShowAll,
      'aria-label': "".concat(buttonText, ", ").concat(title)
    };
  };
  return /*#__PURE__*/_jsx(PageSection, {
    title: title,
    footerButton: renderFooterButton(),
    headerButton: headerButton,
    headerSecondaryButton: headerSecondaryButton,
    children: /*#__PURE__*/_jsx(UnstyledUnorderedList, {
      "aria-label": title,
      "aria-live": "polite",
      children: renderListItems()
    })
  });
};