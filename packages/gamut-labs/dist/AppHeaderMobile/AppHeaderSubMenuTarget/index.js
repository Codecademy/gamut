import _styled from "@emotion/styled/base";
import { Anchor, Text } from '@codecademy/gamut';
import { ArrowChevronRightIcon } from '@codecademy/gamut-icons';
import { css } from '@codecademy/gamut-styles';
import * as React from 'react';
import { Avatar } from '../../Avatar';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledText = /*#__PURE__*/_styled(Text, {
  target: "ersv5pq0",
  label: "StyledText"
})(css({
  ml: 16,
  maxWidth: "70vw",
  overflow: "hidden",
  textOverflow: "ellipsis"
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9BcHBIZWFkZXJNb2JpbGUvQXBwSGVhZGVyU3ViTWVudVRhcmdldC9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMkJtQiIsImZpbGUiOiIuLi8uLi8uLi9zcmMvQXBwSGVhZGVyTW9iaWxlL0FwcEhlYWRlclN1Yk1lbnVUYXJnZXQvaW5kZXgudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW5jaG9yLCBUZXh0IH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQnO1xuaW1wb3J0IHsgQXJyb3dDaGV2cm9uUmlnaHRJY29uIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQtaWNvbnMnO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQtc3R5bGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHtcbiAgQXBwSGVhZGVyQ2F0YWxvZ0Ryb3Bkb3duSXRlbSxcbiAgQXBwSGVhZGVyRHJvcGRvd25JdGVtLFxuICBBcHBIZWFkZXJSZXNvdXJjZXNEcm9wZG93bkl0ZW0sXG59IGZyb20gJy4uLy4uL0FwcEhlYWRlci9BcHBIZWFkZXJFbGVtZW50cy90eXBlcyc7XG5pbXBvcnQgeyBBdmF0YXIgfSBmcm9tICcuLi8uLi9BdmF0YXInO1xuXG5leHBvcnQgdHlwZSBBcHBIZWFkZXJTdWJNZW51VGFyZ2V0UHJvcHMgPSB7XG4gIGl0ZW06XG4gICAgfCBBcHBIZWFkZXJEcm9wZG93bkl0ZW1cbiAgICB8IEFwcEhlYWRlckNhdGFsb2dEcm9wZG93bkl0ZW1cbiAgICB8IEFwcEhlYWRlclJlc291cmNlc0Ryb3Bkb3duSXRlbTtcbiAgb3BlblN1Yk1lbnU6IChcbiAgICBldmVudDogUmVhY3QuTW91c2VFdmVudCxcbiAgICBpdGVtOlxuICAgICAgfCBBcHBIZWFkZXJEcm9wZG93bkl0ZW1cbiAgICAgIHwgQXBwSGVhZGVyQ2F0YWxvZ0Ryb3Bkb3duSXRlbVxuICAgICAgfCBBcHBIZWFkZXJSZXNvdXJjZXNEcm9wZG93bkl0ZW1cbiAgKSA9PiB2b2lkO1xufTtcblxuY29uc3QgU3R5bGVkVGV4dCA9IHN0eWxlZChUZXh0KShcbiAgY3NzKHtcbiAgICBtbDogMTYsXG4gICAgbWF4V2lkdGg6IGA3MHZ3YCxcbiAgICBvdmVyZmxvdzogYGhpZGRlbmAsXG4gICAgdGV4dE92ZXJmbG93OiBgZWxsaXBzaXNgLFxuICB9KVxuKTtcblxuZXhwb3J0IGNvbnN0IEFwcEhlYWRlclN1Yk1lbnVUYXJnZXQ6IFJlYWN0LkZDPEFwcEhlYWRlclN1Yk1lbnVUYXJnZXRQcm9wcz4gPSAoe1xuICBpdGVtLFxuICBvcGVuU3ViTWVudSxcbn0pID0+IHtcbiAgY29uc3QgZ2V0SWNvbiA9ICgpID0+IHtcbiAgICBpZiAoaXRlbS50eXBlICE9PSAncHJvZmlsZS1kcm9wZG93bicpIHtcbiAgICAgIGNvbnN0IEljb24gPSBpdGVtLmljb247XG4gICAgICByZXR1cm4gSWNvbiAmJiA8SWNvbiBzaXplPXsyNH0gYXJpYS1oaWRkZW4gLz47XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8QXZhdGFyXG4gICAgICAgIHNyYz17aXRlbS5hdmF0YXJ9XG4gICAgICAgIGFsdD1cIlVzZXIgcHJvZmlsZSBhdmF0YXJcIlxuICAgICAgICBkaXNhYmxlRHJvcHNoYWRvd1xuICAgICAgICBzaXplPXsyNH1cbiAgICAgIC8+XG4gICAgKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxBbmNob3JcbiAgICAgIGFsaWduSXRlbXM9XCJjZW50ZXJcIlxuICAgICAgYXJpYS1sYWJlbD17YG9wZW4gJHtpdGVtLnRleHR9IHN1Ym1lbnVgfVxuICAgICAgYXM9XCJidXR0b25cIlxuICAgICAgZGF0YS10ZXN0aWQ9e2l0ZW0uZGF0YVRlc3RJZH1cbiAgICAgIGRpc3BsYXk9XCJmbGV4XCJcbiAgICAgIGp1c3RpZnlDb250ZW50PVwic3BhY2UtYmV0d2VlblwiXG4gICAgICBvbkNsaWNrPXsoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IG9wZW5TdWJNZW51KGV2ZW50LCBpdGVtKX1cbiAgICAgIHB5PXsxNn1cbiAgICAgIHJvbGU9XCJtZW51aXRlbVwiXG4gICAgICB2YXJpYW50PVwiaW50ZXJmYWNlXCJcbiAgICAgIHdpZHRoPVwiMTAwJVwiXG4gICAgPlxuICAgICAge2dldEljb24oKX1cbiAgICAgIDxTdHlsZWRUZXh0PlxuICAgICAgICB7aXRlbS50eXBlID09PSAncHJvZmlsZS1kcm9wZG93bicgPyBpdGVtLnVzZXJEaXNwbGF5TmFtZSA6IGl0ZW0udGV4dH1cbiAgICAgIDwvU3R5bGVkVGV4dD5cbiAgICAgIDxBcnJvd0NoZXZyb25SaWdodEljb24gbWw9XCJhdXRvXCIgbXk9XCJhdXRvXCIgc2l6ZT17MTJ9IGFyaWEtaGlkZGVuIC8+XG4gICAgPC9BbmNob3I+XG4gICk7XG59O1xuIl19 */");
export var AppHeaderSubMenuTarget = function AppHeaderSubMenuTarget(_ref) {
  var item = _ref.item,
    openSubMenu = _ref.openSubMenu;
  var getIcon = function getIcon() {
    if (item.type !== 'profile-dropdown') {
      var Icon = item.icon;
      return Icon && /*#__PURE__*/_jsx(Icon, {
        size: 24,
        "aria-hidden": true
      });
    }
    return /*#__PURE__*/_jsx(Avatar, {
      src: item.avatar,
      alt: "User profile avatar",
      disableDropshadow: true,
      size: 24
    });
  };
  return /*#__PURE__*/_jsxs(Anchor, {
    alignItems: "center",
    "aria-label": "open ".concat(item.text, " submenu"),
    as: "button",
    "data-testid": item.dataTestId,
    display: "flex",
    justifyContent: "space-between",
    onClick: function onClick(event) {
      return openSubMenu(event, item);
    },
    py: 16,
    role: "menuitem",
    variant: "interface",
    width: "100%",
    children: [getIcon(), /*#__PURE__*/_jsx(StyledText, {
      children: item.type === 'profile-dropdown' ? item.userDisplayName : item.text
    }), /*#__PURE__*/_jsx(ArrowChevronRightIcon, {
      ml: "auto",
      my: "auto",
      size: 12,
      "aria-hidden": true
    })]
  });
};