import _styled from "@emotion/styled/base";
import { ContentContainer } from '@codecademy/gamut';
import { theme, themed } from '@codecademy/gamut-styles';
import * as React from 'react';
import { LegalLinks } from './LegalLinks';
import { MadeIn } from './MadeIn';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var LegalLocalContainer = /*#__PURE__*/_styled("div", {
  target: "ebgfpqa0",
  label: "LegalLocalContainer"
})("border-top:1px solid ", themed('colors.navy'), ";font-size:0.875rem;padding:1rem 0 0.5rem;margin:0;", theme.breakpoints.md, "{align-items:baseline;display:flex;justify-content:space-between;}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9HbG9iYWxGb290ZXIvRm9vdGVyTGVnYWwvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVNzQyIsImZpbGUiOiIuLi8uLi8uLi9zcmMvR2xvYmFsRm9vdGVyL0Zvb3RlckxlZ2FsL2luZGV4LnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnRlbnRDb250YWluZXIgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dCc7XG5pbXBvcnQgeyB0aGVtZSwgdGhlbWVkIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQtc3R5bGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgR2xvYmFsRm9vdGVyQ2xpY2tIYW5kbGVyIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgTGVnYWxMaW5rcyB9IGZyb20gJy4vTGVnYWxMaW5rcyc7XG5pbXBvcnQgeyBNYWRlSW4gfSBmcm9tICcuL01hZGVJbic7XG5cbmNvbnN0IExlZ2FsTG9jYWxDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBib3JkZXItdG9wOiAxcHggc29saWQgJHt0aGVtZWQoJ2NvbG9ycy5uYXZ5Jyl9O1xuICBmb250LXNpemU6IDAuODc1cmVtO1xuICBwYWRkaW5nOiAxcmVtIDAgMC41cmVtO1xuICBtYXJnaW46IDA7XG5cbiAgJHt0aGVtZS5icmVha3BvaW50cy5tZH0ge1xuICAgIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgfVxuYDtcblxuZXhwb3J0IHR5cGUgRm9vdGVyTGVnYWxQcm9wcyA9IHtcbiAgb25DbGljazogR2xvYmFsRm9vdGVyQ2xpY2tIYW5kbGVyO1xuICBvbk1hZGVJbkNsaWNrPzogKHRleHQ6IHN0cmluZykgPT4gdm9pZDtcbn07XG5cbmV4cG9ydCBjb25zdCBGb290ZXJMZWdhbDogUmVhY3QuRkM8Rm9vdGVyTGVnYWxQcm9wcz4gPSAoe1xuICBvbkNsaWNrLFxuICBvbk1hZGVJbkNsaWNrLFxufSkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxDb250ZW50Q29udGFpbmVyPlxuICAgICAgPExlZ2FsTG9jYWxDb250YWluZXI+XG4gICAgICAgIDxMZWdhbExpbmtzIG9uQ2xpY2s9e29uQ2xpY2t9IC8+XG4gICAgICAgIDxNYWRlSW4gb25DbGljaz17b25NYWRlSW5DbGlja30gLz5cbiAgICAgIDwvTGVnYWxMb2NhbENvbnRhaW5lcj5cbiAgICA8L0NvbnRlbnRDb250YWluZXI+XG4gICk7XG59O1xuIl19 */"));
export var FooterLegal = function FooterLegal(_ref) {
  var onClick = _ref.onClick,
    onMadeInClick = _ref.onMadeInClick;
  return /*#__PURE__*/_jsx(ContentContainer, {
    children: /*#__PURE__*/_jsxs(LegalLocalContainer, {
      children: [/*#__PURE__*/_jsx(LegalLinks, {
        onClick: onClick
      }), /*#__PURE__*/_jsx(MadeIn, {
        onClick: onMadeInClick
      })]
    })
  });
};