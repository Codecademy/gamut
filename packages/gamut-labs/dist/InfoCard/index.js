import { Anchor, Box, Card, FlexBox, Text } from '@codecademy/gamut';
import { pxRem } from '@codecademy/gamut-styles';
import React from 'react';
var cardMinWidth = 250;
var tagColorMap = {
  blue: 'paleBlue',
  green: 'paleGreen',
  pink: 'palePink'
};

var TopText = function TopText(_ref) {
  var text = _ref.text;
  return /*#__PURE__*/React.createElement(Text, {
    display: "flex",
    fontSize: 14,
    mb: 12,
    fontFamily: "accent",
    textTransform: "capitalize"
  }, text);
};

var Title = function Title(_ref2) {
  var text = _ref2.text,
      headingLevel = _ref2.headingLevel;
  return /*#__PURE__*/React.createElement(Text, {
    as: headingLevel,
    mb: 4,
    fontSize: 20
  }, /*#__PURE__*/React.createElement(Text, {
    truncate: "ellipsis",
    truncateLines: 2
  }, text));
};

var Subtitle = function Subtitle(_ref3) {
  var text = _ref3.text;
  return /*#__PURE__*/React.createElement(Text, {
    variant: "p-small",
    textColor: "gray-900"
  }, /*#__PURE__*/React.createElement(Text, {
    truncate: "ellipsis",
    truncateLines: 2
  }, text));
};

var Body = function Body(_ref4) {
  var text = _ref4.text;
  return /*#__PURE__*/React.createElement(Text, {
    pt: 16,
    variant: "p-small",
    textColor: "gray-900"
  }, /*#__PURE__*/React.createElement(Text, {
    truncate: "ellipsis",
    truncateLines: 3
  }, text));
};

var Footer = function Footer(_ref5) {
  var bottomLeftText = _ref5.bottomLeftText,
      bottomRightTagText = _ref5.bottomRightTagText,
      bottomRightTagColor = _ref5.bottomRightTagColor;
  return /*#__PURE__*/React.createElement(FlexBox, {
    alignItems: "flex-end",
    justifyContent: "space-between"
  }, /*#__PURE__*/React.createElement(Box, null, bottomLeftText && /*#__PURE__*/React.createElement(BottomLeftText, {
    text: bottomLeftText
  })), /*#__PURE__*/React.createElement(Box, null, bottomRightTagText && /*#__PURE__*/React.createElement(BottomRightTag, {
    text: bottomRightTagText,
    color: bottomRightTagColor
  })));
};

var BottomLeftText = function BottomLeftText(_ref6) {
  var text = _ref6.text;
  return /*#__PURE__*/React.createElement(Text, {
    maxWidth: "calc(100%-16px)",
    px: 16,
    variant: "p-small",
    textColor: "gray-900"
  }, text);
};

var BottomRightTag = function BottomRightTag(_ref7) {
  var text = _ref7.text,
      color = _ref7.color;
  return /*#__PURE__*/React.createElement(Box, {
    bg: tagColorMap[color]
  }, /*#__PURE__*/React.createElement(Text, {
    py: 4,
    p: 12,
    variant: "title-xs",
    fontSize: 14,
    whiteSpace: "nowrap"
  }, text));
};

export var InfoCard = function InfoCard(_ref8) {
  var href = _ref8.href,
      _onClick = _ref8.onClick,
      topText = _ref8.topText,
      title = _ref8.title,
      subtitle = _ref8.subtitle,
      body = _ref8.body,
      bottomLeftText = _ref8.bottomLeftText,
      bottomRightTagText = _ref8.bottomRightTagText,
      _ref8$bottomRightTagC = _ref8.bottomRightTagColor,
      bottomRightTagColor = _ref8$bottomRightTagC === void 0 ? 'pink' : _ref8$bottomRightTagC,
      _ref8$cardHeight = _ref8.cardHeight,
      cardHeight = _ref8$cardHeight === void 0 ? 285 : _ref8$cardHeight,
      _ref8$titleHeadingLev = _ref8.titleHeadingLevel,
      titleHeadingLevel = _ref8$titleHeadingLev === void 0 ? 'h3' : _ref8$titleHeadingLev;
  var displayFooter = bottomLeftText || bottomRightTagText;
  return /*#__PURE__*/React.createElement(Anchor, {
    variant: "interface",
    href: href,
    onClick: function onClick() {
      return _onClick === null || _onClick === void 0 ? void 0 : _onClick();
    }
  }, /*#__PURE__*/React.createElement(Card, {
    display: "flex",
    flexDirection: "column",
    height: pxRem(cardHeight),
    justifyContent: "space-between",
    minWidth: pxRem(cardMinWidth),
    variant: "white",
    shadow: "medium",
    p: 0,
    position: "relative"
  }, /*#__PURE__*/React.createElement(Box, {
    pt: 16,
    px: 16
  }, /*#__PURE__*/React.createElement(TopText, {
    text: topText
  }), /*#__PURE__*/React.createElement(Title, {
    text: title,
    headingLevel: titleHeadingLevel
  }), /*#__PURE__*/React.createElement(Subtitle, {
    text: subtitle
  }), body && /*#__PURE__*/React.createElement(Body, {
    text: body
  })), displayFooter && /*#__PURE__*/React.createElement(Footer, {
    bottomLeftText: bottomLeftText,
    bottomRightTagText: bottomRightTagText,
    bottomRightTagColor: bottomRightTagColor
  })));
};