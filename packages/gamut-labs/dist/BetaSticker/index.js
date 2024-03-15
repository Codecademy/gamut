import { FlexBox, Text } from '@codecademy/gamut';
import { useTheme } from '@emotion/react';
import React from 'react';
export var BetaSticker = function BetaSticker() {
  var _useTheme = useTheme(),
      text = _useTheme.colors.text;

  return /*#__PURE__*/React.createElement(FlexBox, {
    inline: true,
    center: true,
    bg: "transparent",
    boxShadow: "-2px 2px 0 ".concat(text),
    height: 26,
    width: 52
  }, /*#__PURE__*/React.createElement(Text, {
    fontWeight: "bold",
    letterSpacing: "1px",
    color: "text"
  }, "BETA"));
};