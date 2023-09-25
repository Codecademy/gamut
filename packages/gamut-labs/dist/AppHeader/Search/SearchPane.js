import _styled from "@emotion/styled/base";
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { Box, ContentContainer, FlexBox, FocusTrap, Text, TextButton } from '@codecademy/gamut';
import { SearchIcon, SupportIcon } from '@codecademy/gamut-icons';
import { css } from '@codecademy/gamut-styles';
import { useTheme } from '@emotion/react';
import { camelCase } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import * as React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var searchTerms = ['Data Science', 'Python', 'Web Development', 'HTML', 'Java'];
var Form = Box.withComponent('form', {
  target: "e1tozppo3",
  label: "Form"
});
var Input = Box.withComponent('input', {
  target: "e1tozppo4",
  label: "Input"
});
var QueryContainer = /*#__PURE__*/_styled(ContentContainer, {
  target: "e1tozppo2",
  label: "QueryContainer"
})(css({
  display: 'flex',
  pb: 0,
  pt: 16,
  width: '100%'
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9BcHBIZWFkZXIvU2VhcmNoL1NlYXJjaFBhbmUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWlDdUIiLCJmaWxlIjoiLi4vLi4vLi4vc3JjL0FwcEhlYWRlci9TZWFyY2gvU2VhcmNoUGFuZS50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBCb3gsXG4gIENvbnRlbnRDb250YWluZXIsXG4gIEZsZXhCb3gsXG4gIEZvY3VzVHJhcCxcbiAgVGV4dCxcbiAgVGV4dEJ1dHRvbixcbn0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQnO1xuaW1wb3J0IHsgU2VhcmNoSWNvbiwgU3VwcG9ydEljb24gfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1pY29ucyc7XG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1zdHlsZXMnO1xuaW1wb3J0IHsgdXNlVGhlbWUgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBjYW1lbENhc2UgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgdHlwZSBTZWFyY2hQYW5lUHJvcHMgPSB7XG4gIG9uU2VhcmNoOiAocXVlcnk6IHN0cmluZykgPT4gdm9pZDtcbiAgb25UcmFja2luZ0NsaWNrOiAodGFyZ2V0OiBzdHJpbmcpID0+IHZvaWQ7XG4gIHRvZ2dsZVNlYXJjaDogKCkgPT4gdm9pZDtcbn07XG5cbmNvbnN0IHNlYXJjaFRlcm1zID0gW1xuICAnRGF0YSBTY2llbmNlJyxcbiAgJ1B5dGhvbicsXG4gICdXZWIgRGV2ZWxvcG1lbnQnLFxuICAnSFRNTCcsXG4gICdKYXZhJyxcbl07XG5cbmNvbnN0IEZvcm0gPSBCb3gud2l0aENvbXBvbmVudCgnZm9ybScpO1xuY29uc3QgSW5wdXQgPSBCb3gud2l0aENvbXBvbmVudCgnaW5wdXQnKTtcblxuY29uc3QgUXVlcnlDb250YWluZXIgPSBzdHlsZWQoQ29udGVudENvbnRhaW5lcikoXG4gIGNzcyh7XG4gICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgIHBiOiAwLFxuICAgIHB0OiAxNixcbiAgICB3aWR0aDogJzEwMCUnLFxuICB9KVxuKTtcblxuY29uc3QgU3VnZ2VzdGlvbkNvbnRhaW5lciA9IHN0eWxlZChDb250ZW50Q29udGFpbmVyKShcbiAgY3NzKHtcbiAgICBwYjogMjQsXG4gICAgcHQ6IDE2LFxuICB9KVxuKTtcblxuY29uc3QgU3R5bGVkSW5wdXQgPSBzdHlsZWQoSW5wdXQpKFxuICBjc3Moe1xuICAgIG91dGxpbmU6IGBub25lYCxcbiAgfSlcbik7XG5cbmV4cG9ydCBjb25zdCBTZWFyY2hQYW5lOiBSZWFjdC5GQzxTZWFyY2hQYW5lUHJvcHM+ID0gKHtcbiAgb25TZWFyY2gsXG4gIG9uVHJhY2tpbmdDbGljayxcbiAgdG9nZ2xlU2VhcmNoLFxufSkgPT4ge1xuICBjb25zdCB0aGVtZSA9IHVzZVRoZW1lKCk7XG4gIGNvbnN0IFt2YWx1ZSwgc2V0VmFsdWVdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBzZWFyY2hFbGVtZW50UmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50PihudWxsKTtcbiAgY29uc3QgaW5wdXRSZWYgPSB1c2VSZWY8SFRNTElucHV0RWxlbWVudD4obnVsbCk7XG5cbiAgY29uc3QgaGFuZGxlT3V0c2lkZUNsaWNrID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldCBhcyBFbGVtZW50O1xuICAgIGlmIChcbiAgICAgIHNlYXJjaEVsZW1lbnRSZWYuY3VycmVudD8uY29udGFpbnModGFyZ2V0KSB8fFxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtdGVzdGlkPVwiaGVhZGVyLXNlYXJjaFwiXScpPy5jb250YWlucyh0YXJnZXQpXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdG9nZ2xlU2VhcmNoKCk7XG4gIH07XG5cbiAgY29uc3QgbmF2aWdhdGVUb1NlYXJjaCA9IChzZWFyY2hUZXJtOiBzdHJpbmcpID0+IHtcbiAgICBvblNlYXJjaChzZWFyY2hUZXJtKTtcbiAgICB0b2dnbGVTZWFyY2goKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVDaGFuZ2U6IFJlYWN0LkNoYW5nZUV2ZW50SGFuZGxlcjxIVE1MSW5wdXRFbGVtZW50PiA9IChldmVudCkgPT4ge1xuICAgIHNldFZhbHVlKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU3VibWl0OiBSZWFjdC5Gb3JtRXZlbnRIYW5kbGVyID0gKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBuYXZpZ2F0ZVRvU2VhcmNoKHZhbHVlKTtcbiAgfTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlucHV0UmVmLmN1cnJlbnQ/LmZvY3VzKCk7XG4gIH0sIFtdKTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8Qm94XG4gICAgICAgIGFyaWEtaGlkZGVuXG4gICAgICAgIGJnPVwic2hhZG93LWJsYWNrLXNsaWdodFwiXG4gICAgICAgIGhlaWdodD1cIjEwMCVcIlxuICAgICAgICBvbkNsaWNrPXt0b2dnbGVTZWFyY2h9XG4gICAgICAgIHBvc2l0aW9uPVwiZml4ZWRcIlxuICAgICAgICAvLyBXZSBhZGQgNXJlbSBoZXJlIGluIGNhc2UgdGhlcmUncyBzb21lIHNvcnQgb2YgYnJhbmRlZCBiYW5uZXIgYWJvdmUgc2VhcmNoXG4gICAgICAgIC8vIFRoZSBzZWFyY2ggYXJlYSBpcyBtdWNoIHRhbGxlciB0aGFuIDVyZW0gc28gdGhpcyBpcyBhIHNhZmUgYW1vdW50IG9mIHBhZGRpbmdcbiAgICAgICAgdG9wPXtgY2FsYygke3RoZW1lLmVsZW1lbnRzLmhlYWRlckhlaWdodH0gKyA1cmVtKWB9XG4gICAgICAgIHdpZHRoPXsxfVxuICAgICAgLz5cbiAgICAgIDxGb2N1c1RyYXBcbiAgICAgICAgb25DbGlja091dHNpZGU9e2hhbmRsZU91dHNpZGVDbGlja31cbiAgICAgICAgb25Fc2NhcGVLZXk9e3RvZ2dsZVNlYXJjaH1cbiAgICAgICAgYWxsb3dQYWdlSW50ZXJhY3Rpb25cbiAgICAgID5cbiAgICAgICAgPEJveFxuICAgICAgICAgIGJnPVwiYmFja2dyb3VuZFwiXG4gICAgICAgICAgYm9yZGVyQ29sb3JCb3R0b209XCJ0ZXh0XCJcbiAgICAgICAgICBib3JkZXJDb2xvclRvcD1cInNoYWRvdy1zb2xpZFwiXG4gICAgICAgICAgYm9yZGVyU3R5bGU9XCJzb2xpZFwiXG4gICAgICAgICAgYm9yZGVyV2lkdGg9XCIycHggMCAxcHhcIlxuICAgICAgICAgIGRhdGEtdGVzdGlkPVwiaGVhZGVyLXNlYXJjaC1kcm9wZG93blwiXG4gICAgICAgICAgcG9zaXRpb249XCJhYnNvbHV0ZVwiXG4gICAgICAgICAgcmVmPXtzZWFyY2hFbGVtZW50UmVmfVxuICAgICAgICAgIHdpZHRoPVwiMTAwJVwiXG4gICAgICAgID5cbiAgICAgICAgICA8Qm94IGJvcmRlcj1cIm5vbmVcIiB3aWR0aD1cImF1dG9cIj5cbiAgICAgICAgICAgIDxRdWVyeUNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgPEZsZXhCb3hcbiAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zPVwiYmFzZWxpbmVcIlxuICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yPVwiZ3JheS02MDBcIlxuICAgICAgICAgICAgICAgIGJvcmRlclN0eWxlQm90dG9tPVwic29saWRcIlxuICAgICAgICAgICAgICAgIGJvcmRlcldpZHRoQm90dG9tPVwiMXB4XCJcbiAgICAgICAgICAgICAgICB3aWR0aD1cIjEwMCVcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPFNlYXJjaEljb24gY29sb3I9XCJncmF5LTYwMFwiIGhlaWdodD17MjR9IHdpZHRoPXsyNH0gLz5cbiAgICAgICAgICAgICAgICA8Rm9ybVxuICAgICAgICAgICAgICAgICAgYWN0aW9uPVwiL3NlYXJjaFwiXG4gICAgICAgICAgICAgICAgICBpZD1cInNlYXJjaC1mb3JtXCJcbiAgICAgICAgICAgICAgICAgIG1sPXs4fVxuICAgICAgICAgICAgICAgICAgb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH1cbiAgICAgICAgICAgICAgICAgIHdpZHRoPVwiMTAwJVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPFN0eWxlZElucHV0XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ9XCJub25lXCJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyPVwibm9uZVwiXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgIGZvbnRTaXplPXszNH1cbiAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodD1cImJvbGRcIlxuICAgICAgICAgICAgICAgICAgICBpZD1cImhlYWRlci1zZWFyY2gtYmFyXCJcbiAgICAgICAgICAgICAgICAgICAgbmFtZT1cInF1ZXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXsoZXZlbnQpID0+IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpfVxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaCBvdXIgY2F0YWxvZ1wiXG4gICAgICAgICAgICAgICAgICAgIHJlZj17aW5wdXRSZWZ9XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJzZWFyY2hcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoPVwiMTAwJVwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvRm9ybT5cbiAgICAgICAgICAgICAgPC9GbGV4Qm94PlxuICAgICAgICAgICAgPC9RdWVyeUNvbnRhaW5lcj5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgICA8U3VnZ2VzdGlvbkNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxUZXh0IGFzPVwiaDNcIiBmb250U2l6ZT17MjB9IG15PXsxNn0+XG4gICAgICAgICAgICAgIFBvcHVsYXIgU2VhcmNoZXNcbiAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgIDxGbGV4Qm94IGp1c3RpZnlDb250ZW50PVwic3BhY2UtYmV0d2VlblwiPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIHtzZWFyY2hUZXJtcy5tYXAoKHNlYXJjaFRlcm0pID0+IChcbiAgICAgICAgICAgICAgICAgIDxUZXh0QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHJvbGU9XCJsaW5rXCJcbiAgICAgICAgICAgICAgICAgICAgbXI9ezE2fVxuICAgICAgICAgICAgICAgICAgICBrZXk9e3NlYXJjaFRlcm19XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0ZVRvU2VhcmNoKHNlYXJjaFRlcm0pO1xuICAgICAgICAgICAgICAgICAgICAgIG9uVHJhY2tpbmdDbGljayhcbiAgICAgICAgICAgICAgICAgICAgICAgIGBwb3B1bGFyX3NlYXJjaF90ZXJtXyR7Y2FtZWxDYXNlKHNlYXJjaFRlcm0pfWBcbiAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7c2VhcmNoVGVybX1cbiAgICAgICAgICAgICAgICAgIDwvVGV4dEJ1dHRvbj5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxUZXh0QnV0dG9uXG4gICAgICAgICAgICAgICAgaHJlZj1cIi9oZWxwXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblRyYWNraW5nQ2xpY2soJ2hlbHBfY2VudGVyJyl9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8U3VwcG9ydEljb24gbXI9ezh9IHNpemU9ezIwfSAvPiBIZWxwIENlbnRlclxuICAgICAgICAgICAgICA8L1RleHRCdXR0b24+XG4gICAgICAgICAgICA8L0ZsZXhCb3g+XG4gICAgICAgICAgPC9TdWdnZXN0aW9uQ29udGFpbmVyPlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvRm9jdXNUcmFwPlxuICAgIDwvPlxuICApO1xufTtcbiJdfQ== */");
var SuggestionContainer = /*#__PURE__*/_styled(ContentContainer, {
  target: "e1tozppo1",
  label: "SuggestionContainer"
})(css({
  pb: 24,
  pt: 16
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9BcHBIZWFkZXIvU2VhcmNoL1NlYXJjaFBhbmUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTBDNEIiLCJmaWxlIjoiLi4vLi4vLi4vc3JjL0FwcEhlYWRlci9TZWFyY2gvU2VhcmNoUGFuZS50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBCb3gsXG4gIENvbnRlbnRDb250YWluZXIsXG4gIEZsZXhCb3gsXG4gIEZvY3VzVHJhcCxcbiAgVGV4dCxcbiAgVGV4dEJ1dHRvbixcbn0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQnO1xuaW1wb3J0IHsgU2VhcmNoSWNvbiwgU3VwcG9ydEljb24gfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1pY29ucyc7XG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1zdHlsZXMnO1xuaW1wb3J0IHsgdXNlVGhlbWUgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBjYW1lbENhc2UgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgdHlwZSBTZWFyY2hQYW5lUHJvcHMgPSB7XG4gIG9uU2VhcmNoOiAocXVlcnk6IHN0cmluZykgPT4gdm9pZDtcbiAgb25UcmFja2luZ0NsaWNrOiAodGFyZ2V0OiBzdHJpbmcpID0+IHZvaWQ7XG4gIHRvZ2dsZVNlYXJjaDogKCkgPT4gdm9pZDtcbn07XG5cbmNvbnN0IHNlYXJjaFRlcm1zID0gW1xuICAnRGF0YSBTY2llbmNlJyxcbiAgJ1B5dGhvbicsXG4gICdXZWIgRGV2ZWxvcG1lbnQnLFxuICAnSFRNTCcsXG4gICdKYXZhJyxcbl07XG5cbmNvbnN0IEZvcm0gPSBCb3gud2l0aENvbXBvbmVudCgnZm9ybScpO1xuY29uc3QgSW5wdXQgPSBCb3gud2l0aENvbXBvbmVudCgnaW5wdXQnKTtcblxuY29uc3QgUXVlcnlDb250YWluZXIgPSBzdHlsZWQoQ29udGVudENvbnRhaW5lcikoXG4gIGNzcyh7XG4gICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgIHBiOiAwLFxuICAgIHB0OiAxNixcbiAgICB3aWR0aDogJzEwMCUnLFxuICB9KVxuKTtcblxuY29uc3QgU3VnZ2VzdGlvbkNvbnRhaW5lciA9IHN0eWxlZChDb250ZW50Q29udGFpbmVyKShcbiAgY3NzKHtcbiAgICBwYjogMjQsXG4gICAgcHQ6IDE2LFxuICB9KVxuKTtcblxuY29uc3QgU3R5bGVkSW5wdXQgPSBzdHlsZWQoSW5wdXQpKFxuICBjc3Moe1xuICAgIG91dGxpbmU6IGBub25lYCxcbiAgfSlcbik7XG5cbmV4cG9ydCBjb25zdCBTZWFyY2hQYW5lOiBSZWFjdC5GQzxTZWFyY2hQYW5lUHJvcHM+ID0gKHtcbiAgb25TZWFyY2gsXG4gIG9uVHJhY2tpbmdDbGljayxcbiAgdG9nZ2xlU2VhcmNoLFxufSkgPT4ge1xuICBjb25zdCB0aGVtZSA9IHVzZVRoZW1lKCk7XG4gIGNvbnN0IFt2YWx1ZSwgc2V0VmFsdWVdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBzZWFyY2hFbGVtZW50UmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50PihudWxsKTtcbiAgY29uc3QgaW5wdXRSZWYgPSB1c2VSZWY8SFRNTElucHV0RWxlbWVudD4obnVsbCk7XG5cbiAgY29uc3QgaGFuZGxlT3V0c2lkZUNsaWNrID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldCBhcyBFbGVtZW50O1xuICAgIGlmIChcbiAgICAgIHNlYXJjaEVsZW1lbnRSZWYuY3VycmVudD8uY29udGFpbnModGFyZ2V0KSB8fFxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtdGVzdGlkPVwiaGVhZGVyLXNlYXJjaFwiXScpPy5jb250YWlucyh0YXJnZXQpXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdG9nZ2xlU2VhcmNoKCk7XG4gIH07XG5cbiAgY29uc3QgbmF2aWdhdGVUb1NlYXJjaCA9IChzZWFyY2hUZXJtOiBzdHJpbmcpID0+IHtcbiAgICBvblNlYXJjaChzZWFyY2hUZXJtKTtcbiAgICB0b2dnbGVTZWFyY2goKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVDaGFuZ2U6IFJlYWN0LkNoYW5nZUV2ZW50SGFuZGxlcjxIVE1MSW5wdXRFbGVtZW50PiA9IChldmVudCkgPT4ge1xuICAgIHNldFZhbHVlKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU3VibWl0OiBSZWFjdC5Gb3JtRXZlbnRIYW5kbGVyID0gKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBuYXZpZ2F0ZVRvU2VhcmNoKHZhbHVlKTtcbiAgfTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlucHV0UmVmLmN1cnJlbnQ/LmZvY3VzKCk7XG4gIH0sIFtdKTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8Qm94XG4gICAgICAgIGFyaWEtaGlkZGVuXG4gICAgICAgIGJnPVwic2hhZG93LWJsYWNrLXNsaWdodFwiXG4gICAgICAgIGhlaWdodD1cIjEwMCVcIlxuICAgICAgICBvbkNsaWNrPXt0b2dnbGVTZWFyY2h9XG4gICAgICAgIHBvc2l0aW9uPVwiZml4ZWRcIlxuICAgICAgICAvLyBXZSBhZGQgNXJlbSBoZXJlIGluIGNhc2UgdGhlcmUncyBzb21lIHNvcnQgb2YgYnJhbmRlZCBiYW5uZXIgYWJvdmUgc2VhcmNoXG4gICAgICAgIC8vIFRoZSBzZWFyY2ggYXJlYSBpcyBtdWNoIHRhbGxlciB0aGFuIDVyZW0gc28gdGhpcyBpcyBhIHNhZmUgYW1vdW50IG9mIHBhZGRpbmdcbiAgICAgICAgdG9wPXtgY2FsYygke3RoZW1lLmVsZW1lbnRzLmhlYWRlckhlaWdodH0gKyA1cmVtKWB9XG4gICAgICAgIHdpZHRoPXsxfVxuICAgICAgLz5cbiAgICAgIDxGb2N1c1RyYXBcbiAgICAgICAgb25DbGlja091dHNpZGU9e2hhbmRsZU91dHNpZGVDbGlja31cbiAgICAgICAgb25Fc2NhcGVLZXk9e3RvZ2dsZVNlYXJjaH1cbiAgICAgICAgYWxsb3dQYWdlSW50ZXJhY3Rpb25cbiAgICAgID5cbiAgICAgICAgPEJveFxuICAgICAgICAgIGJnPVwiYmFja2dyb3VuZFwiXG4gICAgICAgICAgYm9yZGVyQ29sb3JCb3R0b209XCJ0ZXh0XCJcbiAgICAgICAgICBib3JkZXJDb2xvclRvcD1cInNoYWRvdy1zb2xpZFwiXG4gICAgICAgICAgYm9yZGVyU3R5bGU9XCJzb2xpZFwiXG4gICAgICAgICAgYm9yZGVyV2lkdGg9XCIycHggMCAxcHhcIlxuICAgICAgICAgIGRhdGEtdGVzdGlkPVwiaGVhZGVyLXNlYXJjaC1kcm9wZG93blwiXG4gICAgICAgICAgcG9zaXRpb249XCJhYnNvbHV0ZVwiXG4gICAgICAgICAgcmVmPXtzZWFyY2hFbGVtZW50UmVmfVxuICAgICAgICAgIHdpZHRoPVwiMTAwJVwiXG4gICAgICAgID5cbiAgICAgICAgICA8Qm94IGJvcmRlcj1cIm5vbmVcIiB3aWR0aD1cImF1dG9cIj5cbiAgICAgICAgICAgIDxRdWVyeUNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgPEZsZXhCb3hcbiAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zPVwiYmFzZWxpbmVcIlxuICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yPVwiZ3JheS02MDBcIlxuICAgICAgICAgICAgICAgIGJvcmRlclN0eWxlQm90dG9tPVwic29saWRcIlxuICAgICAgICAgICAgICAgIGJvcmRlcldpZHRoQm90dG9tPVwiMXB4XCJcbiAgICAgICAgICAgICAgICB3aWR0aD1cIjEwMCVcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPFNlYXJjaEljb24gY29sb3I9XCJncmF5LTYwMFwiIGhlaWdodD17MjR9IHdpZHRoPXsyNH0gLz5cbiAgICAgICAgICAgICAgICA8Rm9ybVxuICAgICAgICAgICAgICAgICAgYWN0aW9uPVwiL3NlYXJjaFwiXG4gICAgICAgICAgICAgICAgICBpZD1cInNlYXJjaC1mb3JtXCJcbiAgICAgICAgICAgICAgICAgIG1sPXs4fVxuICAgICAgICAgICAgICAgICAgb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH1cbiAgICAgICAgICAgICAgICAgIHdpZHRoPVwiMTAwJVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPFN0eWxlZElucHV0XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ9XCJub25lXCJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyPVwibm9uZVwiXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgIGZvbnRTaXplPXszNH1cbiAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodD1cImJvbGRcIlxuICAgICAgICAgICAgICAgICAgICBpZD1cImhlYWRlci1zZWFyY2gtYmFyXCJcbiAgICAgICAgICAgICAgICAgICAgbmFtZT1cInF1ZXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXsoZXZlbnQpID0+IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpfVxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaCBvdXIgY2F0YWxvZ1wiXG4gICAgICAgICAgICAgICAgICAgIHJlZj17aW5wdXRSZWZ9XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJzZWFyY2hcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoPVwiMTAwJVwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvRm9ybT5cbiAgICAgICAgICAgICAgPC9GbGV4Qm94PlxuICAgICAgICAgICAgPC9RdWVyeUNvbnRhaW5lcj5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgICA8U3VnZ2VzdGlvbkNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxUZXh0IGFzPVwiaDNcIiBmb250U2l6ZT17MjB9IG15PXsxNn0+XG4gICAgICAgICAgICAgIFBvcHVsYXIgU2VhcmNoZXNcbiAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgIDxGbGV4Qm94IGp1c3RpZnlDb250ZW50PVwic3BhY2UtYmV0d2VlblwiPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIHtzZWFyY2hUZXJtcy5tYXAoKHNlYXJjaFRlcm0pID0+IChcbiAgICAgICAgICAgICAgICAgIDxUZXh0QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHJvbGU9XCJsaW5rXCJcbiAgICAgICAgICAgICAgICAgICAgbXI9ezE2fVxuICAgICAgICAgICAgICAgICAgICBrZXk9e3NlYXJjaFRlcm19XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0ZVRvU2VhcmNoKHNlYXJjaFRlcm0pO1xuICAgICAgICAgICAgICAgICAgICAgIG9uVHJhY2tpbmdDbGljayhcbiAgICAgICAgICAgICAgICAgICAgICAgIGBwb3B1bGFyX3NlYXJjaF90ZXJtXyR7Y2FtZWxDYXNlKHNlYXJjaFRlcm0pfWBcbiAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7c2VhcmNoVGVybX1cbiAgICAgICAgICAgICAgICAgIDwvVGV4dEJ1dHRvbj5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxUZXh0QnV0dG9uXG4gICAgICAgICAgICAgICAgaHJlZj1cIi9oZWxwXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblRyYWNraW5nQ2xpY2soJ2hlbHBfY2VudGVyJyl9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8U3VwcG9ydEljb24gbXI9ezh9IHNpemU9ezIwfSAvPiBIZWxwIENlbnRlclxuICAgICAgICAgICAgICA8L1RleHRCdXR0b24+XG4gICAgICAgICAgICA8L0ZsZXhCb3g+XG4gICAgICAgICAgPC9TdWdnZXN0aW9uQ29udGFpbmVyPlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvRm9jdXNUcmFwPlxuICAgIDwvPlxuICApO1xufTtcbiJdfQ== */");
var StyledInput = /*#__PURE__*/_styled(Input, {
  target: "e1tozppo0",
  label: "StyledInput"
})(css({
  outline: "none"
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9BcHBIZWFkZXIvU2VhcmNoL1NlYXJjaFBhbmUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWlEb0IiLCJmaWxlIjoiLi4vLi4vLi4vc3JjL0FwcEhlYWRlci9TZWFyY2gvU2VhcmNoUGFuZS50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBCb3gsXG4gIENvbnRlbnRDb250YWluZXIsXG4gIEZsZXhCb3gsXG4gIEZvY3VzVHJhcCxcbiAgVGV4dCxcbiAgVGV4dEJ1dHRvbixcbn0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQnO1xuaW1wb3J0IHsgU2VhcmNoSWNvbiwgU3VwcG9ydEljb24gfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1pY29ucyc7XG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1zdHlsZXMnO1xuaW1wb3J0IHsgdXNlVGhlbWUgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBjYW1lbENhc2UgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgdHlwZSBTZWFyY2hQYW5lUHJvcHMgPSB7XG4gIG9uU2VhcmNoOiAocXVlcnk6IHN0cmluZykgPT4gdm9pZDtcbiAgb25UcmFja2luZ0NsaWNrOiAodGFyZ2V0OiBzdHJpbmcpID0+IHZvaWQ7XG4gIHRvZ2dsZVNlYXJjaDogKCkgPT4gdm9pZDtcbn07XG5cbmNvbnN0IHNlYXJjaFRlcm1zID0gW1xuICAnRGF0YSBTY2llbmNlJyxcbiAgJ1B5dGhvbicsXG4gICdXZWIgRGV2ZWxvcG1lbnQnLFxuICAnSFRNTCcsXG4gICdKYXZhJyxcbl07XG5cbmNvbnN0IEZvcm0gPSBCb3gud2l0aENvbXBvbmVudCgnZm9ybScpO1xuY29uc3QgSW5wdXQgPSBCb3gud2l0aENvbXBvbmVudCgnaW5wdXQnKTtcblxuY29uc3QgUXVlcnlDb250YWluZXIgPSBzdHlsZWQoQ29udGVudENvbnRhaW5lcikoXG4gIGNzcyh7XG4gICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgIHBiOiAwLFxuICAgIHB0OiAxNixcbiAgICB3aWR0aDogJzEwMCUnLFxuICB9KVxuKTtcblxuY29uc3QgU3VnZ2VzdGlvbkNvbnRhaW5lciA9IHN0eWxlZChDb250ZW50Q29udGFpbmVyKShcbiAgY3NzKHtcbiAgICBwYjogMjQsXG4gICAgcHQ6IDE2LFxuICB9KVxuKTtcblxuY29uc3QgU3R5bGVkSW5wdXQgPSBzdHlsZWQoSW5wdXQpKFxuICBjc3Moe1xuICAgIG91dGxpbmU6IGBub25lYCxcbiAgfSlcbik7XG5cbmV4cG9ydCBjb25zdCBTZWFyY2hQYW5lOiBSZWFjdC5GQzxTZWFyY2hQYW5lUHJvcHM+ID0gKHtcbiAgb25TZWFyY2gsXG4gIG9uVHJhY2tpbmdDbGljayxcbiAgdG9nZ2xlU2VhcmNoLFxufSkgPT4ge1xuICBjb25zdCB0aGVtZSA9IHVzZVRoZW1lKCk7XG4gIGNvbnN0IFt2YWx1ZSwgc2V0VmFsdWVdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBzZWFyY2hFbGVtZW50UmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50PihudWxsKTtcbiAgY29uc3QgaW5wdXRSZWYgPSB1c2VSZWY8SFRNTElucHV0RWxlbWVudD4obnVsbCk7XG5cbiAgY29uc3QgaGFuZGxlT3V0c2lkZUNsaWNrID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldCBhcyBFbGVtZW50O1xuICAgIGlmIChcbiAgICAgIHNlYXJjaEVsZW1lbnRSZWYuY3VycmVudD8uY29udGFpbnModGFyZ2V0KSB8fFxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtdGVzdGlkPVwiaGVhZGVyLXNlYXJjaFwiXScpPy5jb250YWlucyh0YXJnZXQpXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdG9nZ2xlU2VhcmNoKCk7XG4gIH07XG5cbiAgY29uc3QgbmF2aWdhdGVUb1NlYXJjaCA9IChzZWFyY2hUZXJtOiBzdHJpbmcpID0+IHtcbiAgICBvblNlYXJjaChzZWFyY2hUZXJtKTtcbiAgICB0b2dnbGVTZWFyY2goKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVDaGFuZ2U6IFJlYWN0LkNoYW5nZUV2ZW50SGFuZGxlcjxIVE1MSW5wdXRFbGVtZW50PiA9IChldmVudCkgPT4ge1xuICAgIHNldFZhbHVlKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU3VibWl0OiBSZWFjdC5Gb3JtRXZlbnRIYW5kbGVyID0gKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBuYXZpZ2F0ZVRvU2VhcmNoKHZhbHVlKTtcbiAgfTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlucHV0UmVmLmN1cnJlbnQ/LmZvY3VzKCk7XG4gIH0sIFtdKTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8Qm94XG4gICAgICAgIGFyaWEtaGlkZGVuXG4gICAgICAgIGJnPVwic2hhZG93LWJsYWNrLXNsaWdodFwiXG4gICAgICAgIGhlaWdodD1cIjEwMCVcIlxuICAgICAgICBvbkNsaWNrPXt0b2dnbGVTZWFyY2h9XG4gICAgICAgIHBvc2l0aW9uPVwiZml4ZWRcIlxuICAgICAgICAvLyBXZSBhZGQgNXJlbSBoZXJlIGluIGNhc2UgdGhlcmUncyBzb21lIHNvcnQgb2YgYnJhbmRlZCBiYW5uZXIgYWJvdmUgc2VhcmNoXG4gICAgICAgIC8vIFRoZSBzZWFyY2ggYXJlYSBpcyBtdWNoIHRhbGxlciB0aGFuIDVyZW0gc28gdGhpcyBpcyBhIHNhZmUgYW1vdW50IG9mIHBhZGRpbmdcbiAgICAgICAgdG9wPXtgY2FsYygke3RoZW1lLmVsZW1lbnRzLmhlYWRlckhlaWdodH0gKyA1cmVtKWB9XG4gICAgICAgIHdpZHRoPXsxfVxuICAgICAgLz5cbiAgICAgIDxGb2N1c1RyYXBcbiAgICAgICAgb25DbGlja091dHNpZGU9e2hhbmRsZU91dHNpZGVDbGlja31cbiAgICAgICAgb25Fc2NhcGVLZXk9e3RvZ2dsZVNlYXJjaH1cbiAgICAgICAgYWxsb3dQYWdlSW50ZXJhY3Rpb25cbiAgICAgID5cbiAgICAgICAgPEJveFxuICAgICAgICAgIGJnPVwiYmFja2dyb3VuZFwiXG4gICAgICAgICAgYm9yZGVyQ29sb3JCb3R0b209XCJ0ZXh0XCJcbiAgICAgICAgICBib3JkZXJDb2xvclRvcD1cInNoYWRvdy1zb2xpZFwiXG4gICAgICAgICAgYm9yZGVyU3R5bGU9XCJzb2xpZFwiXG4gICAgICAgICAgYm9yZGVyV2lkdGg9XCIycHggMCAxcHhcIlxuICAgICAgICAgIGRhdGEtdGVzdGlkPVwiaGVhZGVyLXNlYXJjaC1kcm9wZG93blwiXG4gICAgICAgICAgcG9zaXRpb249XCJhYnNvbHV0ZVwiXG4gICAgICAgICAgcmVmPXtzZWFyY2hFbGVtZW50UmVmfVxuICAgICAgICAgIHdpZHRoPVwiMTAwJVwiXG4gICAgICAgID5cbiAgICAgICAgICA8Qm94IGJvcmRlcj1cIm5vbmVcIiB3aWR0aD1cImF1dG9cIj5cbiAgICAgICAgICAgIDxRdWVyeUNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgPEZsZXhCb3hcbiAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zPVwiYmFzZWxpbmVcIlxuICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yPVwiZ3JheS02MDBcIlxuICAgICAgICAgICAgICAgIGJvcmRlclN0eWxlQm90dG9tPVwic29saWRcIlxuICAgICAgICAgICAgICAgIGJvcmRlcldpZHRoQm90dG9tPVwiMXB4XCJcbiAgICAgICAgICAgICAgICB3aWR0aD1cIjEwMCVcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPFNlYXJjaEljb24gY29sb3I9XCJncmF5LTYwMFwiIGhlaWdodD17MjR9IHdpZHRoPXsyNH0gLz5cbiAgICAgICAgICAgICAgICA8Rm9ybVxuICAgICAgICAgICAgICAgICAgYWN0aW9uPVwiL3NlYXJjaFwiXG4gICAgICAgICAgICAgICAgICBpZD1cInNlYXJjaC1mb3JtXCJcbiAgICAgICAgICAgICAgICAgIG1sPXs4fVxuICAgICAgICAgICAgICAgICAgb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH1cbiAgICAgICAgICAgICAgICAgIHdpZHRoPVwiMTAwJVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPFN0eWxlZElucHV0XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ9XCJub25lXCJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyPVwibm9uZVwiXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgIGZvbnRTaXplPXszNH1cbiAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodD1cImJvbGRcIlxuICAgICAgICAgICAgICAgICAgICBpZD1cImhlYWRlci1zZWFyY2gtYmFyXCJcbiAgICAgICAgICAgICAgICAgICAgbmFtZT1cInF1ZXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXsoZXZlbnQpID0+IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpfVxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaCBvdXIgY2F0YWxvZ1wiXG4gICAgICAgICAgICAgICAgICAgIHJlZj17aW5wdXRSZWZ9XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJzZWFyY2hcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoPVwiMTAwJVwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvRm9ybT5cbiAgICAgICAgICAgICAgPC9GbGV4Qm94PlxuICAgICAgICAgICAgPC9RdWVyeUNvbnRhaW5lcj5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgICA8U3VnZ2VzdGlvbkNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxUZXh0IGFzPVwiaDNcIiBmb250U2l6ZT17MjB9IG15PXsxNn0+XG4gICAgICAgICAgICAgIFBvcHVsYXIgU2VhcmNoZXNcbiAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgIDxGbGV4Qm94IGp1c3RpZnlDb250ZW50PVwic3BhY2UtYmV0d2VlblwiPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIHtzZWFyY2hUZXJtcy5tYXAoKHNlYXJjaFRlcm0pID0+IChcbiAgICAgICAgICAgICAgICAgIDxUZXh0QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHJvbGU9XCJsaW5rXCJcbiAgICAgICAgICAgICAgICAgICAgbXI9ezE2fVxuICAgICAgICAgICAgICAgICAgICBrZXk9e3NlYXJjaFRlcm19XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0ZVRvU2VhcmNoKHNlYXJjaFRlcm0pO1xuICAgICAgICAgICAgICAgICAgICAgIG9uVHJhY2tpbmdDbGljayhcbiAgICAgICAgICAgICAgICAgICAgICAgIGBwb3B1bGFyX3NlYXJjaF90ZXJtXyR7Y2FtZWxDYXNlKHNlYXJjaFRlcm0pfWBcbiAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7c2VhcmNoVGVybX1cbiAgICAgICAgICAgICAgICAgIDwvVGV4dEJ1dHRvbj5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxUZXh0QnV0dG9uXG4gICAgICAgICAgICAgICAgaHJlZj1cIi9oZWxwXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblRyYWNraW5nQ2xpY2soJ2hlbHBfY2VudGVyJyl9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8U3VwcG9ydEljb24gbXI9ezh9IHNpemU9ezIwfSAvPiBIZWxwIENlbnRlclxuICAgICAgICAgICAgICA8L1RleHRCdXR0b24+XG4gICAgICAgICAgICA8L0ZsZXhCb3g+XG4gICAgICAgICAgPC9TdWdnZXN0aW9uQ29udGFpbmVyPlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvRm9jdXNUcmFwPlxuICAgIDwvPlxuICApO1xufTtcbiJdfQ== */");
export var SearchPane = function SearchPane(_ref) {
  var onSearch = _ref.onSearch,
    onTrackingClick = _ref.onTrackingClick,
    toggleSearch = _ref.toggleSearch;
  var theme = useTheme();
  var _useState = useState(''),
    _useState2 = _slicedToArray(_useState, 2),
    value = _useState2[0],
    setValue = _useState2[1];
  var searchElementRef = useRef(null);
  var inputRef = useRef(null);
  var handleOutsideClick = function handleOutsideClick(e) {
    var _searchElementRef$cur, _document$querySelect;
    var target = e.target;
    if ((_searchElementRef$cur = searchElementRef.current) !== null && _searchElementRef$cur !== void 0 && _searchElementRef$cur.contains(target) || (_document$querySelect = document.querySelector('[data-testid="header-search"]')) !== null && _document$querySelect !== void 0 && _document$querySelect.contains(target)) {
      return;
    }
    toggleSearch();
  };
  var navigateToSearch = function navigateToSearch(searchTerm) {
    onSearch(searchTerm);
    toggleSearch();
  };
  var handleChange = function handleChange(event) {
    setValue(event.target.value);
  };
  var handleSubmit = function handleSubmit(event) {
    event.preventDefault();
    navigateToSearch(value);
  };
  useEffect(function () {
    var _inputRef$current;
    (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.focus();
  }, []);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Box, {
      "aria-hidden": true,
      bg: "shadow-black-slight",
      height: "100%",
      onClick: toggleSearch,
      position: "fixed"
      // We add 5rem here in case there's some sort of branded banner above search
      // The search area is much taller than 5rem so this is a safe amount of padding
      ,
      top: "calc(".concat(theme.elements.headerHeight, " + 5rem)"),
      width: 1
    }), /*#__PURE__*/_jsx(FocusTrap, {
      onClickOutside: handleOutsideClick,
      onEscapeKey: toggleSearch,
      allowPageInteraction: true,
      children: /*#__PURE__*/_jsxs(Box, {
        bg: "background",
        borderColorBottom: "text",
        borderColorTop: "shadow-solid",
        borderStyle: "solid",
        borderWidth: "2px 0 1px",
        "data-testid": "header-search-dropdown",
        position: "absolute",
        ref: searchElementRef,
        width: "100%",
        children: [/*#__PURE__*/_jsx(Box, {
          border: "none",
          width: "auto",
          children: /*#__PURE__*/_jsx(QueryContainer, {
            children: /*#__PURE__*/_jsxs(FlexBox, {
              alignItems: "baseline",
              borderColor: "gray-600",
              borderStyleBottom: "solid",
              borderWidthBottom: "1px",
              width: "100%",
              children: [/*#__PURE__*/_jsx(SearchIcon, {
                color: "gray-600",
                height: 24,
                width: 24
              }), /*#__PURE__*/_jsx(Form, {
                action: "/search",
                id: "search-form",
                ml: 8,
                onSubmit: handleSubmit,
                width: "100%",
                children: /*#__PURE__*/_jsx(StyledInput, {
                  background: "none",
                  border: "none",
                  color: "text",
                  fontSize: 34,
                  fontWeight: "bold",
                  id: "header-search-bar",
                  name: "query",
                  onChange: handleChange,
                  onKeyDown: function onKeyDown(event) {
                    return event.stopPropagation();
                  },
                  placeholder: "Search our catalog",
                  ref: inputRef,
                  type: "search",
                  value: value,
                  width: "100%"
                })
              })]
            })
          })
        }), /*#__PURE__*/_jsxs(SuggestionContainer, {
          children: [/*#__PURE__*/_jsx(Text, {
            as: "h3",
            fontSize: 20,
            my: 16,
            children: "Popular Searches"
          }), /*#__PURE__*/_jsxs(FlexBox, {
            justifyContent: "space-between",
            children: [/*#__PURE__*/_jsx("div", {
              children: searchTerms.map(function (searchTerm) {
                return /*#__PURE__*/_jsx(TextButton, {
                  role: "link",
                  mr: 16,
                  onClick: function onClick() {
                    navigateToSearch(searchTerm);
                    onTrackingClick("popular_search_term_".concat(camelCase(searchTerm)));
                  },
                  children: searchTerm
                }, searchTerm);
              })
            }), /*#__PURE__*/_jsxs(TextButton, {
              href: "/help",
              onClick: function onClick() {
                return onTrackingClick('help_center');
              },
              children: [/*#__PURE__*/_jsx(SupportIcon, {
                mr: 8,
                size: 20
              }), " Help Center"]
            })]
          })]
        })]
      })
    })]
  });
};