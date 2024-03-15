import _styled from "@emotion/styled/base";
import { Box, TextButton } from '@codecademy/gamut';
import { css, states, useCurrentMode } from '@codecademy/gamut-styles';
import React from 'react';

var TabButton = /*#__PURE__*/_styled(TextButton, {
  target: "e1x96zdk0",
  label: "TabButton"
})(css({
  borderLeft: 'none',
  borderRight: 'none',
  borderTop: 'none',
  borderColor: 'transparent',
  borderBottomStyle: 'solid',
  borderBottomWidth: '0.1875rem',
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  fontWeight: 400,
  fontSize: 18,
  textOverflow: 'ellipsis',
  color: 'text'
}), states({
  isActiveTab: {
    borderColor: 'primary',
    fontWeight: 700,
    color: 'primary'
  },
  isLightActiveTab: {
    borderColor: 'navy',
    color: 'navy'
  }
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9UYWJzRXhwZXJpbWVudGFsL1RhYi50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBV2tCIiwiZmlsZSI6Ii4uLy4uL3NyYy9UYWJzRXhwZXJpbWVudGFsL1RhYi50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb3gsIFRleHRCdXR0b24gfSBmcm9tICdAY29kZWNhZGVteS9nYW11dCc7XG5pbXBvcnQgeyBjc3MsIHN0YXRlcywgdXNlQ3VycmVudE1vZGUgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1zdHlsZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgVGFiUHJvcHMgfSBmcm9tICcuL3R5cGVzJztcblxudHlwZSBUYWJCdXR0b25Qcm9wcyA9IFBpY2s8VGFiUHJvcHMsICdpc0FjdGl2ZVRhYic+ICYge1xuICBpc0xpZ2h0QWN0aXZlVGFiOiBib29sZWFuO1xufTtcblxuY29uc3QgVGFiQnV0dG9uID0gc3R5bGVkKFRleHRCdXR0b24pPFRhYkJ1dHRvblByb3BzPihcbiAgY3NzKHtcbiAgICBib3JkZXJMZWZ0OiAnbm9uZScsXG4gICAgYm9yZGVyUmlnaHQ6ICdub25lJyxcbiAgICBib3JkZXJUb3A6ICdub25lJyxcbiAgICBib3JkZXJDb2xvcjogJ3RyYW5zcGFyZW50JyxcbiAgICBib3JkZXJCb3R0b21TdHlsZTogJ3NvbGlkJyxcbiAgICBib3JkZXJCb3R0b21XaWR0aDogJzAuMTg3NXJlbScsXG4gICAgYm9yZGVyQm90dG9tTGVmdFJhZGl1czogMCxcbiAgICBib3JkZXJCb3R0b21SaWdodFJhZGl1czogMCxcbiAgICBmb250V2VpZ2h0OiA0MDAsXG4gICAgZm9udFNpemU6IDE4LFxuICAgIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJyxcbiAgICBjb2xvcjogJ3RleHQnLFxuICB9KSxcbiAgc3RhdGVzKHtcbiAgICBpc0FjdGl2ZVRhYjoge1xuICAgICAgYm9yZGVyQ29sb3I6ICdwcmltYXJ5JyxcbiAgICAgIGZvbnRXZWlnaHQ6IDcwMCxcbiAgICAgIGNvbG9yOiAncHJpbWFyeScsXG4gICAgfSxcbiAgICBpc0xpZ2h0QWN0aXZlVGFiOiB7XG4gICAgICBib3JkZXJDb2xvcjogJ25hdnknLFxuICAgICAgY29sb3I6ICduYXZ5JyxcbiAgICB9LFxuICB9KVxuKTtcblxuZXhwb3J0IGNvbnN0IFRhYjogUmVhY3QuRkM8VGFiUHJvcHM+ID0gKHsgdGl0bGUsIGlzQWN0aXZlVGFiLCBvbkNsaWNrIH0pID0+IHtcbiAgY29uc3QgY29sb3JNb2RlID0gdXNlQ3VycmVudE1vZGUoKTtcbiAgcmV0dXJuIChcbiAgICA8Qm94XG4gICAgICBib3JkZXJCb3R0b209ezF9XG4gICAgICBib3JkZXJDb2xvcj17XG4gICAgICAgIGlzQWN0aXZlVGFiICYmIGNvbG9yTW9kZSA9PT0gJ2xpZ2h0J1xuICAgICAgICAgID8gJ25hdnktODAwJ1xuICAgICAgICAgIDogaXNBY3RpdmVUYWJcbiAgICAgICAgICA/ICdwcmltYXJ5J1xuICAgICAgICAgIDogJ3RleHQtZGlzYWJsZWQnXG4gICAgICB9XG4gICAgPlxuICAgICAgPFRhYkJ1dHRvblxuICAgICAgICB2YXJpYW50PXtpc0FjdGl2ZVRhYiA/ICdwcmltYXJ5JyA6ICdzZWNvbmRhcnknfVxuICAgICAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICAgICAgICByb2xlPVwidGFiXCJcbiAgICAgICAgYXJpYS1zZWxlY3RlZD17aXNBY3RpdmVUYWJ9XG4gICAgICAgIHdpZHRoPXsxNjB9XG4gICAgICAgIGlzQWN0aXZlVGFiPXtpc0FjdGl2ZVRhYn1cbiAgICAgICAgcHQ9ezh9XG4gICAgICAgIG92ZXJmbG93PVwiaGlkZGVuXCJcbiAgICAgICAgZGlzcGxheT1cImJsb2NrXCJcbiAgICAgICAgaXNMaWdodEFjdGl2ZVRhYj17Y29sb3JNb2RlID09PSAnbGlnaHQnICYmIGlzQWN0aXZlVGFifVxuICAgICAgPlxuICAgICAgICB7dGl0bGV9XG4gICAgICA8L1RhYkJ1dHRvbj5cbiAgICA8L0JveD5cbiAgKTtcbn07XG4iXX0= */");

export var Tab = function Tab(_ref) {
  var title = _ref.title,
      isActiveTab = _ref.isActiveTab,
      onClick = _ref.onClick;
  var colorMode = useCurrentMode();
  return /*#__PURE__*/React.createElement(Box, {
    borderBottom: 1,
    borderColor: isActiveTab && colorMode === 'light' ? 'navy-800' : isActiveTab ? 'primary' : 'text-disabled'
  }, /*#__PURE__*/React.createElement(TabButton, {
    variant: isActiveTab ? 'primary' : 'secondary',
    onClick: onClick,
    role: "tab",
    "aria-selected": isActiveTab,
    width: 160,
    isActiveTab: isActiveTab,
    pt: 8,
    overflow: "hidden",
    display: "block",
    isLightActiveTab: colorMode === 'light' && isActiveTab
  }, title));
};