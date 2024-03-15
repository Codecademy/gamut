import _styled from "@emotion/styled/base";

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { Box } from '@codecademy/gamut';
import { css } from '@codecademy/gamut-styles';
import React from 'react';
export var StyledListItem = /*#__PURE__*/_styled(Box, {
  target: "eargl5z0",
  label: "StyledListItem"
})(css({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  position: "relative",
  '&:first-of-type': {
    ml: {
      md: 0
    }
  },
  '&:last-of-type': {
    mr: {
      md: 0
    }
  }
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9BcHBIZWFkZXIvQXBwSGVhZGVyRWxlbWVudHMvQXBwSGVhZGVyTGlzdEl0ZW0vaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUs4QiIsImZpbGUiOiIuLi8uLi8uLi8uLi9zcmMvQXBwSGVhZGVyL0FwcEhlYWRlckVsZW1lbnRzL0FwcEhlYWRlckxpc3RJdGVtL2luZGV4LnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJveCwgQm94UHJvcHMgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dCc7XG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1zdHlsZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGNvbnN0IFN0eWxlZExpc3RJdGVtID0gc3R5bGVkKEJveCkoXG4gIGNzcyh7XG4gICAgZGlzcGxheTogYGZsZXhgLFxuICAgIGp1c3RpZnlDb250ZW50OiBgY2VudGVyYCxcbiAgICBmbGV4RGlyZWN0aW9uOiBgY29sdW1uYCxcbiAgICBwb3NpdGlvbjogYHJlbGF0aXZlYCxcblxuICAgICcmOmZpcnN0LW9mLXR5cGUnOiB7XG4gICAgICBtbDogeyBtZDogMCB9LFxuICAgIH0sXG4gICAgJyY6bGFzdC1vZi10eXBlJzoge1xuICAgICAgbXI6IHsgbWQ6IDAgfSxcbiAgICB9LFxuICB9KVxuKTtcblxudHlwZSBBcHBIZWFkZXJMaXN0SXRlbVByb3BzID0ge1xuICBvbkJsdXI/OiAoKSA9PiB2b2lkO1xuICBvbkZvY3VzPzogKCkgPT4gdm9pZDtcbn0gJiBCb3hQcm9wcztcblxuZXhwb3J0IGNvbnN0IEFwcEhlYWRlckxpc3RJdGVtOiBSZWFjdC5GQzxBcHBIZWFkZXJMaXN0SXRlbVByb3BzPiA9ICh7XG4gIGNoaWxkcmVuLFxuICAuLi5wcm9wc1xufSkgPT4gKFxuICA8U3R5bGVkTGlzdEl0ZW0gYXM9XCJsaVwiIHJvbGU9XCJub25lXCIgey4uLnByb3BzfT5cbiAgICB7Y2hpbGRyZW59XG4gIDwvU3R5bGVkTGlzdEl0ZW0+XG4pO1xuIl19 */");
export var AppHeaderListItem = function AppHeaderListItem(_ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, ["children"]);

  return /*#__PURE__*/React.createElement(StyledListItem, _extends({
    as: "li",
    role: "none"
  }, props), children);
};