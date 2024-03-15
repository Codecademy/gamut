import _styled from "@emotion/styled/base";
import { Anchor, Text } from '@codecademy/gamut';
import { ArrowChevronRightIcon } from '@codecademy/gamut-icons';
import { css } from '@codecademy/gamut-styles';
import React from 'react';
import { Avatar } from '../../Avatar';

var StyledText = /*#__PURE__*/_styled(Text, {
  target: "ersv5pq0",
  label: "StyledText"
})(css({
  ml: 16,
  maxWidth: "70vw",
  overflow: "hidden",
  textOverflow: "ellipsis"
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9BcHBIZWFkZXJNb2JpbGUvQXBwSGVhZGVyU3ViTWVudVRhcmdldC9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMkJtQiIsImZpbGUiOiIuLi8uLi8uLi9zcmMvQXBwSGVhZGVyTW9iaWxlL0FwcEhlYWRlclN1Yk1lbnVUYXJnZXQvaW5kZXgudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW5jaG9yLCBUZXh0IH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQnO1xuaW1wb3J0IHsgQXJyb3dDaGV2cm9uUmlnaHRJY29uIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQtaWNvbnMnO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQtc3R5bGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7XG4gIEFwcEhlYWRlckNhdGFsb2dEcm9wZG93bkl0ZW0sXG4gIEFwcEhlYWRlckRyb3Bkb3duSXRlbSxcbiAgQXBwSGVhZGVyUmVzb3VyY2VzRHJvcGRvd25JdGVtLFxufSBmcm9tICcuLi8uLi9BcHBIZWFkZXIvQXBwSGVhZGVyRWxlbWVudHMvdHlwZXMnO1xuaW1wb3J0IHsgQXZhdGFyIH0gZnJvbSAnLi4vLi4vQXZhdGFyJztcblxuZXhwb3J0IHR5cGUgQXBwSGVhZGVyU3ViTWVudVRhcmdldFByb3BzID0ge1xuICBpdGVtOlxuICAgIHwgQXBwSGVhZGVyRHJvcGRvd25JdGVtXG4gICAgfCBBcHBIZWFkZXJDYXRhbG9nRHJvcGRvd25JdGVtXG4gICAgfCBBcHBIZWFkZXJSZXNvdXJjZXNEcm9wZG93bkl0ZW07XG4gIG9wZW5TdWJNZW51OiAoXG4gICAgZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQsXG4gICAgaXRlbTpcbiAgICAgIHwgQXBwSGVhZGVyRHJvcGRvd25JdGVtXG4gICAgICB8IEFwcEhlYWRlckNhdGFsb2dEcm9wZG93bkl0ZW1cbiAgICAgIHwgQXBwSGVhZGVyUmVzb3VyY2VzRHJvcGRvd25JdGVtXG4gICkgPT4gdm9pZDtcbn07XG5cbmNvbnN0IFN0eWxlZFRleHQgPSBzdHlsZWQoVGV4dCkoXG4gIGNzcyh7XG4gICAgbWw6IDE2LFxuICAgIG1heFdpZHRoOiBgNzB2d2AsXG4gICAgb3ZlcmZsb3c6IGBoaWRkZW5gLFxuICAgIHRleHRPdmVyZmxvdzogYGVsbGlwc2lzYCxcbiAgfSlcbik7XG5cbmV4cG9ydCBjb25zdCBBcHBIZWFkZXJTdWJNZW51VGFyZ2V0OiBSZWFjdC5GQzxBcHBIZWFkZXJTdWJNZW51VGFyZ2V0UHJvcHM+ID0gKHtcbiAgaXRlbSxcbiAgb3BlblN1Yk1lbnUsXG59KSA9PiB7XG4gIGNvbnN0IGdldEljb24gPSAoKSA9PiB7XG4gICAgaWYgKGl0ZW0udHlwZSAhPT0gJ3Byb2ZpbGUtZHJvcGRvd24nKSB7XG4gICAgICBjb25zdCBJY29uID0gaXRlbS5pY29uO1xuICAgICAgcmV0dXJuIEljb24gJiYgPEljb24gc2l6ZT17MjR9IGFyaWEtaGlkZGVuIC8+O1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPEF2YXRhclxuICAgICAgICBzcmM9e2l0ZW0uYXZhdGFyfVxuICAgICAgICBhbHQ9XCJVc2VyIHByb2ZpbGUgYXZhdGFyXCJcbiAgICAgICAgZGlzYWJsZURyb3BzaGFkb3dcbiAgICAgICAgc2l6ZT17MjR9XG4gICAgICAvPlxuICAgICk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8QW5jaG9yXG4gICAgICBhbGlnbkl0ZW1zPVwiY2VudGVyXCJcbiAgICAgIGFyaWEtbGFiZWw9e2BvcGVuICR7aXRlbS50ZXh0fSBzdWJtZW51YH1cbiAgICAgIGFzPVwiYnV0dG9uXCJcbiAgICAgIGRhdGEtdGVzdGlkPXtpdGVtLmRhdGFUZXN0SWR9XG4gICAgICBkaXNwbGF5PVwiZmxleFwiXG4gICAgICBqdXN0aWZ5Q29udGVudD1cInNwYWNlLWJldHdlZW5cIlxuICAgICAgb25DbGljaz17KGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiBvcGVuU3ViTWVudShldmVudCwgaXRlbSl9XG4gICAgICBweT17MTZ9XG4gICAgICByb2xlPVwibWVudWl0ZW1cIlxuICAgICAgdmFyaWFudD1cImludGVyZmFjZVwiXG4gICAgICB3aWR0aD1cIjEwMCVcIlxuICAgID5cbiAgICAgIHtnZXRJY29uKCl9XG4gICAgICA8U3R5bGVkVGV4dD5cbiAgICAgICAge2l0ZW0udHlwZSA9PT0gJ3Byb2ZpbGUtZHJvcGRvd24nID8gaXRlbS51c2VyRGlzcGxheU5hbWUgOiBpdGVtLnRleHR9XG4gICAgICA8L1N0eWxlZFRleHQ+XG4gICAgICA8QXJyb3dDaGV2cm9uUmlnaHRJY29uIG1sPVwiYXV0b1wiIG15PVwiYXV0b1wiIHNpemU9ezEyfSBhcmlhLWhpZGRlbiAvPlxuICAgIDwvQW5jaG9yPlxuICApO1xufTtcbiJdfQ== */");

export var AppHeaderSubMenuTarget = function AppHeaderSubMenuTarget(_ref) {
  var item = _ref.item,
      openSubMenu = _ref.openSubMenu;

  var getIcon = function getIcon() {
    if (item.type !== 'profile-dropdown') {
      var Icon = item.icon;
      return Icon && /*#__PURE__*/React.createElement(Icon, {
        size: 24,
        "aria-hidden": true
      });
    }

    return /*#__PURE__*/React.createElement(Avatar, {
      src: item.avatar,
      alt: "User profile avatar",
      disableDropshadow: true,
      size: 24
    });
  };

  return /*#__PURE__*/React.createElement(Anchor, {
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
    width: "100%"
  }, getIcon(), /*#__PURE__*/React.createElement(StyledText, null, item.type === 'profile-dropdown' ? item.userDisplayName : item.text), /*#__PURE__*/React.createElement(ArrowChevronRightIcon, {
    ml: "auto",
    my: "auto",
    size: 12,
    "aria-hidden": true
  }));
};