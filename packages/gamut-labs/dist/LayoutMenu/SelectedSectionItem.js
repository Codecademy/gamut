import { Box, Text } from '@codecademy/gamut';
import * as React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
export var SelectedSectionItem = function SelectedSectionItem(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/_jsx(Box, {
    borderLeft: 1,
    borderWidthLeft: "6px",
    pl: 12,
    "aria-current": "true",
    children: /*#__PURE__*/_jsx(Text, {
      fontWeight: "title",
      children: children
    })
  });
};