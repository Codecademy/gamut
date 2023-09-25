import _styled from "@emotion/styled/base";
import { Column, LayoutGrid } from '@codecademy/gamut';
import { theme } from '@codecademy/gamut-styles';
import * as React from 'react';
import { CatalogLinks } from './CatalogLinks';
import { CompanyLinks } from './CompanyLinks';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var FooterNavLinksGrid = /*#__PURE__*/_styled(LayoutGrid, {
  target: "ebedupr0",
  label: "FooterNavLinksGrid"
})(theme.breakpoints.sm, "{padding:2rem 0;}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9HbG9iYWxGb290ZXIvRm9vdGVyTmF2TGlua3MvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVU2QyIsImZpbGUiOiIuLi8uLi8uLi9zcmMvR2xvYmFsRm9vdGVyL0Zvb3Rlck5hdkxpbmtzL2luZGV4LnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbHVtbiwgTGF5b3V0R3JpZCB9IGZyb20gJ0Bjb2RlY2FkZW15L2dhbXV0JztcbmltcG9ydCB7IHRoZW1lIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQtc3R5bGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgQ2F0YWxvZ0xpbmtzIH0gZnJvbSAnLi9DYXRhbG9nTGlua3MnO1xuaW1wb3J0IHsgQ29tcGFueUxpbmtzLCBDb21wYW55TGlua3NQcm9wcyB9IGZyb20gJy4vQ29tcGFueUxpbmtzJztcblxuZXhwb3J0IHR5cGUgRm9vdGVyTmF2TGlua3NQcm9wcyA9IENvbXBhbnlMaW5rc1Byb3BzO1xuXG5jb25zdCBGb290ZXJOYXZMaW5rc0dyaWQgPSBzdHlsZWQoTGF5b3V0R3JpZClgXG4gICR7dGhlbWUuYnJlYWtwb2ludHMuc219IHtcbiAgICBwYWRkaW5nOiAycmVtIDA7XG4gIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBGb290ZXJOYXZMaW5rczogUmVhY3QuRkM8Rm9vdGVyTmF2TGlua3NQcm9wcz4gPSAoe1xuICBoaWRlUHJpY2luZyxcbiAgb25DbGljayxcbn0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8Rm9vdGVyTmF2TGlua3NHcmlkPlxuICAgICAgPENvbHVtbiBzaXplPXt7IF86IDEyLCBtZDogNiB9fT5cbiAgICAgICAgPENvbXBhbnlMaW5rcyBoaWRlUHJpY2luZz17aGlkZVByaWNpbmd9IG9uQ2xpY2s9e29uQ2xpY2t9IC8+XG4gICAgICA8L0NvbHVtbj5cbiAgICAgIDxDb2x1bW4gc2l6ZT17eyBfOiAxMiwgbWQ6IDYgfX0+XG4gICAgICAgIDxDYXRhbG9nTGlua3Mgb25DbGljaz17b25DbGlja30gLz5cbiAgICAgIDwvQ29sdW1uPlxuICAgIDwvRm9vdGVyTmF2TGlua3NHcmlkPlxuICApO1xufTtcbiJdfQ== */"));
export var FooterNavLinks = function FooterNavLinks(_ref) {
  var hidePricing = _ref.hidePricing,
    onClick = _ref.onClick;
  return /*#__PURE__*/_jsxs(FooterNavLinksGrid, {
    children: [/*#__PURE__*/_jsx(Column, {
      size: {
        _: 12,
        md: 6
      },
      children: /*#__PURE__*/_jsx(CompanyLinks, {
        hidePricing: hidePricing,
        onClick: onClick
      })
    }), /*#__PURE__*/_jsx(Column, {
      size: {
        _: 12,
        md: 6
      },
      children: /*#__PURE__*/_jsx(CatalogLinks, {
        onClick: onClick
      })
    })]
  });
};