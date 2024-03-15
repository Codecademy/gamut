import { Box, Text } from '@codecademy/gamut';
import React from 'react';
export var SelectedSectionItem = function SelectedSectionItem(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React.createElement(Box, {
    borderLeft: 1,
    borderWidthLeft: "6px",
    pl: 12,
    "aria-current": "true"
  }, /*#__PURE__*/React.createElement(Text, {
    fontWeight: "title"
  }, children));
};