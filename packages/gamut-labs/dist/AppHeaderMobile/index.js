function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
import _styled from "@emotion/styled/base";
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { Box, ContentContainer, IconButton, Overlay } from '@codecademy/gamut';
import { CloseIcon, MenuIcon } from '@codecademy/gamut-icons';
import { Background, css, useColorModes } from '@codecademy/gamut-styles';
import { useState } from 'react';
import * as React from 'react';
import { mapItemToElement, StyledAppBar } from '../AppHeader';
import { AppHeaderListItem } from '../AppHeader/AppHeaderElements/AppHeaderListItem';
import { appHeaderMobileBreakpoint } from '../AppHeader/shared';
import { AppHeaderMainMenuMobile } from '../AppHeaderMobile/AppHeaderMainMenuMobile';
import { HeaderHeightArea } from '../HeaderHeightArea';
import { NotificationsContents } from '../Notifications/NotificationsContents';
import { useHeaderNotifications } from '../Notifications/useHeaderNotifications';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var StyledOverlay = /*#__PURE__*/_styled(Overlay, {
  target: "eizxoml2",
  label: "StyledOverlay"
})(css({
  display: _defineProperty({
    _: "block"
  }, appHeaderMobileBreakpoint, "none"),
  width: "100vw",
  height: "100vh",
  opacity: 1,
  bg: "background",
  position: "fixed",
  left: 0,
  top: 0,
  overflowX: "hidden"
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9BcHBIZWFkZXJNb2JpbGUvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQStCc0IiLCJmaWxlIjoiLi4vLi4vc3JjL0FwcEhlYWRlck1vYmlsZS9pbmRleC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb3gsIENvbnRlbnRDb250YWluZXIsIEljb25CdXR0b24sIE92ZXJsYXkgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dCc7XG5pbXBvcnQgeyBDbG9zZUljb24sIE1lbnVJY29uIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQtaWNvbnMnO1xuaW1wb3J0IHsgQmFja2dyb3VuZCwgY3NzLCB1c2VDb2xvck1vZGVzIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQtc3R5bGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBtYXBJdGVtVG9FbGVtZW50LCBTdHlsZWRBcHBCYXIgfSBmcm9tICcuLi9BcHBIZWFkZXInO1xuaW1wb3J0IHsgQXBwSGVhZGVyTGlzdEl0ZW0gfSBmcm9tICcuLi9BcHBIZWFkZXIvQXBwSGVhZGVyRWxlbWVudHMvQXBwSGVhZGVyTGlzdEl0ZW0nO1xuaW1wb3J0IHtcbiAgQXBwSGVhZGVyQ2xpY2tIYW5kbGVyLFxuICBBcHBIZWFkZXJJdGVtLFxufSBmcm9tICcuLi9BcHBIZWFkZXIvQXBwSGVhZGVyRWxlbWVudHMvdHlwZXMnO1xuaW1wb3J0IHsgYXBwSGVhZGVyTW9iaWxlQnJlYWtwb2ludCB9IGZyb20gJy4uL0FwcEhlYWRlci9zaGFyZWQnO1xuaW1wb3J0IHsgRm9ybWF0dGVkTW9iaWxlQXBwSGVhZGVySXRlbXMgfSBmcm9tICcuLi9BcHBIZWFkZXIvdHlwZXMnO1xuaW1wb3J0IHsgQXBwSGVhZGVyTWFpbk1lbnVNb2JpbGUgfSBmcm9tICcuLi9BcHBIZWFkZXJNb2JpbGUvQXBwSGVhZGVyTWFpbk1lbnVNb2JpbGUnO1xuaW1wb3J0IHsgQ3Jvc3NEZXZpY2VTdGF0ZVByb3BzIH0gZnJvbSAnLi4vR2xvYmFsSGVhZGVyL3R5cGVzJztcbmltcG9ydCB7IEhlYWRlckhlaWdodEFyZWEgfSBmcm9tICcuLi9IZWFkZXJIZWlnaHRBcmVhJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbnNDb250ZW50cyB9IGZyb20gJy4uL05vdGlmaWNhdGlvbnMvTm90aWZpY2F0aW9uc0NvbnRlbnRzJztcbmltcG9ydCB7IEFwcEhlYWRlck5vdGlmaWNhdGlvblNldHRpbmdzIH0gZnJvbSAnLi4vTm90aWZpY2F0aW9ucy90eXBlcyc7XG5pbXBvcnQgeyB1c2VIZWFkZXJOb3RpZmljYXRpb25zIH0gZnJvbSAnLi4vTm90aWZpY2F0aW9ucy91c2VIZWFkZXJOb3RpZmljYXRpb25zJztcblxuZXhwb3J0IHR5cGUgQXBwSGVhZGVyTW9iaWxlUHJvcHMgPSB7XG4gIGFjdGlvbjogQXBwSGVhZGVyQ2xpY2tIYW5kbGVyO1xuICBpdGVtczogRm9ybWF0dGVkTW9iaWxlQXBwSGVhZGVySXRlbXM7XG4gIG5vdGlmaWNhdGlvbnM/OiBBcHBIZWFkZXJOb3RpZmljYXRpb25TZXR0aW5ncztcbiAgcmVkaXJlY3RQYXJhbT86IHN0cmluZztcbiAgb25TZWFyY2g6IChxdWVyeTogc3RyaW5nKSA9PiB2b2lkO1xuICBpc0Fub246IGJvb2xlYW47XG59ICYgQ3Jvc3NEZXZpY2VTdGF0ZVByb3BzO1xuXG5jb25zdCBTdHlsZWRPdmVybGF5ID0gc3R5bGVkKE92ZXJsYXkpKFxuICBjc3Moe1xuICAgIGRpc3BsYXk6IHsgXzogYGJsb2NrYCwgW2FwcEhlYWRlck1vYmlsZUJyZWFrcG9pbnRdOiBgbm9uZWAgfSxcbiAgICB3aWR0aDogYDEwMHZ3YCxcbiAgICBoZWlnaHQ6IGAxMDB2aGAsXG4gICAgb3BhY2l0eTogMSxcbiAgICBiZzogYGJhY2tncm91bmRgLFxuICAgIHBvc2l0aW9uOiBgZml4ZWRgLFxuICAgIGxlZnQ6IDAsXG4gICAgdG9wOiAwLFxuICAgIG92ZXJmbG93WDogYGhpZGRlbmAsXG4gIH0pXG4pO1xuXG5jb25zdCBTdHlsZWRDb250ZW50Q29udGFpbmVyID0gc3R5bGVkKENvbnRlbnRDb250YWluZXIpKFxuICBjc3Moe1xuICAgIGRpc3BsYXk6IGBmbGV4YCxcbiAgICBmbGV4RGlyZWN0aW9uOiBgY29sdW1uYCxcbiAgICBwOiAwLFxuICB9KVxuKTtcblxuY29uc3QgU3R5bGVkTWVudUJhciA9IHN0eWxlZC51bChcbiAgY3NzKHtcbiAgICBkaXNwbGF5OiBgZmxleGAsXG4gICAgcGFkZGluZzogMCxcbiAgICBsaXN0U3R5bGU6IGBub25lYCxcbiAgICBtYXJnaW46IDAsXG4gICAgd2lkdGg6IGAxMDAlYCxcbiAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgfSlcbik7XG5cbmV4cG9ydCBjb25zdCBBcHBIZWFkZXJNb2JpbGU6IFJlYWN0LkZDPEFwcEhlYWRlck1vYmlsZVByb3BzPiA9ICh7XG4gIGFjdGlvbixcbiAgaXRlbXMsXG4gIG5vdGlmaWNhdGlvbnMsXG4gIG9uU2VhcmNoLFxuICByZWRpcmVjdFBhcmFtLFxuICBpc0Fub24sXG4gIG9wZW5Dcm9zc0RldmljZUl0ZW1JZCxcbiAgc2V0T3BlbkNyb3NzRGV2aWNlSXRlbUlkLFxufSkgPT4ge1xuICBjb25zdCBbbW9kZSwgLCBtb2Rlc10gPSB1c2VDb2xvck1vZGVzKCk7XG4gIGNvbnN0IGJnQ3VycmVudCA9IG1vZGVzW21vZGVdWydiYWNrZ3JvdW5kLWN1cnJlbnQnXTtcbiAgY29uc3QgW21vYmlsZU1lbnVPcGVuLCBzZXRNb2JpbGVNZW51T3Blbl0gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gIGNvbnN0IFthbGxvd1Njcm9sbCwgc2V0QWxsb3dTY3JvbGxdID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIGNvbnN0IFtub3RpZmljYXRpb25zQmVsbCwgbm90aWZpY2F0aW9uc1ZpZXddID0gdXNlSGVhZGVyTm90aWZpY2F0aW9ucyh7XG4gICAgc2V0dGluZ3M6IG5vdGlmaWNhdGlvbnMsXG4gICAgUmVuZGVyZXI6IE5vdGlmaWNhdGlvbnNDb250ZW50cyxcbiAgICBvcGVuQ3Jvc3NEZXZpY2VJdGVtSWQsXG4gICAgc2V0T3BlbkNyb3NzRGV2aWNlSXRlbUlkLFxuICB9KTtcblxuICBjb25zdCBvcGVuTW9iaWxlTWVudSA9ICgpID0+IHtcbiAgICBzZXRNb2JpbGVNZW51T3Blbih0cnVlKTtcbiAgfTtcblxuICBjb25zdCBtYXBJdGVtc1RvRWxlbWVudCA9IDxUIGV4dGVuZHMgQXBwSGVhZGVySXRlbVtdPihcbiAgICBpdGVtczogVCxcbiAgICBzaWRlOiAnbGVmdCcgfCAncmlnaHQnLFxuICAgIGhpZGVFeHRyYUl0ZW1zPzogYm9vbGVhblxuICApID0+IHtcbiAgICBjb25zdCBzaG91bGRIaWRlSXRlbXMgPSBoaWRlRXh0cmFJdGVtcyA9PT0gdHJ1ZSAmJiBpdGVtcy5sZW5ndGggPiAxO1xuICAgIHJldHVybiBpdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBpc0xhc3RJdGVtID0gaW5kZXggKyAxID09PSBpdGVtcy5sZW5ndGg7XG4gICAgICBjb25zdCBpc0hpZGFibGUgPSAhaXNMYXN0SXRlbSAmJiBzaG91bGRIaWRlSXRlbXM7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8QXBwSGVhZGVyTGlzdEl0ZW1cbiAgICAgICAgICBrZXk9e2l0ZW0uaWR9XG4gICAgICAgICAgbWw9e3NpZGUgPT09ICdyaWdodCcgJiYgaW5kZXggPT09IDAgPyAnYXV0bycgOiAwfVxuICAgICAgICAgIGRpc3BsYXk9e3tcbiAgICAgICAgICAgIF86IGlzSGlkYWJsZSA/ICdub25lJyA6ICdmbGV4JyxcbiAgICAgICAgICAgIHhzOiAnZmxleCcsXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIHttYXBJdGVtVG9FbGVtZW50KFxuICAgICAgICAgICAgYWN0aW9uLFxuICAgICAgICAgICAgaXRlbSxcbiAgICAgICAgICAgIGlzQW5vbixcbiAgICAgICAgICAgIHJlZGlyZWN0UGFyYW0sXG4gICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICB0cnVlXG4gICAgICAgICAgKX1cbiAgICAgICAgPC9BcHBIZWFkZXJMaXN0SXRlbT5cbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgcmlnaHQgPSBbXG4gICAgLi4uKG5vdGlmaWNhdGlvbnNCZWxsID8gW25vdGlmaWNhdGlvbnNCZWxsXSA6IFtdKSxcbiAgICAuLi5pdGVtcy5yaWdodCxcbiAgXTtcblxuICBjb25zdCBvbkl0ZW1UeXBlID0gKHR5cGU6IHN0cmluZyB8IHVuZGVmaW5lZCkgPT4ge1xuICAgIGlmIChcbiAgICAgIHR5cGUgJiZcbiAgICAgICh0eXBlID09PSAnY2F0YWxvZy1kcm9wZG93bicgfHwgdHlwZSA9PT0gJ3Jlc291cmNlcy1kcm9wZG93bicpXG4gICAgKSB7XG4gICAgICBzZXRBbGxvd1Njcm9sbCh0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0QWxsb3dTY3JvbGwoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICB7IW1vYmlsZU1lbnVPcGVuICYmICggLy8gbmVlZCB0aGlzIGJjIEFwcEJhciBoYXMgYSBoYXJkY29kZWQgei1JbmRleCBvZiAxNVxuICAgICAgICA8SGVhZGVySGVpZ2h0QXJlYVxuICAgICAgICAgIGRpc3BsYXk9e3sgXzogYGJsb2NrYCwgW2FwcEhlYWRlck1vYmlsZUJyZWFrcG9pbnRdOiBgbm9uZWAgfX1cbiAgICAgICAgICBhcz1cIm5hdlwiXG4gICAgICAgICAgdGl0bGU9XCJNb2JpbGUgTmF2aWdhdGlvblwiXG4gICAgICAgID5cbiAgICAgICAgICA8U3R5bGVkQXBwQmFyPlxuICAgICAgICAgICAgPFN0eWxlZE1lbnVCYXIgcm9sZT1cIm1lbnViYXJcIj5cbiAgICAgICAgICAgICAge21hcEl0ZW1zVG9FbGVtZW50KGl0ZW1zLmxlZnQsICdsZWZ0Jyl9XG4gICAgICAgICAgICAgIHttYXBJdGVtc1RvRWxlbWVudChyaWdodCwgJ3JpZ2h0JywgdHJ1ZSl9XG4gICAgICAgICAgICAgIDxBcHBIZWFkZXJMaXN0SXRlbSBtbD17cmlnaHQubGVuZ3RoID09PSAwID8gJ2F1dG8nIDogMH0+XG4gICAgICAgICAgICAgICAgPEljb25CdXR0b25cbiAgICAgICAgICAgICAgICAgIGRhdGEtdGVzdGlkPVwiaGVhZGVyLW1vYmlsZS1tZW51XCJcbiAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJvcGVuIG5hdmlnYXRpb24gbWVudVwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG9wZW5Nb2JpbGVNZW51KCk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgaWNvbj17TWVudUljb259XG4gICAgICAgICAgICAgICAgICB2YXJpYW50PVwiaW50ZXJmYWNlXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L0FwcEhlYWRlckxpc3RJdGVtPlxuICAgICAgICAgICAgPC9TdHlsZWRNZW51QmFyPlxuICAgICAgICAgIDwvU3R5bGVkQXBwQmFyPlxuICAgICAgICA8L0hlYWRlckhlaWdodEFyZWE+XG4gICAgICApfVxuICAgICAgPFN0eWxlZE92ZXJsYXlcbiAgICAgICAgY2xpY2tPdXRzaWRlQ2xvc2VzXG4gICAgICAgIGVzY2FwZUNsb3Nlc1xuICAgICAgICBpc09wZW49e21vYmlsZU1lbnVPcGVufVxuICAgICAgICBvblJlcXVlc3RDbG9zZT17KCkgPT4gc2V0TW9iaWxlTWVudU9wZW4oZmFsc2UpfVxuICAgICAgICBhbGxvd1Njcm9sbD17YWxsb3dTY3JvbGx9XG4gICAgICA+XG4gICAgICAgIDxCYWNrZ3JvdW5kIGJnPXtiZ0N1cnJlbnR9PlxuICAgICAgICAgIDxIZWFkZXJIZWlnaHRBcmVhXG4gICAgICAgICAgICBkaXNwbGF5PXt7IF86IGBibG9ja2AsIFthcHBIZWFkZXJNb2JpbGVCcmVha3BvaW50XTogYG5vbmVgIH19XG4gICAgICAgICAgICBhcz1cIm5hdlwiXG4gICAgICAgICAgICB0aXRsZT1cIk1vYmlsZSBOYXZpZ2F0aW9uXCJcbiAgICAgICAgICAgIGRhdGEtdGVzdGlkPVwiaGVhZGVyLW1vYmlsZS1tZW51LWRyb3Bkb3duXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8U3R5bGVkQXBwQmFyPlxuICAgICAgICAgICAgICA8U3R5bGVkTWVudUJhciByb2xlPVwibWVudWJhclwiPlxuICAgICAgICAgICAgICAgIHttYXBJdGVtc1RvRWxlbWVudChpdGVtcy5sZWZ0LCAnbGVmdCcpfVxuICAgICAgICAgICAgICAgIDxBcHBIZWFkZXJMaXN0SXRlbSBtbD1cImF1dG9cIj5cbiAgICAgICAgICAgICAgICAgIDxJY29uQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJjbG9zZSBtZW51XCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHNldE1vYmlsZU1lbnVPcGVuKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgaWNvbj17Q2xvc2VJY29ufVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L0FwcEhlYWRlckxpc3RJdGVtPlxuICAgICAgICAgICAgICA8L1N0eWxlZE1lbnVCYXI+XG4gICAgICAgICAgICA8L1N0eWxlZEFwcEJhcj5cbiAgICAgICAgICAgIDxTdHlsZWRDb250ZW50Q29udGFpbmVyIGFzPVwidWxcIiByb2xlPVwibWVudWJhclwiIHNpemU9XCJzbWFsbFwiPlxuICAgICAgICAgICAgICA8QXBwSGVhZGVyTWFpbk1lbnVNb2JpbGVcbiAgICAgICAgICAgICAgICBhY3Rpb249e2FjdGlvbn1cbiAgICAgICAgICAgICAgICBpdGVtcz17aXRlbXMubWFpbk1lbnV9XG4gICAgICAgICAgICAgICAgb25TZWFyY2g9e29uU2VhcmNofVxuICAgICAgICAgICAgICAgIGdldEl0ZW1UeXBlPXtvbkl0ZW1UeXBlfVxuICAgICAgICAgICAgICAgIGlzQW5vbj17aXNBbm9ufVxuICAgICAgICAgICAgICAgIGhhbmRsZUNsb3NlTWFpbk1lbnU9eygpID0+IHNldE1vYmlsZU1lbnVPcGVuKGZhbHNlKX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvU3R5bGVkQ29udGVudENvbnRhaW5lcj5cbiAgICAgICAgICA8L0hlYWRlckhlaWdodEFyZWE+XG4gICAgICAgIDwvQmFja2dyb3VuZD5cbiAgICAgIDwvU3R5bGVkT3ZlcmxheT5cbiAgICAgIDxCb3ggZGlzcGxheT17eyBfOiBgYmxvY2tgLCBbYXBwSGVhZGVyTW9iaWxlQnJlYWtwb2ludF06IGBub25lYCB9fT5cbiAgICAgICAge25vdGlmaWNhdGlvbnNWaWV3fVxuICAgICAgPC9Cb3g+XG4gICAgPC8+XG4gICk7XG59O1xuIl19 */");
var StyledContentContainer = /*#__PURE__*/_styled(ContentContainer, {
  target: "eizxoml1",
  label: "StyledContentContainer"
})(css({
  display: "flex",
  flexDirection: "column",
  p: 0
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9BcHBIZWFkZXJNb2JpbGUvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTZDK0IiLCJmaWxlIjoiLi4vLi4vc3JjL0FwcEhlYWRlck1vYmlsZS9pbmRleC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb3gsIENvbnRlbnRDb250YWluZXIsIEljb25CdXR0b24sIE92ZXJsYXkgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dCc7XG5pbXBvcnQgeyBDbG9zZUljb24sIE1lbnVJY29uIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQtaWNvbnMnO1xuaW1wb3J0IHsgQmFja2dyb3VuZCwgY3NzLCB1c2VDb2xvck1vZGVzIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQtc3R5bGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBtYXBJdGVtVG9FbGVtZW50LCBTdHlsZWRBcHBCYXIgfSBmcm9tICcuLi9BcHBIZWFkZXInO1xuaW1wb3J0IHsgQXBwSGVhZGVyTGlzdEl0ZW0gfSBmcm9tICcuLi9BcHBIZWFkZXIvQXBwSGVhZGVyRWxlbWVudHMvQXBwSGVhZGVyTGlzdEl0ZW0nO1xuaW1wb3J0IHtcbiAgQXBwSGVhZGVyQ2xpY2tIYW5kbGVyLFxuICBBcHBIZWFkZXJJdGVtLFxufSBmcm9tICcuLi9BcHBIZWFkZXIvQXBwSGVhZGVyRWxlbWVudHMvdHlwZXMnO1xuaW1wb3J0IHsgYXBwSGVhZGVyTW9iaWxlQnJlYWtwb2ludCB9IGZyb20gJy4uL0FwcEhlYWRlci9zaGFyZWQnO1xuaW1wb3J0IHsgRm9ybWF0dGVkTW9iaWxlQXBwSGVhZGVySXRlbXMgfSBmcm9tICcuLi9BcHBIZWFkZXIvdHlwZXMnO1xuaW1wb3J0IHsgQXBwSGVhZGVyTWFpbk1lbnVNb2JpbGUgfSBmcm9tICcuLi9BcHBIZWFkZXJNb2JpbGUvQXBwSGVhZGVyTWFpbk1lbnVNb2JpbGUnO1xuaW1wb3J0IHsgQ3Jvc3NEZXZpY2VTdGF0ZVByb3BzIH0gZnJvbSAnLi4vR2xvYmFsSGVhZGVyL3R5cGVzJztcbmltcG9ydCB7IEhlYWRlckhlaWdodEFyZWEgfSBmcm9tICcuLi9IZWFkZXJIZWlnaHRBcmVhJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbnNDb250ZW50cyB9IGZyb20gJy4uL05vdGlmaWNhdGlvbnMvTm90aWZpY2F0aW9uc0NvbnRlbnRzJztcbmltcG9ydCB7IEFwcEhlYWRlck5vdGlmaWNhdGlvblNldHRpbmdzIH0gZnJvbSAnLi4vTm90aWZpY2F0aW9ucy90eXBlcyc7XG5pbXBvcnQgeyB1c2VIZWFkZXJOb3RpZmljYXRpb25zIH0gZnJvbSAnLi4vTm90aWZpY2F0aW9ucy91c2VIZWFkZXJOb3RpZmljYXRpb25zJztcblxuZXhwb3J0IHR5cGUgQXBwSGVhZGVyTW9iaWxlUHJvcHMgPSB7XG4gIGFjdGlvbjogQXBwSGVhZGVyQ2xpY2tIYW5kbGVyO1xuICBpdGVtczogRm9ybWF0dGVkTW9iaWxlQXBwSGVhZGVySXRlbXM7XG4gIG5vdGlmaWNhdGlvbnM/OiBBcHBIZWFkZXJOb3RpZmljYXRpb25TZXR0aW5ncztcbiAgcmVkaXJlY3RQYXJhbT86IHN0cmluZztcbiAgb25TZWFyY2g6IChxdWVyeTogc3RyaW5nKSA9PiB2b2lkO1xuICBpc0Fub246IGJvb2xlYW47XG59ICYgQ3Jvc3NEZXZpY2VTdGF0ZVByb3BzO1xuXG5jb25zdCBTdHlsZWRPdmVybGF5ID0gc3R5bGVkKE92ZXJsYXkpKFxuICBjc3Moe1xuICAgIGRpc3BsYXk6IHsgXzogYGJsb2NrYCwgW2FwcEhlYWRlck1vYmlsZUJyZWFrcG9pbnRdOiBgbm9uZWAgfSxcbiAgICB3aWR0aDogYDEwMHZ3YCxcbiAgICBoZWlnaHQ6IGAxMDB2aGAsXG4gICAgb3BhY2l0eTogMSxcbiAgICBiZzogYGJhY2tncm91bmRgLFxuICAgIHBvc2l0aW9uOiBgZml4ZWRgLFxuICAgIGxlZnQ6IDAsXG4gICAgdG9wOiAwLFxuICAgIG92ZXJmbG93WDogYGhpZGRlbmAsXG4gIH0pXG4pO1xuXG5jb25zdCBTdHlsZWRDb250ZW50Q29udGFpbmVyID0gc3R5bGVkKENvbnRlbnRDb250YWluZXIpKFxuICBjc3Moe1xuICAgIGRpc3BsYXk6IGBmbGV4YCxcbiAgICBmbGV4RGlyZWN0aW9uOiBgY29sdW1uYCxcbiAgICBwOiAwLFxuICB9KVxuKTtcblxuY29uc3QgU3R5bGVkTWVudUJhciA9IHN0eWxlZC51bChcbiAgY3NzKHtcbiAgICBkaXNwbGF5OiBgZmxleGAsXG4gICAgcGFkZGluZzogMCxcbiAgICBsaXN0U3R5bGU6IGBub25lYCxcbiAgICBtYXJnaW46IDAsXG4gICAgd2lkdGg6IGAxMDAlYCxcbiAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgfSlcbik7XG5cbmV4cG9ydCBjb25zdCBBcHBIZWFkZXJNb2JpbGU6IFJlYWN0LkZDPEFwcEhlYWRlck1vYmlsZVByb3BzPiA9ICh7XG4gIGFjdGlvbixcbiAgaXRlbXMsXG4gIG5vdGlmaWNhdGlvbnMsXG4gIG9uU2VhcmNoLFxuICByZWRpcmVjdFBhcmFtLFxuICBpc0Fub24sXG4gIG9wZW5Dcm9zc0RldmljZUl0ZW1JZCxcbiAgc2V0T3BlbkNyb3NzRGV2aWNlSXRlbUlkLFxufSkgPT4ge1xuICBjb25zdCBbbW9kZSwgLCBtb2Rlc10gPSB1c2VDb2xvck1vZGVzKCk7XG4gIGNvbnN0IGJnQ3VycmVudCA9IG1vZGVzW21vZGVdWydiYWNrZ3JvdW5kLWN1cnJlbnQnXTtcbiAgY29uc3QgW21vYmlsZU1lbnVPcGVuLCBzZXRNb2JpbGVNZW51T3Blbl0gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gIGNvbnN0IFthbGxvd1Njcm9sbCwgc2V0QWxsb3dTY3JvbGxdID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIGNvbnN0IFtub3RpZmljYXRpb25zQmVsbCwgbm90aWZpY2F0aW9uc1ZpZXddID0gdXNlSGVhZGVyTm90aWZpY2F0aW9ucyh7XG4gICAgc2V0dGluZ3M6IG5vdGlmaWNhdGlvbnMsXG4gICAgUmVuZGVyZXI6IE5vdGlmaWNhdGlvbnNDb250ZW50cyxcbiAgICBvcGVuQ3Jvc3NEZXZpY2VJdGVtSWQsXG4gICAgc2V0T3BlbkNyb3NzRGV2aWNlSXRlbUlkLFxuICB9KTtcblxuICBjb25zdCBvcGVuTW9iaWxlTWVudSA9ICgpID0+IHtcbiAgICBzZXRNb2JpbGVNZW51T3Blbih0cnVlKTtcbiAgfTtcblxuICBjb25zdCBtYXBJdGVtc1RvRWxlbWVudCA9IDxUIGV4dGVuZHMgQXBwSGVhZGVySXRlbVtdPihcbiAgICBpdGVtczogVCxcbiAgICBzaWRlOiAnbGVmdCcgfCAncmlnaHQnLFxuICAgIGhpZGVFeHRyYUl0ZW1zPzogYm9vbGVhblxuICApID0+IHtcbiAgICBjb25zdCBzaG91bGRIaWRlSXRlbXMgPSBoaWRlRXh0cmFJdGVtcyA9PT0gdHJ1ZSAmJiBpdGVtcy5sZW5ndGggPiAxO1xuICAgIHJldHVybiBpdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBpc0xhc3RJdGVtID0gaW5kZXggKyAxID09PSBpdGVtcy5sZW5ndGg7XG4gICAgICBjb25zdCBpc0hpZGFibGUgPSAhaXNMYXN0SXRlbSAmJiBzaG91bGRIaWRlSXRlbXM7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8QXBwSGVhZGVyTGlzdEl0ZW1cbiAgICAgICAgICBrZXk9e2l0ZW0uaWR9XG4gICAgICAgICAgbWw9e3NpZGUgPT09ICdyaWdodCcgJiYgaW5kZXggPT09IDAgPyAnYXV0bycgOiAwfVxuICAgICAgICAgIGRpc3BsYXk9e3tcbiAgICAgICAgICAgIF86IGlzSGlkYWJsZSA/ICdub25lJyA6ICdmbGV4JyxcbiAgICAgICAgICAgIHhzOiAnZmxleCcsXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIHttYXBJdGVtVG9FbGVtZW50KFxuICAgICAgICAgICAgYWN0aW9uLFxuICAgICAgICAgICAgaXRlbSxcbiAgICAgICAgICAgIGlzQW5vbixcbiAgICAgICAgICAgIHJlZGlyZWN0UGFyYW0sXG4gICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICB0cnVlXG4gICAgICAgICAgKX1cbiAgICAgICAgPC9BcHBIZWFkZXJMaXN0SXRlbT5cbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgcmlnaHQgPSBbXG4gICAgLi4uKG5vdGlmaWNhdGlvbnNCZWxsID8gW25vdGlmaWNhdGlvbnNCZWxsXSA6IFtdKSxcbiAgICAuLi5pdGVtcy5yaWdodCxcbiAgXTtcblxuICBjb25zdCBvbkl0ZW1UeXBlID0gKHR5cGU6IHN0cmluZyB8IHVuZGVmaW5lZCkgPT4ge1xuICAgIGlmIChcbiAgICAgIHR5cGUgJiZcbiAgICAgICh0eXBlID09PSAnY2F0YWxvZy1kcm9wZG93bicgfHwgdHlwZSA9PT0gJ3Jlc291cmNlcy1kcm9wZG93bicpXG4gICAgKSB7XG4gICAgICBzZXRBbGxvd1Njcm9sbCh0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0QWxsb3dTY3JvbGwoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICB7IW1vYmlsZU1lbnVPcGVuICYmICggLy8gbmVlZCB0aGlzIGJjIEFwcEJhciBoYXMgYSBoYXJkY29kZWQgei1JbmRleCBvZiAxNVxuICAgICAgICA8SGVhZGVySGVpZ2h0QXJlYVxuICAgICAgICAgIGRpc3BsYXk9e3sgXzogYGJsb2NrYCwgW2FwcEhlYWRlck1vYmlsZUJyZWFrcG9pbnRdOiBgbm9uZWAgfX1cbiAgICAgICAgICBhcz1cIm5hdlwiXG4gICAgICAgICAgdGl0bGU9XCJNb2JpbGUgTmF2aWdhdGlvblwiXG4gICAgICAgID5cbiAgICAgICAgICA8U3R5bGVkQXBwQmFyPlxuICAgICAgICAgICAgPFN0eWxlZE1lbnVCYXIgcm9sZT1cIm1lbnViYXJcIj5cbiAgICAgICAgICAgICAge21hcEl0ZW1zVG9FbGVtZW50KGl0ZW1zLmxlZnQsICdsZWZ0Jyl9XG4gICAgICAgICAgICAgIHttYXBJdGVtc1RvRWxlbWVudChyaWdodCwgJ3JpZ2h0JywgdHJ1ZSl9XG4gICAgICAgICAgICAgIDxBcHBIZWFkZXJMaXN0SXRlbSBtbD17cmlnaHQubGVuZ3RoID09PSAwID8gJ2F1dG8nIDogMH0+XG4gICAgICAgICAgICAgICAgPEljb25CdXR0b25cbiAgICAgICAgICAgICAgICAgIGRhdGEtdGVzdGlkPVwiaGVhZGVyLW1vYmlsZS1tZW51XCJcbiAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJvcGVuIG5hdmlnYXRpb24gbWVudVwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG9wZW5Nb2JpbGVNZW51KCk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgaWNvbj17TWVudUljb259XG4gICAgICAgICAgICAgICAgICB2YXJpYW50PVwiaW50ZXJmYWNlXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L0FwcEhlYWRlckxpc3RJdGVtPlxuICAgICAgICAgICAgPC9TdHlsZWRNZW51QmFyPlxuICAgICAgICAgIDwvU3R5bGVkQXBwQmFyPlxuICAgICAgICA8L0hlYWRlckhlaWdodEFyZWE+XG4gICAgICApfVxuICAgICAgPFN0eWxlZE92ZXJsYXlcbiAgICAgICAgY2xpY2tPdXRzaWRlQ2xvc2VzXG4gICAgICAgIGVzY2FwZUNsb3Nlc1xuICAgICAgICBpc09wZW49e21vYmlsZU1lbnVPcGVufVxuICAgICAgICBvblJlcXVlc3RDbG9zZT17KCkgPT4gc2V0TW9iaWxlTWVudU9wZW4oZmFsc2UpfVxuICAgICAgICBhbGxvd1Njcm9sbD17YWxsb3dTY3JvbGx9XG4gICAgICA+XG4gICAgICAgIDxCYWNrZ3JvdW5kIGJnPXtiZ0N1cnJlbnR9PlxuICAgICAgICAgIDxIZWFkZXJIZWlnaHRBcmVhXG4gICAgICAgICAgICBkaXNwbGF5PXt7IF86IGBibG9ja2AsIFthcHBIZWFkZXJNb2JpbGVCcmVha3BvaW50XTogYG5vbmVgIH19XG4gICAgICAgICAgICBhcz1cIm5hdlwiXG4gICAgICAgICAgICB0aXRsZT1cIk1vYmlsZSBOYXZpZ2F0aW9uXCJcbiAgICAgICAgICAgIGRhdGEtdGVzdGlkPVwiaGVhZGVyLW1vYmlsZS1tZW51LWRyb3Bkb3duXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8U3R5bGVkQXBwQmFyPlxuICAgICAgICAgICAgICA8U3R5bGVkTWVudUJhciByb2xlPVwibWVudWJhclwiPlxuICAgICAgICAgICAgICAgIHttYXBJdGVtc1RvRWxlbWVudChpdGVtcy5sZWZ0LCAnbGVmdCcpfVxuICAgICAgICAgICAgICAgIDxBcHBIZWFkZXJMaXN0SXRlbSBtbD1cImF1dG9cIj5cbiAgICAgICAgICAgICAgICAgIDxJY29uQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJjbG9zZSBtZW51XCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHNldE1vYmlsZU1lbnVPcGVuKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgaWNvbj17Q2xvc2VJY29ufVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L0FwcEhlYWRlckxpc3RJdGVtPlxuICAgICAgICAgICAgICA8L1N0eWxlZE1lbnVCYXI+XG4gICAgICAgICAgICA8L1N0eWxlZEFwcEJhcj5cbiAgICAgICAgICAgIDxTdHlsZWRDb250ZW50Q29udGFpbmVyIGFzPVwidWxcIiByb2xlPVwibWVudWJhclwiIHNpemU9XCJzbWFsbFwiPlxuICAgICAgICAgICAgICA8QXBwSGVhZGVyTWFpbk1lbnVNb2JpbGVcbiAgICAgICAgICAgICAgICBhY3Rpb249e2FjdGlvbn1cbiAgICAgICAgICAgICAgICBpdGVtcz17aXRlbXMubWFpbk1lbnV9XG4gICAgICAgICAgICAgICAgb25TZWFyY2g9e29uU2VhcmNofVxuICAgICAgICAgICAgICAgIGdldEl0ZW1UeXBlPXtvbkl0ZW1UeXBlfVxuICAgICAgICAgICAgICAgIGlzQW5vbj17aXNBbm9ufVxuICAgICAgICAgICAgICAgIGhhbmRsZUNsb3NlTWFpbk1lbnU9eygpID0+IHNldE1vYmlsZU1lbnVPcGVuKGZhbHNlKX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvU3R5bGVkQ29udGVudENvbnRhaW5lcj5cbiAgICAgICAgICA8L0hlYWRlckhlaWdodEFyZWE+XG4gICAgICAgIDwvQmFja2dyb3VuZD5cbiAgICAgIDwvU3R5bGVkT3ZlcmxheT5cbiAgICAgIDxCb3ggZGlzcGxheT17eyBfOiBgYmxvY2tgLCBbYXBwSGVhZGVyTW9iaWxlQnJlYWtwb2ludF06IGBub25lYCB9fT5cbiAgICAgICAge25vdGlmaWNhdGlvbnNWaWV3fVxuICAgICAgPC9Cb3g+XG4gICAgPC8+XG4gICk7XG59O1xuIl19 */");
var StyledMenuBar = /*#__PURE__*/_styled("ul", {
  target: "eizxoml0",
  label: "StyledMenuBar"
})(css({
  display: "flex",
  padding: 0,
  listStyle: "none",
  margin: 0,
  width: "100%",
  alignItems: 'center'
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9BcHBIZWFkZXJNb2JpbGUvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXFEc0IiLCJmaWxlIjoiLi4vLi4vc3JjL0FwcEhlYWRlck1vYmlsZS9pbmRleC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb3gsIENvbnRlbnRDb250YWluZXIsIEljb25CdXR0b24sIE92ZXJsYXkgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dCc7XG5pbXBvcnQgeyBDbG9zZUljb24sIE1lbnVJY29uIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQtaWNvbnMnO1xuaW1wb3J0IHsgQmFja2dyb3VuZCwgY3NzLCB1c2VDb2xvck1vZGVzIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQtc3R5bGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBtYXBJdGVtVG9FbGVtZW50LCBTdHlsZWRBcHBCYXIgfSBmcm9tICcuLi9BcHBIZWFkZXInO1xuaW1wb3J0IHsgQXBwSGVhZGVyTGlzdEl0ZW0gfSBmcm9tICcuLi9BcHBIZWFkZXIvQXBwSGVhZGVyRWxlbWVudHMvQXBwSGVhZGVyTGlzdEl0ZW0nO1xuaW1wb3J0IHtcbiAgQXBwSGVhZGVyQ2xpY2tIYW5kbGVyLFxuICBBcHBIZWFkZXJJdGVtLFxufSBmcm9tICcuLi9BcHBIZWFkZXIvQXBwSGVhZGVyRWxlbWVudHMvdHlwZXMnO1xuaW1wb3J0IHsgYXBwSGVhZGVyTW9iaWxlQnJlYWtwb2ludCB9IGZyb20gJy4uL0FwcEhlYWRlci9zaGFyZWQnO1xuaW1wb3J0IHsgRm9ybWF0dGVkTW9iaWxlQXBwSGVhZGVySXRlbXMgfSBmcm9tICcuLi9BcHBIZWFkZXIvdHlwZXMnO1xuaW1wb3J0IHsgQXBwSGVhZGVyTWFpbk1lbnVNb2JpbGUgfSBmcm9tICcuLi9BcHBIZWFkZXJNb2JpbGUvQXBwSGVhZGVyTWFpbk1lbnVNb2JpbGUnO1xuaW1wb3J0IHsgQ3Jvc3NEZXZpY2VTdGF0ZVByb3BzIH0gZnJvbSAnLi4vR2xvYmFsSGVhZGVyL3R5cGVzJztcbmltcG9ydCB7IEhlYWRlckhlaWdodEFyZWEgfSBmcm9tICcuLi9IZWFkZXJIZWlnaHRBcmVhJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbnNDb250ZW50cyB9IGZyb20gJy4uL05vdGlmaWNhdGlvbnMvTm90aWZpY2F0aW9uc0NvbnRlbnRzJztcbmltcG9ydCB7IEFwcEhlYWRlck5vdGlmaWNhdGlvblNldHRpbmdzIH0gZnJvbSAnLi4vTm90aWZpY2F0aW9ucy90eXBlcyc7XG5pbXBvcnQgeyB1c2VIZWFkZXJOb3RpZmljYXRpb25zIH0gZnJvbSAnLi4vTm90aWZpY2F0aW9ucy91c2VIZWFkZXJOb3RpZmljYXRpb25zJztcblxuZXhwb3J0IHR5cGUgQXBwSGVhZGVyTW9iaWxlUHJvcHMgPSB7XG4gIGFjdGlvbjogQXBwSGVhZGVyQ2xpY2tIYW5kbGVyO1xuICBpdGVtczogRm9ybWF0dGVkTW9iaWxlQXBwSGVhZGVySXRlbXM7XG4gIG5vdGlmaWNhdGlvbnM/OiBBcHBIZWFkZXJOb3RpZmljYXRpb25TZXR0aW5ncztcbiAgcmVkaXJlY3RQYXJhbT86IHN0cmluZztcbiAgb25TZWFyY2g6IChxdWVyeTogc3RyaW5nKSA9PiB2b2lkO1xuICBpc0Fub246IGJvb2xlYW47XG59ICYgQ3Jvc3NEZXZpY2VTdGF0ZVByb3BzO1xuXG5jb25zdCBTdHlsZWRPdmVybGF5ID0gc3R5bGVkKE92ZXJsYXkpKFxuICBjc3Moe1xuICAgIGRpc3BsYXk6IHsgXzogYGJsb2NrYCwgW2FwcEhlYWRlck1vYmlsZUJyZWFrcG9pbnRdOiBgbm9uZWAgfSxcbiAgICB3aWR0aDogYDEwMHZ3YCxcbiAgICBoZWlnaHQ6IGAxMDB2aGAsXG4gICAgb3BhY2l0eTogMSxcbiAgICBiZzogYGJhY2tncm91bmRgLFxuICAgIHBvc2l0aW9uOiBgZml4ZWRgLFxuICAgIGxlZnQ6IDAsXG4gICAgdG9wOiAwLFxuICAgIG92ZXJmbG93WDogYGhpZGRlbmAsXG4gIH0pXG4pO1xuXG5jb25zdCBTdHlsZWRDb250ZW50Q29udGFpbmVyID0gc3R5bGVkKENvbnRlbnRDb250YWluZXIpKFxuICBjc3Moe1xuICAgIGRpc3BsYXk6IGBmbGV4YCxcbiAgICBmbGV4RGlyZWN0aW9uOiBgY29sdW1uYCxcbiAgICBwOiAwLFxuICB9KVxuKTtcblxuY29uc3QgU3R5bGVkTWVudUJhciA9IHN0eWxlZC51bChcbiAgY3NzKHtcbiAgICBkaXNwbGF5OiBgZmxleGAsXG4gICAgcGFkZGluZzogMCxcbiAgICBsaXN0U3R5bGU6IGBub25lYCxcbiAgICBtYXJnaW46IDAsXG4gICAgd2lkdGg6IGAxMDAlYCxcbiAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgfSlcbik7XG5cbmV4cG9ydCBjb25zdCBBcHBIZWFkZXJNb2JpbGU6IFJlYWN0LkZDPEFwcEhlYWRlck1vYmlsZVByb3BzPiA9ICh7XG4gIGFjdGlvbixcbiAgaXRlbXMsXG4gIG5vdGlmaWNhdGlvbnMsXG4gIG9uU2VhcmNoLFxuICByZWRpcmVjdFBhcmFtLFxuICBpc0Fub24sXG4gIG9wZW5Dcm9zc0RldmljZUl0ZW1JZCxcbiAgc2V0T3BlbkNyb3NzRGV2aWNlSXRlbUlkLFxufSkgPT4ge1xuICBjb25zdCBbbW9kZSwgLCBtb2Rlc10gPSB1c2VDb2xvck1vZGVzKCk7XG4gIGNvbnN0IGJnQ3VycmVudCA9IG1vZGVzW21vZGVdWydiYWNrZ3JvdW5kLWN1cnJlbnQnXTtcbiAgY29uc3QgW21vYmlsZU1lbnVPcGVuLCBzZXRNb2JpbGVNZW51T3Blbl0gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gIGNvbnN0IFthbGxvd1Njcm9sbCwgc2V0QWxsb3dTY3JvbGxdID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIGNvbnN0IFtub3RpZmljYXRpb25zQmVsbCwgbm90aWZpY2F0aW9uc1ZpZXddID0gdXNlSGVhZGVyTm90aWZpY2F0aW9ucyh7XG4gICAgc2V0dGluZ3M6IG5vdGlmaWNhdGlvbnMsXG4gICAgUmVuZGVyZXI6IE5vdGlmaWNhdGlvbnNDb250ZW50cyxcbiAgICBvcGVuQ3Jvc3NEZXZpY2VJdGVtSWQsXG4gICAgc2V0T3BlbkNyb3NzRGV2aWNlSXRlbUlkLFxuICB9KTtcblxuICBjb25zdCBvcGVuTW9iaWxlTWVudSA9ICgpID0+IHtcbiAgICBzZXRNb2JpbGVNZW51T3Blbih0cnVlKTtcbiAgfTtcblxuICBjb25zdCBtYXBJdGVtc1RvRWxlbWVudCA9IDxUIGV4dGVuZHMgQXBwSGVhZGVySXRlbVtdPihcbiAgICBpdGVtczogVCxcbiAgICBzaWRlOiAnbGVmdCcgfCAncmlnaHQnLFxuICAgIGhpZGVFeHRyYUl0ZW1zPzogYm9vbGVhblxuICApID0+IHtcbiAgICBjb25zdCBzaG91bGRIaWRlSXRlbXMgPSBoaWRlRXh0cmFJdGVtcyA9PT0gdHJ1ZSAmJiBpdGVtcy5sZW5ndGggPiAxO1xuICAgIHJldHVybiBpdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBpc0xhc3RJdGVtID0gaW5kZXggKyAxID09PSBpdGVtcy5sZW5ndGg7XG4gICAgICBjb25zdCBpc0hpZGFibGUgPSAhaXNMYXN0SXRlbSAmJiBzaG91bGRIaWRlSXRlbXM7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8QXBwSGVhZGVyTGlzdEl0ZW1cbiAgICAgICAgICBrZXk9e2l0ZW0uaWR9XG4gICAgICAgICAgbWw9e3NpZGUgPT09ICdyaWdodCcgJiYgaW5kZXggPT09IDAgPyAnYXV0bycgOiAwfVxuICAgICAgICAgIGRpc3BsYXk9e3tcbiAgICAgICAgICAgIF86IGlzSGlkYWJsZSA/ICdub25lJyA6ICdmbGV4JyxcbiAgICAgICAgICAgIHhzOiAnZmxleCcsXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIHttYXBJdGVtVG9FbGVtZW50KFxuICAgICAgICAgICAgYWN0aW9uLFxuICAgICAgICAgICAgaXRlbSxcbiAgICAgICAgICAgIGlzQW5vbixcbiAgICAgICAgICAgIHJlZGlyZWN0UGFyYW0sXG4gICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICB0cnVlXG4gICAgICAgICAgKX1cbiAgICAgICAgPC9BcHBIZWFkZXJMaXN0SXRlbT5cbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgcmlnaHQgPSBbXG4gICAgLi4uKG5vdGlmaWNhdGlvbnNCZWxsID8gW25vdGlmaWNhdGlvbnNCZWxsXSA6IFtdKSxcbiAgICAuLi5pdGVtcy5yaWdodCxcbiAgXTtcblxuICBjb25zdCBvbkl0ZW1UeXBlID0gKHR5cGU6IHN0cmluZyB8IHVuZGVmaW5lZCkgPT4ge1xuICAgIGlmIChcbiAgICAgIHR5cGUgJiZcbiAgICAgICh0eXBlID09PSAnY2F0YWxvZy1kcm9wZG93bicgfHwgdHlwZSA9PT0gJ3Jlc291cmNlcy1kcm9wZG93bicpXG4gICAgKSB7XG4gICAgICBzZXRBbGxvd1Njcm9sbCh0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0QWxsb3dTY3JvbGwoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICB7IW1vYmlsZU1lbnVPcGVuICYmICggLy8gbmVlZCB0aGlzIGJjIEFwcEJhciBoYXMgYSBoYXJkY29kZWQgei1JbmRleCBvZiAxNVxuICAgICAgICA8SGVhZGVySGVpZ2h0QXJlYVxuICAgICAgICAgIGRpc3BsYXk9e3sgXzogYGJsb2NrYCwgW2FwcEhlYWRlck1vYmlsZUJyZWFrcG9pbnRdOiBgbm9uZWAgfX1cbiAgICAgICAgICBhcz1cIm5hdlwiXG4gICAgICAgICAgdGl0bGU9XCJNb2JpbGUgTmF2aWdhdGlvblwiXG4gICAgICAgID5cbiAgICAgICAgICA8U3R5bGVkQXBwQmFyPlxuICAgICAgICAgICAgPFN0eWxlZE1lbnVCYXIgcm9sZT1cIm1lbnViYXJcIj5cbiAgICAgICAgICAgICAge21hcEl0ZW1zVG9FbGVtZW50KGl0ZW1zLmxlZnQsICdsZWZ0Jyl9XG4gICAgICAgICAgICAgIHttYXBJdGVtc1RvRWxlbWVudChyaWdodCwgJ3JpZ2h0JywgdHJ1ZSl9XG4gICAgICAgICAgICAgIDxBcHBIZWFkZXJMaXN0SXRlbSBtbD17cmlnaHQubGVuZ3RoID09PSAwID8gJ2F1dG8nIDogMH0+XG4gICAgICAgICAgICAgICAgPEljb25CdXR0b25cbiAgICAgICAgICAgICAgICAgIGRhdGEtdGVzdGlkPVwiaGVhZGVyLW1vYmlsZS1tZW51XCJcbiAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJvcGVuIG5hdmlnYXRpb24gbWVudVwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG9wZW5Nb2JpbGVNZW51KCk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgaWNvbj17TWVudUljb259XG4gICAgICAgICAgICAgICAgICB2YXJpYW50PVwiaW50ZXJmYWNlXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L0FwcEhlYWRlckxpc3RJdGVtPlxuICAgICAgICAgICAgPC9TdHlsZWRNZW51QmFyPlxuICAgICAgICAgIDwvU3R5bGVkQXBwQmFyPlxuICAgICAgICA8L0hlYWRlckhlaWdodEFyZWE+XG4gICAgICApfVxuICAgICAgPFN0eWxlZE92ZXJsYXlcbiAgICAgICAgY2xpY2tPdXRzaWRlQ2xvc2VzXG4gICAgICAgIGVzY2FwZUNsb3Nlc1xuICAgICAgICBpc09wZW49e21vYmlsZU1lbnVPcGVufVxuICAgICAgICBvblJlcXVlc3RDbG9zZT17KCkgPT4gc2V0TW9iaWxlTWVudU9wZW4oZmFsc2UpfVxuICAgICAgICBhbGxvd1Njcm9sbD17YWxsb3dTY3JvbGx9XG4gICAgICA+XG4gICAgICAgIDxCYWNrZ3JvdW5kIGJnPXtiZ0N1cnJlbnR9PlxuICAgICAgICAgIDxIZWFkZXJIZWlnaHRBcmVhXG4gICAgICAgICAgICBkaXNwbGF5PXt7IF86IGBibG9ja2AsIFthcHBIZWFkZXJNb2JpbGVCcmVha3BvaW50XTogYG5vbmVgIH19XG4gICAgICAgICAgICBhcz1cIm5hdlwiXG4gICAgICAgICAgICB0aXRsZT1cIk1vYmlsZSBOYXZpZ2F0aW9uXCJcbiAgICAgICAgICAgIGRhdGEtdGVzdGlkPVwiaGVhZGVyLW1vYmlsZS1tZW51LWRyb3Bkb3duXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8U3R5bGVkQXBwQmFyPlxuICAgICAgICAgICAgICA8U3R5bGVkTWVudUJhciByb2xlPVwibWVudWJhclwiPlxuICAgICAgICAgICAgICAgIHttYXBJdGVtc1RvRWxlbWVudChpdGVtcy5sZWZ0LCAnbGVmdCcpfVxuICAgICAgICAgICAgICAgIDxBcHBIZWFkZXJMaXN0SXRlbSBtbD1cImF1dG9cIj5cbiAgICAgICAgICAgICAgICAgIDxJY29uQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJjbG9zZSBtZW51XCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHNldE1vYmlsZU1lbnVPcGVuKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgaWNvbj17Q2xvc2VJY29ufVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L0FwcEhlYWRlckxpc3RJdGVtPlxuICAgICAgICAgICAgICA8L1N0eWxlZE1lbnVCYXI+XG4gICAgICAgICAgICA8L1N0eWxlZEFwcEJhcj5cbiAgICAgICAgICAgIDxTdHlsZWRDb250ZW50Q29udGFpbmVyIGFzPVwidWxcIiByb2xlPVwibWVudWJhclwiIHNpemU9XCJzbWFsbFwiPlxuICAgICAgICAgICAgICA8QXBwSGVhZGVyTWFpbk1lbnVNb2JpbGVcbiAgICAgICAgICAgICAgICBhY3Rpb249e2FjdGlvbn1cbiAgICAgICAgICAgICAgICBpdGVtcz17aXRlbXMubWFpbk1lbnV9XG4gICAgICAgICAgICAgICAgb25TZWFyY2g9e29uU2VhcmNofVxuICAgICAgICAgICAgICAgIGdldEl0ZW1UeXBlPXtvbkl0ZW1UeXBlfVxuICAgICAgICAgICAgICAgIGlzQW5vbj17aXNBbm9ufVxuICAgICAgICAgICAgICAgIGhhbmRsZUNsb3NlTWFpbk1lbnU9eygpID0+IHNldE1vYmlsZU1lbnVPcGVuKGZhbHNlKX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvU3R5bGVkQ29udGVudENvbnRhaW5lcj5cbiAgICAgICAgICA8L0hlYWRlckhlaWdodEFyZWE+XG4gICAgICAgIDwvQmFja2dyb3VuZD5cbiAgICAgIDwvU3R5bGVkT3ZlcmxheT5cbiAgICAgIDxCb3ggZGlzcGxheT17eyBfOiBgYmxvY2tgLCBbYXBwSGVhZGVyTW9iaWxlQnJlYWtwb2ludF06IGBub25lYCB9fT5cbiAgICAgICAge25vdGlmaWNhdGlvbnNWaWV3fVxuICAgICAgPC9Cb3g+XG4gICAgPC8+XG4gICk7XG59O1xuIl19 */");
export var AppHeaderMobile = function AppHeaderMobile(_ref) {
  var action = _ref.action,
    items = _ref.items,
    notifications = _ref.notifications,
    onSearch = _ref.onSearch,
    redirectParam = _ref.redirectParam,
    isAnon = _ref.isAnon,
    openCrossDeviceItemId = _ref.openCrossDeviceItemId,
    setOpenCrossDeviceItemId = _ref.setOpenCrossDeviceItemId;
  var _useColorModes = useColorModes(),
    _useColorModes2 = _slicedToArray(_useColorModes, 3),
    mode = _useColorModes2[0],
    modes = _useColorModes2[2];
  var bgCurrent = modes[mode]['background-current'];
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    mobileMenuOpen = _useState2[0],
    setMobileMenuOpen = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    allowScroll = _useState4[0],
    setAllowScroll = _useState4[1];
  var _useHeaderNotificatio = useHeaderNotifications({
      settings: notifications,
      Renderer: NotificationsContents,
      openCrossDeviceItemId: openCrossDeviceItemId,
      setOpenCrossDeviceItemId: setOpenCrossDeviceItemId
    }),
    _useHeaderNotificatio2 = _slicedToArray(_useHeaderNotificatio, 2),
    notificationsBell = _useHeaderNotificatio2[0],
    notificationsView = _useHeaderNotificatio2[1];
  var openMobileMenu = function openMobileMenu() {
    setMobileMenuOpen(true);
  };
  var mapItemsToElement = function mapItemsToElement(items, side, hideExtraItems) {
    var shouldHideItems = hideExtraItems === true && items.length > 1;
    return items.map(function (item, index) {
      var isLastItem = index + 1 === items.length;
      var isHidable = !isLastItem && shouldHideItems;
      return /*#__PURE__*/_jsx(AppHeaderListItem, {
        ml: side === 'right' && index === 0 ? 'auto' : 0,
        display: {
          _: isHidable ? 'none' : 'flex',
          xs: 'flex'
        },
        children: mapItemToElement(action, item, isAnon, redirectParam, undefined, true)
      }, item.id);
    });
  };
  var right = [].concat(_toConsumableArray(notificationsBell ? [notificationsBell] : []), _toConsumableArray(items.right));
  var onItemType = function onItemType(type) {
    if (type && (type === 'catalog-dropdown' || type === 'resources-dropdown')) {
      setAllowScroll(true);
    } else {
      setAllowScroll(false);
    }
  };
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [!mobileMenuOpen &&
    /*#__PURE__*/
    // need this bc AppBar has a hardcoded z-Index of 15
    _jsx(HeaderHeightArea, {
      display: _defineProperty({
        _: "block"
      }, appHeaderMobileBreakpoint, "none"),
      as: "nav",
      title: "Mobile Navigation",
      children: /*#__PURE__*/_jsx(StyledAppBar, {
        children: /*#__PURE__*/_jsxs(StyledMenuBar, {
          role: "menubar",
          children: [mapItemsToElement(items.left, 'left'), mapItemsToElement(right, 'right', true), /*#__PURE__*/_jsx(AppHeaderListItem, {
            ml: right.length === 0 ? 'auto' : 0,
            children: /*#__PURE__*/_jsx(IconButton, {
              "data-testid": "header-mobile-menu",
              "aria-label": "open navigation menu",
              onClick: function onClick() {
                openMobileMenu();
              },
              icon: MenuIcon,
              variant: "interface"
            })
          })]
        })
      })
    }), /*#__PURE__*/_jsx(StyledOverlay, {
      clickOutsideCloses: true,
      escapeCloses: true,
      isOpen: mobileMenuOpen,
      onRequestClose: function onRequestClose() {
        return setMobileMenuOpen(false);
      },
      allowScroll: allowScroll,
      children: /*#__PURE__*/_jsx(Background, {
        bg: bgCurrent,
        children: /*#__PURE__*/_jsxs(HeaderHeightArea, {
          display: _defineProperty({
            _: "block"
          }, appHeaderMobileBreakpoint, "none"),
          as: "nav",
          title: "Mobile Navigation",
          "data-testid": "header-mobile-menu-dropdown",
          children: [/*#__PURE__*/_jsx(StyledAppBar, {
            children: /*#__PURE__*/_jsxs(StyledMenuBar, {
              role: "menubar",
              children: [mapItemsToElement(items.left, 'left'), /*#__PURE__*/_jsx(AppHeaderListItem, {
                ml: "auto",
                children: /*#__PURE__*/_jsx(IconButton, {
                  "aria-label": "close menu",
                  onClick: function onClick() {
                    setMobileMenuOpen(false);
                  },
                  icon: CloseIcon
                })
              })]
            })
          }), /*#__PURE__*/_jsx(StyledContentContainer, {
            as: "ul",
            role: "menubar",
            size: "small",
            children: /*#__PURE__*/_jsx(AppHeaderMainMenuMobile, {
              action: action,
              items: items.mainMenu,
              onSearch: onSearch,
              getItemType: onItemType,
              isAnon: isAnon,
              handleCloseMainMenu: function handleCloseMainMenu() {
                return setMobileMenuOpen(false);
              }
            })
          })]
        })
      })
    }), /*#__PURE__*/_jsx(Box, {
      display: _defineProperty({
        _: "block"
      }, appHeaderMobileBreakpoint, "none"),
      children: notificationsView
    })]
  });
};