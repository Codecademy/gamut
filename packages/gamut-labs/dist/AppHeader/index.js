import _styled from "@emotion/styled/base";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

import { FillButton, TextButton } from '@codecademy/gamut';
import { css } from '@codecademy/gamut-styles';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AppBar } from '../AppBar';
import { CrossDeviceBookmarksView } from '../Bookmarks/types';
import { useBookmarkComponentsPair } from '../Bookmarks/useBookmarkComponentsPair';
import { formatUrlWithRedirect } from '../GlobalHeader/urlHelpers';
import { HeaderHeightArea } from '../HeaderHeightArea';
import { NotificationsPopover } from '../Notifications/NotificationsPopover';
import { useHeaderNotifications } from '../Notifications/useHeaderNotifications';
import { AppHeaderCatalogDropdown } from './AppHeaderElements/AppHeaderCatalogDropdown';
import { AppHeaderDropdown } from './AppHeaderElements/AppHeaderDropdown';
import { AppHeaderLink } from './AppHeaderElements/AppHeaderLink';
import { AppHeaderListItem } from './AppHeaderElements/AppHeaderListItem';
import { AppHeaderLogo } from './AppHeaderElements/AppHeaderLogo';
import { AppHeaderResourcesDropdown } from './AppHeaderElements/AppHeaderResourcesDropdown';
import { useHeaderSearch } from './Search/useHeaderSearch';
import { appHeaderMobileBreakpoint } from './shared';
export var StyledAppBar = /*#__PURE__*/_styled(AppBar, {
  target: "eppx78a1",
  label: "StyledAppBar"
})(css({
  boxShadow: "none"
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9BcHBIZWFkZXIvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXlDNEIiLCJmaWxlIjoiLi4vLi4vc3JjL0FwcEhlYWRlci9pbmRleC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGaWxsQnV0dG9uLCBUZXh0QnV0dG9uIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQnO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQtc3R5bGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCBSZWFjdCwgeyBSZWFjdE5vZGUsIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgQXBwQmFyIH0gZnJvbSAnLi4vQXBwQmFyJztcbmltcG9ydCB7XG4gIENyb3NzRGV2aWNlQm9va21hcmtQYXJ0cyxcbiAgQ3Jvc3NEZXZpY2VCb29rbWFya3NWaWV3LFxufSBmcm9tICcuLi9Cb29rbWFya3MvdHlwZXMnO1xuaW1wb3J0IHsgdXNlQm9va21hcmtDb21wb25lbnRzUGFpciB9IGZyb20gJy4uL0Jvb2ttYXJrcy91c2VCb29rbWFya0NvbXBvbmVudHNQYWlyJztcbmltcG9ydCB7IENyb3NzRGV2aWNlU3RhdGVQcm9wcyB9IGZyb20gJy4uL0dsb2JhbEhlYWRlci90eXBlcyc7XG5pbXBvcnQgeyBmb3JtYXRVcmxXaXRoUmVkaXJlY3QgfSBmcm9tICcuLi9HbG9iYWxIZWFkZXIvdXJsSGVscGVycyc7XG5pbXBvcnQgeyBIZWFkZXJIZWlnaHRBcmVhIH0gZnJvbSAnLi4vSGVhZGVySGVpZ2h0QXJlYSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25zUG9wb3ZlciB9IGZyb20gJy4uL05vdGlmaWNhdGlvbnMvTm90aWZpY2F0aW9uc1BvcG92ZXInO1xuaW1wb3J0IHsgQXBwSGVhZGVyTm90aWZpY2F0aW9uU2V0dGluZ3MgfSBmcm9tICcuLi9Ob3RpZmljYXRpb25zL3R5cGVzJztcbmltcG9ydCB7IHVzZUhlYWRlck5vdGlmaWNhdGlvbnMgfSBmcm9tICcuLi9Ob3RpZmljYXRpb25zL3VzZUhlYWRlck5vdGlmaWNhdGlvbnMnO1xuaW1wb3J0IHsgQXBwSGVhZGVyQ2F0YWxvZ0Ryb3Bkb3duIH0gZnJvbSAnLi9BcHBIZWFkZXJFbGVtZW50cy9BcHBIZWFkZXJDYXRhbG9nRHJvcGRvd24nO1xuaW1wb3J0IHsgQXBwSGVhZGVyRHJvcGRvd24gfSBmcm9tICcuL0FwcEhlYWRlckVsZW1lbnRzL0FwcEhlYWRlckRyb3Bkb3duJztcbmltcG9ydCB7IEFwcEhlYWRlckxpbmsgfSBmcm9tICcuL0FwcEhlYWRlckVsZW1lbnRzL0FwcEhlYWRlckxpbmsnO1xuaW1wb3J0IHsgQXBwSGVhZGVyTGlzdEl0ZW0gfSBmcm9tICcuL0FwcEhlYWRlckVsZW1lbnRzL0FwcEhlYWRlckxpc3RJdGVtJztcbmltcG9ydCB7IEFwcEhlYWRlckxvZ28gfSBmcm9tICcuL0FwcEhlYWRlckVsZW1lbnRzL0FwcEhlYWRlckxvZ28nO1xuaW1wb3J0IHsgQXBwSGVhZGVyUmVzb3VyY2VzRHJvcGRvd24gfSBmcm9tICcuL0FwcEhlYWRlckVsZW1lbnRzL0FwcEhlYWRlclJlc291cmNlc0Ryb3Bkb3duJztcbmltcG9ydCB7XG4gIEFwcEhlYWRlckNsaWNrSGFuZGxlcixcbiAgQXBwSGVhZGVySXRlbSxcbn0gZnJvbSAnLi9BcHBIZWFkZXJFbGVtZW50cy90eXBlcyc7XG5pbXBvcnQgeyBBcHBIZWFkZXJTZWFyY2gsIHVzZUhlYWRlclNlYXJjaCB9IGZyb20gJy4vU2VhcmNoL3VzZUhlYWRlclNlYXJjaCc7XG5pbXBvcnQgeyBhcHBIZWFkZXJNb2JpbGVCcmVha3BvaW50IH0gZnJvbSAnLi9zaGFyZWQnO1xuaW1wb3J0IHsgRm9ybWF0dGVkQXBwSGVhZGVySXRlbXMgfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IHR5cGUgQXBwSGVhZGVyUHJvcHMgPSB7XG4gIGFjdGlvbjogQXBwSGVhZGVyQ2xpY2tIYW5kbGVyO1xuICBpdGVtczogRm9ybWF0dGVkQXBwSGVhZGVySXRlbXM7XG4gIG5vdGlmaWNhdGlvbnM/OiBBcHBIZWFkZXJOb3RpZmljYXRpb25TZXR0aW5ncztcbiAgcmVkaXJlY3RQYXJhbT86IHN0cmluZztcbiAgc2VhcmNoOiBBcHBIZWFkZXJTZWFyY2g7XG4gIGlzQW5vbjogYm9vbGVhbjtcbiAgY3Jvc3NEZXZpY2VCb29rbWFya1BhcnRzPzogQ3Jvc3NEZXZpY2VCb29rbWFya1BhcnRzO1xufSAmIENyb3NzRGV2aWNlU3RhdGVQcm9wcztcblxuZXhwb3J0IGNvbnN0IFN0eWxlZEFwcEJhciA9IHN0eWxlZChBcHBCYXIpKFxuICBjc3Moe1xuICAgIGJveFNoYWRvdzogYG5vbmVgLFxuICB9KVxuKTtcblxuZXhwb3J0IGNvbnN0IFN0eWxlZE1lbnVCYXIgPSBzdHlsZWQudWwoXG4gIGNzcyh7XG4gICAgZGlzcGxheTogYGZsZXhgLFxuICAgIHBhZGRpbmc6IDAsXG4gICAgbGlzdFN0eWxlOiBgbm9uZWAsXG4gICAgbWFyZ2luOiAwLFxuICAgIHdpZHRoOiBgMTAwJWAsXG4gICAgYWxpZ25JdGVtczogJ2ZsZXgtc3RhcnQnLFxuICB9KVxuKTtcblxuY29uc3QgS0VZX0NPREVTID0ge1xuICBVUDogJ0Fycm93VXAnLFxuICBET1dOOiAnQXJyb3dEb3duJyxcbiAgTEVGVDogJ0Fycm93TGVmdCcsXG4gIFJJR0hUOiAnQXJyb3dSaWdodCcsXG4gIEVORDogJ0VuZCcsXG4gIEhPTUU6ICdIb21lJyxcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCBjb25zdCBtYXBJdGVtVG9FbGVtZW50ID0gKFxuICBhY3Rpb246IEFwcEhlYWRlckNsaWNrSGFuZGxlcixcbiAgaXRlbTogQXBwSGVhZGVySXRlbSxcbiAgaXNBbm9uOiBib29sZWFuLFxuICByZWRpcmVjdFBhcmFtPzogc3RyaW5nLFxuICBvbktleURvd24/OiAoZXZlbnQ6IFJlYWN0LktleWJvYXJkRXZlbnQpID0+IHZvaWQsXG4gIG1vYmlsZSA9IGZhbHNlXG4pOiBSZWFjdE5vZGUgPT4ge1xuICBzd2l0Y2ggKGl0ZW0udHlwZSkge1xuICAgIGNhc2UgJ2xvZ28nOlxuICAgICAgcmV0dXJuIDxBcHBIZWFkZXJMb2dvIGFjdGlvbj17YWN0aW9ufSBpdGVtPXtpdGVtfSAvPjtcbiAgICBjYXNlICdsaW5rJzpcbiAgICAgIHJldHVybiA8QXBwSGVhZGVyTGluayB0YWJJbmRleD1cIi0xXCIgbXg9ezB9IGFjdGlvbj17YWN0aW9ufSBpdGVtPXtpdGVtfSAvPjtcbiAgICBjYXNlICdkcm9wZG93bic6XG4gICAgY2FzZSAncHJvZmlsZS1kcm9wZG93bic6XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8QXBwSGVhZGVyRHJvcGRvd24gb25LZXlEb3duPXtvbktleURvd259IGFjdGlvbj17YWN0aW9ufSBpdGVtPXtpdGVtfSAvPlxuICAgICAgKTtcbiAgICBjYXNlICdjYXRhbG9nLWRyb3Bkb3duJzpcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxBcHBIZWFkZXJDYXRhbG9nRHJvcGRvd24gYWN0aW9uPXthY3Rpb259IGl0ZW09e2l0ZW19IGlzQW5vbj17aXNBbm9ufSAvPlxuICAgICAgKTtcbiAgICBjYXNlICdleHBlcmltZW50YWwtcmVzb3VyY2VzLWRyb3Bkb3duJzpcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxBcHBIZWFkZXJSZXNvdXJjZXNEcm9wZG93blxuICAgICAgICAgIGFjdGlvbj17YWN0aW9ufVxuICAgICAgICAgIGl0ZW09e2l0ZW19XG4gICAgICAgICAgaXNBbm9uPXtpc0Fub259XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIGNhc2UgJ3JlbmRlci1lbGVtZW50JzpcbiAgICAgIHJldHVybiBpdGVtLnJlbmRlckVsZW1lbnQoKTtcbiAgICBjYXNlICd0ZXh0LWJ1dHRvbic6XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8VGV4dEJ1dHRvblxuICAgICAgICAgIHNpemU9e21vYmlsZSA/ICdzbWFsbCcgOiAnbm9ybWFsJ31cbiAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IGFjdGlvbihldmVudCwgaXRlbSl9XG4gICAgICAgICAgZGF0YS10ZXN0aWQ9e2l0ZW0uZGF0YVRlc3RJZH1cbiAgICAgICAgICB0YWJJbmRleD1cIi0xXCJcbiAgICAgICAgICByb2xlPVwibWVudWl0ZW1cIlxuICAgICAgICAgIGhyZWY9e1xuICAgICAgICAgICAgaXRlbS5yZWRpcmVjdFxuICAgICAgICAgICAgICA/IGZvcm1hdFVybFdpdGhSZWRpcmVjdChpdGVtLmhyZWYsIHJlZGlyZWN0UGFyYW0pXG4gICAgICAgICAgICAgIDogaXRlbS5ocmVmXG4gICAgICAgICAgfVxuICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICA+XG4gICAgICAgICAge2l0ZW0udGV4dH1cbiAgICAgICAgPC9UZXh0QnV0dG9uPlxuICAgICAgKTtcbiAgICBjYXNlICdmaWxsLWJ1dHRvbic6XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8RmlsbEJ1dHRvblxuICAgICAgICAgIHNpemU9e21vYmlsZSA/ICdzbWFsbCcgOiAnbm9ybWFsJ31cbiAgICAgICAgICBkYXRhLXRlc3RpZD17aXRlbS5kYXRhVGVzdElkfVxuICAgICAgICAgIGhyZWY9e1xuICAgICAgICAgICAgaXRlbS5yZWRpcmVjdFxuICAgICAgICAgICAgICA/IGZvcm1hdFVybFdpdGhSZWRpcmVjdChpdGVtLmhyZWYsIHJlZGlyZWN0UGFyYW0pXG4gICAgICAgICAgICAgIDogaXRlbS5ocmVmXG4gICAgICAgICAgfVxuICAgICAgICAgIHJvbGU9XCJtZW51aXRlbVwiXG4gICAgICAgICAgdGFiSW5kZXg9XCItMVwiXG4gICAgICAgICAgb25DbGljaz17KGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiBhY3Rpb24oZXZlbnQsIGl0ZW0pfVxuICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICA+XG4gICAgICAgICAge2l0ZW0udGV4dH1cbiAgICAgICAgPC9GaWxsQnV0dG9uPlxuICAgICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IEFwcEhlYWRlcjogUmVhY3QuRkM8QXBwSGVhZGVyUHJvcHM+ID0gKHtcbiAgb3BlbkNyb3NzRGV2aWNlSXRlbUlkLFxuICBzZXRPcGVuQ3Jvc3NEZXZpY2VJdGVtSWQsXG4gIGNyb3NzRGV2aWNlQm9va21hcmtQYXJ0cyxcbiAgYWN0aW9uLFxuICBpdGVtcyxcbiAgbm90aWZpY2F0aW9ucyxcbiAgcmVkaXJlY3RQYXJhbSxcbiAgc2VhcmNoLFxuICBpc0Fub24sXG59KSA9PiB7XG4gIGNvbnN0IG1lbnVDb250YWluZXJSZWYgPSB1c2VSZWY8SFRNTFVMaXN0RWxlbWVudD4obnVsbCk7XG5cbiAgY29uc3QgW25vdGlmaWNhdGlvbnNCZWxsLCBub3RpZmljYXRpb25zVmlld10gPSB1c2VIZWFkZXJOb3RpZmljYXRpb25zKHtcbiAgICBzZXR0aW5nczogbm90aWZpY2F0aW9ucyxcbiAgICBSZW5kZXJlcjogTm90aWZpY2F0aW9uc1BvcG92ZXIsXG4gICAgb3BlbkNyb3NzRGV2aWNlSXRlbUlkLFxuICAgIHNldE9wZW5Dcm9zc0RldmljZUl0ZW1JZCxcbiAgfSk7XG4gIGNvbnN0IFtzZWFyY2hCdXR0b24sIHNlYXJjaFBhbmVdID0gdXNlSGVhZGVyU2VhcmNoKHNlYXJjaCk7XG5cbiAgY29uc3QgW2Jvb2ttYXJrc0J1dHRvbiwgYm9va21hcmtzQ29udGVudF0gPSB1c2VCb29rbWFya0NvbXBvbmVudHNQYWlyKHtcbiAgICBvcGVuQ3Jvc3NEZXZpY2VJdGVtSWQsXG4gICAgc2V0T3BlbkNyb3NzRGV2aWNlSXRlbUlkLFxuICAgIGJvb2ttYXJrUGFydHM6IGNyb3NzRGV2aWNlQm9va21hcmtQYXJ0cyxcbiAgICB2aWV3OiBDcm9zc0RldmljZUJvb2ttYXJrc1ZpZXcuREVTS1RPUCxcbiAgICBpc0Fub24sXG4gIH0pO1xuXG4gIGNvbnN0IHJpZ2h0ID0gdXNlTWVtbyhcbiAgICAoKSA9PiBbXG4gICAgICBzZWFyY2hCdXR0b24sXG4gICAgICAuLi4obm90aWZpY2F0aW9uc0JlbGwgPyBbbm90aWZpY2F0aW9uc0JlbGxdIDogW10pLFxuICAgICAgLi4uKGJvb2ttYXJrc0J1dHRvbiA/IFtib29rbWFya3NCdXR0b25dIDogW10pLFxuICAgICAgLi4uaXRlbXMucmlnaHQsXG4gICAgXSxcbiAgICBbc2VhcmNoQnV0dG9uLCBub3RpZmljYXRpb25zQmVsbCwgYm9va21hcmtzQnV0dG9uLCBpdGVtc11cbiAgKTtcblxuICBjb25zdCBpdGVtc0NvdW50ID0gWy4uLml0ZW1zLmxlZnQsIC4uLnJpZ2h0XS5sZW5ndGggLSAxO1xuXG4gIGNvbnN0IFtmb2N1c0luZGV4LCBzZXRGb2N1c0luZGV4XSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBbaXNGb2N1c2VkLCBzZXRJc0ZvY3VzZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbaXNDb250YWluZXJGb2N1c2VkLCBzZXRJc0NvbnRhaW5lckZvY3VzZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IGZvY3VzRmlyc3RJdGVtID0gKCkgPT4gc2V0Rm9jdXNJbmRleCgwKTtcbiAgY29uc3QgZm9jdXNMYXN0SXRlbSA9ICgpID0+IHNldEZvY3VzSW5kZXgoaXRlbXNDb3VudCk7XG5cbiAgY29uc3QgZm9jdXNOZXh0SXRlbSA9ICgpID0+IHtcbiAgICBpZiAoZm9jdXNJbmRleCA9PT0gaXRlbXNDb3VudCkge1xuICAgICAgZm9jdXNGaXJzdEl0ZW0oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0Rm9jdXNJbmRleChmb2N1c0luZGV4ICsgMSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGZvY3VzUHJldmlvdXNJdGVtID0gKCkgPT4ge1xuICAgIGlmIChmb2N1c0luZGV4ID09PSAwKSB7XG4gICAgICBmb2N1c0xhc3RJdGVtKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldEZvY3VzSW5kZXgoZm9jdXNJbmRleCAtIDEpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBnZXROb2RlID0gKGluZGV4OiBudW1iZXIpID0+IHtcbiAgICByZXR1cm4gbWVudUNvbnRhaW5lclJlZj8uY3VycmVudD8uY2hpbGROb2Rlc1tpbmRleF1cbiAgICAgIC5jaGlsZE5vZGVzWzBdIGFzIEhUTUxFbGVtZW50O1xuICB9O1xuXG4gIGNvbnN0IG1lbnVIYW5kbGVLZXlFdmVudHMgPSAoZXZlbnQ6IFJlYWN0LktleWJvYXJkRXZlbnQpID0+IHtcbiAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgY2FzZSBLRVlfQ09ERVMuSE9NRTpcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZm9jdXNGaXJzdEl0ZW0oKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEtFWV9DT0RFUy5FTkQ6XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGZvY3VzTGFzdEl0ZW0oKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEtFWV9DT0RFUy5SSUdIVDpcbiAgICAgICAgZm9jdXNOZXh0SXRlbSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgS0VZX0NPREVTLkxFRlQ6XG4gICAgICAgIGZvY3VzUHJldmlvdXNJdGVtKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBLRVlfQ09ERVMuVVA6XG4gICAgICBjYXNlIEtFWV9DT0RFUy5ET1dOOlxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGZpcnN0Tm9kZSA9IGdldE5vZGUoMCk7XG4gICAgY29uc3QgbmV4dE5vZGUgPSBnZXROb2RlKGZvY3VzSW5kZXgpO1xuXG4gICAgaWYgKGZpcnN0Tm9kZSAmJiBuZXh0Tm9kZSkge1xuICAgICAgaWYgKGlzQ29udGFpbmVyRm9jdXNlZCkge1xuICAgICAgICBpZiAoZm9jdXNJbmRleCA+PSAwICYmIGZvY3VzSW5kZXggPD0gaXRlbXNDb3VudCkge1xuICAgICAgICAgIG5leHROb2RlLmZvY3VzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmlyc3ROb2RlLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFpc0ZvY3VzZWQgJiYgIWlzQ29udGFpbmVyRm9jdXNlZCkge1xuICAgICAgICBpZiAoZm9jdXNJbmRleCAhPT0gMCkge1xuICAgICAgICAgIGZvY3VzRmlyc3RJdGVtKCk7XG4gICAgICAgICAgZmlyc3ROb2RlLmZvY3VzKCk7XG4gICAgICAgICAgZmlyc3ROb2RlLmJsdXIoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSwgW2ZvY3VzSW5kZXgsIGlzQ29udGFpbmVyRm9jdXNlZCwgaXNGb2N1c2VkLCBpdGVtc0NvdW50XSk7XG5cbiAgY29uc3QgbWFwSXRlbXNUb0VsZW1lbnQgPSA8VCBleHRlbmRzIEFwcEhlYWRlckl0ZW1bXT4oXG4gICAgaXRlbXM6IFQsXG4gICAgc2lkZTogJ2xlZnQnIHwgJ3JpZ2h0J1xuICApID0+IHtcbiAgICByZXR1cm4gaXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4gKFxuICAgICAgPEFwcEhlYWRlckxpc3RJdGVtXG4gICAgICAgIGtleT17aXRlbS5pZH1cbiAgICAgICAgbXI9ezh9XG4gICAgICAgIG1sPXtzaWRlID09PSAncmlnaHQnICYmIGluZGV4ID09PSAwID8gJ2F1dG8nIDogOH1cbiAgICAgICAgb25Gb2N1cz17KCkgPT4gc2V0SXNGb2N1c2VkKHRydWUpfVxuICAgICAgICBvbkJsdXI9eygpID0+IHNldElzRm9jdXNlZChmYWxzZSl9XG4gICAgICA+XG4gICAgICAgIHttYXBJdGVtVG9FbGVtZW50KGFjdGlvbiwgaXRlbSwgaXNBbm9uLCByZWRpcmVjdFBhcmFtKX1cbiAgICAgIDwvQXBwSGVhZGVyTGlzdEl0ZW0+XG4gICAgKSk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8SGVhZGVySGVpZ2h0QXJlYVxuICAgICAgZGlzcGxheT17eyBfOiAnbm9uZScsIFthcHBIZWFkZXJNb2JpbGVCcmVha3BvaW50XTogJ2Jsb2NrJyB9fVxuICAgICAgYXM9XCJuYXZcIlxuICAgICAgdGl0bGU9XCJNYWluIE5hdmlnYXRpb25cIlxuICAgID5cbiAgICAgIDxTdHlsZWRBcHBCYXI+XG4gICAgICAgIDxTdHlsZWRNZW51QmFyXG4gICAgICAgICAgcm9sZT1cIm1lbnViYXJcIlxuICAgICAgICAgIHJlZj17bWVudUNvbnRhaW5lclJlZn1cbiAgICAgICAgICBvbktleURvd249e21lbnVIYW5kbGVLZXlFdmVudHN9XG4gICAgICAgICAgb25Gb2N1cz17KCkgPT4gc2V0SXNDb250YWluZXJGb2N1c2VkKHRydWUpfVxuICAgICAgICAgIG9uQmx1cj17KCkgPT4gc2V0SXNDb250YWluZXJGb2N1c2VkKGZhbHNlKX1cbiAgICAgICAgPlxuICAgICAgICAgIHttYXBJdGVtc1RvRWxlbWVudChpdGVtcy5sZWZ0LCAnbGVmdCcpfVxuICAgICAgICAgIHttYXBJdGVtc1RvRWxlbWVudChyaWdodCwgJ3JpZ2h0Jyl9XG4gICAgICAgIDwvU3R5bGVkTWVudUJhcj5cbiAgICAgIDwvU3R5bGVkQXBwQmFyPlxuICAgICAge25vdGlmaWNhdGlvbnNWaWV3fVxuICAgICAge2Jvb2ttYXJrc0NvbnRlbnR9XG4gICAgICB7c2VhcmNoUGFuZX1cbiAgICA8L0hlYWRlckhlaWdodEFyZWE+XG4gICk7XG59O1xuIl19 */");
export var StyledMenuBar = _styled("ul", {
  target: "eppx78a0",
  label: "StyledMenuBar"
})(css({
  display: "flex",
  padding: 0,
  listStyle: "none",
  margin: 0,
  width: "100%",
  alignItems: 'flex-start'
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9BcHBIZWFkZXIvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQStDNkIiLCJmaWxlIjoiLi4vLi4vc3JjL0FwcEhlYWRlci9pbmRleC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGaWxsQnV0dG9uLCBUZXh0QnV0dG9uIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQnO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQtc3R5bGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCBSZWFjdCwgeyBSZWFjdE5vZGUsIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgQXBwQmFyIH0gZnJvbSAnLi4vQXBwQmFyJztcbmltcG9ydCB7XG4gIENyb3NzRGV2aWNlQm9va21hcmtQYXJ0cyxcbiAgQ3Jvc3NEZXZpY2VCb29rbWFya3NWaWV3LFxufSBmcm9tICcuLi9Cb29rbWFya3MvdHlwZXMnO1xuaW1wb3J0IHsgdXNlQm9va21hcmtDb21wb25lbnRzUGFpciB9IGZyb20gJy4uL0Jvb2ttYXJrcy91c2VCb29rbWFya0NvbXBvbmVudHNQYWlyJztcbmltcG9ydCB7IENyb3NzRGV2aWNlU3RhdGVQcm9wcyB9IGZyb20gJy4uL0dsb2JhbEhlYWRlci90eXBlcyc7XG5pbXBvcnQgeyBmb3JtYXRVcmxXaXRoUmVkaXJlY3QgfSBmcm9tICcuLi9HbG9iYWxIZWFkZXIvdXJsSGVscGVycyc7XG5pbXBvcnQgeyBIZWFkZXJIZWlnaHRBcmVhIH0gZnJvbSAnLi4vSGVhZGVySGVpZ2h0QXJlYSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25zUG9wb3ZlciB9IGZyb20gJy4uL05vdGlmaWNhdGlvbnMvTm90aWZpY2F0aW9uc1BvcG92ZXInO1xuaW1wb3J0IHsgQXBwSGVhZGVyTm90aWZpY2F0aW9uU2V0dGluZ3MgfSBmcm9tICcuLi9Ob3RpZmljYXRpb25zL3R5cGVzJztcbmltcG9ydCB7IHVzZUhlYWRlck5vdGlmaWNhdGlvbnMgfSBmcm9tICcuLi9Ob3RpZmljYXRpb25zL3VzZUhlYWRlck5vdGlmaWNhdGlvbnMnO1xuaW1wb3J0IHsgQXBwSGVhZGVyQ2F0YWxvZ0Ryb3Bkb3duIH0gZnJvbSAnLi9BcHBIZWFkZXJFbGVtZW50cy9BcHBIZWFkZXJDYXRhbG9nRHJvcGRvd24nO1xuaW1wb3J0IHsgQXBwSGVhZGVyRHJvcGRvd24gfSBmcm9tICcuL0FwcEhlYWRlckVsZW1lbnRzL0FwcEhlYWRlckRyb3Bkb3duJztcbmltcG9ydCB7IEFwcEhlYWRlckxpbmsgfSBmcm9tICcuL0FwcEhlYWRlckVsZW1lbnRzL0FwcEhlYWRlckxpbmsnO1xuaW1wb3J0IHsgQXBwSGVhZGVyTGlzdEl0ZW0gfSBmcm9tICcuL0FwcEhlYWRlckVsZW1lbnRzL0FwcEhlYWRlckxpc3RJdGVtJztcbmltcG9ydCB7IEFwcEhlYWRlckxvZ28gfSBmcm9tICcuL0FwcEhlYWRlckVsZW1lbnRzL0FwcEhlYWRlckxvZ28nO1xuaW1wb3J0IHsgQXBwSGVhZGVyUmVzb3VyY2VzRHJvcGRvd24gfSBmcm9tICcuL0FwcEhlYWRlckVsZW1lbnRzL0FwcEhlYWRlclJlc291cmNlc0Ryb3Bkb3duJztcbmltcG9ydCB7XG4gIEFwcEhlYWRlckNsaWNrSGFuZGxlcixcbiAgQXBwSGVhZGVySXRlbSxcbn0gZnJvbSAnLi9BcHBIZWFkZXJFbGVtZW50cy90eXBlcyc7XG5pbXBvcnQgeyBBcHBIZWFkZXJTZWFyY2gsIHVzZUhlYWRlclNlYXJjaCB9IGZyb20gJy4vU2VhcmNoL3VzZUhlYWRlclNlYXJjaCc7XG5pbXBvcnQgeyBhcHBIZWFkZXJNb2JpbGVCcmVha3BvaW50IH0gZnJvbSAnLi9zaGFyZWQnO1xuaW1wb3J0IHsgRm9ybWF0dGVkQXBwSGVhZGVySXRlbXMgfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IHR5cGUgQXBwSGVhZGVyUHJvcHMgPSB7XG4gIGFjdGlvbjogQXBwSGVhZGVyQ2xpY2tIYW5kbGVyO1xuICBpdGVtczogRm9ybWF0dGVkQXBwSGVhZGVySXRlbXM7XG4gIG5vdGlmaWNhdGlvbnM/OiBBcHBIZWFkZXJOb3RpZmljYXRpb25TZXR0aW5ncztcbiAgcmVkaXJlY3RQYXJhbT86IHN0cmluZztcbiAgc2VhcmNoOiBBcHBIZWFkZXJTZWFyY2g7XG4gIGlzQW5vbjogYm9vbGVhbjtcbiAgY3Jvc3NEZXZpY2VCb29rbWFya1BhcnRzPzogQ3Jvc3NEZXZpY2VCb29rbWFya1BhcnRzO1xufSAmIENyb3NzRGV2aWNlU3RhdGVQcm9wcztcblxuZXhwb3J0IGNvbnN0IFN0eWxlZEFwcEJhciA9IHN0eWxlZChBcHBCYXIpKFxuICBjc3Moe1xuICAgIGJveFNoYWRvdzogYG5vbmVgLFxuICB9KVxuKTtcblxuZXhwb3J0IGNvbnN0IFN0eWxlZE1lbnVCYXIgPSBzdHlsZWQudWwoXG4gIGNzcyh7XG4gICAgZGlzcGxheTogYGZsZXhgLFxuICAgIHBhZGRpbmc6IDAsXG4gICAgbGlzdFN0eWxlOiBgbm9uZWAsXG4gICAgbWFyZ2luOiAwLFxuICAgIHdpZHRoOiBgMTAwJWAsXG4gICAgYWxpZ25JdGVtczogJ2ZsZXgtc3RhcnQnLFxuICB9KVxuKTtcblxuY29uc3QgS0VZX0NPREVTID0ge1xuICBVUDogJ0Fycm93VXAnLFxuICBET1dOOiAnQXJyb3dEb3duJyxcbiAgTEVGVDogJ0Fycm93TGVmdCcsXG4gIFJJR0hUOiAnQXJyb3dSaWdodCcsXG4gIEVORDogJ0VuZCcsXG4gIEhPTUU6ICdIb21lJyxcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCBjb25zdCBtYXBJdGVtVG9FbGVtZW50ID0gKFxuICBhY3Rpb246IEFwcEhlYWRlckNsaWNrSGFuZGxlcixcbiAgaXRlbTogQXBwSGVhZGVySXRlbSxcbiAgaXNBbm9uOiBib29sZWFuLFxuICByZWRpcmVjdFBhcmFtPzogc3RyaW5nLFxuICBvbktleURvd24/OiAoZXZlbnQ6IFJlYWN0LktleWJvYXJkRXZlbnQpID0+IHZvaWQsXG4gIG1vYmlsZSA9IGZhbHNlXG4pOiBSZWFjdE5vZGUgPT4ge1xuICBzd2l0Y2ggKGl0ZW0udHlwZSkge1xuICAgIGNhc2UgJ2xvZ28nOlxuICAgICAgcmV0dXJuIDxBcHBIZWFkZXJMb2dvIGFjdGlvbj17YWN0aW9ufSBpdGVtPXtpdGVtfSAvPjtcbiAgICBjYXNlICdsaW5rJzpcbiAgICAgIHJldHVybiA8QXBwSGVhZGVyTGluayB0YWJJbmRleD1cIi0xXCIgbXg9ezB9IGFjdGlvbj17YWN0aW9ufSBpdGVtPXtpdGVtfSAvPjtcbiAgICBjYXNlICdkcm9wZG93bic6XG4gICAgY2FzZSAncHJvZmlsZS1kcm9wZG93bic6XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8QXBwSGVhZGVyRHJvcGRvd24gb25LZXlEb3duPXtvbktleURvd259IGFjdGlvbj17YWN0aW9ufSBpdGVtPXtpdGVtfSAvPlxuICAgICAgKTtcbiAgICBjYXNlICdjYXRhbG9nLWRyb3Bkb3duJzpcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxBcHBIZWFkZXJDYXRhbG9nRHJvcGRvd24gYWN0aW9uPXthY3Rpb259IGl0ZW09e2l0ZW19IGlzQW5vbj17aXNBbm9ufSAvPlxuICAgICAgKTtcbiAgICBjYXNlICdleHBlcmltZW50YWwtcmVzb3VyY2VzLWRyb3Bkb3duJzpcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxBcHBIZWFkZXJSZXNvdXJjZXNEcm9wZG93blxuICAgICAgICAgIGFjdGlvbj17YWN0aW9ufVxuICAgICAgICAgIGl0ZW09e2l0ZW19XG4gICAgICAgICAgaXNBbm9uPXtpc0Fub259XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIGNhc2UgJ3JlbmRlci1lbGVtZW50JzpcbiAgICAgIHJldHVybiBpdGVtLnJlbmRlckVsZW1lbnQoKTtcbiAgICBjYXNlICd0ZXh0LWJ1dHRvbic6XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8VGV4dEJ1dHRvblxuICAgICAgICAgIHNpemU9e21vYmlsZSA/ICdzbWFsbCcgOiAnbm9ybWFsJ31cbiAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IGFjdGlvbihldmVudCwgaXRlbSl9XG4gICAgICAgICAgZGF0YS10ZXN0aWQ9e2l0ZW0uZGF0YVRlc3RJZH1cbiAgICAgICAgICB0YWJJbmRleD1cIi0xXCJcbiAgICAgICAgICByb2xlPVwibWVudWl0ZW1cIlxuICAgICAgICAgIGhyZWY9e1xuICAgICAgICAgICAgaXRlbS5yZWRpcmVjdFxuICAgICAgICAgICAgICA/IGZvcm1hdFVybFdpdGhSZWRpcmVjdChpdGVtLmhyZWYsIHJlZGlyZWN0UGFyYW0pXG4gICAgICAgICAgICAgIDogaXRlbS5ocmVmXG4gICAgICAgICAgfVxuICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICA+XG4gICAgICAgICAge2l0ZW0udGV4dH1cbiAgICAgICAgPC9UZXh0QnV0dG9uPlxuICAgICAgKTtcbiAgICBjYXNlICdmaWxsLWJ1dHRvbic6XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8RmlsbEJ1dHRvblxuICAgICAgICAgIHNpemU9e21vYmlsZSA/ICdzbWFsbCcgOiAnbm9ybWFsJ31cbiAgICAgICAgICBkYXRhLXRlc3RpZD17aXRlbS5kYXRhVGVzdElkfVxuICAgICAgICAgIGhyZWY9e1xuICAgICAgICAgICAgaXRlbS5yZWRpcmVjdFxuICAgICAgICAgICAgICA/IGZvcm1hdFVybFdpdGhSZWRpcmVjdChpdGVtLmhyZWYsIHJlZGlyZWN0UGFyYW0pXG4gICAgICAgICAgICAgIDogaXRlbS5ocmVmXG4gICAgICAgICAgfVxuICAgICAgICAgIHJvbGU9XCJtZW51aXRlbVwiXG4gICAgICAgICAgdGFiSW5kZXg9XCItMVwiXG4gICAgICAgICAgb25DbGljaz17KGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiBhY3Rpb24oZXZlbnQsIGl0ZW0pfVxuICAgICAgICAgIHZhcmlhbnQ9XCJpbnRlcmZhY2VcIlxuICAgICAgICA+XG4gICAgICAgICAge2l0ZW0udGV4dH1cbiAgICAgICAgPC9GaWxsQnV0dG9uPlxuICAgICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IEFwcEhlYWRlcjogUmVhY3QuRkM8QXBwSGVhZGVyUHJvcHM+ID0gKHtcbiAgb3BlbkNyb3NzRGV2aWNlSXRlbUlkLFxuICBzZXRPcGVuQ3Jvc3NEZXZpY2VJdGVtSWQsXG4gIGNyb3NzRGV2aWNlQm9va21hcmtQYXJ0cyxcbiAgYWN0aW9uLFxuICBpdGVtcyxcbiAgbm90aWZpY2F0aW9ucyxcbiAgcmVkaXJlY3RQYXJhbSxcbiAgc2VhcmNoLFxuICBpc0Fub24sXG59KSA9PiB7XG4gIGNvbnN0IG1lbnVDb250YWluZXJSZWYgPSB1c2VSZWY8SFRNTFVMaXN0RWxlbWVudD4obnVsbCk7XG5cbiAgY29uc3QgW25vdGlmaWNhdGlvbnNCZWxsLCBub3RpZmljYXRpb25zVmlld10gPSB1c2VIZWFkZXJOb3RpZmljYXRpb25zKHtcbiAgICBzZXR0aW5nczogbm90aWZpY2F0aW9ucyxcbiAgICBSZW5kZXJlcjogTm90aWZpY2F0aW9uc1BvcG92ZXIsXG4gICAgb3BlbkNyb3NzRGV2aWNlSXRlbUlkLFxuICAgIHNldE9wZW5Dcm9zc0RldmljZUl0ZW1JZCxcbiAgfSk7XG4gIGNvbnN0IFtzZWFyY2hCdXR0b24sIHNlYXJjaFBhbmVdID0gdXNlSGVhZGVyU2VhcmNoKHNlYXJjaCk7XG5cbiAgY29uc3QgW2Jvb2ttYXJrc0J1dHRvbiwgYm9va21hcmtzQ29udGVudF0gPSB1c2VCb29rbWFya0NvbXBvbmVudHNQYWlyKHtcbiAgICBvcGVuQ3Jvc3NEZXZpY2VJdGVtSWQsXG4gICAgc2V0T3BlbkNyb3NzRGV2aWNlSXRlbUlkLFxuICAgIGJvb2ttYXJrUGFydHM6IGNyb3NzRGV2aWNlQm9va21hcmtQYXJ0cyxcbiAgICB2aWV3OiBDcm9zc0RldmljZUJvb2ttYXJrc1ZpZXcuREVTS1RPUCxcbiAgICBpc0Fub24sXG4gIH0pO1xuXG4gIGNvbnN0IHJpZ2h0ID0gdXNlTWVtbyhcbiAgICAoKSA9PiBbXG4gICAgICBzZWFyY2hCdXR0b24sXG4gICAgICAuLi4obm90aWZpY2F0aW9uc0JlbGwgPyBbbm90aWZpY2F0aW9uc0JlbGxdIDogW10pLFxuICAgICAgLi4uKGJvb2ttYXJrc0J1dHRvbiA/IFtib29rbWFya3NCdXR0b25dIDogW10pLFxuICAgICAgLi4uaXRlbXMucmlnaHQsXG4gICAgXSxcbiAgICBbc2VhcmNoQnV0dG9uLCBub3RpZmljYXRpb25zQmVsbCwgYm9va21hcmtzQnV0dG9uLCBpdGVtc11cbiAgKTtcblxuICBjb25zdCBpdGVtc0NvdW50ID0gWy4uLml0ZW1zLmxlZnQsIC4uLnJpZ2h0XS5sZW5ndGggLSAxO1xuXG4gIGNvbnN0IFtmb2N1c0luZGV4LCBzZXRGb2N1c0luZGV4XSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBbaXNGb2N1c2VkLCBzZXRJc0ZvY3VzZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbaXNDb250YWluZXJGb2N1c2VkLCBzZXRJc0NvbnRhaW5lckZvY3VzZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IGZvY3VzRmlyc3RJdGVtID0gKCkgPT4gc2V0Rm9jdXNJbmRleCgwKTtcbiAgY29uc3QgZm9jdXNMYXN0SXRlbSA9ICgpID0+IHNldEZvY3VzSW5kZXgoaXRlbXNDb3VudCk7XG5cbiAgY29uc3QgZm9jdXNOZXh0SXRlbSA9ICgpID0+IHtcbiAgICBpZiAoZm9jdXNJbmRleCA9PT0gaXRlbXNDb3VudCkge1xuICAgICAgZm9jdXNGaXJzdEl0ZW0oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0Rm9jdXNJbmRleChmb2N1c0luZGV4ICsgMSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGZvY3VzUHJldmlvdXNJdGVtID0gKCkgPT4ge1xuICAgIGlmIChmb2N1c0luZGV4ID09PSAwKSB7XG4gICAgICBmb2N1c0xhc3RJdGVtKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldEZvY3VzSW5kZXgoZm9jdXNJbmRleCAtIDEpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBnZXROb2RlID0gKGluZGV4OiBudW1iZXIpID0+IHtcbiAgICByZXR1cm4gbWVudUNvbnRhaW5lclJlZj8uY3VycmVudD8uY2hpbGROb2Rlc1tpbmRleF1cbiAgICAgIC5jaGlsZE5vZGVzWzBdIGFzIEhUTUxFbGVtZW50O1xuICB9O1xuXG4gIGNvbnN0IG1lbnVIYW5kbGVLZXlFdmVudHMgPSAoZXZlbnQ6IFJlYWN0LktleWJvYXJkRXZlbnQpID0+IHtcbiAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgY2FzZSBLRVlfQ09ERVMuSE9NRTpcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZm9jdXNGaXJzdEl0ZW0oKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEtFWV9DT0RFUy5FTkQ6XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGZvY3VzTGFzdEl0ZW0oKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEtFWV9DT0RFUy5SSUdIVDpcbiAgICAgICAgZm9jdXNOZXh0SXRlbSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgS0VZX0NPREVTLkxFRlQ6XG4gICAgICAgIGZvY3VzUHJldmlvdXNJdGVtKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBLRVlfQ09ERVMuVVA6XG4gICAgICBjYXNlIEtFWV9DT0RFUy5ET1dOOlxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGZpcnN0Tm9kZSA9IGdldE5vZGUoMCk7XG4gICAgY29uc3QgbmV4dE5vZGUgPSBnZXROb2RlKGZvY3VzSW5kZXgpO1xuXG4gICAgaWYgKGZpcnN0Tm9kZSAmJiBuZXh0Tm9kZSkge1xuICAgICAgaWYgKGlzQ29udGFpbmVyRm9jdXNlZCkge1xuICAgICAgICBpZiAoZm9jdXNJbmRleCA+PSAwICYmIGZvY3VzSW5kZXggPD0gaXRlbXNDb3VudCkge1xuICAgICAgICAgIG5leHROb2RlLmZvY3VzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmlyc3ROb2RlLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFpc0ZvY3VzZWQgJiYgIWlzQ29udGFpbmVyRm9jdXNlZCkge1xuICAgICAgICBpZiAoZm9jdXNJbmRleCAhPT0gMCkge1xuICAgICAgICAgIGZvY3VzRmlyc3RJdGVtKCk7XG4gICAgICAgICAgZmlyc3ROb2RlLmZvY3VzKCk7XG4gICAgICAgICAgZmlyc3ROb2RlLmJsdXIoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSwgW2ZvY3VzSW5kZXgsIGlzQ29udGFpbmVyRm9jdXNlZCwgaXNGb2N1c2VkLCBpdGVtc0NvdW50XSk7XG5cbiAgY29uc3QgbWFwSXRlbXNUb0VsZW1lbnQgPSA8VCBleHRlbmRzIEFwcEhlYWRlckl0ZW1bXT4oXG4gICAgaXRlbXM6IFQsXG4gICAgc2lkZTogJ2xlZnQnIHwgJ3JpZ2h0J1xuICApID0+IHtcbiAgICByZXR1cm4gaXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4gKFxuICAgICAgPEFwcEhlYWRlckxpc3RJdGVtXG4gICAgICAgIGtleT17aXRlbS5pZH1cbiAgICAgICAgbXI9ezh9XG4gICAgICAgIG1sPXtzaWRlID09PSAncmlnaHQnICYmIGluZGV4ID09PSAwID8gJ2F1dG8nIDogOH1cbiAgICAgICAgb25Gb2N1cz17KCkgPT4gc2V0SXNGb2N1c2VkKHRydWUpfVxuICAgICAgICBvbkJsdXI9eygpID0+IHNldElzRm9jdXNlZChmYWxzZSl9XG4gICAgICA+XG4gICAgICAgIHttYXBJdGVtVG9FbGVtZW50KGFjdGlvbiwgaXRlbSwgaXNBbm9uLCByZWRpcmVjdFBhcmFtKX1cbiAgICAgIDwvQXBwSGVhZGVyTGlzdEl0ZW0+XG4gICAgKSk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8SGVhZGVySGVpZ2h0QXJlYVxuICAgICAgZGlzcGxheT17eyBfOiAnbm9uZScsIFthcHBIZWFkZXJNb2JpbGVCcmVha3BvaW50XTogJ2Jsb2NrJyB9fVxuICAgICAgYXM9XCJuYXZcIlxuICAgICAgdGl0bGU9XCJNYWluIE5hdmlnYXRpb25cIlxuICAgID5cbiAgICAgIDxTdHlsZWRBcHBCYXI+XG4gICAgICAgIDxTdHlsZWRNZW51QmFyXG4gICAgICAgICAgcm9sZT1cIm1lbnViYXJcIlxuICAgICAgICAgIHJlZj17bWVudUNvbnRhaW5lclJlZn1cbiAgICAgICAgICBvbktleURvd249e21lbnVIYW5kbGVLZXlFdmVudHN9XG4gICAgICAgICAgb25Gb2N1cz17KCkgPT4gc2V0SXNDb250YWluZXJGb2N1c2VkKHRydWUpfVxuICAgICAgICAgIG9uQmx1cj17KCkgPT4gc2V0SXNDb250YWluZXJGb2N1c2VkKGZhbHNlKX1cbiAgICAgICAgPlxuICAgICAgICAgIHttYXBJdGVtc1RvRWxlbWVudChpdGVtcy5sZWZ0LCAnbGVmdCcpfVxuICAgICAgICAgIHttYXBJdGVtc1RvRWxlbWVudChyaWdodCwgJ3JpZ2h0Jyl9XG4gICAgICAgIDwvU3R5bGVkTWVudUJhcj5cbiAgICAgIDwvU3R5bGVkQXBwQmFyPlxuICAgICAge25vdGlmaWNhdGlvbnNWaWV3fVxuICAgICAge2Jvb2ttYXJrc0NvbnRlbnR9XG4gICAgICB7c2VhcmNoUGFuZX1cbiAgICA8L0hlYWRlckhlaWdodEFyZWE+XG4gICk7XG59O1xuIl19 */");
var KEY_CODES = {
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
  END: 'End',
  HOME: 'Home'
};
export var mapItemToElement = function mapItemToElement(action, item, isAnon, redirectParam, onKeyDown) {
  var mobile = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

  switch (item.type) {
    case 'logo':
      return /*#__PURE__*/React.createElement(AppHeaderLogo, {
        action: action,
        item: item
      });

    case 'link':
      return /*#__PURE__*/React.createElement(AppHeaderLink, {
        tabIndex: "-1",
        mx: 0,
        action: action,
        item: item
      });

    case 'dropdown':
    case 'profile-dropdown':
      return /*#__PURE__*/React.createElement(AppHeaderDropdown, {
        onKeyDown: onKeyDown,
        action: action,
        item: item
      });

    case 'catalog-dropdown':
      return /*#__PURE__*/React.createElement(AppHeaderCatalogDropdown, {
        action: action,
        item: item,
        isAnon: isAnon
      });

    case 'experimental-resources-dropdown':
      return /*#__PURE__*/React.createElement(AppHeaderResourcesDropdown, {
        action: action,
        item: item,
        isAnon: isAnon
      });

    case 'render-element':
      return item.renderElement();

    case 'text-button':
      return /*#__PURE__*/React.createElement(TextButton, {
        size: mobile ? 'small' : 'normal',
        onClick: function onClick(event) {
          return action(event, item);
        },
        "data-testid": item.dataTestId,
        tabIndex: "-1",
        role: "menuitem",
        href: item.redirect ? formatUrlWithRedirect(item.href, redirectParam) : item.href,
        variant: "interface"
      }, item.text);

    case 'fill-button':
      return /*#__PURE__*/React.createElement(FillButton, {
        size: mobile ? 'small' : 'normal',
        "data-testid": item.dataTestId,
        href: item.redirect ? formatUrlWithRedirect(item.href, redirectParam) : item.href,
        role: "menuitem",
        tabIndex: "-1",
        onClick: function onClick(event) {
          return action(event, item);
        },
        variant: "interface"
      }, item.text);
  }
};
export var AppHeader = function AppHeader(_ref) {
  var openCrossDeviceItemId = _ref.openCrossDeviceItemId,
      setOpenCrossDeviceItemId = _ref.setOpenCrossDeviceItemId,
      crossDeviceBookmarkParts = _ref.crossDeviceBookmarkParts,
      action = _ref.action,
      items = _ref.items,
      notifications = _ref.notifications,
      redirectParam = _ref.redirectParam,
      search = _ref.search,
      isAnon = _ref.isAnon;
  var menuContainerRef = useRef(null);

  var _useHeaderNotificatio = useHeaderNotifications({
    settings: notifications,
    Renderer: NotificationsPopover,
    openCrossDeviceItemId: openCrossDeviceItemId,
    setOpenCrossDeviceItemId: setOpenCrossDeviceItemId
  }),
      _useHeaderNotificatio2 = _slicedToArray(_useHeaderNotificatio, 2),
      notificationsBell = _useHeaderNotificatio2[0],
      notificationsView = _useHeaderNotificatio2[1];

  var _useHeaderSearch = useHeaderSearch(search),
      _useHeaderSearch2 = _slicedToArray(_useHeaderSearch, 2),
      searchButton = _useHeaderSearch2[0],
      searchPane = _useHeaderSearch2[1];

  var _useBookmarkComponent = useBookmarkComponentsPair({
    openCrossDeviceItemId: openCrossDeviceItemId,
    setOpenCrossDeviceItemId: setOpenCrossDeviceItemId,
    bookmarkParts: crossDeviceBookmarkParts,
    view: CrossDeviceBookmarksView.DESKTOP,
    isAnon: isAnon
  }),
      _useBookmarkComponent2 = _slicedToArray(_useBookmarkComponent, 2),
      bookmarksButton = _useBookmarkComponent2[0],
      bookmarksContent = _useBookmarkComponent2[1];

  var right = useMemo(function () {
    return [searchButton].concat(_toConsumableArray(notificationsBell ? [notificationsBell] : []), _toConsumableArray(bookmarksButton ? [bookmarksButton] : []), _toConsumableArray(items.right));
  }, [searchButton, notificationsBell, bookmarksButton, items]);
  var itemsCount = [].concat(_toConsumableArray(items.left), _toConsumableArray(right)).length - 1;

  var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      focusIndex = _useState2[0],
      setFocusIndex = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isFocused = _useState4[0],
      setIsFocused = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isContainerFocused = _useState6[0],
      setIsContainerFocused = _useState6[1];

  var focusFirstItem = function focusFirstItem() {
    return setFocusIndex(0);
  };

  var focusLastItem = function focusLastItem() {
    return setFocusIndex(itemsCount);
  };

  var focusNextItem = function focusNextItem() {
    if (focusIndex === itemsCount) {
      focusFirstItem();
    } else {
      setFocusIndex(focusIndex + 1);
    }
  };

  var focusPreviousItem = function focusPreviousItem() {
    if (focusIndex === 0) {
      focusLastItem();
    } else {
      setFocusIndex(focusIndex - 1);
    }
  };

  var getNode = function getNode(index) {
    var _menuContainerRef$cur;

    return menuContainerRef === null || menuContainerRef === void 0 ? void 0 : (_menuContainerRef$cur = menuContainerRef.current) === null || _menuContainerRef$cur === void 0 ? void 0 : _menuContainerRef$cur.childNodes[index].childNodes[0];
  };

  var menuHandleKeyEvents = function menuHandleKeyEvents(event) {
    switch (event.key) {
      case KEY_CODES.HOME:
        event.preventDefault();
        focusFirstItem();
        break;

      case KEY_CODES.END:
        event.preventDefault();
        focusLastItem();
        break;

      case KEY_CODES.RIGHT:
        focusNextItem();
        break;

      case KEY_CODES.LEFT:
        focusPreviousItem();
        break;

      case KEY_CODES.UP:
      case KEY_CODES.DOWN:
        event.preventDefault();
        break;

      default:
        break;
    }
  };

  useEffect(function () {
    var firstNode = getNode(0);
    var nextNode = getNode(focusIndex);

    if (firstNode && nextNode) {
      if (isContainerFocused) {
        if (focusIndex >= 0 && focusIndex <= itemsCount) {
          nextNode.focus();
        } else {
          firstNode.focus();
        }
      }

      if (!isFocused && !isContainerFocused) {
        if (focusIndex !== 0) {
          focusFirstItem();
          firstNode.focus();
          firstNode.blur();
        }
      }
    }
  }, [focusIndex, isContainerFocused, isFocused, itemsCount]);

  var mapItemsToElement = function mapItemsToElement(items, side) {
    return items.map(function (item, index) {
      return /*#__PURE__*/React.createElement(AppHeaderListItem, {
        key: item.id,
        mr: 8,
        ml: side === 'right' && index === 0 ? 'auto' : 8,
        onFocus: function onFocus() {
          return setIsFocused(true);
        },
        onBlur: function onBlur() {
          return setIsFocused(false);
        }
      }, mapItemToElement(action, item, isAnon, redirectParam));
    });
  };

  return /*#__PURE__*/React.createElement(HeaderHeightArea, {
    display: _defineProperty({
      _: 'none'
    }, appHeaderMobileBreakpoint, 'block'),
    as: "nav",
    title: "Main Navigation"
  }, /*#__PURE__*/React.createElement(StyledAppBar, null, /*#__PURE__*/React.createElement(StyledMenuBar, {
    role: "menubar",
    ref: menuContainerRef,
    onKeyDown: menuHandleKeyEvents,
    onFocus: function onFocus() {
      return setIsContainerFocused(true);
    },
    onBlur: function onBlur() {
      return setIsContainerFocused(false);
    }
  }, mapItemsToElement(items.left, 'left'), mapItemsToElement(right, 'right'))), notificationsView, bookmarksContent, searchPane);
};