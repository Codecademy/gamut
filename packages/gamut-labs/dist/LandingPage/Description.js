import { Box, Markdown } from '@codecademy/gamut';
import * as React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
export var Description = function Description(_ref) {
  var text = _ref.text,
    onAnchorClick = _ref.onAnchorClick;
  return /*#__PURE__*/_jsx(Box, {
    maxWidth: "38rem",
    mt: 16,
    children: /*#__PURE__*/_jsx(Markdown, {
      text: text,
      onAnchorClick: onAnchorClick
    })
  });
};