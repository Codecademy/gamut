import _styled from "@emotion/styled/base";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Box, ContentContainer, IconButton, Overlay } from '@codecademy/gamut';
import { CloseIcon, MenuIcon } from '@codecademy/gamut-icons';
import { css } from '@codecademy/gamut-styles';
import React, { useState } from 'react';
import { mapItemToElement, StyledAppBar } from '../AppHeader';
import { AppHeaderListItem } from '../AppHeader/AppHeaderElements/AppHeaderListItem';
import { appHeaderMobileBreakpoint } from '../AppHeader/shared';
import { AppHeaderMainMenuMobile } from '../AppHeaderMobile/AppHeaderMainMenuMobile';
import { CrossDeviceBookmarksView } from '../Bookmarks/types';
import { useBookmarkComponentsPair } from '../Bookmarks/useBookmarkComponentsPair';
import { HeaderHeightArea } from '../HeaderHeightArea';
import { NotificationsContents } from '../Notifications/NotificationsContents';
import { useHeaderNotifications } from '../Notifications/useHeaderNotifications';

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
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9BcHBIZWFkZXJNb2JpbGUvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQW9Dc0IiLCJmaWxlIjoiLi4vLi4vc3JjL0FwcEhlYWRlck1vYmlsZS9pbmRleC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb3gsIENvbnRlbnRDb250YWluZXIsIEljb25CdXR0b24sIE92ZXJsYXkgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dCc7XG5pbXBvcnQgeyBDbG9zZUljb24sIE1lbnVJY29uIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQtaWNvbnMnO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQtc3R5bGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgbWFwSXRlbVRvRWxlbWVudCwgU3R5bGVkQXBwQmFyIH0gZnJvbSAnLi4vQXBwSGVhZGVyJztcbmltcG9ydCB7IEFwcEhlYWRlckxpc3RJdGVtIH0gZnJvbSAnLi4vQXBwSGVhZGVyL0FwcEhlYWRlckVsZW1lbnRzL0FwcEhlYWRlckxpc3RJdGVtJztcbmltcG9ydCB7XG4gIEFwcEhlYWRlckNsaWNrSGFuZGxlcixcbiAgQXBwSGVhZGVySXRlbSxcbn0gZnJvbSAnLi4vQXBwSGVhZGVyL0FwcEhlYWRlckVsZW1lbnRzL3R5cGVzJztcbmltcG9ydCB7IGFwcEhlYWRlck1vYmlsZUJyZWFrcG9pbnQgfSBmcm9tICcuLi9BcHBIZWFkZXIvc2hhcmVkJztcbmltcG9ydCB7IEZvcm1hdHRlZE1vYmlsZUFwcEhlYWRlckl0ZW1zIH0gZnJvbSAnLi4vQXBwSGVhZGVyL3R5cGVzJztcbmltcG9ydCB7IEFwcEhlYWRlck1haW5NZW51TW9iaWxlIH0gZnJvbSAnLi4vQXBwSGVhZGVyTW9iaWxlL0FwcEhlYWRlck1haW5NZW51TW9iaWxlJztcbmltcG9ydCB7XG4gIENyb3NzRGV2aWNlQm9va21hcmtQYXJ0cyxcbiAgQ3Jvc3NEZXZpY2VCb29rbWFya3NWaWV3LFxufSBmcm9tICcuLi9Cb29rbWFya3MvdHlwZXMnO1xuaW1wb3J0IHsgdXNlQm9va21hcmtDb21wb25lbnRzUGFpciB9IGZyb20gJy4uL0Jvb2ttYXJrcy91c2VCb29rbWFya0NvbXBvbmVudHNQYWlyJztcbmltcG9ydCB7IENyb3NzRGV2aWNlU3RhdGVQcm9wcyB9IGZyb20gJy4uL0dsb2JhbEhlYWRlci90eXBlcyc7XG5pbXBvcnQgeyBIZWFkZXJIZWlnaHRBcmVhIH0gZnJvbSAnLi4vSGVhZGVySGVpZ2h0QXJlYSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25zQ29udGVudHMgfSBmcm9tICcuLi9Ob3RpZmljYXRpb25zL05vdGlmaWNhdGlvbnNDb250ZW50cyc7XG5pbXBvcnQgeyBBcHBIZWFkZXJOb3RpZmljYXRpb25TZXR0aW5ncyB9IGZyb20gJy4uL05vdGlmaWNhdGlvbnMvdHlwZXMnO1xuaW1wb3J0IHsgdXNlSGVhZGVyTm90aWZpY2F0aW9ucyB9IGZyb20gJy4uL05vdGlmaWNhdGlvbnMvdXNlSGVhZGVyTm90aWZpY2F0aW9ucyc7XG5cbmV4cG9ydCB0eXBlIEFwcEhlYWRlck1vYmlsZVByb3BzID0ge1xuICBhY3Rpb246IEFwcEhlYWRlckNsaWNrSGFuZGxlcjtcbiAgaXRlbXM6IEZvcm1hdHRlZE1vYmlsZUFwcEhlYWRlckl0ZW1zO1xuICBub3RpZmljYXRpb25zPzogQXBwSGVhZGVyTm90aWZpY2F0aW9uU2V0dGluZ3M7XG4gIHJlZGlyZWN0UGFyYW0/OiBzdHJpbmc7XG4gIG9uU2VhcmNoOiAocXVlcnk6IHN0cmluZykgPT4gdm9pZDtcbiAgaXNBbm9uOiBib29sZWFuO1xuICBjcm9zc0RldmljZUJvb2ttYXJrUGFydHM/OiBDcm9zc0RldmljZUJvb2ttYXJrUGFydHM7XG59ICYgQ3Jvc3NEZXZpY2VTdGF0ZVByb3BzO1xuXG5jb25zdCBTdHlsZWRPdmVybGF5ID0gc3R5bGVkKE92ZXJsYXkpKFxuICBjc3Moe1xuICAgIGRpc3BsYXk6IHsgXzogYGJsb2NrYCwgW2FwcEhlYWRlck1vYmlsZUJyZWFrcG9pbnRdOiBgbm9uZWAgfSxcbiAgICB3aWR0aDogYDEwMHZ3YCxcbiAgICBoZWlnaHQ6IGAxMDB2aGAsXG4gICAgb3BhY2l0eTogMSxcbiAgICBiZzogYGJhY2tncm91bmRgLFxuICAgIHBvc2l0aW9uOiBgZml4ZWRgLFxuICAgIGxlZnQ6IDAsXG4gICAgdG9wOiAwLFxuICAgIG92ZXJmbG93WDogYGhpZGRlbmAsXG4gIH0pXG4pO1xuXG5jb25zdCBTdHlsZWRDb250ZW50Q29udGFpbmVyID0gc3R5bGVkKENvbnRlbnRDb250YWluZXIpKFxuICBjc3Moe1xuICAgIGRpc3BsYXk6IGBmbGV4YCxcbiAgICBmbGV4RGlyZWN0aW9uOiBgY29sdW1uYCxcbiAgICBwOiAwLFxuICB9KVxuKTtcblxuY29uc3QgU3R5bGVkTWVudUJhciA9IHN0eWxlZC51bChcbiAgY3NzKHtcbiAgICBkaXNwbGF5OiBgZmxleGAsXG4gICAgcGFkZGluZzogMCxcbiAgICBsaXN0U3R5bGU6IGBub25lYCxcbiAgICBtYXJnaW46IDAsXG4gICAgd2lkdGg6IGAxMDAlYCxcbiAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgfSlcbik7XG5cbmV4cG9ydCBjb25zdCBBcHBIZWFkZXJNb2JpbGU6IFJlYWN0LkZDPEFwcEhlYWRlck1vYmlsZVByb3BzPiA9ICh7XG4gIGFjdGlvbixcbiAgaXRlbXMsXG4gIG5vdGlmaWNhdGlvbnMsXG4gIG9uU2VhcmNoLFxuICByZWRpcmVjdFBhcmFtLFxuICBpc0Fub24sXG4gIG9wZW5Dcm9zc0RldmljZUl0ZW1JZCxcbiAgc2V0T3BlbkNyb3NzRGV2aWNlSXRlbUlkLFxuICBjcm9zc0RldmljZUJvb2ttYXJrUGFydHMsXG59KSA9PiB7XG4gIGNvbnN0IFttb2JpbGVNZW51T3Blbiwgc2V0TW9iaWxlTWVudU9wZW5dID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuICBjb25zdCBbYWxsb3dTY3JvbGwsIHNldEFsbG93U2Nyb2xsXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcblxuICBjb25zdCBbbm90aWZpY2F0aW9uc0JlbGwsIG5vdGlmaWNhdGlvbnNWaWV3XSA9IHVzZUhlYWRlck5vdGlmaWNhdGlvbnMoe1xuICAgIHNldHRpbmdzOiBub3RpZmljYXRpb25zLFxuICAgIFJlbmRlcmVyOiBOb3RpZmljYXRpb25zQ29udGVudHMsXG4gICAgb3BlbkNyb3NzRGV2aWNlSXRlbUlkLFxuICAgIHNldE9wZW5Dcm9zc0RldmljZUl0ZW1JZCxcbiAgfSk7XG5cbiAgY29uc3QgW2Jvb2ttYXJrc0J1dHRvbiwgYm9va21hcmtzQ29udGVudF0gPSB1c2VCb29rbWFya0NvbXBvbmVudHNQYWlyKHtcbiAgICBvcGVuQ3Jvc3NEZXZpY2VJdGVtSWQsXG4gICAgc2V0T3BlbkNyb3NzRGV2aWNlSXRlbUlkLFxuICAgIGJvb2ttYXJrUGFydHM6IGNyb3NzRGV2aWNlQm9va21hcmtQYXJ0cyxcbiAgICB2aWV3OiBDcm9zc0RldmljZUJvb2ttYXJrc1ZpZXcuTU9CSUxFLFxuICAgIGlzQW5vbixcbiAgfSk7XG5cbiAgY29uc3Qgb3Blbk1vYmlsZU1lbnUgPSAoKSA9PiB7XG4gICAgc2V0TW9iaWxlTWVudU9wZW4odHJ1ZSk7XG4gIH07XG5cbiAgY29uc3QgbWFwSXRlbXNUb0VsZW1lbnQgPSA8VCBleHRlbmRzIEFwcEhlYWRlckl0ZW1bXT4oXG4gICAgaXRlbXM6IFQsXG4gICAgc2lkZTogJ2xlZnQnIHwgJ3JpZ2h0JyxcbiAgICBoaWRlRXh0cmFJdGVtcz86IGJvb2xlYW5cbiAgKSA9PiB7XG4gICAgY29uc3Qgc2hvdWxkSGlkZUl0ZW1zID0gaGlkZUV4dHJhSXRlbXMgPT09IHRydWUgJiYgaXRlbXMubGVuZ3RoID4gMTtcbiAgICByZXR1cm4gaXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgaXNMYXN0SXRlbSA9IGluZGV4ICsgMSA9PT0gaXRlbXMubGVuZ3RoO1xuICAgICAgY29uc3QgaXNIaWRhYmxlID0gIWlzTGFzdEl0ZW0gJiYgc2hvdWxkSGlkZUl0ZW1zO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPEFwcEhlYWRlckxpc3RJdGVtXG4gICAgICAgICAga2V5PXtpdGVtLmlkfVxuICAgICAgICAgIG1sPXtzaWRlID09PSAncmlnaHQnICYmIGluZGV4ID09PSAwID8gJ2F1dG8nIDogMH1cbiAgICAgICAgICBkaXNwbGF5PXt7XG4gICAgICAgICAgICBfOiBpc0hpZGFibGUgPyAnbm9uZScgOiAnZmxleCcsXG4gICAgICAgICAgICB4czogJ2ZsZXgnLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICB7bWFwSXRlbVRvRWxlbWVudChcbiAgICAgICAgICAgIGFjdGlvbixcbiAgICAgICAgICAgIGl0ZW0sXG4gICAgICAgICAgICBpc0Fub24sXG4gICAgICAgICAgICByZWRpcmVjdFBhcmFtLFxuICAgICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgICAgdHJ1ZVxuICAgICAgICAgICl9XG4gICAgICAgIDwvQXBwSGVhZGVyTGlzdEl0ZW0+XG4gICAgICApO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHJpZ2h0ID0gW1xuICAgIC4uLihub3RpZmljYXRpb25zQmVsbCA/IFtub3RpZmljYXRpb25zQmVsbF0gOiBbXSksXG4gICAgLi4uKGJvb2ttYXJrc0J1dHRvbiA/IFtib29rbWFya3NCdXR0b25dIDogW10pLFxuICAgIC4uLml0ZW1zLnJpZ2h0LFxuICBdO1xuXG4gIGNvbnN0IG9uSXRlbVR5cGUgPSAodHlwZTogc3RyaW5nIHwgdW5kZWZpbmVkKSA9PiB7XG4gICAgaWYgKFxuICAgICAgdHlwZSAmJlxuICAgICAgKHR5cGUgPT09ICdjYXRhbG9nLWRyb3Bkb3duJyB8fFxuICAgICAgICB0eXBlID09PSAnZXhwZXJpbWVudGFsLXJlc291cmNlcy1kcm9wZG93bicpXG4gICAgKSB7XG4gICAgICBzZXRBbGxvd1Njcm9sbCh0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0QWxsb3dTY3JvbGwoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICB7IW1vYmlsZU1lbnVPcGVuICYmICggLy8gbmVlZCB0aGlzIGJjIEFwcEJhciBoYXMgYSBoYXJkY29kZWQgei1JbmRleCBvZiAxNVxuICAgICAgICA8SGVhZGVySGVpZ2h0QXJlYVxuICAgICAgICAgIGRpc3BsYXk9e3sgXzogYGJsb2NrYCwgW2FwcEhlYWRlck1vYmlsZUJyZWFrcG9pbnRdOiBgbm9uZWAgfX1cbiAgICAgICAgICBhcz1cIm5hdlwiXG4gICAgICAgICAgdGl0bGU9XCJNb2JpbGUgTmF2aWdhdGlvblwiXG4gICAgICAgID5cbiAgICAgICAgICA8U3R5bGVkQXBwQmFyPlxuICAgICAgICAgICAgPFN0eWxlZE1lbnVCYXIgcm9sZT1cIm1lbnViYXJcIj5cbiAgICAgICAgICAgICAge21hcEl0ZW1zVG9FbGVtZW50KGl0ZW1zLmxlZnQsICdsZWZ0Jyl9XG4gICAgICAgICAgICAgIHttYXBJdGVtc1RvRWxlbWVudChyaWdodCwgJ3JpZ2h0JywgdHJ1ZSl9XG4gICAgICAgICAgICAgIDxBcHBIZWFkZXJMaXN0SXRlbSBtbD17cmlnaHQubGVuZ3RoID09PSAwID8gJ2F1dG8nIDogMH0+XG4gICAgICAgICAgICAgICAgPEljb25CdXR0b25cbiAgICAgICAgICAgICAgICAgIGRhdGEtdGVzdGlkPVwiaGVhZGVyLW1vYmlsZS1tZW51XCJcbiAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJvcGVuIG5hdmlnYXRpb24gbWVudVwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG9wZW5Nb2JpbGVNZW51KCk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgaWNvbj17TWVudUljb259XG4gICAgICAgICAgICAgICAgICB2YXJpYW50PVwiaW50ZXJmYWNlXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L0FwcEhlYWRlckxpc3RJdGVtPlxuICAgICAgICAgICAgPC9TdHlsZWRNZW51QmFyPlxuICAgICAgICAgIDwvU3R5bGVkQXBwQmFyPlxuICAgICAgICA8L0hlYWRlckhlaWdodEFyZWE+XG4gICAgICApfVxuICAgICAgPFN0eWxlZE92ZXJsYXlcbiAgICAgICAgY2xpY2tPdXRzaWRlQ2xvc2VzXG4gICAgICAgIGVzY2FwZUNsb3Nlc1xuICAgICAgICBpc09wZW49e21vYmlsZU1lbnVPcGVufVxuICAgICAgICBvblJlcXVlc3RDbG9zZT17KCkgPT4gc2V0TW9iaWxlTWVudU9wZW4oZmFsc2UpfVxuICAgICAgICBhbGxvd1Njcm9sbD17YWxsb3dTY3JvbGx9XG4gICAgICA+XG4gICAgICAgIDxIZWFkZXJIZWlnaHRBcmVhXG4gICAgICAgICAgZGlzcGxheT17eyBfOiBgYmxvY2tgLCBbYXBwSGVhZGVyTW9iaWxlQnJlYWtwb2ludF06IGBub25lYCB9fVxuICAgICAgICAgIGFzPVwibmF2XCJcbiAgICAgICAgICB0aXRsZT1cIk1vYmlsZSBOYXZpZ2F0aW9uXCJcbiAgICAgICAgICBkYXRhLXRlc3RpZD1cImhlYWRlci1tb2JpbGUtbWVudS1kcm9wZG93blwiXG4gICAgICAgID5cbiAgICAgICAgICA8U3R5bGVkQXBwQmFyPlxuICAgICAgICAgICAgPFN0eWxlZE1lbnVCYXIgcm9sZT1cIm1lbnViYXJcIj5cbiAgICAgICAgICAgICAge21hcEl0ZW1zVG9FbGVtZW50KGl0ZW1zLmxlZnQsICdsZWZ0Jyl9XG4gICAgICAgICAgICAgIDxBcHBIZWFkZXJMaXN0SXRlbSBtbD1cImF1dG9cIj5cbiAgICAgICAgICAgICAgICA8SWNvbkJ1dHRvblxuICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cImNsb3NlIG1lbnVcIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZXRNb2JpbGVNZW51T3BlbihmYWxzZSk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgaWNvbj17Q2xvc2VJY29ufVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvQXBwSGVhZGVyTGlzdEl0ZW0+XG4gICAgICAgICAgICA8L1N0eWxlZE1lbnVCYXI+XG4gICAgICAgICAgPC9TdHlsZWRBcHBCYXI+XG4gICAgICAgICAgPFN0eWxlZENvbnRlbnRDb250YWluZXIgYXM9XCJ1bFwiIHJvbGU9XCJtZW51YmFyXCIgc2l6ZT1cInNtYWxsXCI+XG4gICAgICAgICAgICA8QXBwSGVhZGVyTWFpbk1lbnVNb2JpbGVcbiAgICAgICAgICAgICAgYWN0aW9uPXthY3Rpb259XG4gICAgICAgICAgICAgIGl0ZW1zPXtpdGVtcy5tYWluTWVudX1cbiAgICAgICAgICAgICAgb25TZWFyY2g9e29uU2VhcmNofVxuICAgICAgICAgICAgICBnZXRJdGVtVHlwZT17b25JdGVtVHlwZX1cbiAgICAgICAgICAgICAgaXNBbm9uPXtpc0Fub259XG4gICAgICAgICAgICAgIGhhbmRsZUNsb3NlTWFpbk1lbnU9eygpID0+IHNldE1vYmlsZU1lbnVPcGVuKGZhbHNlKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9TdHlsZWRDb250ZW50Q29udGFpbmVyPlxuICAgICAgICA8L0hlYWRlckhlaWdodEFyZWE+XG4gICAgICA8L1N0eWxlZE92ZXJsYXk+XG4gICAgICA8Qm94IGRpc3BsYXk9e3sgXzogYGJsb2NrYCwgW2FwcEhlYWRlck1vYmlsZUJyZWFrcG9pbnRdOiBgbm9uZWAgfX0+XG4gICAgICAgIHtub3RpZmljYXRpb25zVmlld31cbiAgICAgICAge2Jvb2ttYXJrc0NvbnRlbnR9XG4gICAgICA8L0JveD5cbiAgICA8Lz5cbiAgKTtcbn07XG4iXX0= */");

var StyledContentContainer = /*#__PURE__*/_styled(ContentContainer, {
  target: "eizxoml1",
  label: "StyledContentContainer"
})(css({
  display: "flex",
  flexDirection: "column",
  p: 0
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9BcHBIZWFkZXJNb2JpbGUvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWtEK0IiLCJmaWxlIjoiLi4vLi4vc3JjL0FwcEhlYWRlck1vYmlsZS9pbmRleC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb3gsIENvbnRlbnRDb250YWluZXIsIEljb25CdXR0b24sIE92ZXJsYXkgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dCc7XG5pbXBvcnQgeyBDbG9zZUljb24sIE1lbnVJY29uIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQtaWNvbnMnO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQtc3R5bGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgbWFwSXRlbVRvRWxlbWVudCwgU3R5bGVkQXBwQmFyIH0gZnJvbSAnLi4vQXBwSGVhZGVyJztcbmltcG9ydCB7IEFwcEhlYWRlckxpc3RJdGVtIH0gZnJvbSAnLi4vQXBwSGVhZGVyL0FwcEhlYWRlckVsZW1lbnRzL0FwcEhlYWRlckxpc3RJdGVtJztcbmltcG9ydCB7XG4gIEFwcEhlYWRlckNsaWNrSGFuZGxlcixcbiAgQXBwSGVhZGVySXRlbSxcbn0gZnJvbSAnLi4vQXBwSGVhZGVyL0FwcEhlYWRlckVsZW1lbnRzL3R5cGVzJztcbmltcG9ydCB7IGFwcEhlYWRlck1vYmlsZUJyZWFrcG9pbnQgfSBmcm9tICcuLi9BcHBIZWFkZXIvc2hhcmVkJztcbmltcG9ydCB7IEZvcm1hdHRlZE1vYmlsZUFwcEhlYWRlckl0ZW1zIH0gZnJvbSAnLi4vQXBwSGVhZGVyL3R5cGVzJztcbmltcG9ydCB7IEFwcEhlYWRlck1haW5NZW51TW9iaWxlIH0gZnJvbSAnLi4vQXBwSGVhZGVyTW9iaWxlL0FwcEhlYWRlck1haW5NZW51TW9iaWxlJztcbmltcG9ydCB7XG4gIENyb3NzRGV2aWNlQm9va21hcmtQYXJ0cyxcbiAgQ3Jvc3NEZXZpY2VCb29rbWFya3NWaWV3LFxufSBmcm9tICcuLi9Cb29rbWFya3MvdHlwZXMnO1xuaW1wb3J0IHsgdXNlQm9va21hcmtDb21wb25lbnRzUGFpciB9IGZyb20gJy4uL0Jvb2ttYXJrcy91c2VCb29rbWFya0NvbXBvbmVudHNQYWlyJztcbmltcG9ydCB7IENyb3NzRGV2aWNlU3RhdGVQcm9wcyB9IGZyb20gJy4uL0dsb2JhbEhlYWRlci90eXBlcyc7XG5pbXBvcnQgeyBIZWFkZXJIZWlnaHRBcmVhIH0gZnJvbSAnLi4vSGVhZGVySGVpZ2h0QXJlYSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25zQ29udGVudHMgfSBmcm9tICcuLi9Ob3RpZmljYXRpb25zL05vdGlmaWNhdGlvbnNDb250ZW50cyc7XG5pbXBvcnQgeyBBcHBIZWFkZXJOb3RpZmljYXRpb25TZXR0aW5ncyB9IGZyb20gJy4uL05vdGlmaWNhdGlvbnMvdHlwZXMnO1xuaW1wb3J0IHsgdXNlSGVhZGVyTm90aWZpY2F0aW9ucyB9IGZyb20gJy4uL05vdGlmaWNhdGlvbnMvdXNlSGVhZGVyTm90aWZpY2F0aW9ucyc7XG5cbmV4cG9ydCB0eXBlIEFwcEhlYWRlck1vYmlsZVByb3BzID0ge1xuICBhY3Rpb246IEFwcEhlYWRlckNsaWNrSGFuZGxlcjtcbiAgaXRlbXM6IEZvcm1hdHRlZE1vYmlsZUFwcEhlYWRlckl0ZW1zO1xuICBub3RpZmljYXRpb25zPzogQXBwSGVhZGVyTm90aWZpY2F0aW9uU2V0dGluZ3M7XG4gIHJlZGlyZWN0UGFyYW0/OiBzdHJpbmc7XG4gIG9uU2VhcmNoOiAocXVlcnk6IHN0cmluZykgPT4gdm9pZDtcbiAgaXNBbm9uOiBib29sZWFuO1xuICBjcm9zc0RldmljZUJvb2ttYXJrUGFydHM/OiBDcm9zc0RldmljZUJvb2ttYXJrUGFydHM7XG59ICYgQ3Jvc3NEZXZpY2VTdGF0ZVByb3BzO1xuXG5jb25zdCBTdHlsZWRPdmVybGF5ID0gc3R5bGVkKE92ZXJsYXkpKFxuICBjc3Moe1xuICAgIGRpc3BsYXk6IHsgXzogYGJsb2NrYCwgW2FwcEhlYWRlck1vYmlsZUJyZWFrcG9pbnRdOiBgbm9uZWAgfSxcbiAgICB3aWR0aDogYDEwMHZ3YCxcbiAgICBoZWlnaHQ6IGAxMDB2aGAsXG4gICAgb3BhY2l0eTogMSxcbiAgICBiZzogYGJhY2tncm91bmRgLFxuICAgIHBvc2l0aW9uOiBgZml4ZWRgLFxuICAgIGxlZnQ6IDAsXG4gICAgdG9wOiAwLFxuICAgIG92ZXJmbG93WDogYGhpZGRlbmAsXG4gIH0pXG4pO1xuXG5jb25zdCBTdHlsZWRDb250ZW50Q29udGFpbmVyID0gc3R5bGVkKENvbnRlbnRDb250YWluZXIpKFxuICBjc3Moe1xuICAgIGRpc3BsYXk6IGBmbGV4YCxcbiAgICBmbGV4RGlyZWN0aW9uOiBgY29sdW1uYCxcbiAgICBwOiAwLFxuICB9KVxuKTtcblxuY29uc3QgU3R5bGVkTWVudUJhciA9IHN0eWxlZC51bChcbiAgY3NzKHtcbiAgICBkaXNwbGF5OiBgZmxleGAsXG4gICAgcGFkZGluZzogMCxcbiAgICBsaXN0U3R5bGU6IGBub25lYCxcbiAgICBtYXJnaW46IDAsXG4gICAgd2lkdGg6IGAxMDAlYCxcbiAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgfSlcbik7XG5cbmV4cG9ydCBjb25zdCBBcHBIZWFkZXJNb2JpbGU6IFJlYWN0LkZDPEFwcEhlYWRlck1vYmlsZVByb3BzPiA9ICh7XG4gIGFjdGlvbixcbiAgaXRlbXMsXG4gIG5vdGlmaWNhdGlvbnMsXG4gIG9uU2VhcmNoLFxuICByZWRpcmVjdFBhcmFtLFxuICBpc0Fub24sXG4gIG9wZW5Dcm9zc0RldmljZUl0ZW1JZCxcbiAgc2V0T3BlbkNyb3NzRGV2aWNlSXRlbUlkLFxuICBjcm9zc0RldmljZUJvb2ttYXJrUGFydHMsXG59KSA9PiB7XG4gIGNvbnN0IFttb2JpbGVNZW51T3Blbiwgc2V0TW9iaWxlTWVudU9wZW5dID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuICBjb25zdCBbYWxsb3dTY3JvbGwsIHNldEFsbG93U2Nyb2xsXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcblxuICBjb25zdCBbbm90aWZpY2F0aW9uc0JlbGwsIG5vdGlmaWNhdGlvbnNWaWV3XSA9IHVzZUhlYWRlck5vdGlmaWNhdGlvbnMoe1xuICAgIHNldHRpbmdzOiBub3RpZmljYXRpb25zLFxuICAgIFJlbmRlcmVyOiBOb3RpZmljYXRpb25zQ29udGVudHMsXG4gICAgb3BlbkNyb3NzRGV2aWNlSXRlbUlkLFxuICAgIHNldE9wZW5Dcm9zc0RldmljZUl0ZW1JZCxcbiAgfSk7XG5cbiAgY29uc3QgW2Jvb2ttYXJrc0J1dHRvbiwgYm9va21hcmtzQ29udGVudF0gPSB1c2VCb29rbWFya0NvbXBvbmVudHNQYWlyKHtcbiAgICBvcGVuQ3Jvc3NEZXZpY2VJdGVtSWQsXG4gICAgc2V0T3BlbkNyb3NzRGV2aWNlSXRlbUlkLFxuICAgIGJvb2ttYXJrUGFydHM6IGNyb3NzRGV2aWNlQm9va21hcmtQYXJ0cyxcbiAgICB2aWV3OiBDcm9zc0RldmljZUJvb2ttYXJrc1ZpZXcuTU9CSUxFLFxuICAgIGlzQW5vbixcbiAgfSk7XG5cbiAgY29uc3Qgb3Blbk1vYmlsZU1lbnUgPSAoKSA9PiB7XG4gICAgc2V0TW9iaWxlTWVudU9wZW4odHJ1ZSk7XG4gIH07XG5cbiAgY29uc3QgbWFwSXRlbXNUb0VsZW1lbnQgPSA8VCBleHRlbmRzIEFwcEhlYWRlckl0ZW1bXT4oXG4gICAgaXRlbXM6IFQsXG4gICAgc2lkZTogJ2xlZnQnIHwgJ3JpZ2h0JyxcbiAgICBoaWRlRXh0cmFJdGVtcz86IGJvb2xlYW5cbiAgKSA9PiB7XG4gICAgY29uc3Qgc2hvdWxkSGlkZUl0ZW1zID0gaGlkZUV4dHJhSXRlbXMgPT09IHRydWUgJiYgaXRlbXMubGVuZ3RoID4gMTtcbiAgICByZXR1cm4gaXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgaXNMYXN0SXRlbSA9IGluZGV4ICsgMSA9PT0gaXRlbXMubGVuZ3RoO1xuICAgICAgY29uc3QgaXNIaWRhYmxlID0gIWlzTGFzdEl0ZW0gJiYgc2hvdWxkSGlkZUl0ZW1zO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPEFwcEhlYWRlckxpc3RJdGVtXG4gICAgICAgICAga2V5PXtpdGVtLmlkfVxuICAgICAgICAgIG1sPXtzaWRlID09PSAncmlnaHQnICYmIGluZGV4ID09PSAwID8gJ2F1dG8nIDogMH1cbiAgICAgICAgICBkaXNwbGF5PXt7XG4gICAgICAgICAgICBfOiBpc0hpZGFibGUgPyAnbm9uZScgOiAnZmxleCcsXG4gICAgICAgICAgICB4czogJ2ZsZXgnLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICB7bWFwSXRlbVRvRWxlbWVudChcbiAgICAgICAgICAgIGFjdGlvbixcbiAgICAgICAgICAgIGl0ZW0sXG4gICAgICAgICAgICBpc0Fub24sXG4gICAgICAgICAgICByZWRpcmVjdFBhcmFtLFxuICAgICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgICAgdHJ1ZVxuICAgICAgICAgICl9XG4gICAgICAgIDwvQXBwSGVhZGVyTGlzdEl0ZW0+XG4gICAgICApO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHJpZ2h0ID0gW1xuICAgIC4uLihub3RpZmljYXRpb25zQmVsbCA/IFtub3RpZmljYXRpb25zQmVsbF0gOiBbXSksXG4gICAgLi4uKGJvb2ttYXJrc0J1dHRvbiA/IFtib29rbWFya3NCdXR0b25dIDogW10pLFxuICAgIC4uLml0ZW1zLnJpZ2h0LFxuICBdO1xuXG4gIGNvbnN0IG9uSXRlbVR5cGUgPSAodHlwZTogc3RyaW5nIHwgdW5kZWZpbmVkKSA9PiB7XG4gICAgaWYgKFxuICAgICAgdHlwZSAmJlxuICAgICAgKHR5cGUgPT09ICdjYXRhbG9nLWRyb3Bkb3duJyB8fFxuICAgICAgICB0eXBlID09PSAnZXhwZXJpbWVudGFsLXJlc291cmNlcy1kcm9wZG93bicpXG4gICAgKSB7XG4gICAgICBzZXRBbGxvd1Njcm9sbCh0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0QWxsb3dTY3JvbGwoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICB7IW1vYmlsZU1lbnVPcGVuICYmICggLy8gbmVlZCB0aGlzIGJjIEFwcEJhciBoYXMgYSBoYXJkY29kZWQgei1JbmRleCBvZiAxNVxuICAgICAgICA8SGVhZGVySGVpZ2h0QXJlYVxuICAgICAgICAgIGRpc3BsYXk9e3sgXzogYGJsb2NrYCwgW2FwcEhlYWRlck1vYmlsZUJyZWFrcG9pbnRdOiBgbm9uZWAgfX1cbiAgICAgICAgICBhcz1cIm5hdlwiXG4gICAgICAgICAgdGl0bGU9XCJNb2JpbGUgTmF2aWdhdGlvblwiXG4gICAgICAgID5cbiAgICAgICAgICA8U3R5bGVkQXBwQmFyPlxuICAgICAgICAgICAgPFN0eWxlZE1lbnVCYXIgcm9sZT1cIm1lbnViYXJcIj5cbiAgICAgICAgICAgICAge21hcEl0ZW1zVG9FbGVtZW50KGl0ZW1zLmxlZnQsICdsZWZ0Jyl9XG4gICAgICAgICAgICAgIHttYXBJdGVtc1RvRWxlbWVudChyaWdodCwgJ3JpZ2h0JywgdHJ1ZSl9XG4gICAgICAgICAgICAgIDxBcHBIZWFkZXJMaXN0SXRlbSBtbD17cmlnaHQubGVuZ3RoID09PSAwID8gJ2F1dG8nIDogMH0+XG4gICAgICAgICAgICAgICAgPEljb25CdXR0b25cbiAgICAgICAgICAgICAgICAgIGRhdGEtdGVzdGlkPVwiaGVhZGVyLW1vYmlsZS1tZW51XCJcbiAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJvcGVuIG5hdmlnYXRpb24gbWVudVwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG9wZW5Nb2JpbGVNZW51KCk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgaWNvbj17TWVudUljb259XG4gICAgICAgICAgICAgICAgICB2YXJpYW50PVwiaW50ZXJmYWNlXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L0FwcEhlYWRlckxpc3RJdGVtPlxuICAgICAgICAgICAgPC9TdHlsZWRNZW51QmFyPlxuICAgICAgICAgIDwvU3R5bGVkQXBwQmFyPlxuICAgICAgICA8L0hlYWRlckhlaWdodEFyZWE+XG4gICAgICApfVxuICAgICAgPFN0eWxlZE92ZXJsYXlcbiAgICAgICAgY2xpY2tPdXRzaWRlQ2xvc2VzXG4gICAgICAgIGVzY2FwZUNsb3Nlc1xuICAgICAgICBpc09wZW49e21vYmlsZU1lbnVPcGVufVxuICAgICAgICBvblJlcXVlc3RDbG9zZT17KCkgPT4gc2V0TW9iaWxlTWVudU9wZW4oZmFsc2UpfVxuICAgICAgICBhbGxvd1Njcm9sbD17YWxsb3dTY3JvbGx9XG4gICAgICA+XG4gICAgICAgIDxIZWFkZXJIZWlnaHRBcmVhXG4gICAgICAgICAgZGlzcGxheT17eyBfOiBgYmxvY2tgLCBbYXBwSGVhZGVyTW9iaWxlQnJlYWtwb2ludF06IGBub25lYCB9fVxuICAgICAgICAgIGFzPVwibmF2XCJcbiAgICAgICAgICB0aXRsZT1cIk1vYmlsZSBOYXZpZ2F0aW9uXCJcbiAgICAgICAgICBkYXRhLXRlc3RpZD1cImhlYWRlci1tb2JpbGUtbWVudS1kcm9wZG93blwiXG4gICAgICAgID5cbiAgICAgICAgICA8U3R5bGVkQXBwQmFyPlxuICAgICAgICAgICAgPFN0eWxlZE1lbnVCYXIgcm9sZT1cIm1lbnViYXJcIj5cbiAgICAgICAgICAgICAge21hcEl0ZW1zVG9FbGVtZW50KGl0ZW1zLmxlZnQsICdsZWZ0Jyl9XG4gICAgICAgICAgICAgIDxBcHBIZWFkZXJMaXN0SXRlbSBtbD1cImF1dG9cIj5cbiAgICAgICAgICAgICAgICA8SWNvbkJ1dHRvblxuICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cImNsb3NlIG1lbnVcIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZXRNb2JpbGVNZW51T3BlbihmYWxzZSk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgaWNvbj17Q2xvc2VJY29ufVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvQXBwSGVhZGVyTGlzdEl0ZW0+XG4gICAgICAgICAgICA8L1N0eWxlZE1lbnVCYXI+XG4gICAgICAgICAgPC9TdHlsZWRBcHBCYXI+XG4gICAgICAgICAgPFN0eWxlZENvbnRlbnRDb250YWluZXIgYXM9XCJ1bFwiIHJvbGU9XCJtZW51YmFyXCIgc2l6ZT1cInNtYWxsXCI+XG4gICAgICAgICAgICA8QXBwSGVhZGVyTWFpbk1lbnVNb2JpbGVcbiAgICAgICAgICAgICAgYWN0aW9uPXthY3Rpb259XG4gICAgICAgICAgICAgIGl0ZW1zPXtpdGVtcy5tYWluTWVudX1cbiAgICAgICAgICAgICAgb25TZWFyY2g9e29uU2VhcmNofVxuICAgICAgICAgICAgICBnZXRJdGVtVHlwZT17b25JdGVtVHlwZX1cbiAgICAgICAgICAgICAgaXNBbm9uPXtpc0Fub259XG4gICAgICAgICAgICAgIGhhbmRsZUNsb3NlTWFpbk1lbnU9eygpID0+IHNldE1vYmlsZU1lbnVPcGVuKGZhbHNlKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9TdHlsZWRDb250ZW50Q29udGFpbmVyPlxuICAgICAgICA8L0hlYWRlckhlaWdodEFyZWE+XG4gICAgICA8L1N0eWxlZE92ZXJsYXk+XG4gICAgICA8Qm94IGRpc3BsYXk9e3sgXzogYGJsb2NrYCwgW2FwcEhlYWRlck1vYmlsZUJyZWFrcG9pbnRdOiBgbm9uZWAgfX0+XG4gICAgICAgIHtub3RpZmljYXRpb25zVmlld31cbiAgICAgICAge2Jvb2ttYXJrc0NvbnRlbnR9XG4gICAgICA8L0JveD5cbiAgICA8Lz5cbiAgKTtcbn07XG4iXX0= */");

var StyledMenuBar = _styled("ul", {
  target: "eizxoml0",
  label: "StyledMenuBar"
})(css({
  display: "flex",
  padding: 0,
  listStyle: "none",
  margin: 0,
  width: "100%",
  alignItems: 'center'
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9BcHBIZWFkZXJNb2JpbGUvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTBEc0IiLCJmaWxlIjoiLi4vLi4vc3JjL0FwcEhlYWRlck1vYmlsZS9pbmRleC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb3gsIENvbnRlbnRDb250YWluZXIsIEljb25CdXR0b24sIE92ZXJsYXkgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dCc7XG5pbXBvcnQgeyBDbG9zZUljb24sIE1lbnVJY29uIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQtaWNvbnMnO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQtc3R5bGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgbWFwSXRlbVRvRWxlbWVudCwgU3R5bGVkQXBwQmFyIH0gZnJvbSAnLi4vQXBwSGVhZGVyJztcbmltcG9ydCB7IEFwcEhlYWRlckxpc3RJdGVtIH0gZnJvbSAnLi4vQXBwSGVhZGVyL0FwcEhlYWRlckVsZW1lbnRzL0FwcEhlYWRlckxpc3RJdGVtJztcbmltcG9ydCB7XG4gIEFwcEhlYWRlckNsaWNrSGFuZGxlcixcbiAgQXBwSGVhZGVySXRlbSxcbn0gZnJvbSAnLi4vQXBwSGVhZGVyL0FwcEhlYWRlckVsZW1lbnRzL3R5cGVzJztcbmltcG9ydCB7IGFwcEhlYWRlck1vYmlsZUJyZWFrcG9pbnQgfSBmcm9tICcuLi9BcHBIZWFkZXIvc2hhcmVkJztcbmltcG9ydCB7IEZvcm1hdHRlZE1vYmlsZUFwcEhlYWRlckl0ZW1zIH0gZnJvbSAnLi4vQXBwSGVhZGVyL3R5cGVzJztcbmltcG9ydCB7IEFwcEhlYWRlck1haW5NZW51TW9iaWxlIH0gZnJvbSAnLi4vQXBwSGVhZGVyTW9iaWxlL0FwcEhlYWRlck1haW5NZW51TW9iaWxlJztcbmltcG9ydCB7XG4gIENyb3NzRGV2aWNlQm9va21hcmtQYXJ0cyxcbiAgQ3Jvc3NEZXZpY2VCb29rbWFya3NWaWV3LFxufSBmcm9tICcuLi9Cb29rbWFya3MvdHlwZXMnO1xuaW1wb3J0IHsgdXNlQm9va21hcmtDb21wb25lbnRzUGFpciB9IGZyb20gJy4uL0Jvb2ttYXJrcy91c2VCb29rbWFya0NvbXBvbmVudHNQYWlyJztcbmltcG9ydCB7IENyb3NzRGV2aWNlU3RhdGVQcm9wcyB9IGZyb20gJy4uL0dsb2JhbEhlYWRlci90eXBlcyc7XG5pbXBvcnQgeyBIZWFkZXJIZWlnaHRBcmVhIH0gZnJvbSAnLi4vSGVhZGVySGVpZ2h0QXJlYSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25zQ29udGVudHMgfSBmcm9tICcuLi9Ob3RpZmljYXRpb25zL05vdGlmaWNhdGlvbnNDb250ZW50cyc7XG5pbXBvcnQgeyBBcHBIZWFkZXJOb3RpZmljYXRpb25TZXR0aW5ncyB9IGZyb20gJy4uL05vdGlmaWNhdGlvbnMvdHlwZXMnO1xuaW1wb3J0IHsgdXNlSGVhZGVyTm90aWZpY2F0aW9ucyB9IGZyb20gJy4uL05vdGlmaWNhdGlvbnMvdXNlSGVhZGVyTm90aWZpY2F0aW9ucyc7XG5cbmV4cG9ydCB0eXBlIEFwcEhlYWRlck1vYmlsZVByb3BzID0ge1xuICBhY3Rpb246IEFwcEhlYWRlckNsaWNrSGFuZGxlcjtcbiAgaXRlbXM6IEZvcm1hdHRlZE1vYmlsZUFwcEhlYWRlckl0ZW1zO1xuICBub3RpZmljYXRpb25zPzogQXBwSGVhZGVyTm90aWZpY2F0aW9uU2V0dGluZ3M7XG4gIHJlZGlyZWN0UGFyYW0/OiBzdHJpbmc7XG4gIG9uU2VhcmNoOiAocXVlcnk6IHN0cmluZykgPT4gdm9pZDtcbiAgaXNBbm9uOiBib29sZWFuO1xuICBjcm9zc0RldmljZUJvb2ttYXJrUGFydHM/OiBDcm9zc0RldmljZUJvb2ttYXJrUGFydHM7XG59ICYgQ3Jvc3NEZXZpY2VTdGF0ZVByb3BzO1xuXG5jb25zdCBTdHlsZWRPdmVybGF5ID0gc3R5bGVkKE92ZXJsYXkpKFxuICBjc3Moe1xuICAgIGRpc3BsYXk6IHsgXzogYGJsb2NrYCwgW2FwcEhlYWRlck1vYmlsZUJyZWFrcG9pbnRdOiBgbm9uZWAgfSxcbiAgICB3aWR0aDogYDEwMHZ3YCxcbiAgICBoZWlnaHQ6IGAxMDB2aGAsXG4gICAgb3BhY2l0eTogMSxcbiAgICBiZzogYGJhY2tncm91bmRgLFxuICAgIHBvc2l0aW9uOiBgZml4ZWRgLFxuICAgIGxlZnQ6IDAsXG4gICAgdG9wOiAwLFxuICAgIG92ZXJmbG93WDogYGhpZGRlbmAsXG4gIH0pXG4pO1xuXG5jb25zdCBTdHlsZWRDb250ZW50Q29udGFpbmVyID0gc3R5bGVkKENvbnRlbnRDb250YWluZXIpKFxuICBjc3Moe1xuICAgIGRpc3BsYXk6IGBmbGV4YCxcbiAgICBmbGV4RGlyZWN0aW9uOiBgY29sdW1uYCxcbiAgICBwOiAwLFxuICB9KVxuKTtcblxuY29uc3QgU3R5bGVkTWVudUJhciA9IHN0eWxlZC51bChcbiAgY3NzKHtcbiAgICBkaXNwbGF5OiBgZmxleGAsXG4gICAgcGFkZGluZzogMCxcbiAgICBsaXN0U3R5bGU6IGBub25lYCxcbiAgICBtYXJnaW46IDAsXG4gICAgd2lkdGg6IGAxMDAlYCxcbiAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgfSlcbik7XG5cbmV4cG9ydCBjb25zdCBBcHBIZWFkZXJNb2JpbGU6IFJlYWN0LkZDPEFwcEhlYWRlck1vYmlsZVByb3BzPiA9ICh7XG4gIGFjdGlvbixcbiAgaXRlbXMsXG4gIG5vdGlmaWNhdGlvbnMsXG4gIG9uU2VhcmNoLFxuICByZWRpcmVjdFBhcmFtLFxuICBpc0Fub24sXG4gIG9wZW5Dcm9zc0RldmljZUl0ZW1JZCxcbiAgc2V0T3BlbkNyb3NzRGV2aWNlSXRlbUlkLFxuICBjcm9zc0RldmljZUJvb2ttYXJrUGFydHMsXG59KSA9PiB7XG4gIGNvbnN0IFttb2JpbGVNZW51T3Blbiwgc2V0TW9iaWxlTWVudU9wZW5dID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuICBjb25zdCBbYWxsb3dTY3JvbGwsIHNldEFsbG93U2Nyb2xsXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcblxuICBjb25zdCBbbm90aWZpY2F0aW9uc0JlbGwsIG5vdGlmaWNhdGlvbnNWaWV3XSA9IHVzZUhlYWRlck5vdGlmaWNhdGlvbnMoe1xuICAgIHNldHRpbmdzOiBub3RpZmljYXRpb25zLFxuICAgIFJlbmRlcmVyOiBOb3RpZmljYXRpb25zQ29udGVudHMsXG4gICAgb3BlbkNyb3NzRGV2aWNlSXRlbUlkLFxuICAgIHNldE9wZW5Dcm9zc0RldmljZUl0ZW1JZCxcbiAgfSk7XG5cbiAgY29uc3QgW2Jvb2ttYXJrc0J1dHRvbiwgYm9va21hcmtzQ29udGVudF0gPSB1c2VCb29rbWFya0NvbXBvbmVudHNQYWlyKHtcbiAgICBvcGVuQ3Jvc3NEZXZpY2VJdGVtSWQsXG4gICAgc2V0T3BlbkNyb3NzRGV2aWNlSXRlbUlkLFxuICAgIGJvb2ttYXJrUGFydHM6IGNyb3NzRGV2aWNlQm9va21hcmtQYXJ0cyxcbiAgICB2aWV3OiBDcm9zc0RldmljZUJvb2ttYXJrc1ZpZXcuTU9CSUxFLFxuICAgIGlzQW5vbixcbiAgfSk7XG5cbiAgY29uc3Qgb3Blbk1vYmlsZU1lbnUgPSAoKSA9PiB7XG4gICAgc2V0TW9iaWxlTWVudU9wZW4odHJ1ZSk7XG4gIH07XG5cbiAgY29uc3QgbWFwSXRlbXNUb0VsZW1lbnQgPSA8VCBleHRlbmRzIEFwcEhlYWRlckl0ZW1bXT4oXG4gICAgaXRlbXM6IFQsXG4gICAgc2lkZTogJ2xlZnQnIHwgJ3JpZ2h0JyxcbiAgICBoaWRlRXh0cmFJdGVtcz86IGJvb2xlYW5cbiAgKSA9PiB7XG4gICAgY29uc3Qgc2hvdWxkSGlkZUl0ZW1zID0gaGlkZUV4dHJhSXRlbXMgPT09IHRydWUgJiYgaXRlbXMubGVuZ3RoID4gMTtcbiAgICByZXR1cm4gaXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgaXNMYXN0SXRlbSA9IGluZGV4ICsgMSA9PT0gaXRlbXMubGVuZ3RoO1xuICAgICAgY29uc3QgaXNIaWRhYmxlID0gIWlzTGFzdEl0ZW0gJiYgc2hvdWxkSGlkZUl0ZW1zO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPEFwcEhlYWRlckxpc3RJdGVtXG4gICAgICAgICAga2V5PXtpdGVtLmlkfVxuICAgICAgICAgIG1sPXtzaWRlID09PSAncmlnaHQnICYmIGluZGV4ID09PSAwID8gJ2F1dG8nIDogMH1cbiAgICAgICAgICBkaXNwbGF5PXt7XG4gICAgICAgICAgICBfOiBpc0hpZGFibGUgPyAnbm9uZScgOiAnZmxleCcsXG4gICAgICAgICAgICB4czogJ2ZsZXgnLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICB7bWFwSXRlbVRvRWxlbWVudChcbiAgICAgICAgICAgIGFjdGlvbixcbiAgICAgICAgICAgIGl0ZW0sXG4gICAgICAgICAgICBpc0Fub24sXG4gICAgICAgICAgICByZWRpcmVjdFBhcmFtLFxuICAgICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgICAgdHJ1ZVxuICAgICAgICAgICl9XG4gICAgICAgIDwvQXBwSGVhZGVyTGlzdEl0ZW0+XG4gICAgICApO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHJpZ2h0ID0gW1xuICAgIC4uLihub3RpZmljYXRpb25zQmVsbCA/IFtub3RpZmljYXRpb25zQmVsbF0gOiBbXSksXG4gICAgLi4uKGJvb2ttYXJrc0J1dHRvbiA/IFtib29rbWFya3NCdXR0b25dIDogW10pLFxuICAgIC4uLml0ZW1zLnJpZ2h0LFxuICBdO1xuXG4gIGNvbnN0IG9uSXRlbVR5cGUgPSAodHlwZTogc3RyaW5nIHwgdW5kZWZpbmVkKSA9PiB7XG4gICAgaWYgKFxuICAgICAgdHlwZSAmJlxuICAgICAgKHR5cGUgPT09ICdjYXRhbG9nLWRyb3Bkb3duJyB8fFxuICAgICAgICB0eXBlID09PSAnZXhwZXJpbWVudGFsLXJlc291cmNlcy1kcm9wZG93bicpXG4gICAgKSB7XG4gICAgICBzZXRBbGxvd1Njcm9sbCh0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0QWxsb3dTY3JvbGwoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICB7IW1vYmlsZU1lbnVPcGVuICYmICggLy8gbmVlZCB0aGlzIGJjIEFwcEJhciBoYXMgYSBoYXJkY29kZWQgei1JbmRleCBvZiAxNVxuICAgICAgICA8SGVhZGVySGVpZ2h0QXJlYVxuICAgICAgICAgIGRpc3BsYXk9e3sgXzogYGJsb2NrYCwgW2FwcEhlYWRlck1vYmlsZUJyZWFrcG9pbnRdOiBgbm9uZWAgfX1cbiAgICAgICAgICBhcz1cIm5hdlwiXG4gICAgICAgICAgdGl0bGU9XCJNb2JpbGUgTmF2aWdhdGlvblwiXG4gICAgICAgID5cbiAgICAgICAgICA8U3R5bGVkQXBwQmFyPlxuICAgICAgICAgICAgPFN0eWxlZE1lbnVCYXIgcm9sZT1cIm1lbnViYXJcIj5cbiAgICAgICAgICAgICAge21hcEl0ZW1zVG9FbGVtZW50KGl0ZW1zLmxlZnQsICdsZWZ0Jyl9XG4gICAgICAgICAgICAgIHttYXBJdGVtc1RvRWxlbWVudChyaWdodCwgJ3JpZ2h0JywgdHJ1ZSl9XG4gICAgICAgICAgICAgIDxBcHBIZWFkZXJMaXN0SXRlbSBtbD17cmlnaHQubGVuZ3RoID09PSAwID8gJ2F1dG8nIDogMH0+XG4gICAgICAgICAgICAgICAgPEljb25CdXR0b25cbiAgICAgICAgICAgICAgICAgIGRhdGEtdGVzdGlkPVwiaGVhZGVyLW1vYmlsZS1tZW51XCJcbiAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJvcGVuIG5hdmlnYXRpb24gbWVudVwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG9wZW5Nb2JpbGVNZW51KCk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgaWNvbj17TWVudUljb259XG4gICAgICAgICAgICAgICAgICB2YXJpYW50PVwiaW50ZXJmYWNlXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L0FwcEhlYWRlckxpc3RJdGVtPlxuICAgICAgICAgICAgPC9TdHlsZWRNZW51QmFyPlxuICAgICAgICAgIDwvU3R5bGVkQXBwQmFyPlxuICAgICAgICA8L0hlYWRlckhlaWdodEFyZWE+XG4gICAgICApfVxuICAgICAgPFN0eWxlZE92ZXJsYXlcbiAgICAgICAgY2xpY2tPdXRzaWRlQ2xvc2VzXG4gICAgICAgIGVzY2FwZUNsb3Nlc1xuICAgICAgICBpc09wZW49e21vYmlsZU1lbnVPcGVufVxuICAgICAgICBvblJlcXVlc3RDbG9zZT17KCkgPT4gc2V0TW9iaWxlTWVudU9wZW4oZmFsc2UpfVxuICAgICAgICBhbGxvd1Njcm9sbD17YWxsb3dTY3JvbGx9XG4gICAgICA+XG4gICAgICAgIDxIZWFkZXJIZWlnaHRBcmVhXG4gICAgICAgICAgZGlzcGxheT17eyBfOiBgYmxvY2tgLCBbYXBwSGVhZGVyTW9iaWxlQnJlYWtwb2ludF06IGBub25lYCB9fVxuICAgICAgICAgIGFzPVwibmF2XCJcbiAgICAgICAgICB0aXRsZT1cIk1vYmlsZSBOYXZpZ2F0aW9uXCJcbiAgICAgICAgICBkYXRhLXRlc3RpZD1cImhlYWRlci1tb2JpbGUtbWVudS1kcm9wZG93blwiXG4gICAgICAgID5cbiAgICAgICAgICA8U3R5bGVkQXBwQmFyPlxuICAgICAgICAgICAgPFN0eWxlZE1lbnVCYXIgcm9sZT1cIm1lbnViYXJcIj5cbiAgICAgICAgICAgICAge21hcEl0ZW1zVG9FbGVtZW50KGl0ZW1zLmxlZnQsICdsZWZ0Jyl9XG4gICAgICAgICAgICAgIDxBcHBIZWFkZXJMaXN0SXRlbSBtbD1cImF1dG9cIj5cbiAgICAgICAgICAgICAgICA8SWNvbkJ1dHRvblxuICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cImNsb3NlIG1lbnVcIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZXRNb2JpbGVNZW51T3BlbihmYWxzZSk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgaWNvbj17Q2xvc2VJY29ufVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvQXBwSGVhZGVyTGlzdEl0ZW0+XG4gICAgICAgICAgICA8L1N0eWxlZE1lbnVCYXI+XG4gICAgICAgICAgPC9TdHlsZWRBcHBCYXI+XG4gICAgICAgICAgPFN0eWxlZENvbnRlbnRDb250YWluZXIgYXM9XCJ1bFwiIHJvbGU9XCJtZW51YmFyXCIgc2l6ZT1cInNtYWxsXCI+XG4gICAgICAgICAgICA8QXBwSGVhZGVyTWFpbk1lbnVNb2JpbGVcbiAgICAgICAgICAgICAgYWN0aW9uPXthY3Rpb259XG4gICAgICAgICAgICAgIGl0ZW1zPXtpdGVtcy5tYWluTWVudX1cbiAgICAgICAgICAgICAgb25TZWFyY2g9e29uU2VhcmNofVxuICAgICAgICAgICAgICBnZXRJdGVtVHlwZT17b25JdGVtVHlwZX1cbiAgICAgICAgICAgICAgaXNBbm9uPXtpc0Fub259XG4gICAgICAgICAgICAgIGhhbmRsZUNsb3NlTWFpbk1lbnU9eygpID0+IHNldE1vYmlsZU1lbnVPcGVuKGZhbHNlKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9TdHlsZWRDb250ZW50Q29udGFpbmVyPlxuICAgICAgICA8L0hlYWRlckhlaWdodEFyZWE+XG4gICAgICA8L1N0eWxlZE92ZXJsYXk+XG4gICAgICA8Qm94IGRpc3BsYXk9e3sgXzogYGJsb2NrYCwgW2FwcEhlYWRlck1vYmlsZUJyZWFrcG9pbnRdOiBgbm9uZWAgfX0+XG4gICAgICAgIHtub3RpZmljYXRpb25zVmlld31cbiAgICAgICAge2Jvb2ttYXJrc0NvbnRlbnR9XG4gICAgICA8L0JveD5cbiAgICA8Lz5cbiAgKTtcbn07XG4iXX0= */");

export var AppHeaderMobile = function AppHeaderMobile(_ref) {
  var action = _ref.action,
      items = _ref.items,
      notifications = _ref.notifications,
      onSearch = _ref.onSearch,
      redirectParam = _ref.redirectParam,
      isAnon = _ref.isAnon,
      openCrossDeviceItemId = _ref.openCrossDeviceItemId,
      setOpenCrossDeviceItemId = _ref.setOpenCrossDeviceItemId,
      crossDeviceBookmarkParts = _ref.crossDeviceBookmarkParts;

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

  var _useBookmarkComponent = useBookmarkComponentsPair({
    openCrossDeviceItemId: openCrossDeviceItemId,
    setOpenCrossDeviceItemId: setOpenCrossDeviceItemId,
    bookmarkParts: crossDeviceBookmarkParts,
    view: CrossDeviceBookmarksView.MOBILE,
    isAnon: isAnon
  }),
      _useBookmarkComponent2 = _slicedToArray(_useBookmarkComponent, 2),
      bookmarksButton = _useBookmarkComponent2[0],
      bookmarksContent = _useBookmarkComponent2[1];

  var openMobileMenu = function openMobileMenu() {
    setMobileMenuOpen(true);
  };

  var mapItemsToElement = function mapItemsToElement(items, side, hideExtraItems) {
    var shouldHideItems = hideExtraItems === true && items.length > 1;
    return items.map(function (item, index) {
      var isLastItem = index + 1 === items.length;
      var isHidable = !isLastItem && shouldHideItems;
      return /*#__PURE__*/React.createElement(AppHeaderListItem, {
        key: item.id,
        ml: side === 'right' && index === 0 ? 'auto' : 0,
        display: {
          _: isHidable ? 'none' : 'flex',
          xs: 'flex'
        }
      }, mapItemToElement(action, item, isAnon, redirectParam, undefined, true));
    });
  };

  var right = [].concat(_toConsumableArray(notificationsBell ? [notificationsBell] : []), _toConsumableArray(bookmarksButton ? [bookmarksButton] : []), _toConsumableArray(items.right));

  var onItemType = function onItemType(type) {
    if (type && (type === 'catalog-dropdown' || type === 'experimental-resources-dropdown')) {
      setAllowScroll(true);
    } else {
      setAllowScroll(false);
    }
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, !mobileMenuOpen &&
  /*#__PURE__*/
  // need this bc AppBar has a hardcoded z-Index of 15
  React.createElement(HeaderHeightArea, {
    display: _defineProperty({
      _: "block"
    }, appHeaderMobileBreakpoint, "none"),
    as: "nav",
    title: "Mobile Navigation"
  }, /*#__PURE__*/React.createElement(StyledAppBar, null, /*#__PURE__*/React.createElement(StyledMenuBar, {
    role: "menubar"
  }, mapItemsToElement(items.left, 'left'), mapItemsToElement(right, 'right', true), /*#__PURE__*/React.createElement(AppHeaderListItem, {
    ml: right.length === 0 ? 'auto' : 0
  }, /*#__PURE__*/React.createElement(IconButton, {
    "data-testid": "header-mobile-menu",
    "aria-label": "open navigation menu",
    onClick: function onClick() {
      openMobileMenu();
    },
    icon: MenuIcon,
    variant: "interface"
  }))))), /*#__PURE__*/React.createElement(StyledOverlay, {
    clickOutsideCloses: true,
    escapeCloses: true,
    isOpen: mobileMenuOpen,
    onRequestClose: function onRequestClose() {
      return setMobileMenuOpen(false);
    },
    allowScroll: allowScroll
  }, /*#__PURE__*/React.createElement(HeaderHeightArea, {
    display: _defineProperty({
      _: "block"
    }, appHeaderMobileBreakpoint, "none"),
    as: "nav",
    title: "Mobile Navigation",
    "data-testid": "header-mobile-menu-dropdown"
  }, /*#__PURE__*/React.createElement(StyledAppBar, null, /*#__PURE__*/React.createElement(StyledMenuBar, {
    role: "menubar"
  }, mapItemsToElement(items.left, 'left'), /*#__PURE__*/React.createElement(AppHeaderListItem, {
    ml: "auto"
  }, /*#__PURE__*/React.createElement(IconButton, {
    "aria-label": "close menu",
    onClick: function onClick() {
      setMobileMenuOpen(false);
    },
    icon: CloseIcon
  })))), /*#__PURE__*/React.createElement(StyledContentContainer, {
    as: "ul",
    role: "menubar",
    size: "small"
  }, /*#__PURE__*/React.createElement(AppHeaderMainMenuMobile, {
    action: action,
    items: items.mainMenu,
    onSearch: onSearch,
    getItemType: onItemType,
    isAnon: isAnon,
    handleCloseMainMenu: function handleCloseMainMenu() {
      return setMobileMenuOpen(false);
    }
  })))), /*#__PURE__*/React.createElement(Box, {
    display: _defineProperty({
      _: "block"
    }, appHeaderMobileBreakpoint, "none")
  }, notificationsView, bookmarksContent));
};