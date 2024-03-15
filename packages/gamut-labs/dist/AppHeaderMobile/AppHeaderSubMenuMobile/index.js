import _styled from "@emotion/styled/base";
import { Anchor, Text } from '@codecademy/gamut';
import { ArrowChevronLeftIcon } from '@codecademy/gamut-icons';
import { css } from '@codecademy/gamut-styles';
import React from 'react';
import { AppHeaderCatalogSection } from '../../AppHeader/AppHeaderElements/AppHeaderCatalogSection';
import { AppHeaderLinkSections } from '../../AppHeader/AppHeaderElements/AppHeaderLinkSections';
import { AppHeaderListItem } from '../../AppHeader/AppHeaderElements/AppHeaderListItem';
import { AppHeaderResourcesSection } from '../../AppHeader/AppHeaderElements/AppHeaderResourcesSection';

var StyledAnchor = /*#__PURE__*/_styled(Anchor, {
  target: "evw39b70",
  label: "StyledAnchor"
})(css({
  alignItems: "center",
  display: "flex",
  my: 24,
  padding: 0,
  width: "100%"
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9BcHBIZWFkZXJNb2JpbGUvQXBwSGVhZGVyU3ViTWVudU1vYmlsZS9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBa0NxQiIsImZpbGUiOiIuLi8uLi8uLi9zcmMvQXBwSGVhZGVyTW9iaWxlL0FwcEhlYWRlclN1Yk1lbnVNb2JpbGUvaW5kZXgudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW5jaG9yLCBUZXh0IH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQnO1xuaW1wb3J0IHsgQXJyb3dDaGV2cm9uTGVmdEljb24gfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1pY29ucyc7XG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1zdHlsZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgQXBwSGVhZGVyQ2F0YWxvZ0Ryb3Bkb3duUHJvcHMgfSBmcm9tICcuLi8uLi9BcHBIZWFkZXIvQXBwSGVhZGVyRWxlbWVudHMvQXBwSGVhZGVyQ2F0YWxvZ0Ryb3Bkb3duJztcbmltcG9ydCB7IEFwcEhlYWRlckNhdGFsb2dTZWN0aW9uIH0gZnJvbSAnLi4vLi4vQXBwSGVhZGVyL0FwcEhlYWRlckVsZW1lbnRzL0FwcEhlYWRlckNhdGFsb2dTZWN0aW9uJztcbmltcG9ydCB7IEFwcEhlYWRlckRyb3Bkb3duUHJvcHMgfSBmcm9tICcuLi8uLi9BcHBIZWFkZXIvQXBwSGVhZGVyRWxlbWVudHMvQXBwSGVhZGVyRHJvcGRvd24nO1xuaW1wb3J0IHsgQXBwSGVhZGVyTGlua1NlY3Rpb25zIH0gZnJvbSAnLi4vLi4vQXBwSGVhZGVyL0FwcEhlYWRlckVsZW1lbnRzL0FwcEhlYWRlckxpbmtTZWN0aW9ucyc7XG5pbXBvcnQgeyBBcHBIZWFkZXJMaXN0SXRlbSB9IGZyb20gJy4uLy4uL0FwcEhlYWRlci9BcHBIZWFkZXJFbGVtZW50cy9BcHBIZWFkZXJMaXN0SXRlbSc7XG5pbXBvcnQgeyBBcHBIZWFkZXJSZXNvdXJjZURyb3Bkb3duUHJvcHMgfSBmcm9tICcuLi8uLi9BcHBIZWFkZXIvQXBwSGVhZGVyRWxlbWVudHMvQXBwSGVhZGVyUmVzb3VyY2VzRHJvcGRvd24nO1xuaW1wb3J0IHsgQXBwSGVhZGVyUmVzb3VyY2VzU2VjdGlvbiB9IGZyb20gJy4uLy4uL0FwcEhlYWRlci9BcHBIZWFkZXJFbGVtZW50cy9BcHBIZWFkZXJSZXNvdXJjZXNTZWN0aW9uJztcbmltcG9ydCB7XG4gIEFwcEhlYWRlckNhdGFsb2dEcm9wZG93bkl0ZW0sXG4gIEFwcEhlYWRlckNsaWNrSGFuZGxlcixcbiAgQXBwSGVhZGVyRHJvcGRvd25JdGVtLFxuICBBcHBIZWFkZXJSZXNvdXJjZXNEcm9wZG93bkl0ZW0sXG59IGZyb20gJy4uLy4uL0FwcEhlYWRlci9BcHBIZWFkZXJFbGVtZW50cy90eXBlcyc7XG5cbmV4cG9ydCB0eXBlIEFwcEhlYWRlclN1Yk1lbnVNb2JpbGVQcm9wcyA9IChcbiAgfCBBcHBIZWFkZXJEcm9wZG93blByb3BzXG4gIHwgQXBwSGVhZGVyQ2F0YWxvZ0Ryb3Bkb3duUHJvcHNcbiAgfCBBcHBIZWFkZXJSZXNvdXJjZURyb3Bkb3duUHJvcHNcbikgJiB7XG4gIGhhbmRsZUNsb3NlU3ViTWVudTogKCkgPT4gdm9pZDtcbiAgaGFuZGxlQ2xvc2VNYWluTWVudTogKCkgPT4gdm9pZDtcbn07XG5cbnR5cGUgQXBwSGVhZGVyU2VjdGlvbkl0ZW0gPVxuICB8IEFwcEhlYWRlckRyb3Bkb3duSXRlbVxuICB8IEFwcEhlYWRlckNhdGFsb2dEcm9wZG93bkl0ZW1cbiAgfCBBcHBIZWFkZXJSZXNvdXJjZXNEcm9wZG93bkl0ZW07XG5cbmNvbnN0IFN0eWxlZEFuY2hvciA9IHN0eWxlZChBbmNob3IpKFxuICBjc3Moe1xuICAgIGFsaWduSXRlbXM6IGBjZW50ZXJgLFxuICAgIGRpc3BsYXk6IGBmbGV4YCxcbiAgICBteTogMjQsXG4gICAgcGFkZGluZzogMCxcbiAgICB3aWR0aDogYDEwMCVgLFxuICB9KVxuKTtcblxuY29uc3QgcmVuZGVySGVhZGVyU2VjdGlvbiA9IChcbiAgaXRlbTogQXBwSGVhZGVyU2VjdGlvbkl0ZW0sXG4gIGFjdGlvbjogQXBwSGVhZGVyQ2xpY2tIYW5kbGVyLFxuICBoYW5kbGVDbG9zZU1haW5NZW51OiAoKSA9PiB2b2lkXG4pID0+IHtcbiAgc3dpdGNoIChpdGVtLnR5cGUpIHtcbiAgICBjYXNlICdjYXRhbG9nLWRyb3Bkb3duJzpcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxBcHBIZWFkZXJDYXRhbG9nU2VjdGlvblxuICAgICAgICAgIGFjdGlvbj17YWN0aW9ufVxuICAgICAgICAgIGl0ZW09e2l0ZW19XG4gICAgICAgICAgaGFuZGxlQ2xvc2U9e2hhbmRsZUNsb3NlTWFpbk1lbnV9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIGNhc2UgJ2V4cGVyaW1lbnRhbC1yZXNvdXJjZXMtZHJvcGRvd24nOlxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPEFwcEhlYWRlclJlc291cmNlc1NlY3Rpb25cbiAgICAgICAgICBhY3Rpb249e2FjdGlvbn1cbiAgICAgICAgICBoYW5kbGVDbG9zZT17aGFuZGxlQ2xvc2VNYWluTWVudX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxBcHBIZWFkZXJMaW5rU2VjdGlvbnMgYWN0aW9uPXthY3Rpb259IGl0ZW09e2l0ZW19IHNob3dJY29uIG1vYmlsZSAvPlxuICAgICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IEFwcEhlYWRlclN1Yk1lbnVNb2JpbGU6IFJlYWN0LkZDPEFwcEhlYWRlclN1Yk1lbnVNb2JpbGVQcm9wcz4gPSAoe1xuICBhY3Rpb24sXG4gIGhhbmRsZUNsb3NlU3ViTWVudSxcbiAgaGFuZGxlQ2xvc2VNYWluTWVudSxcbiAgaXRlbSxcbn0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8QXBwSGVhZGVyTGlzdEl0ZW0gYXJpYS1sYWJlbGxlZGJ5PXtgJHtpdGVtLnRleHR9IG1lbnVgfT5cbiAgICAgIDxTdHlsZWRBbmNob3JcbiAgICAgICAgb25DbGljaz17aGFuZGxlQ2xvc2VTdWJNZW51fVxuICAgICAgICB2YXJpYW50PVwiaW50ZXJmYWNlXCJcbiAgICAgICAgYXM9XCJidXR0b25cIlxuICAgICAgICBtbD17eyBfOiAxNiwgeHM6IDMyLCBzbTogNjQsIG1kOiA0OCB9fVxuICAgICAgPlxuICAgICAgICA8QXJyb3dDaGV2cm9uTGVmdEljb24gc2l6ZT17MTJ9IGFyaWEtaGlkZGVuIC8+XG4gICAgICAgIDxUZXh0IGZvbnRTaXplPXsxNn0gcGw9ezh9PlxuICAgICAgICAgIE1lbnVcbiAgICAgICAgPC9UZXh0PlxuICAgICAgPC9TdHlsZWRBbmNob3I+XG4gICAgICA8VGV4dFxuICAgICAgICBhcz1cImgxXCJcbiAgICAgICAgZm9udFNpemU9ezIyfVxuICAgICAgICBtYj17MTZ9XG4gICAgICAgIG1sPXt7IF86IDE2LCB4czogMzIsIHNtOiA2NCwgbWQ6IDQ4IH19XG4gICAgICA+XG4gICAgICAgIHtpdGVtLnR5cGUgPT09ICdwcm9maWxlLWRyb3Bkb3duJyA/IGl0ZW0udXNlckRpc3BsYXlOYW1lIDogaXRlbS50ZXh0fVxuICAgICAgPC9UZXh0PlxuICAgICAge3JlbmRlckhlYWRlclNlY3Rpb24oaXRlbSwgYWN0aW9uLCBoYW5kbGVDbG9zZU1haW5NZW51KX1cbiAgICA8L0FwcEhlYWRlckxpc3RJdGVtPlxuICApO1xufTtcbiJdfQ== */");

var renderHeaderSection = function renderHeaderSection(item, action, handleCloseMainMenu) {
  switch (item.type) {
    case 'catalog-dropdown':
      return /*#__PURE__*/React.createElement(AppHeaderCatalogSection, {
        action: action,
        item: item,
        handleClose: handleCloseMainMenu
      });

    case 'experimental-resources-dropdown':
      return /*#__PURE__*/React.createElement(AppHeaderResourcesSection, {
        action: action,
        handleClose: handleCloseMainMenu
      });

    default:
      return /*#__PURE__*/React.createElement(AppHeaderLinkSections, {
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
  return /*#__PURE__*/React.createElement(AppHeaderListItem, {
    "aria-labelledby": "".concat(item.text, " menu")
  }, /*#__PURE__*/React.createElement(StyledAnchor, {
    onClick: handleCloseSubMenu,
    variant: "interface",
    as: "button",
    ml: {
      _: 16,
      xs: 32,
      sm: 64,
      md: 48
    }
  }, /*#__PURE__*/React.createElement(ArrowChevronLeftIcon, {
    size: 12,
    "aria-hidden": true
  }), /*#__PURE__*/React.createElement(Text, {
    fontSize: 16,
    pl: 8
  }, "Menu")), /*#__PURE__*/React.createElement(Text, {
    as: "h1",
    fontSize: 22,
    mb: 16,
    ml: {
      _: 16,
      xs: 32,
      sm: 64,
      md: 48
    }
  }, item.type === 'profile-dropdown' ? item.userDisplayName : item.text), renderHeaderSection(item, action, handleCloseMainMenu));
};