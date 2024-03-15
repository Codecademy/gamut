import { Box, Text } from '@codecademy/gamut';
import React from 'react';
var colorMap = {
  blue: 'paleBlue',
  green: 'paleGreen',
  pink: "palePink"
};
export var BottomTag = function BottomTag(_ref) {
  var text = _ref.text,
      color = _ref.color;
  return /*#__PURE__*/React.createElement(Box, {
    position: "absolute",
    bottom: 0,
    right: 0,
    bg: colorMap[color]
  }, /*#__PURE__*/React.createElement(Text, {
    py: 4,
    p: 12,
    variant: "title-xs",
    fontSize: 14
  }, text));
};