import { Box, Text } from '@codecademy/gamut';
import * as React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
var colorMap = {
  blue: 'paleBlue',
  green: 'paleGreen',
  pink: "palePink"
};
export var BottomTag = function BottomTag(_ref) {
  var text = _ref.text,
    color = _ref.color;
  return /*#__PURE__*/_jsx(Box, {
    position: "absolute",
    bottom: 0,
    right: 0,
    bg: colorMap[color],
    children: /*#__PURE__*/_jsx(Text, {
      py: 4,
      p: 12,
      variant: "title-xs",
      fontSize: 14,
      children: text
    })
  });
};