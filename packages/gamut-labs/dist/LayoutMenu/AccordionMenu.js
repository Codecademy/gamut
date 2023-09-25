import _styled from "@emotion/styled/base";
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { AccordionArea, Anchor, Text } from '@codecademy/gamut';
import { MiniChevronDownIcon } from '@codecademy/gamut-icons';
import { useState } from 'react';
import * as React from 'react';
import { system, transitionConcat } from '../../../gamut-styles/dist';
import { LayoutMenuSection } from './LayoutMenuSection';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledAccordionArea = /*#__PURE__*/_styled(AccordionArea, {
  target: "eaprxym1",
  label: "StyledAccordionArea"
})("padding-bottom:", function (_ref) {
  var theme = _ref.theme;
  return theme.spacing[32];
}, ";position:relative;left:-4px;" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9MYXlvdXRNZW51L0FjY29yZGlvbk1lbnUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVNpRCIsImZpbGUiOiIuLi8uLi9zcmMvTGF5b3V0TWVudS9BY2NvcmRpb25NZW51LnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjY29yZGlvbkFyZWEsIEFuY2hvciwgVGV4dCB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0JztcbmltcG9ydCB7IE1pbmlDaGV2cm9uRG93bkljb24gfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1pY29ucyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgc3lzdGVtLCB0cmFuc2l0aW9uQ29uY2F0IH0gZnJvbSAnLi4vLi4vLi4vZ2FtdXQtc3R5bGVzL2Rpc3QnO1xuaW1wb3J0IHsgTGF5b3V0TWVudVNlY3Rpb24gfSBmcm9tICcuL0xheW91dE1lbnVTZWN0aW9uJztcblxuY29uc3QgU3R5bGVkQWNjb3JkaW9uQXJlYSA9IHN0eWxlZChBY2NvcmRpb25BcmVhKWBcbiAgcGFkZGluZy1ib3R0b206ICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUuc3BhY2luZ1szMl19O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGxlZnQ6IC00cHg7XG5gO1xuXG5jb25zdCBFeHBhbmRDaGV2cm9uID0gc3R5bGVkKE1pbmlDaGV2cm9uRG93bkljb24pKFxuICBzeXN0ZW0uY3NzKHtcbiAgICB0cmFuc2Zvcm06ICdyb3RhdGUoMGRlZyknLFxuICAgIHRyYW5zaXRpb246IHRyYW5zaXRpb25Db25jYXQoWyd0cmFuc2Zvcm0nXSwgJ3Nsb3cnLCAnZWFzZS1vdXQnKSxcbiAgfSksXG4gIHN5c3RlbS5zdGF0ZXMoe1xuICAgIGV4cGFuZGVkOiB7IHRyYW5zZm9ybTogJ3JvdGF0ZSgxODBkZWcpJyB9LFxuICB9KVxuKTtcblxuZXhwb3J0IHR5cGUgU2VjdGlvbkl0ZW0gPSB7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHNsdWc6IHN0cmluZztcbiAgaHJlZjogc3RyaW5nO1xuICBvbkNsaWNrOiAoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHZvaWQ7XG59O1xuXG5leHBvcnQgdHlwZSBTZWN0aW9uID0ge1xuICB0aXRsZTogc3RyaW5nO1xuICBzbHVnOiBzdHJpbmc7XG4gIGl0ZW1zOiBTZWN0aW9uSXRlbVtdO1xufTtcblxuZXhwb3J0IHR5cGUgQWNjb3JkaW9uTWVudVByb3BzID0ge1xuICBzZWN0aW9uOiBTZWN0aW9uO1xuICBvblNlY3Rpb25Ub2dnbGU6IChzZWN0aW9uU2x1Zzogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkl0ZW1DbGljazogKCkgPT4gdm9pZDtcbiAgc2VsZWN0ZWRJdGVtPzogc3RyaW5nO1xufTtcblxuZXhwb3J0IGNvbnN0IEFjY29yZGlvbk1lbnU6IFJlYWN0LkZDPEFjY29yZGlvbk1lbnVQcm9wcz4gPSAoe1xuICBzZWN0aW9uLFxuICBvblNlY3Rpb25Ub2dnbGUsXG4gIG9uSXRlbUNsaWNrLFxuICBzZWxlY3RlZEl0ZW0sXG59KSA9PiB7XG4gIGNvbnN0IFtleHBhbmRlZCwgc2V0RXhwYW5kZWRdID0gdXNlU3RhdGUodHJ1ZSk7XG5cbiAgcmV0dXJuIChcbiAgICA8U3R5bGVkQWNjb3JkaW9uQXJlYVxuICAgICAgZXhwYW5kZWQ9e2V4cGFuZGVkfVxuICAgICAgdG9wPXtcbiAgICAgICAgPEFuY2hvclxuICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgIHB5PXsxMn1cbiAgICAgICAgICBweD17NH1cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICBvblNlY3Rpb25Ub2dnbGUoc2VjdGlvbi5zbHVnKTtcbiAgICAgICAgICAgIHNldEV4cGFuZGVkKChwcmV2KSA9PiAhcHJldik7XG4gICAgICAgICAgfX1cbiAgICAgICAgICBhcmlhLWV4cGFuZGVkPXtleHBhbmRlZH1cbiAgICAgICAgICBkaXNwbGF5PVwiZmxleFwiXG4gICAgICAgID5cbiAgICAgICAgICA8VGV4dCB2YXJpYW50PVwidGl0bGUteHNcIiBzdHlsZT17eyBmbGV4OiAxIH19IHRleHRBbGlnbj1cImxlZnRcIj5cbiAgICAgICAgICAgIHtzZWN0aW9uLnRpdGxlfVxuICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICA8RXhwYW5kQ2hldnJvblxuICAgICAgICAgICAgbWw9ezEyfVxuICAgICAgICAgICAgc2l6ZT17MTR9XG4gICAgICAgICAgICBleHBhbmRlZD17ZXhwYW5kZWR9XG4gICAgICAgICAgICBwb3NpdGlvbj1cInJlbGF0aXZlXCJcbiAgICAgICAgICAgIHRvcD17NH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0FuY2hvcj5cbiAgICAgIH1cbiAgICA+XG4gICAgICA8TGF5b3V0TWVudVNlY3Rpb25cbiAgICAgICAgaXRlbXM9e3NlY3Rpb24uaXRlbXN9XG4gICAgICAgIHNlbGVjdGVkSXRlbT17c2VsZWN0ZWRJdGVtfVxuICAgICAgICBvbkl0ZW1DbGljaz17b25JdGVtQ2xpY2t9XG4gICAgICAvPlxuICAgIDwvU3R5bGVkQWNjb3JkaW9uQXJlYT5cbiAgKTtcbn07XG4iXX0= */"));
var ExpandChevron = /*#__PURE__*/_styled(MiniChevronDownIcon, {
  target: "eaprxym0",
  label: "ExpandChevron"
})(system.css({
  transform: 'rotate(0deg)',
  transition: transitionConcat(['transform'], 'slow', 'ease-out')
}), system.states({
  expanded: {
    transform: 'rotate(180deg)'
  }
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9MYXlvdXRNZW51L0FjY29yZGlvbk1lbnUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWVzQiIsImZpbGUiOiIuLi8uLi9zcmMvTGF5b3V0TWVudS9BY2NvcmRpb25NZW51LnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjY29yZGlvbkFyZWEsIEFuY2hvciwgVGV4dCB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0JztcbmltcG9ydCB7IE1pbmlDaGV2cm9uRG93bkljb24gfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1pY29ucyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgc3lzdGVtLCB0cmFuc2l0aW9uQ29uY2F0IH0gZnJvbSAnLi4vLi4vLi4vZ2FtdXQtc3R5bGVzL2Rpc3QnO1xuaW1wb3J0IHsgTGF5b3V0TWVudVNlY3Rpb24gfSBmcm9tICcuL0xheW91dE1lbnVTZWN0aW9uJztcblxuY29uc3QgU3R5bGVkQWNjb3JkaW9uQXJlYSA9IHN0eWxlZChBY2NvcmRpb25BcmVhKWBcbiAgcGFkZGluZy1ib3R0b206ICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUuc3BhY2luZ1szMl19O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGxlZnQ6IC00cHg7XG5gO1xuXG5jb25zdCBFeHBhbmRDaGV2cm9uID0gc3R5bGVkKE1pbmlDaGV2cm9uRG93bkljb24pKFxuICBzeXN0ZW0uY3NzKHtcbiAgICB0cmFuc2Zvcm06ICdyb3RhdGUoMGRlZyknLFxuICAgIHRyYW5zaXRpb246IHRyYW5zaXRpb25Db25jYXQoWyd0cmFuc2Zvcm0nXSwgJ3Nsb3cnLCAnZWFzZS1vdXQnKSxcbiAgfSksXG4gIHN5c3RlbS5zdGF0ZXMoe1xuICAgIGV4cGFuZGVkOiB7IHRyYW5zZm9ybTogJ3JvdGF0ZSgxODBkZWcpJyB9LFxuICB9KVxuKTtcblxuZXhwb3J0IHR5cGUgU2VjdGlvbkl0ZW0gPSB7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHNsdWc6IHN0cmluZztcbiAgaHJlZjogc3RyaW5nO1xuICBvbkNsaWNrOiAoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHZvaWQ7XG59O1xuXG5leHBvcnQgdHlwZSBTZWN0aW9uID0ge1xuICB0aXRsZTogc3RyaW5nO1xuICBzbHVnOiBzdHJpbmc7XG4gIGl0ZW1zOiBTZWN0aW9uSXRlbVtdO1xufTtcblxuZXhwb3J0IHR5cGUgQWNjb3JkaW9uTWVudVByb3BzID0ge1xuICBzZWN0aW9uOiBTZWN0aW9uO1xuICBvblNlY3Rpb25Ub2dnbGU6IChzZWN0aW9uU2x1Zzogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkl0ZW1DbGljazogKCkgPT4gdm9pZDtcbiAgc2VsZWN0ZWRJdGVtPzogc3RyaW5nO1xufTtcblxuZXhwb3J0IGNvbnN0IEFjY29yZGlvbk1lbnU6IFJlYWN0LkZDPEFjY29yZGlvbk1lbnVQcm9wcz4gPSAoe1xuICBzZWN0aW9uLFxuICBvblNlY3Rpb25Ub2dnbGUsXG4gIG9uSXRlbUNsaWNrLFxuICBzZWxlY3RlZEl0ZW0sXG59KSA9PiB7XG4gIGNvbnN0IFtleHBhbmRlZCwgc2V0RXhwYW5kZWRdID0gdXNlU3RhdGUodHJ1ZSk7XG5cbiAgcmV0dXJuIChcbiAgICA8U3R5bGVkQWNjb3JkaW9uQXJlYVxuICAgICAgZXhwYW5kZWQ9e2V4cGFuZGVkfVxuICAgICAgdG9wPXtcbiAgICAgICAgPEFuY2hvclxuICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICAgIHB5PXsxMn1cbiAgICAgICAgICBweD17NH1cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICBvblNlY3Rpb25Ub2dnbGUoc2VjdGlvbi5zbHVnKTtcbiAgICAgICAgICAgIHNldEV4cGFuZGVkKChwcmV2KSA9PiAhcHJldik7XG4gICAgICAgICAgfX1cbiAgICAgICAgICBhcmlhLWV4cGFuZGVkPXtleHBhbmRlZH1cbiAgICAgICAgICBkaXNwbGF5PVwiZmxleFwiXG4gICAgICAgID5cbiAgICAgICAgICA8VGV4dCB2YXJpYW50PVwidGl0bGUteHNcIiBzdHlsZT17eyBmbGV4OiAxIH19IHRleHRBbGlnbj1cImxlZnRcIj5cbiAgICAgICAgICAgIHtzZWN0aW9uLnRpdGxlfVxuICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICA8RXhwYW5kQ2hldnJvblxuICAgICAgICAgICAgbWw9ezEyfVxuICAgICAgICAgICAgc2l6ZT17MTR9XG4gICAgICAgICAgICBleHBhbmRlZD17ZXhwYW5kZWR9XG4gICAgICAgICAgICBwb3NpdGlvbj1cInJlbGF0aXZlXCJcbiAgICAgICAgICAgIHRvcD17NH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0FuY2hvcj5cbiAgICAgIH1cbiAgICA+XG4gICAgICA8TGF5b3V0TWVudVNlY3Rpb25cbiAgICAgICAgaXRlbXM9e3NlY3Rpb24uaXRlbXN9XG4gICAgICAgIHNlbGVjdGVkSXRlbT17c2VsZWN0ZWRJdGVtfVxuICAgICAgICBvbkl0ZW1DbGljaz17b25JdGVtQ2xpY2t9XG4gICAgICAvPlxuICAgIDwvU3R5bGVkQWNjb3JkaW9uQXJlYT5cbiAgKTtcbn07XG4iXX0= */");
export var AccordionMenu = function AccordionMenu(_ref2) {
  var section = _ref2.section,
    onSectionToggle = _ref2.onSectionToggle,
    onItemClick = _ref2.onItemClick,
    selectedItem = _ref2.selectedItem;
  var _useState = useState(true),
    _useState2 = _slicedToArray(_useState, 2),
    expanded = _useState2[0],
    setExpanded = _useState2[1];
  return /*#__PURE__*/_jsx(StyledAccordionArea, {
    expanded: expanded,
    top: /*#__PURE__*/_jsxs(Anchor, {
      variant: "interface",
      py: 12,
      px: 4,
      onClick: function onClick() {
        onSectionToggle(section.slug);
        setExpanded(function (prev) {
          return !prev;
        });
      },
      "aria-expanded": expanded,
      display: "flex",
      children: [/*#__PURE__*/_jsx(Text, {
        variant: "title-xs",
        style: {
          flex: 1
        },
        textAlign: "left",
        children: section.title
      }), /*#__PURE__*/_jsx(ExpandChevron, {
        ml: 12,
        size: 14,
        expanded: expanded,
        position: "relative",
        top: 4
      })]
    }),
    children: /*#__PURE__*/_jsx(LayoutMenuSection, {
      items: section.items,
      selectedItem: selectedItem,
      onItemClick: onItemClick
    })
  });
};