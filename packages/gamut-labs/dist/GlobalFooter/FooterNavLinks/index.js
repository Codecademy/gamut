import _styled from "@emotion/styled/base";
import { Column, LayoutGrid } from '@codecademy/gamut';
import { theme } from '@codecademy/gamut-styles';
import React from 'react';
import { CatalogLinks } from './CatalogLinks';
import { CompanyLinks } from './CompanyLinks';

var FooterNavLinksGrid = /*#__PURE__*/_styled(LayoutGrid, {
  target: "ebedupr0",
  label: "FooterNavLinksGrid"
})(theme.breakpoints.sm, "{padding:2rem 0;}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9HbG9iYWxGb290ZXIvRm9vdGVyTmF2TGlua3MvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVU2QyIsImZpbGUiOiIuLi8uLi8uLi9zcmMvR2xvYmFsRm9vdGVyL0Zvb3Rlck5hdkxpbmtzL2luZGV4LnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbHVtbiwgTGF5b3V0R3JpZCB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0JztcbmltcG9ydCB7IHRoZW1lIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQtc3R5bGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IENhdGFsb2dMaW5rcyB9IGZyb20gJy4vQ2F0YWxvZ0xpbmtzJztcbmltcG9ydCB7IENvbXBhbnlMaW5rcywgQ29tcGFueUxpbmtzUHJvcHMgfSBmcm9tICcuL0NvbXBhbnlMaW5rcyc7XG5cbmV4cG9ydCB0eXBlIEZvb3Rlck5hdkxpbmtzUHJvcHMgPSBDb21wYW55TGlua3NQcm9wcztcblxuY29uc3QgRm9vdGVyTmF2TGlua3NHcmlkID0gc3R5bGVkKExheW91dEdyaWQpYFxuICAke3RoZW1lLmJyZWFrcG9pbnRzLnNtfSB7XG4gICAgcGFkZGluZzogMnJlbSAwO1xuICB9XG5gO1xuXG5leHBvcnQgY29uc3QgRm9vdGVyTmF2TGlua3M6IFJlYWN0LkZDPEZvb3Rlck5hdkxpbmtzUHJvcHM+ID0gKHtcbiAgaGlkZVByaWNpbmcsXG4gIG9uQ2xpY2ssXG4gIHVzZXJHZW8sXG59KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPEZvb3Rlck5hdkxpbmtzR3JpZD5cbiAgICAgIDxDb2x1bW4gc2l6ZT17eyBfOiAxMiwgbWQ6IDYgfX0+XG4gICAgICAgIDxDb21wYW55TGlua3NcbiAgICAgICAgICBoaWRlUHJpY2luZz17aGlkZVByaWNpbmd9XG4gICAgICAgICAgb25DbGljaz17b25DbGlja31cbiAgICAgICAgICB1c2VyR2VvPXt1c2VyR2VvfVxuICAgICAgICAvPlxuICAgICAgPC9Db2x1bW4+XG4gICAgICA8Q29sdW1uIHNpemU9e3sgXzogMTIsIG1kOiA2IH19PlxuICAgICAgICA8Q2F0YWxvZ0xpbmtzIG9uQ2xpY2s9e29uQ2xpY2t9IC8+XG4gICAgICA8L0NvbHVtbj5cbiAgICA8L0Zvb3Rlck5hdkxpbmtzR3JpZD5cbiAgKTtcbn07XG4iXX0= */"));

export var FooterNavLinks = function FooterNavLinks(_ref) {
  var hidePricing = _ref.hidePricing,
      onClick = _ref.onClick,
      userGeo = _ref.userGeo;
  return /*#__PURE__*/React.createElement(FooterNavLinksGrid, null, /*#__PURE__*/React.createElement(Column, {
    size: {
      _: 12,
      md: 6
    }
  }, /*#__PURE__*/React.createElement(CompanyLinks, {
    hidePricing: hidePricing,
    onClick: onClick,
    userGeo: userGeo
  })), /*#__PURE__*/React.createElement(Column, {
    size: {
      _: 12,
      md: 6
    }
  }, /*#__PURE__*/React.createElement(CatalogLinks, {
    onClick: onClick
  })));
};