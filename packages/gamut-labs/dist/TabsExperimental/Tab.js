import _styled from "@emotion/styled/base";
import { Box, TextButton } from '@codecademy/gamut';
import { css, states, useCurrentMode } from '@codecademy/gamut-styles';
import * as React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
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
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9UYWJzRXhwZXJpbWVudGFsL1RhYi50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBV2tCIiwiZmlsZSI6Ii4uLy4uL3NyYy9UYWJzRXhwZXJpbWVudGFsL1RhYi50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb3gsIFRleHRCdXR0b24gfSBmcm9tICdAY29kZWNhZGVteS9nYW11dCc7XG5pbXBvcnQgeyBjc3MsIHN0YXRlcywgdXNlQ3VycmVudE1vZGUgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1zdHlsZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBUYWJQcm9wcyB9IGZyb20gJy4vdHlwZXMnO1xuXG50eXBlIFRhYkJ1dHRvblByb3BzID0gUGljazxUYWJQcm9wcywgJ2lzQWN0aXZlVGFiJz4gJiB7XG4gIGlzTGlnaHRBY3RpdmVUYWI6IGJvb2xlYW47XG59O1xuXG5jb25zdCBUYWJCdXR0b24gPSBzdHlsZWQoVGV4dEJ1dHRvbik8VGFiQnV0dG9uUHJvcHM+KFxuICBjc3Moe1xuICAgIGJvcmRlckxlZnQ6ICdub25lJyxcbiAgICBib3JkZXJSaWdodDogJ25vbmUnLFxuICAgIGJvcmRlclRvcDogJ25vbmUnLFxuICAgIGJvcmRlckNvbG9yOiAndHJhbnNwYXJlbnQnLFxuICAgIGJvcmRlckJvdHRvbVN0eWxlOiAnc29saWQnLFxuICAgIGJvcmRlckJvdHRvbVdpZHRoOiAnMC4xODc1cmVtJyxcbiAgICBib3JkZXJCb3R0b21MZWZ0UmFkaXVzOiAwLFxuICAgIGJvcmRlckJvdHRvbVJpZ2h0UmFkaXVzOiAwLFxuICAgIGZvbnRXZWlnaHQ6IDQwMCxcbiAgICBmb250U2l6ZTogMTgsXG4gICAgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLFxuICAgIGNvbG9yOiAndGV4dCcsXG4gIH0pLFxuICBzdGF0ZXMoe1xuICAgIGlzQWN0aXZlVGFiOiB7XG4gICAgICBib3JkZXJDb2xvcjogJ3ByaW1hcnknLFxuICAgICAgZm9udFdlaWdodDogNzAwLFxuICAgICAgY29sb3I6ICdwcmltYXJ5JyxcbiAgICB9LFxuICAgIGlzTGlnaHRBY3RpdmVUYWI6IHtcbiAgICAgIGJvcmRlckNvbG9yOiAnbmF2eScsXG4gICAgICBjb2xvcjogJ25hdnknLFxuICAgIH0sXG4gIH0pXG4pO1xuXG5leHBvcnQgY29uc3QgVGFiOiBSZWFjdC5GQzxUYWJQcm9wcz4gPSAoeyB0aXRsZSwgaXNBY3RpdmVUYWIsIG9uQ2xpY2sgfSkgPT4ge1xuICBjb25zdCBjb2xvck1vZGUgPSB1c2VDdXJyZW50TW9kZSgpO1xuICByZXR1cm4gKFxuICAgIDxCb3hcbiAgICAgIGJvcmRlckJvdHRvbT17MX1cbiAgICAgIGJvcmRlckNvbG9yPXtcbiAgICAgICAgaXNBY3RpdmVUYWIgJiYgY29sb3JNb2RlID09PSAnbGlnaHQnXG4gICAgICAgICAgPyAnbmF2eS04MDAnXG4gICAgICAgICAgOiBpc0FjdGl2ZVRhYlxuICAgICAgICAgID8gJ3ByaW1hcnknXG4gICAgICAgICAgOiAndGV4dC1kaXNhYmxlZCdcbiAgICAgIH1cbiAgICA+XG4gICAgICA8VGFiQnV0dG9uXG4gICAgICAgIHZhcmlhbnQ9e2lzQWN0aXZlVGFiID8gJ3ByaW1hcnknIDogJ3NlY29uZGFyeSd9XG4gICAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICAgIHJvbGU9XCJ0YWJcIlxuICAgICAgICBhcmlhLXNlbGVjdGVkPXtpc0FjdGl2ZVRhYn1cbiAgICAgICAgd2lkdGg9ezE2MH1cbiAgICAgICAgaXNBY3RpdmVUYWI9e2lzQWN0aXZlVGFifVxuICAgICAgICBwdD17OH1cbiAgICAgICAgb3ZlcmZsb3c9XCJoaWRkZW5cIlxuICAgICAgICBkaXNwbGF5PVwiYmxvY2tcIlxuICAgICAgICBpc0xpZ2h0QWN0aXZlVGFiPXtjb2xvck1vZGUgPT09ICdsaWdodCcgJiYgaXNBY3RpdmVUYWJ9XG4gICAgICA+XG4gICAgICAgIHt0aXRsZX1cbiAgICAgIDwvVGFiQnV0dG9uPlxuICAgIDwvQm94PlxuICApO1xufTtcbiJdfQ== */");
export var Tab = function Tab(_ref) {
  var title = _ref.title,
    isActiveTab = _ref.isActiveTab,
    onClick = _ref.onClick;
  var colorMode = useCurrentMode();
  return /*#__PURE__*/_jsx(Box, {
    borderBottom: 1,
    borderColor: isActiveTab && colorMode === 'light' ? 'navy-800' : isActiveTab ? 'primary' : 'text-disabled',
    children: /*#__PURE__*/_jsx(TabButton, {
      variant: isActiveTab ? 'primary' : 'secondary',
      onClick: onClick,
      role: "tab",
      "aria-selected": isActiveTab,
      width: 160,
      isActiveTab: isActiveTab,
      pt: 8,
      overflow: "hidden",
      display: "block",
      isLightActiveTab: colorMode === 'light' && isActiveTab,
      children: title
    })
  });
};