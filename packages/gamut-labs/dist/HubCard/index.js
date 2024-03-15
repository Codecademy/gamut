import { Box, Card, Text } from '@codecademy/gamut';
import React from 'react';
export var HubCard = function HubCard(_ref) {
  var eyebrowTitle = _ref.eyebrowTitle,
      title = _ref.title,
      backgroundPosition = _ref.backgroundPosition,
      backgroundImage = _ref.backgroundImage;
  return /*#__PURE__*/React.createElement(Card, {
    variant: "white",
    shadow: "medium",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: backgroundPosition,
    backgroundImage: "url(".concat(backgroundImage, ")"),
    height: "11.25rem"
  }, /*#__PURE__*/React.createElement(Box, {
    p: 24,
    bg: "white",
    width: "100%",
    maxWidth: "17.5rem"
  }, /*#__PURE__*/React.createElement(Text, {
    as: "p",
    fontSize: 16
  }, eyebrowTitle), /*#__PURE__*/React.createElement(Text, {
    as: "p",
    variant: "title-sm"
  }, title)));
};