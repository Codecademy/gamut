import _styled from "@emotion/styled/base";
import { ContentContainer } from '@codecademy/gamut';
import { themed } from '@codecademy/gamut-styles';
import React from 'react';
import { FooterLegal } from './FooterLegal';
import { FooterNavLinks } from './FooterNavLinks';

var FooterContainer = _styled("footer", {
  target: "e1mgdsdy0",
  label: "FooterContainer"
})("border-top:1px solid ", themed('colors.secondary'), ";@media print{display:none;}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9HbG9iYWxGb290ZXIvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWlDcUMiLCJmaWxlIjoiLi4vLi4vc3JjL0dsb2JhbEZvb3Rlci9pbmRleC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb250ZW50Q29udGFpbmVyIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQnO1xuaW1wb3J0IHsgdGhlbWVkIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQtc3R5bGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IEZvb3RlckxlZ2FsIH0gZnJvbSAnLi9Gb290ZXJMZWdhbCc7XG5pbXBvcnQgeyBGb290ZXJOYXZMaW5rcyB9IGZyb20gJy4vRm9vdGVyTmF2TGlua3MnO1xuaW1wb3J0IHsgR2xvYmFsRm9vdGVyQ2xpY2tIYW5kbGVyIH0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCB0eXBlIEdsb2JhbEZvb3RlclByb3BzID0ge1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEhpZGUgcHJpY2luZyBkZXRhaWxzLCBzdWNoIGFzIGZvciByZW5kZXJpbmcgaW4gYW4gYXBwIHN0b3JlIGFwcC5cbiAgICovXG4gIGhpZGVQcmljaW5nPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW5ldmVyIGEgbGluayBpcyBjbGlja2VkLlxuICAgKi9cbiAgb25DbGljazogR2xvYmFsRm9vdGVyQ2xpY2tIYW5kbGVyO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgdGV4dCBpbiB0aGUgTWFkZUluIGNvbXBvbmVudCBpcyBjbGlja2VkXG4gICAqL1xuICBvbk1hZGVJbkNsaWNrPzogKHRleHQ6IHN0cmluZykgPT4gdm9pZDtcblxuICAvKipcbiAgICogR2VvZ3JhcGhpYyByZWdpb24gb2YgdGhlIHVzZXIgdmlld2luZyB0aGUgZm9vdGVyLCBzdWNoIGFzIFwiSU5cIiBvciBcIlVTXCIuXG4gICAqL1xuICB1c2VyR2VvOiBzdHJpbmc7XG59O1xuXG5jb25zdCBGb290ZXJDb250YWluZXIgPSBzdHlsZWQuZm9vdGVyYFxuICBib3JkZXItdG9wOiAxcHggc29saWQgJHt0aGVtZWQoJ2NvbG9ycy5zZWNvbmRhcnknKX07XG5cbiAgQG1lZGlhIHByaW50IHtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG5gO1xuXG5leHBvcnQgY29uc3QgR2xvYmFsRm9vdGVyOiBSZWFjdC5GQzxHbG9iYWxGb290ZXJQcm9wcz4gPSAoe1xuICBjbGFzc05hbWUsXG4gIGhpZGVQcmljaW5nLFxuICBvbkNsaWNrLFxuICBvbk1hZGVJbkNsaWNrLFxuICB1c2VyR2VvLFxufSkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxGb290ZXJDb250YWluZXIgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHJvbGU9XCJjb250ZW50aW5mb1wiPlxuICAgICAgPENvbnRlbnRDb250YWluZXI+XG4gICAgICAgIDxGb290ZXJOYXZMaW5rc1xuICAgICAgICAgIGhpZGVQcmljaW5nPXtoaWRlUHJpY2luZ31cbiAgICAgICAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICAgICAgICAgIHVzZXJHZW89e3VzZXJHZW99XG4gICAgICAgIC8+XG4gICAgICA8L0NvbnRlbnRDb250YWluZXI+XG4gICAgICA8Rm9vdGVyTGVnYWwgb25DbGljaz17b25DbGlja30gb25NYWRlSW5DbGljaz17b25NYWRlSW5DbGlja30gLz5cbiAgICA8L0Zvb3RlckNvbnRhaW5lcj5cbiAgKTtcbn07XG4iXX0= */"));

export var GlobalFooter = function GlobalFooter(_ref) {
  var className = _ref.className,
      hidePricing = _ref.hidePricing,
      onClick = _ref.onClick,
      onMadeInClick = _ref.onMadeInClick,
      userGeo = _ref.userGeo;
  return /*#__PURE__*/React.createElement(FooterContainer, {
    className: className,
    role: "contentinfo"
  }, /*#__PURE__*/React.createElement(ContentContainer, null, /*#__PURE__*/React.createElement(FooterNavLinks, {
    hidePricing: hidePricing,
    onClick: onClick,
    userGeo: userGeo
  })), /*#__PURE__*/React.createElement(FooterLegal, {
    onClick: onClick,
    onMadeInClick: onMadeInClick
  }));
};