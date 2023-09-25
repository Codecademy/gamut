import _styled from "@emotion/styled/base";
import { ContentContainer } from '@codecademy/gamut';
import { themed } from '@codecademy/gamut-styles';
import * as React from 'react';
import { FooterLegal } from './FooterLegal';
import { FooterNavLinks } from './FooterNavLinks';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var FooterContainer = /*#__PURE__*/_styled("footer", {
  target: "e1mgdsdy0",
  label: "FooterContainer"
})("border-top:1px solid ", themed('colors.secondary'), ";@media print{display:none;}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9HbG9iYWxGb290ZXIvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTRCcUMiLCJmaWxlIjoiLi4vLi4vc3JjL0dsb2JhbEZvb3Rlci9pbmRleC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb250ZW50Q29udGFpbmVyIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQnO1xuaW1wb3J0IHsgdGhlbWVkIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQtc3R5bGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgRm9vdGVyTGVnYWwgfSBmcm9tICcuL0Zvb3RlckxlZ2FsJztcbmltcG9ydCB7IEZvb3Rlck5hdkxpbmtzIH0gZnJvbSAnLi9Gb290ZXJOYXZMaW5rcyc7XG5pbXBvcnQgeyBHbG9iYWxGb290ZXJDbGlja0hhbmRsZXIgfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IHR5cGUgR2xvYmFsRm9vdGVyUHJvcHMgPSB7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcblxuICAvKipcbiAgICogSGlkZSBwcmljaW5nIGRldGFpbHMsIHN1Y2ggYXMgZm9yIHJlbmRlcmluZyBpbiBhbiBhcHAgc3RvcmUgYXBwLlxuICAgKi9cbiAgaGlkZVByaWNpbmc/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbmV2ZXIgYSBsaW5rIGlzIGNsaWNrZWQuXG4gICAqL1xuICBvbkNsaWNrOiBHbG9iYWxGb290ZXJDbGlja0hhbmRsZXI7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSB0ZXh0IGluIHRoZSBNYWRlSW4gY29tcG9uZW50IGlzIGNsaWNrZWRcbiAgICovXG4gIG9uTWFkZUluQ2xpY2s/OiAodGV4dDogc3RyaW5nKSA9PiB2b2lkO1xufTtcblxuY29uc3QgRm9vdGVyQ29udGFpbmVyID0gc3R5bGVkLmZvb3RlcmBcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICR7dGhlbWVkKCdjb2xvcnMuc2Vjb25kYXJ5Jyl9O1xuXG4gIEBtZWRpYSBwcmludCB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IEdsb2JhbEZvb3RlcjogUmVhY3QuRkM8R2xvYmFsRm9vdGVyUHJvcHM+ID0gKHtcbiAgY2xhc3NOYW1lLFxuICBoaWRlUHJpY2luZyxcbiAgb25DbGljayxcbiAgb25NYWRlSW5DbGljayxcbn0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8Rm9vdGVyQ29udGFpbmVyIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSByb2xlPVwiY29udGVudGluZm9cIj5cbiAgICAgIDxDb250ZW50Q29udGFpbmVyPlxuICAgICAgICA8Rm9vdGVyTmF2TGlua3MgaGlkZVByaWNpbmc9e2hpZGVQcmljaW5nfSBvbkNsaWNrPXtvbkNsaWNrfSAvPlxuICAgICAgPC9Db250ZW50Q29udGFpbmVyPlxuICAgICAgPEZvb3RlckxlZ2FsIG9uQ2xpY2s9e29uQ2xpY2t9IG9uTWFkZUluQ2xpY2s9e29uTWFkZUluQ2xpY2t9IC8+XG4gICAgPC9Gb290ZXJDb250YWluZXI+XG4gICk7XG59O1xuIl19 */"));
export var GlobalFooter = function GlobalFooter(_ref) {
  var className = _ref.className,
    hidePricing = _ref.hidePricing,
    onClick = _ref.onClick,
    onMadeInClick = _ref.onMadeInClick;
  return /*#__PURE__*/_jsxs(FooterContainer, {
    className: className,
    role: "contentinfo",
    children: [/*#__PURE__*/_jsx(ContentContainer, {
      children: /*#__PURE__*/_jsx(FooterNavLinks, {
        hidePricing: hidePricing,
        onClick: onClick
      })
    }), /*#__PURE__*/_jsx(FooterLegal, {
      onClick: onClick,
      onMadeInClick: onMadeInClick
    })]
  });
};