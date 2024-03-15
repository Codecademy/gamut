import _styled from "@emotion/styled/base";
import { Box, Text } from '@codecademy/gamut';
import { pxRem, system, theme } from '@codecademy/gamut-styles';
import { times, uniqueId } from 'lodash';
import React from 'react';
import { getDifficultyNumber } from './helpers';
import { DifficultyString } from './types';

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
}), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9DdXJyaWN1bHVtQ2FyZC9EaWZmaWN1bHR5L2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFTdUIiLCJmaWxlIjoiLi4vLi4vLi4vc3JjL0N1cnJpY3VsdW1DYXJkL0RpZmZpY3VsdHkvaW5kZXgudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQm94LCBUZXh0IH0gZnJvbSAnQGNvZGVjYWRlbXkvZ2FtdXQnO1xuaW1wb3J0IHsgcHhSZW0sIHN5c3RlbSwgdGhlbWUgfSBmcm9tICdAY29kZWNhZGVteS9nYW11dC1zdHlsZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgdGltZXMsIHVuaXF1ZUlkIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IGdldERpZmZpY3VsdHlOdW1iZXIgfSBmcm9tICcuL2hlbHBlcnMnO1xuaW1wb3J0IHsgQ29udGVudERpZmZpY3VsdHlQcm9wcywgRGlmZmljdWx0eVN0cmluZyB9IGZyb20gJy4vdHlwZXMnO1xuXG5jb25zdCBEaWZmaWN1bHR5U3BhbiA9IHN0eWxlZChCb3gpKFxuICBzeXN0ZW0udmFyaWFudCh7XG4gICAgYmFzZToge1xuICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICBtYXJnaW5SaWdodDogcHhSZW0oNCksXG4gICAgICB2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcbiAgICAgIGJvcmRlcjogMSxcbiAgICAgIGJhY2tncm91bmQ6IHRoZW1lLmNvbG9ycy5uYXZ5LFxuICAgICAgbWFyZ2luQm90dG9tOiBweFJlbSgxKSxcbiAgICB9LFxuICAgIGRlZmF1bHRWYXJpYW50OiAnc21hbGwnLFxuICAgIHZhcmlhbnRzOiB7XG4gICAgICBzbWFsbDoge1xuICAgICAgICB3aWR0aDogcHhSZW0oOCksXG4gICAgICAgIGhlaWdodDogcHhSZW0oOCksXG4gICAgICAgIGJvcmRlclJhZGl1czogcHhSZW0oOCksXG4gICAgICB9LFxuICAgICAgbWVkaXVtOiB7XG4gICAgICAgIHdpZHRoOiBweFJlbSgxMCksXG4gICAgICAgIGhlaWdodDogcHhSZW0oMTApLFxuICAgICAgICBib3JkZXJSYWRpdXM6IHB4UmVtKDEwKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSlcbik7XG5cbmV4cG9ydCBjb25zdCBEaWZmaWN1bHR5OiBSZWFjdC5GQzxDb250ZW50RGlmZmljdWx0eVByb3BzPiA9ICh7XG4gIGRpZmZpY3VsdHksXG4gIHZhcmlhbnQsXG59KSA9PiB7XG4gIGNvbnN0IGRpZmZpY3VsdHlOdW1iZXIgPSBnZXREaWZmaWN1bHR5TnVtYmVyKGRpZmZpY3VsdHkpO1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIHt0aW1lcyhkaWZmaWN1bHR5TnVtYmVyICsgMSwgKCkgPT4gKFxuICAgICAgICA8RGlmZmljdWx0eVNwYW4ga2V5PXt1bmlxdWVJZCgpfSB2YXJpYW50PXt2YXJpYW50fSAvPlxuICAgICAgKSl9XG4gICAgICA8VGV4dD57RGlmZmljdWx0eVN0cmluZ1tkaWZmaWN1bHR5TnVtYmVyXX08L1RleHQ+XG4gICAgPC8+XG4gICk7XG59O1xuIl19 */");

export var Difficulty = function Difficulty(_ref) {
  var difficulty = _ref.difficulty,
      variant = _ref.variant;
  var difficultyNumber = getDifficultyNumber(difficulty);
  return /*#__PURE__*/React.createElement(React.Fragment, null, times(difficultyNumber + 1, function () {
    return /*#__PURE__*/React.createElement(DifficultySpan, {
      key: uniqueId(),
      variant: variant
    });
  }), /*#__PURE__*/React.createElement(Text, null, DifficultyString[difficultyNumber]));
};