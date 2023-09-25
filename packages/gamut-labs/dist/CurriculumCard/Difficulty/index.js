import _styled from "@emotion/styled/base";
import { Box, Text } from '@codecademy/gamut';
import { pxRem, system, theme } from '@codecademy/gamut-styles';
import { times, uniqueId } from 'lodash';
import * as React from 'react';
import { getDifficultyNumber } from './helpers';
import { DifficultyString } from './types';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var DifficultySpan = /*#__PURE__*/_styled(Box, {
  target: "e3kpyr80",
  label: "DifficultySpan"
})(system.variant({
  base: {
    display: 'inline-block',
    marginRight: pxRem(4),
    verticalAlign: 'middle',
    border: 1,
    background: theme.colors.navy,
    marginBottom: pxRem(1)
  },
  defaultVariant: 'small',
  variants: {
    small: {
      width: pxRem(8),
      height: pxRem(8),
      borderRadius: pxRem(8)
    },
    medium: {
      width: pxRem(10),
      height: pxRem(10),
      borderRadius: pxRem(10)
    }
  }
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9DdXJyaWN1bHVtQ2FyZC9EaWZmaWN1bHR5L2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFTdUIiLCJmaWxlIjoiLi4vLi4vLi4vc3JjL0N1cnJpY3VsdW1DYXJkL0RpZmZpY3VsdHkvaW5kZXgudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQm94LCBUZXh0IH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQnO1xuaW1wb3J0IHsgcHhSZW0sIHN5c3RlbSwgdGhlbWUgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1zdHlsZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgdGltZXMsIHVuaXF1ZUlkIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgZ2V0RGlmZmljdWx0eU51bWJlciB9IGZyb20gJy4vaGVscGVycyc7XG5pbXBvcnQgeyBDb250ZW50RGlmZmljdWx0eVByb3BzLCBEaWZmaWN1bHR5U3RyaW5nIH0gZnJvbSAnLi90eXBlcyc7XG5cbmNvbnN0IERpZmZpY3VsdHlTcGFuID0gc3R5bGVkKEJveCkoXG4gIHN5c3RlbS52YXJpYW50KHtcbiAgICBiYXNlOiB7XG4gICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgIG1hcmdpblJpZ2h0OiBweFJlbSg0KSxcbiAgICAgIHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxuICAgICAgYm9yZGVyOiAxLFxuICAgICAgYmFja2dyb3VuZDogdGhlbWUuY29sb3JzLm5hdnksXG4gICAgICBtYXJnaW5Cb3R0b206IHB4UmVtKDEpLFxuICAgIH0sXG4gICAgZGVmYXVsdFZhcmlhbnQ6ICdzbWFsbCcsXG4gICAgdmFyaWFudHM6IHtcbiAgICAgIHNtYWxsOiB7XG4gICAgICAgIHdpZHRoOiBweFJlbSg4KSxcbiAgICAgICAgaGVpZ2h0OiBweFJlbSg4KSxcbiAgICAgICAgYm9yZGVyUmFkaXVzOiBweFJlbSg4KSxcbiAgICAgIH0sXG4gICAgICBtZWRpdW06IHtcbiAgICAgICAgd2lkdGg6IHB4UmVtKDEwKSxcbiAgICAgICAgaGVpZ2h0OiBweFJlbSgxMCksXG4gICAgICAgIGJvcmRlclJhZGl1czogcHhSZW0oMTApLFxuICAgICAgfSxcbiAgICB9LFxuICB9KVxuKTtcblxuZXhwb3J0IGNvbnN0IERpZmZpY3VsdHk6IFJlYWN0LkZDPENvbnRlbnREaWZmaWN1bHR5UHJvcHM+ID0gKHtcbiAgZGlmZmljdWx0eSxcbiAgdmFyaWFudCxcbn0pID0+IHtcbiAgY29uc3QgZGlmZmljdWx0eU51bWJlciA9IGdldERpZmZpY3VsdHlOdW1iZXIoZGlmZmljdWx0eSk7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAge3RpbWVzKGRpZmZpY3VsdHlOdW1iZXIgKyAxLCAoKSA9PiAoXG4gICAgICAgIDxEaWZmaWN1bHR5U3BhbiBrZXk9e3VuaXF1ZUlkKCl9IHZhcmlhbnQ9e3ZhcmlhbnR9IC8+XG4gICAgICApKX1cbiAgICAgIDxUZXh0PntEaWZmaWN1bHR5U3RyaW5nW2RpZmZpY3VsdHlOdW1iZXJdfTwvVGV4dD5cbiAgICA8Lz5cbiAgKTtcbn07XG4iXX0= */");
export var Difficulty = function Difficulty(_ref) {
  var difficulty = _ref.difficulty,
    variant = _ref.variant;
  var difficultyNumber = getDifficultyNumber(difficulty);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [times(difficultyNumber + 1, function () {
      return /*#__PURE__*/_jsx(DifficultySpan, {
        variant: variant
      }, uniqueId());
    }), /*#__PURE__*/_jsx(Text, {
      children: DifficultyString[difficultyNumber]
    })]
  });
};