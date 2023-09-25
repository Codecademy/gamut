import _styled from "@emotion/styled/base";
import { Anchor, Text } from '@codecademy/gamut';
import { ArrowChevronLeftIcon } from '@codecademy/gamut-icons';
import { css } from '@codecademy/gamut-styles';
import * as React from 'react';
import { AppHeaderCatalogSection } from '../../AppHeader/AppHeaderElements/AppHeaderCatalogSection';
import { AppHeaderLinkSections } from '../../AppHeader/AppHeaderElements/AppHeaderLinkSections';
import { AppHeaderListItem } from '../../AppHeader/AppHeaderElements/AppHeaderListItem';
import { AppHeaderResourcesSection } from '../../AppHeader/AppHeaderElements/AppHeaderResourcesSection';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledAnchor = /*#__PURE__*/_styled(Anchor, {
  target: "evw39b70",
  label: "StyledAnchor"
})(css({
  alignItems: "center",
  display: "flex",
  my: 24,
  padding: 0,
  width: "100%"
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9BcHBIZWFkZXJNb2JpbGUvQXBwSGVhZGVyU3ViTWVudU1vYmlsZS9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBa0NxQiIsImZpbGUiOiIuLi8uLi8uLi9zcmMvQXBwSGVhZGVyTW9iaWxlL0FwcEhlYWRlclN1Yk1lbnVNb2JpbGUvaW5kZXgudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW5jaG9yLCBUZXh0IH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQnO1xuaW1wb3J0IHsgQXJyb3dDaGV2cm9uTGVmdEljb24gfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1pY29ucyc7XG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1zdHlsZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBBcHBIZWFkZXJDYXRhbG9nRHJvcGRvd25Qcm9wcyB9IGZyb20gJy4uLy4uL0FwcEhlYWRlci9BcHBIZWFkZXJFbGVtZW50cy9BcHBIZWFkZXJDYXRhbG9nRHJvcGRvd24nO1xuaW1wb3J0IHsgQXBwSGVhZGVyQ2F0YWxvZ1NlY3Rpb24gfSBmcm9tICcuLi8uLi9BcHBIZWFkZXIvQXBwSGVhZGVyRWxlbWVudHMvQXBwSGVhZGVyQ2F0YWxvZ1NlY3Rpb24nO1xuaW1wb3J0IHsgQXBwSGVhZGVyRHJvcGRvd25Qcm9wcyB9IGZyb20gJy4uLy4uL0FwcEhlYWRlci9BcHBIZWFkZXJFbGVtZW50cy9BcHBIZWFkZXJEcm9wZG93bic7XG5pbXBvcnQgeyBBcHBIZWFkZXJMaW5rU2VjdGlvbnMgfSBmcm9tICcuLi8uLi9BcHBIZWFkZXIvQXBwSGVhZGVyRWxlbWVudHMvQXBwSGVhZGVyTGlua1NlY3Rpb25zJztcbmltcG9ydCB7IEFwcEhlYWRlckxpc3RJdGVtIH0gZnJvbSAnLi4vLi4vQXBwSGVhZGVyL0FwcEhlYWRlckVsZW1lbnRzL0FwcEhlYWRlckxpc3RJdGVtJztcbmltcG9ydCB7IEFwcEhlYWRlclJlc291cmNlRHJvcGRvd25Qcm9wcyB9IGZyb20gJy4uLy4uL0FwcEhlYWRlci9BcHBIZWFkZXJFbGVtZW50cy9BcHBIZWFkZXJSZXNvdXJjZXNEcm9wZG93bic7XG5pbXBvcnQgeyBBcHBIZWFkZXJSZXNvdXJjZXNTZWN0aW9uIH0gZnJvbSAnLi4vLi4vQXBwSGVhZGVyL0FwcEhlYWRlckVsZW1lbnRzL0FwcEhlYWRlclJlc291cmNlc1NlY3Rpb24nO1xuaW1wb3J0IHtcbiAgQXBwSGVhZGVyQ2F0YWxvZ0Ryb3Bkb3duSXRlbSxcbiAgQXBwSGVhZGVyQ2xpY2tIYW5kbGVyLFxuICBBcHBIZWFkZXJEcm9wZG93bkl0ZW0sXG4gIEFwcEhlYWRlclJlc291cmNlc0Ryb3Bkb3duSXRlbSxcbn0gZnJvbSAnLi4vLi4vQXBwSGVhZGVyL0FwcEhlYWRlckVsZW1lbnRzL3R5cGVzJztcblxuZXhwb3J0IHR5cGUgQXBwSGVhZGVyU3ViTWVudU1vYmlsZVByb3BzID0gKFxuICB8IEFwcEhlYWRlckRyb3Bkb3duUHJvcHNcbiAgfCBBcHBIZWFkZXJDYXRhbG9nRHJvcGRvd25Qcm9wc1xuICB8IEFwcEhlYWRlclJlc291cmNlRHJvcGRvd25Qcm9wc1xuKSAmIHtcbiAgaGFuZGxlQ2xvc2VTdWJNZW51OiAoKSA9PiB2b2lkO1xuICBoYW5kbGVDbG9zZU1haW5NZW51OiAoKSA9PiB2b2lkO1xufTtcblxudHlwZSBBcHBIZWFkZXJTZWN0aW9uSXRlbSA9XG4gIHwgQXBwSGVhZGVyRHJvcGRvd25JdGVtXG4gIHwgQXBwSGVhZGVyQ2F0YWxvZ0Ryb3Bkb3duSXRlbVxuICB8IEFwcEhlYWRlclJlc291cmNlc0Ryb3Bkb3duSXRlbTtcblxuY29uc3QgU3R5bGVkQW5jaG9yID0gc3R5bGVkKEFuY2hvcikoXG4gIGNzcyh7XG4gICAgYWxpZ25JdGVtczogYGNlbnRlcmAsXG4gICAgZGlzcGxheTogYGZsZXhgLFxuICAgIG15OiAyNCxcbiAgICBwYWRkaW5nOiAwLFxuICAgIHdpZHRoOiBgMTAwJWAsXG4gIH0pXG4pO1xuXG5jb25zdCByZW5kZXJIZWFkZXJTZWN0aW9uID0gKFxuICBpdGVtOiBBcHBIZWFkZXJTZWN0aW9uSXRlbSxcbiAgYWN0aW9uOiBBcHBIZWFkZXJDbGlja0hhbmRsZXIsXG4gIGhhbmRsZUNsb3NlTWFpbk1lbnU6ICgpID0+IHZvaWRcbikgPT4ge1xuICBzd2l0Y2ggKGl0ZW0udHlwZSkge1xuICAgIGNhc2UgJ2NhdGFsb2ctZHJvcGRvd24nOlxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPEFwcEhlYWRlckNhdGFsb2dTZWN0aW9uXG4gICAgICAgICAgYWN0aW9uPXthY3Rpb259XG4gICAgICAgICAgaXRlbT17aXRlbX1cbiAgICAgICAgICBoYW5kbGVDbG9zZT17aGFuZGxlQ2xvc2VNYWluTWVudX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgY2FzZSAncmVzb3VyY2VzLWRyb3Bkb3duJzpcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxBcHBIZWFkZXJSZXNvdXJjZXNTZWN0aW9uXG4gICAgICAgICAgYWN0aW9uPXthY3Rpb259XG4gICAgICAgICAgaGFuZGxlQ2xvc2U9e2hhbmRsZUNsb3NlTWFpbk1lbnV9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8QXBwSGVhZGVyTGlua1NlY3Rpb25zIGFjdGlvbj17YWN0aW9ufSBpdGVtPXtpdGVtfSBzaG93SWNvbiBtb2JpbGUgLz5cbiAgICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBBcHBIZWFkZXJTdWJNZW51TW9iaWxlOiBSZWFjdC5GQzxBcHBIZWFkZXJTdWJNZW51TW9iaWxlUHJvcHM+ID0gKHtcbiAgYWN0aW9uLFxuICBoYW5kbGVDbG9zZVN1Yk1lbnUsXG4gIGhhbmRsZUNsb3NlTWFpbk1lbnUsXG4gIGl0ZW0sXG59KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPEFwcEhlYWRlckxpc3RJdGVtIGFyaWEtbGFiZWxsZWRieT17YCR7aXRlbS50ZXh0fSBtZW51YH0+XG4gICAgICA8U3R5bGVkQW5jaG9yXG4gICAgICAgIG9uQ2xpY2s9e2hhbmRsZUNsb3NlU3ViTWVudX1cbiAgICAgICAgdmFyaWFudD1cImludGVyZmFjZVwiXG4gICAgICAgIGFzPVwiYnV0dG9uXCJcbiAgICAgICAgbWw9e3sgXzogMTYsIHhzOiAzMiwgc206IDY0LCBtZDogNDggfX1cbiAgICAgID5cbiAgICAgICAgPEFycm93Q2hldnJvbkxlZnRJY29uIHNpemU9ezEyfSBhcmlhLWhpZGRlbiAvPlxuICAgICAgICA8VGV4dCBmb250U2l6ZT17MTZ9IHBsPXs4fT5cbiAgICAgICAgICBNZW51XG4gICAgICAgIDwvVGV4dD5cbiAgICAgIDwvU3R5bGVkQW5jaG9yPlxuICAgICAgPFRleHRcbiAgICAgICAgYXM9XCJoMVwiXG4gICAgICAgIGZvbnRTaXplPXsyMn1cbiAgICAgICAgbWI9ezE2fVxuICAgICAgICBtbD17eyBfOiAxNiwgeHM6IDMyLCBzbTogNjQsIG1kOiA0OCB9fVxuICAgICAgPlxuICAgICAgICB7aXRlbS50eXBlID09PSAncHJvZmlsZS1kcm9wZG93bicgPyBpdGVtLnVzZXJEaXNwbGF5TmFtZSA6IGl0ZW0udGV4dH1cbiAgICAgIDwvVGV4dD5cbiAgICAgIHtyZW5kZXJIZWFkZXJTZWN0aW9uKGl0ZW0sIGFjdGlvbiwgaGFuZGxlQ2xvc2VNYWluTWVudSl9XG4gICAgPC9BcHBIZWFkZXJMaXN0SXRlbT5cbiAgKTtcbn07XG4iXX0= */");
var renderHeaderSection = function renderHeaderSection(item, action, handleCloseMainMenu) {
  switch (item.type) {
    case 'catalog-dropdown':
      return /*#__PURE__*/_jsx(AppHeaderCatalogSection, {
        action: action,
        item: item,
        handleClose: handleCloseMainMenu
      });
    case 'resources-dropdown':
      return /*#__PURE__*/_jsx(AppHeaderResourcesSection, {
        action: action,
        handleClose: handleCloseMainMenu
      });
    default:
      return /*#__PURE__*/_jsx(AppHeaderLinkSections, {
        action: action,
        item: item,
        showIcon: true,
        mobile: true
      });
  }
};
export var AppHeaderSubMenuMobile = function AppHeaderSubMenuMobile(_ref) {
  var action = _ref.action,
    handleCloseSubMenu = _ref.handleCloseSubMenu,
    handleCloseMainMenu = _ref.handleCloseMainMenu,
    item = _ref.item;
  return /*#__PURE__*/_jsxs(AppHeaderListItem, {
    "aria-labelledby": "".concat(item.text, " menu"),
    children: [/*#__PURE__*/_jsxs(StyledAnchor, {
      onClick: handleCloseSubMenu,
      variant: "interface",
      as: "button",
      ml: {
        _: 16,
        xs: 32,
        sm: 64,
        md: 48
      },
      children: [/*#__PURE__*/_jsx(ArrowChevronLeftIcon, {
        size: 12,
        "aria-hidden": true
      }), /*#__PURE__*/_jsx(Text, {
        fontSize: 16,
        pl: 8,
        children: "Menu"
      })]
    }), /*#__PURE__*/_jsx(Text, {
      as: "h1",
      fontSize: 22,
      mb: 16,
      ml: {
        _: 16,
        xs: 32,
        sm: 64,
        md: 48
      },
      children: item.type === 'profile-dropdown' ? item.userDisplayName : item.text
    }), renderHeaderSection(item, action, handleCloseMainMenu)]
  });
};