import _styled from "@emotion/styled/base";
import { Box } from '@codecademy/gamut';
import { system, transitionConcat } from '@codecademy/gamut-styles';
import { useTheme } from '@emotion/react';
import React from 'react';
import { useIsInHeaderRegion } from './useIsInHeaderRegion';

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
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9IZWFkZXJIZWlnaHRBcmVhL2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFTNkIiLCJmaWxlIjoiLi4vLi4vc3JjL0hlYWRlckhlaWdodEFyZWEvaW5kZXgudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQm94IH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQnO1xuaW1wb3J0IHsgc3lzdGVtLCB0cmFuc2l0aW9uQ29uY2F0IH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQtc3R5bGVzJztcbmltcG9ydCB7IFJlc3BvbnNpdmVQcm9wIH0gZnJvbSAnQGNvZGVjYWRlbXkvdmFyaWFuY2UnO1xuaW1wb3J0IHsgdXNlVGhlbWUgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyB1c2VJc0luSGVhZGVyUmVnaW9uIH0gZnJvbSAnLi91c2VJc0luSGVhZGVyUmVnaW9uJztcblxuY29uc3QgSGVhZGVySGVpZ2h0QXJlYUJhc2UgPSBzdHlsZWQoQm94KShcbiAgc3lzdGVtLmNzcyh7XG4gICAgYm9yZGVyQm90dG9tOiAxLFxuICAgIGJnOiAnYmFja2dyb3VuZCcsXG4gICAgdG9wOiAwLFxuICAgIHpJbmRleDogMixcbiAgICB3aWR0aDogMSxcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2l0aW9uQ29uY2F0KFxuICAgICAgWydiYWNrZ3JvdW5kLWNvbG9yJywgJ2JvcmRlci1ib3R0b20tY29sb3InXSxcbiAgICAgICdmYXN0JyxcbiAgICAgICdlYXNlLWluLW91dCdcbiAgICApLFxuICB9KSxcbiAgc3lzdGVtLnN0YXRlcyh7XG4gICAgZmFkZWQ6IHtcbiAgICAgIGJnOiAnYmFja2dyb3VuZC1jdXJyZW50JyxcbiAgICAgIGJvcmRlckNvbG9yOiAnYmFja2dyb3VuZC1jdXJyZW50JyxcbiAgICB9LFxuICB9KVxuKTtcblxuZXhwb3J0IHR5cGUgSGVhZGVySGVpZ2h0QXJlYVByb3BzID0ge1xuICBhcz86IFJlYWN0LkVsZW1lbnRUeXBlPGFueT47XG4gIGRpc3BsYXk6IFJlc3BvbnNpdmVQcm9wPCdub25lJyB8ICdibG9jayc+O1xuICB0aXRsZT86IHN0cmluZztcbn07XG5cbmV4cG9ydCBjb25zdCBIZWFkZXJIZWlnaHRBcmVhOiBSZWFjdC5GQzxIZWFkZXJIZWlnaHRBcmVhUHJvcHM+ID0gKHtcbiAgYXMsXG4gIGNoaWxkcmVuLFxuICBkaXNwbGF5LFxuICB0aXRsZSxcbn0pID0+IHtcbiAgY29uc3QgdGhlbWUgPSB1c2VUaGVtZSgpO1xuICBjb25zdCBpc0luSGVhZGVyUmVnaW9uID0gdXNlSXNJbkhlYWRlclJlZ2lvbigpO1xuXG4gIHJldHVybiAoXG4gICAgPEhlYWRlckhlaWdodEFyZWFCYXNlXG4gICAgICBhcz17YXN9XG4gICAgICBkaXNwbGF5PXtkaXNwbGF5fVxuICAgICAgaGVpZ2h0PXt0aGVtZS5lbGVtZW50cy5oZWFkZXJIZWlnaHR9XG4gICAgICBmYWRlZD17aXNJbkhlYWRlclJlZ2lvbn1cbiAgICAgIHRpdGxlPXt0aXRsZX1cbiAgICA+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9IZWFkZXJIZWlnaHRBcmVhQmFzZT5cbiAgKTtcbn07XG4iXX0= */");

export var HeaderHeightArea = function HeaderHeightArea(_ref) {
  var as = _ref.as,
      children = _ref.children,
      display = _ref.display,
      title = _ref.title;
  var theme = useTheme();
  var isInHeaderRegion = useIsInHeaderRegion();
  return /*#__PURE__*/React.createElement(HeaderHeightAreaBase, {
    as: as,
    display: display,
    height: theme.elements.headerHeight,
    faded: isInHeaderRegion,
    title: title
  }, children);
};