import { Box, Card, Text } from '@codecademy/gamut';
import * as React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var HubCard = function HubCard(_ref) {
  var eyebrowTitle = _ref.eyebrowTitle,
    title = _ref.title,
    backgroundPosition = _ref.backgroundPosition,
    backgroundImage = _ref.backgroundImage;
  return /*#__PURE__*/_jsx(Card, {
    variant: "white",
    shadow: "medium",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: backgroundPosition,
    backgroundImage: "url(".concat(backgroundImage, ")"),
    height: "11.25rem",
    children: /*#__PURE__*/_jsxs(Box, {
      p: 24,
      bg: "white",
      width: "100%",
      maxWidth: "17.5rem",
      children: [/*#__PURE__*/_jsx(Text, {
        as: "p",
        fontSize: 16,
        children: eyebrowTitle
      }), /*#__PURE__*/_jsx(Text, {
        as: "p",
        variant: "title-sm",
        children: title
      })]
    })
  });
};