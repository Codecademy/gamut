import _styled from "@emotion/styled/base";
import { Box } from '@codecademy/gamut';
import { system, transitionConcat } from '@codecademy/gamut-styles';
import { useTheme } from '@emotion/react';
import * as React from 'react';
import { useIsInHeaderRegion } from './useIsInHeaderRegion';
import { jsx as _jsx } from "react/jsx-runtime";
var HeaderHeightAreaBase = /*#__PURE__*/_styled(Box, {
  target: "e1n8bpez0",
  label: "HeaderHeightAreaBase"
})(system.css({
  borderBottom: 1,
  bg: 'background',
  top: 0,
  zIndex: 2,
  width: 1,
  transition: transitionConcat(['background-color', 'border-bottom-color'], 'fast', 'ease-in-out')
}), system.states({
  faded: {
    bg: 'background-current',
    borderColor: 'background-current'
  }
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9IZWFkZXJIZWlnaHRBcmVhL2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFTNkIiLCJmaWxlIjoiLi4vLi4vc3JjL0hlYWRlckhlaWdodEFyZWEvaW5kZXgudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQm94LCBXaXRoQ2hpbGRyZW5Qcm9wIH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQnO1xuaW1wb3J0IHsgc3lzdGVtLCB0cmFuc2l0aW9uQ29uY2F0IH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQtc3R5bGVzJztcbmltcG9ydCB7IFJlc3BvbnNpdmVQcm9wIH0gZnJvbSAnQGNvZGVjYWRlbXkvdmFyaWFuY2UnO1xuaW1wb3J0IHsgdXNlVGhlbWUgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IHVzZUlzSW5IZWFkZXJSZWdpb24gfSBmcm9tICcuL3VzZUlzSW5IZWFkZXJSZWdpb24nO1xuXG5jb25zdCBIZWFkZXJIZWlnaHRBcmVhQmFzZSA9IHN0eWxlZChCb3gpKFxuICBzeXN0ZW0uY3NzKHtcbiAgICBib3JkZXJCb3R0b206IDEsXG4gICAgYmc6ICdiYWNrZ3JvdW5kJyxcbiAgICB0b3A6IDAsXG4gICAgekluZGV4OiAyLFxuICAgIHdpZHRoOiAxLFxuICAgIHRyYW5zaXRpb246IHRyYW5zaXRpb25Db25jYXQoXG4gICAgICBbJ2JhY2tncm91bmQtY29sb3InLCAnYm9yZGVyLWJvdHRvbS1jb2xvciddLFxuICAgICAgJ2Zhc3QnLFxuICAgICAgJ2Vhc2UtaW4tb3V0J1xuICAgICksXG4gIH0pLFxuICBzeXN0ZW0uc3RhdGVzKHtcbiAgICBmYWRlZDoge1xuICAgICAgYmc6ICdiYWNrZ3JvdW5kLWN1cnJlbnQnLFxuICAgICAgYm9yZGVyQ29sb3I6ICdiYWNrZ3JvdW5kLWN1cnJlbnQnLFxuICAgIH0sXG4gIH0pXG4pO1xuXG5leHBvcnQgaW50ZXJmYWNlIEhlYWRlckhlaWdodEFyZWFQcm9wcyBleHRlbmRzIFdpdGhDaGlsZHJlblByb3Age1xuICBhcz86IFJlYWN0LkVsZW1lbnRUeXBlPGFueT47XG4gIGRpc3BsYXk6IFJlc3BvbnNpdmVQcm9wPCdub25lJyB8ICdibG9jayc+O1xuICB0aXRsZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IEhlYWRlckhlaWdodEFyZWE6IFJlYWN0LkZDPEhlYWRlckhlaWdodEFyZWFQcm9wcz4gPSAoe1xuICBhcyxcbiAgY2hpbGRyZW4sXG4gIGRpc3BsYXksXG4gIHRpdGxlLFxufSkgPT4ge1xuICBjb25zdCB0aGVtZSA9IHVzZVRoZW1lKCk7XG4gIGNvbnN0IGlzSW5IZWFkZXJSZWdpb24gPSB1c2VJc0luSGVhZGVyUmVnaW9uKCk7XG5cbiAgcmV0dXJuIChcbiAgICA8SGVhZGVySGVpZ2h0QXJlYUJhc2VcbiAgICAgIGFzPXthc31cbiAgICAgIGRpc3BsYXk9e2Rpc3BsYXl9XG4gICAgICBoZWlnaHQ9e3RoZW1lLmVsZW1lbnRzLmhlYWRlckhlaWdodH1cbiAgICAgIGZhZGVkPXtpc0luSGVhZGVyUmVnaW9ufVxuICAgICAgdGl0bGU9e3RpdGxlfVxuICAgID5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L0hlYWRlckhlaWdodEFyZWFCYXNlPlxuICApO1xufTtcbiJdfQ== */");
export var HeaderHeightArea = function HeaderHeightArea(_ref) {
  var as = _ref.as,
    children = _ref.children,
    display = _ref.display,
    title = _ref.title;
  var theme = useTheme();
  var isInHeaderRegion = useIsInHeaderRegion();
  return /*#__PURE__*/_jsx(HeaderHeightAreaBase, {
    as: as,
    display: display,
    height: theme.elements.headerHeight,
    faded: isInHeaderRegion,
    title: title,
    children: children
  });
};