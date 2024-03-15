import _styled from "@emotion/styled/base";
import { ContentContainer } from '@codecademy/gamut';
import { theme, themed } from '@codecademy/gamut-styles';
import React from 'react';
import { LegalLinks } from './LegalLinks';
import { MadeIn } from './MadeIn';

var LegalLocalContainer = _styled("div", {
  target: "ebgfpqa0",
  label: "LegalLocalContainer"
})("border-top:1px solid ", themed('colors.navy'), ";font-size:0.875rem;padding:1rem 0 0.5rem;margin:0;", theme.breakpoints.md, "{align-items:baseline;display:flex;justify-content:space-between;}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9HbG9iYWxGb290ZXIvRm9vdGVyTGVnYWwvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVNzQyIsImZpbGUiOiIuLi8uLi8uLi9zcmMvR2xvYmFsRm9vdGVyL0Zvb3RlckxlZ2FsL2luZGV4LnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnRlbnRDb250YWluZXIgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dCc7XG5pbXBvcnQgeyB0aGVtZSwgdGhlbWVkIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQtc3R5bGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IEdsb2JhbEZvb3RlckNsaWNrSGFuZGxlciB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IExlZ2FsTGlua3MgfSBmcm9tICcuL0xlZ2FsTGlua3MnO1xuaW1wb3J0IHsgTWFkZUluIH0gZnJvbSAnLi9NYWRlSW4nO1xuXG5jb25zdCBMZWdhbExvY2FsQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICR7dGhlbWVkKCdjb2xvcnMubmF2eScpfTtcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgcGFkZGluZzogMXJlbSAwIDAuNXJlbTtcbiAgbWFyZ2luOiAwO1xuXG4gICR7dGhlbWUuYnJlYWtwb2ludHMubWR9IHtcbiAgICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIH1cbmA7XG5cbmV4cG9ydCB0eXBlIEZvb3RlckxlZ2FsUHJvcHMgPSB7XG4gIG9uQ2xpY2s6IEdsb2JhbEZvb3RlckNsaWNrSGFuZGxlcjtcbiAgb25NYWRlSW5DbGljaz86ICh0ZXh0OiBzdHJpbmcpID0+IHZvaWQ7XG59O1xuXG5leHBvcnQgY29uc3QgRm9vdGVyTGVnYWw6IFJlYWN0LkZDPEZvb3RlckxlZ2FsUHJvcHM+ID0gKHtcbiAgb25DbGljayxcbiAgb25NYWRlSW5DbGljayxcbn0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8Q29udGVudENvbnRhaW5lcj5cbiAgICAgIDxMZWdhbExvY2FsQ29udGFpbmVyPlxuICAgICAgICA8TGVnYWxMaW5rcyBvbkNsaWNrPXtvbkNsaWNrfSAvPlxuICAgICAgICA8TWFkZUluIG9uQ2xpY2s9e29uTWFkZUluQ2xpY2t9IC8+XG4gICAgICA8L0xlZ2FsTG9jYWxDb250YWluZXI+XG4gICAgPC9Db250ZW50Q29udGFpbmVyPlxuICApO1xufTtcbiJdfQ== */"));

export var FooterLegal = function FooterLegal(_ref) {
  var onClick = _ref.onClick,
      onMadeInClick = _ref.onMadeInClick;
  return /*#__PURE__*/React.createElement(ContentContainer, null, /*#__PURE__*/React.createElement(LegalLocalContainer, null, /*#__PURE__*/React.createElement(LegalLinks, {
    onClick: onClick
  }), /*#__PURE__*/React.createElement(MadeIn, {
    onClick: onMadeInClick
  })));
};