import _styled from "@emotion/styled/base";
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
import { AccordionArea, Anchor, Box, Text } from '@codecademy/gamut';
import { MiniChevronDownIcon } from '@codecademy/gamut-icons';
import React, { useState } from 'react';
import { system, transitionConcat } from '../../../gamut-styles/dist';
import { LayoutMenuSection } from './LayoutMenuSection';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledAccordionArea = /*#__PURE__*/_styled(AccordionArea, {
  target: "e1u2hxrq2",
  label: "StyledAccordionArea"
})("padding-block:", function (_ref) {
  var theme = _ref.theme;
  return theme.spacing[16];
}, ";position:relative;left:-4px;border-bottom:1px solid ", function (_ref2) {
  var theme = _ref2.theme;
  return theme.colors['navy-500'];
}, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9MYXlvdXRNZW51VmFyaWFudC9BY2NvcmRpb25NZW51LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFRaUQiLCJmaWxlIjoiLi4vLi4vc3JjL0xheW91dE1lbnVWYXJpYW50L0FjY29yZGlvbk1lbnUudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWNjb3JkaW9uQXJlYSwgQW5jaG9yLCBCb3gsIFRleHQgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dCc7XG5pbXBvcnQgeyBNaW5pQ2hldnJvbkRvd25JY29uIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQtaWNvbnMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBzeXN0ZW0sIHRyYW5zaXRpb25Db25jYXQgfSBmcm9tICcuLi8uLi8uLi9nYW11dC1zdHlsZXMvZGlzdCc7XG5pbXBvcnQgeyBMYXlvdXRNZW51U2VjdGlvbiB9IGZyb20gJy4vTGF5b3V0TWVudVNlY3Rpb24nO1xuXG5jb25zdCBTdHlsZWRBY2NvcmRpb25BcmVhID0gc3R5bGVkKEFjY29yZGlvbkFyZWEpYFxuICBwYWRkaW5nLWJsb2NrOiAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLnNwYWNpbmdbMTZdfTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBsZWZ0OiAtNHB4O1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS5jb2xvcnNbJ25hdnktNTAwJ119O1xuYDtcblxuY29uc3QgU3R5bGVkQW5jaG9yID0gc3R5bGVkKEFuY2hvcilgXG4gIDpob3ZlciB7XG4gICAgY29sb3I6IGluaGVyaXQ7XG4gIH1cbmA7XG5cbmNvbnN0IEV4cGFuZENoZXZyb24gPSBzdHlsZWQoTWluaUNoZXZyb25Eb3duSWNvbikoXG4gIHN5c3RlbS5jc3Moe1xuICAgIHRyYW5zZm9ybTogJ3JvdGF0ZSgwZGVnKScsXG4gICAgdHJhbnNpdGlvbjogdHJhbnNpdGlvbkNvbmNhdChbJ3RyYW5zZm9ybSddLCAnc2xvdycsICdlYXNlLW91dCcpLFxuICB9KSxcbiAgc3lzdGVtLnN0YXRlcyh7XG4gICAgZXhwYW5kZWQ6IHsgdHJhbnNmb3JtOiAncm90YXRlKDE4MGRlZyknIH0sXG4gIH0pXG4pO1xuXG5leHBvcnQgdHlwZSBTZWN0aW9uSXRlbSA9IHtcbiAgdGl0bGU6IHN0cmluZztcbiAgc2x1Zzogc3RyaW5nO1xuICBocmVmOiBzdHJpbmc7XG4gIG9uQ2xpY2s6IChldmVudDogUmVhY3QuTW91c2VFdmVudCkgPT4gdm9pZDtcbn07XG5cbmV4cG9ydCB0eXBlIFNlY3Rpb24gPSB7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHNsdWc6IHN0cmluZztcbiAgaXRlbXM6IFNlY3Rpb25JdGVtW107XG59O1xuXG5leHBvcnQgdHlwZSBBY2NvcmRpb25NZW51UHJvcHMgPSB7XG4gIHNlY3Rpb246IFNlY3Rpb247XG4gIG9uU2VjdGlvblRvZ2dsZTogKHNlY3Rpb25TbHVnOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uSXRlbUNsaWNrOiAoKSA9PiB2b2lkO1xufTtcblxuZXhwb3J0IGNvbnN0IEFjY29yZGlvbk1lbnU6IFJlYWN0LkZDPEFjY29yZGlvbk1lbnVQcm9wcz4gPSAoe1xuICBzZWN0aW9uLFxuICBvblNlY3Rpb25Ub2dnbGUsXG4gIG9uSXRlbUNsaWNrLFxufSkgPT4ge1xuICBjb25zdCBbZXhwYW5kZWQsIHNldEV4cGFuZGVkXSA9IHVzZVN0YXRlKHRydWUpO1xuXG4gIHJldHVybiAoXG4gICAgPFN0eWxlZEFjY29yZGlvbkFyZWFcbiAgICAgIGV4cGFuZGVkPXtleHBhbmRlZH1cbiAgICAgIHRvcD17XG4gICAgICAgIDxTdHlsZWRBbmNob3JcbiAgICAgICAgICB2YXJpYW50PVwiaW50ZXJmYWNlXCJcbiAgICAgICAgICBwYj17MTJ9XG4gICAgICAgICAgcHg9ezR9XG4gICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgb25TZWN0aW9uVG9nZ2xlKHNlY3Rpb24uc2x1Zyk7XG4gICAgICAgICAgICBzZXRFeHBhbmRlZCgocHJldikgPT4gIXByZXYpO1xuICAgICAgICAgIH19XG4gICAgICAgICAgYXJpYS1leHBhbmRlZD17ZXhwYW5kZWR9XG4gICAgICAgICAgZGlzcGxheT1cImZsZXhcIlxuICAgICAgICAgIHdpZHRoPVwiMTAwJVwiXG4gICAgICAgID5cbiAgICAgICAgICA8Qm94IGRpc3BsYXk9XCJmbGV4XCIganVzdGlmeUNvbnRlbnQ9XCJzcGFjZS1iZXR3ZWVuXCIgd2lkdGg9XCIxMDAlXCI+XG4gICAgICAgICAgICA8VGV4dFxuICAgICAgICAgICAgICB2YXJpYW50PVwicC1zbWFsbFwiXG4gICAgICAgICAgICAgIHN0eWxlPXt7IGZsZXg6IDEsIGZvbnRXZWlnaHQ6ICdib2xkJyB9fVxuICAgICAgICAgICAgICB0ZXh0QWxpZ249XCJsZWZ0XCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3NlY3Rpb24udGl0bGV9XG4gICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICA8RXhwYW5kQ2hldnJvblxuICAgICAgICAgICAgICBtbD17MTJ9XG4gICAgICAgICAgICAgIHNpemU9ezE2fVxuICAgICAgICAgICAgICBleHBhbmRlZD17ZXhwYW5kZWR9XG4gICAgICAgICAgICAgIHBvc2l0aW9uPVwicmVsYXRpdmVcIlxuICAgICAgICAgICAgICB0b3A9ezR9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICA8L1N0eWxlZEFuY2hvcj5cbiAgICAgIH1cbiAgICA+XG4gICAgICA8TGF5b3V0TWVudVNlY3Rpb24gaXRlbXM9e3NlY3Rpb24uaXRlbXN9IG9uSXRlbUNsaWNrPXtvbkl0ZW1DbGlja30gLz5cbiAgICA8L1N0eWxlZEFjY29yZGlvbkFyZWE+XG4gICk7XG59O1xuIl19 */"));
var StyledAnchor = /*#__PURE__*/_styled(Anchor, {
  target: "e1u2hxrq1",
  label: "StyledAnchor"
})(process.env.NODE_ENV === "production" ? {
  name: "8a4698",
  styles: ":hover{color:inherit;}"
} : {
  name: "8a4698",
  styles: ":hover{color:inherit;}",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9MYXlvdXRNZW51VmFyaWFudC9BY2NvcmRpb25NZW51LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFlbUMiLCJmaWxlIjoiLi4vLi4vc3JjL0xheW91dE1lbnVWYXJpYW50L0FjY29yZGlvbk1lbnUudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWNjb3JkaW9uQXJlYSwgQW5jaG9yLCBCb3gsIFRleHQgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dCc7XG5pbXBvcnQgeyBNaW5pQ2hldnJvbkRvd25JY29uIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQtaWNvbnMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBzeXN0ZW0sIHRyYW5zaXRpb25Db25jYXQgfSBmcm9tICcuLi8uLi8uLi9nYW11dC1zdHlsZXMvZGlzdCc7XG5pbXBvcnQgeyBMYXlvdXRNZW51U2VjdGlvbiB9IGZyb20gJy4vTGF5b3V0TWVudVNlY3Rpb24nO1xuXG5jb25zdCBTdHlsZWRBY2NvcmRpb25BcmVhID0gc3R5bGVkKEFjY29yZGlvbkFyZWEpYFxuICBwYWRkaW5nLWJsb2NrOiAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLnNwYWNpbmdbMTZdfTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBsZWZ0OiAtNHB4O1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS5jb2xvcnNbJ25hdnktNTAwJ119O1xuYDtcblxuY29uc3QgU3R5bGVkQW5jaG9yID0gc3R5bGVkKEFuY2hvcilgXG4gIDpob3ZlciB7XG4gICAgY29sb3I6IGluaGVyaXQ7XG4gIH1cbmA7XG5cbmNvbnN0IEV4cGFuZENoZXZyb24gPSBzdHlsZWQoTWluaUNoZXZyb25Eb3duSWNvbikoXG4gIHN5c3RlbS5jc3Moe1xuICAgIHRyYW5zZm9ybTogJ3JvdGF0ZSgwZGVnKScsXG4gICAgdHJhbnNpdGlvbjogdHJhbnNpdGlvbkNvbmNhdChbJ3RyYW5zZm9ybSddLCAnc2xvdycsICdlYXNlLW91dCcpLFxuICB9KSxcbiAgc3lzdGVtLnN0YXRlcyh7XG4gICAgZXhwYW5kZWQ6IHsgdHJhbnNmb3JtOiAncm90YXRlKDE4MGRlZyknIH0sXG4gIH0pXG4pO1xuXG5leHBvcnQgdHlwZSBTZWN0aW9uSXRlbSA9IHtcbiAgdGl0bGU6IHN0cmluZztcbiAgc2x1Zzogc3RyaW5nO1xuICBocmVmOiBzdHJpbmc7XG4gIG9uQ2xpY2s6IChldmVudDogUmVhY3QuTW91c2VFdmVudCkgPT4gdm9pZDtcbn07XG5cbmV4cG9ydCB0eXBlIFNlY3Rpb24gPSB7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHNsdWc6IHN0cmluZztcbiAgaXRlbXM6IFNlY3Rpb25JdGVtW107XG59O1xuXG5leHBvcnQgdHlwZSBBY2NvcmRpb25NZW51UHJvcHMgPSB7XG4gIHNlY3Rpb246IFNlY3Rpb247XG4gIG9uU2VjdGlvblRvZ2dsZTogKHNlY3Rpb25TbHVnOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uSXRlbUNsaWNrOiAoKSA9PiB2b2lkO1xufTtcblxuZXhwb3J0IGNvbnN0IEFjY29yZGlvbk1lbnU6IFJlYWN0LkZDPEFjY29yZGlvbk1lbnVQcm9wcz4gPSAoe1xuICBzZWN0aW9uLFxuICBvblNlY3Rpb25Ub2dnbGUsXG4gIG9uSXRlbUNsaWNrLFxufSkgPT4ge1xuICBjb25zdCBbZXhwYW5kZWQsIHNldEV4cGFuZGVkXSA9IHVzZVN0YXRlKHRydWUpO1xuXG4gIHJldHVybiAoXG4gICAgPFN0eWxlZEFjY29yZGlvbkFyZWFcbiAgICAgIGV4cGFuZGVkPXtleHBhbmRlZH1cbiAgICAgIHRvcD17XG4gICAgICAgIDxTdHlsZWRBbmNob3JcbiAgICAgICAgICB2YXJpYW50PVwiaW50ZXJmYWNlXCJcbiAgICAgICAgICBwYj17MTJ9XG4gICAgICAgICAgcHg9ezR9XG4gICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgb25TZWN0aW9uVG9nZ2xlKHNlY3Rpb24uc2x1Zyk7XG4gICAgICAgICAgICBzZXRFeHBhbmRlZCgocHJldikgPT4gIXByZXYpO1xuICAgICAgICAgIH19XG4gICAgICAgICAgYXJpYS1leHBhbmRlZD17ZXhwYW5kZWR9XG4gICAgICAgICAgZGlzcGxheT1cImZsZXhcIlxuICAgICAgICAgIHdpZHRoPVwiMTAwJVwiXG4gICAgICAgID5cbiAgICAgICAgICA8Qm94IGRpc3BsYXk9XCJmbGV4XCIganVzdGlmeUNvbnRlbnQ9XCJzcGFjZS1iZXR3ZWVuXCIgd2lkdGg9XCIxMDAlXCI+XG4gICAgICAgICAgICA8VGV4dFxuICAgICAgICAgICAgICB2YXJpYW50PVwicC1zbWFsbFwiXG4gICAgICAgICAgICAgIHN0eWxlPXt7IGZsZXg6IDEsIGZvbnRXZWlnaHQ6ICdib2xkJyB9fVxuICAgICAgICAgICAgICB0ZXh0QWxpZ249XCJsZWZ0XCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3NlY3Rpb24udGl0bGV9XG4gICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICA8RXhwYW5kQ2hldnJvblxuICAgICAgICAgICAgICBtbD17MTJ9XG4gICAgICAgICAgICAgIHNpemU9ezE2fVxuICAgICAgICAgICAgICBleHBhbmRlZD17ZXhwYW5kZWR9XG4gICAgICAgICAgICAgIHBvc2l0aW9uPVwicmVsYXRpdmVcIlxuICAgICAgICAgICAgICB0b3A9ezR9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICA8L1N0eWxlZEFuY2hvcj5cbiAgICAgIH1cbiAgICA+XG4gICAgICA8TGF5b3V0TWVudVNlY3Rpb24gaXRlbXM9e3NlY3Rpb24uaXRlbXN9IG9uSXRlbUNsaWNrPXtvbkl0ZW1DbGlja30gLz5cbiAgICA8L1N0eWxlZEFjY29yZGlvbkFyZWE+XG4gICk7XG59O1xuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});
var ExpandChevron = /*#__PURE__*/_styled(MiniChevronDownIcon, {
  target: "e1u2hxrq0",
  label: "ExpandChevron"
})(system.css({
  transform: 'rotate(0deg)',
  transition: transitionConcat(['transform'], 'slow', 'ease-out')
}), system.states({
  expanded: {
    transform: 'rotate(180deg)'
  }
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9MYXlvdXRNZW51VmFyaWFudC9BY2NvcmRpb25NZW51LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFxQnNCIiwiZmlsZSI6Ii4uLy4uL3NyYy9MYXlvdXRNZW51VmFyaWFudC9BY2NvcmRpb25NZW51LnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjY29yZGlvbkFyZWEsIEFuY2hvciwgQm94LCBUZXh0IH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQnO1xuaW1wb3J0IHsgTWluaUNoZXZyb25Eb3duSWNvbiB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0LWljb25zJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgc3lzdGVtLCB0cmFuc2l0aW9uQ29uY2F0IH0gZnJvbSAnLi4vLi4vLi4vZ2FtdXQtc3R5bGVzL2Rpc3QnO1xuaW1wb3J0IHsgTGF5b3V0TWVudVNlY3Rpb24gfSBmcm9tICcuL0xheW91dE1lbnVTZWN0aW9uJztcblxuY29uc3QgU3R5bGVkQWNjb3JkaW9uQXJlYSA9IHN0eWxlZChBY2NvcmRpb25BcmVhKWBcbiAgcGFkZGluZy1ibG9jazogJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS5zcGFjaW5nWzE2XX07XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbGVmdDogLTRweDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUuY29sb3JzWyduYXZ5LTUwMCddfTtcbmA7XG5cbmNvbnN0IFN0eWxlZEFuY2hvciA9IHN0eWxlZChBbmNob3IpYFxuICA6aG92ZXIge1xuICAgIGNvbG9yOiBpbmhlcml0O1xuICB9XG5gO1xuXG5jb25zdCBFeHBhbmRDaGV2cm9uID0gc3R5bGVkKE1pbmlDaGV2cm9uRG93bkljb24pKFxuICBzeXN0ZW0uY3NzKHtcbiAgICB0cmFuc2Zvcm06ICdyb3RhdGUoMGRlZyknLFxuICAgIHRyYW5zaXRpb246IHRyYW5zaXRpb25Db25jYXQoWyd0cmFuc2Zvcm0nXSwgJ3Nsb3cnLCAnZWFzZS1vdXQnKSxcbiAgfSksXG4gIHN5c3RlbS5zdGF0ZXMoe1xuICAgIGV4cGFuZGVkOiB7IHRyYW5zZm9ybTogJ3JvdGF0ZSgxODBkZWcpJyB9LFxuICB9KVxuKTtcblxuZXhwb3J0IHR5cGUgU2VjdGlvbkl0ZW0gPSB7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHNsdWc6IHN0cmluZztcbiAgaHJlZjogc3RyaW5nO1xuICBvbkNsaWNrOiAoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHZvaWQ7XG59O1xuXG5leHBvcnQgdHlwZSBTZWN0aW9uID0ge1xuICB0aXRsZTogc3RyaW5nO1xuICBzbHVnOiBzdHJpbmc7XG4gIGl0ZW1zOiBTZWN0aW9uSXRlbVtdO1xufTtcblxuZXhwb3J0IHR5cGUgQWNjb3JkaW9uTWVudVByb3BzID0ge1xuICBzZWN0aW9uOiBTZWN0aW9uO1xuICBvblNlY3Rpb25Ub2dnbGU6IChzZWN0aW9uU2x1Zzogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkl0ZW1DbGljazogKCkgPT4gdm9pZDtcbn07XG5cbmV4cG9ydCBjb25zdCBBY2NvcmRpb25NZW51OiBSZWFjdC5GQzxBY2NvcmRpb25NZW51UHJvcHM+ID0gKHtcbiAgc2VjdGlvbixcbiAgb25TZWN0aW9uVG9nZ2xlLFxuICBvbkl0ZW1DbGljayxcbn0pID0+IHtcbiAgY29uc3QgW2V4cGFuZGVkLCBzZXRFeHBhbmRlZF0gPSB1c2VTdGF0ZSh0cnVlKTtcblxuICByZXR1cm4gKFxuICAgIDxTdHlsZWRBY2NvcmRpb25BcmVhXG4gICAgICBleHBhbmRlZD17ZXhwYW5kZWR9XG4gICAgICB0b3A9e1xuICAgICAgICA8U3R5bGVkQW5jaG9yXG4gICAgICAgICAgdmFyaWFudD1cImludGVyZmFjZVwiXG4gICAgICAgICAgcGI9ezEyfVxuICAgICAgICAgIHB4PXs0fVxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgIG9uU2VjdGlvblRvZ2dsZShzZWN0aW9uLnNsdWcpO1xuICAgICAgICAgICAgc2V0RXhwYW5kZWQoKHByZXYpID0+ICFwcmV2KTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9e2V4cGFuZGVkfVxuICAgICAgICAgIGRpc3BsYXk9XCJmbGV4XCJcbiAgICAgICAgICB3aWR0aD1cIjEwMCVcIlxuICAgICAgICA+XG4gICAgICAgICAgPEJveCBkaXNwbGF5PVwiZmxleFwiIGp1c3RpZnlDb250ZW50PVwic3BhY2UtYmV0d2VlblwiIHdpZHRoPVwiMTAwJVwiPlxuICAgICAgICAgICAgPFRleHRcbiAgICAgICAgICAgICAgdmFyaWFudD1cInAtc21hbGxcIlxuICAgICAgICAgICAgICBzdHlsZT17eyBmbGV4OiAxLCBmb250V2VpZ2h0OiAnYm9sZCcgfX1cbiAgICAgICAgICAgICAgdGV4dEFsaWduPVwibGVmdFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtzZWN0aW9uLnRpdGxlfVxuICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgPEV4cGFuZENoZXZyb25cbiAgICAgICAgICAgICAgbWw9ezEyfVxuICAgICAgICAgICAgICBzaXplPXsxNn1cbiAgICAgICAgICAgICAgZXhwYW5kZWQ9e2V4cGFuZGVkfVxuICAgICAgICAgICAgICBwb3NpdGlvbj1cInJlbGF0aXZlXCJcbiAgICAgICAgICAgICAgdG9wPXs0fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgPC9TdHlsZWRBbmNob3I+XG4gICAgICB9XG4gICAgPlxuICAgICAgPExheW91dE1lbnVTZWN0aW9uIGl0ZW1zPXtzZWN0aW9uLml0ZW1zfSBvbkl0ZW1DbGljaz17b25JdGVtQ2xpY2t9IC8+XG4gICAgPC9TdHlsZWRBY2NvcmRpb25BcmVhPlxuICApO1xufTtcbiJdfQ== */");
export var AccordionMenu = function AccordionMenu(_ref3) {
  var section = _ref3.section,
    onSectionToggle = _ref3.onSectionToggle,
    onItemClick = _ref3.onItemClick;
  var _useState = useState(true),
    _useState2 = _slicedToArray(_useState, 2),
    expanded = _useState2[0],
    setExpanded = _useState2[1];
  return /*#__PURE__*/_jsx(StyledAccordionArea, {
    expanded: expanded,
    top: /*#__PURE__*/_jsx(StyledAnchor, {
      variant: "interface",
      pb: 12,
      px: 4,
      onClick: function onClick() {
        onSectionToggle(section.slug);
        setExpanded(function (prev) {
          return !prev;
        });
      },
      "aria-expanded": expanded,
      display: "flex",
      width: "100%",
      children: /*#__PURE__*/_jsxs(Box, {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        children: [/*#__PURE__*/_jsx(Text, {
          variant: "p-small",
          style: {
            flex: 1,
            fontWeight: 'bold'
          },
          textAlign: "left",
          children: section.title
        }), /*#__PURE__*/_jsx(ExpandChevron, {
          ml: 12,
          size: 16,
          expanded: expanded,
          position: "relative",
          top: 4
        })]
      })
    }),
    children: /*#__PURE__*/_jsx(LayoutMenuSection, {
      items: section.items,
      onItemClick: onItemClick
    })
  });
};