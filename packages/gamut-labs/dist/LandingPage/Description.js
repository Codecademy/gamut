import { Box, Markdown } from '@codecademy/gamut';
import React from 'react';
export var Description = function Description(_ref) {
  var text = _ref.text,
      onAnchorClick = _ref.onAnchorClick;
  return /*#__PURE__*/React.createElement(Box, {
    maxWidth: "38rem",
    mt: 16
  }, /*#__PURE__*/React.createElement(Markdown, {
    text: text,
    onAnchorClick: onAnchorClick
  }));
};