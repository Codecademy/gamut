import { FlexBox, Text } from '@codecademy/gamut';
import { useTheme } from '@emotion/react';
import * as React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
export var BetaSticker = function BetaSticker() {
  var _useTheme = useTheme(),
    text = _useTheme.colors.text;
  return /*#__PURE__*/_jsx(FlexBox, {
    inline: true,
    center: true,
    bg: "transparent",
    boxShadow: "-2px 2px 0 ".concat(text),
    height: 26,
    width: 52,
    children: /*#__PURE__*/_jsx(Text, {
      fontWeight: "bold",
      letterSpacing: "1px",
      color: "text",
      children: "BETA"
    })
  });
};