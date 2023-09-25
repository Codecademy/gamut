import { Anchor, Box, Card, FlexBox, Text } from '@codecademy/gamut';
import { pxRem } from '@codecademy/gamut-styles';
import * as React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var cardMinWidth = 250;
var tagColorMap = {
  blue: 'paleBlue',
  green: 'paleGreen',
  pink: 'palePink'
};
var TopText = function TopText(_ref) {
  var text = _ref.text;
  return /*#__PURE__*/_jsx(Text, {
    display: "flex",
    fontSize: 14,
    mb: 12,
    fontFamily: "accent",
    textTransform: "capitalize",
    children: text
  });
};
var Title = function Title(_ref2) {
  var text = _ref2.text,
    headingLevel = _ref2.headingLevel;
  return /*#__PURE__*/_jsx(Text, {
    as: headingLevel,
    mb: 4,
    fontSize: 20,
    children: /*#__PURE__*/_jsx(Text, {
      truncate: "ellipsis",
      truncateLines: 2,
      children: text
    })
  });
};
var Subtitle = function Subtitle(_ref3) {
  var text = _ref3.text;
  return /*#__PURE__*/_jsx(Text, {
    variant: "p-small",
    textColor: "gray-900",
    children: /*#__PURE__*/_jsx(Text, {
      truncate: "ellipsis",
      truncateLines: 2,
      children: text
    })
  });
};
var Body = function Body(_ref4) {
  var text = _ref4.text;
  return /*#__PURE__*/_jsx(Text, {
    pt: 16,
    variant: "p-small",
    textColor: "gray-900",
    children: /*#__PURE__*/_jsx(Text, {
      truncate: "ellipsis",
      truncateLines: 3,
      children: text
    })
  });
};
var Footer = function Footer(_ref5) {
  var bottomLeftText = _ref5.bottomLeftText,
    bottomRightTagText = _ref5.bottomRightTagText,
    bottomRightTagColor = _ref5.bottomRightTagColor;
  return /*#__PURE__*/_jsxs(FlexBox, {
    alignItems: "flex-end",
    justifyContent: "space-between",
    children: [/*#__PURE__*/_jsx(Box, {
      children: bottomLeftText && /*#__PURE__*/_jsx(BottomLeftText, {
        text: bottomLeftText
      })
    }), /*#__PURE__*/_jsx(Box, {
      children: bottomRightTagText && /*#__PURE__*/_jsx(BottomRightTag, {
        text: bottomRightTagText,
        color: bottomRightTagColor
      })
    })]
  });
};
var BottomLeftText = function BottomLeftText(_ref6) {
  var text = _ref6.text;
  return /*#__PURE__*/_jsx(Text, {
    maxWidth: "calc(100%-16px)",
    px: 16,
    variant: "p-small",
    textColor: "gray-900",
    children: text
  });
};
var BottomRightTag = function BottomRightTag(_ref7) {
  var text = _ref7.text,
    color = _ref7.color;
  return /*#__PURE__*/_jsx(Box, {
    bg: tagColorMap[color],
    children: /*#__PURE__*/_jsx(Text, {
      py: 4,
      p: 12,
      variant: "title-xs",
      fontSize: 14,
      whiteSpace: "nowrap",
      children: text
    })
  });
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
  return /*#__PURE__*/_jsx(Anchor, {
    variant: "interface",
    href: href,
    onClick: function onClick() {
      return _onClick === null || _onClick === void 0 ? void 0 : _onClick();
    },
    children: /*#__PURE__*/_jsxs(Card, {
      display: "flex",
      flexDirection: "column",
      height: pxRem(cardHeight),
      justifyContent: "space-between",
      minWidth: pxRem(cardMinWidth),
      variant: "white",
      shadow: "medium",
      p: 0,
      position: "relative",
      children: [/*#__PURE__*/_jsxs(Box, {
        pt: 16,
        px: 16,
        children: [/*#__PURE__*/_jsx(TopText, {
          text: topText
        }), /*#__PURE__*/_jsx(Title, {
          text: title,
          headingLevel: titleHeadingLevel
        }), /*#__PURE__*/_jsx(Subtitle, {
          text: subtitle
        }), body && /*#__PURE__*/_jsx(Body, {
          text: body
        })]
      }), displayFooter && /*#__PURE__*/_jsx(Footer, {
        bottomLeftText: bottomLeftText,
        bottomRightTagText: bottomRightTagText,
        bottomRightTagColor: bottomRightTagColor
      })]
    })
  });
};