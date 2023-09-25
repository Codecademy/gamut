import { Box, FlexBox, Text } from '@codecademy/gamut';
import * as React from 'react';
import { BetaSticker } from '../../BetaSticker';
import { BottomTag } from '../BottomTag/index';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var Footer = function Footer(_ref) {
  var beta = _ref.beta,
    progressState = _ref.progressState,
    tag = _ref.tag,
    tagColor = _ref.tagColor,
    footerTextVariant = _ref.footerTextVariant;
  if (progressState) {
    return /*#__PURE__*/_jsxs(Box, {
      mt: "auto",
      children: [progressState === 'completed' && /*#__PURE__*/_jsx(Text, {
        fontSize: 16,
        fontFamily: "accent",
        textColor: "yellow",
        children: "Completed"
      }), progressState === 'inProgress' && /*#__PURE__*/_jsxs(FlexBox, {
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "flex-end",
        width: "100%",
        children: [/*#__PURE__*/_jsx(Text, {
          fontFamily: "accent",
          fontSize: 14,
          children: footerTextVariant === 'inProgress' ? 'In Progress...' : 'Enrolled...'
        }), /*#__PURE__*/_jsx(Text, {
          textColor: "hyper",
          children: "Keep Going"
        })]
      })]
    });
  }
  if (beta) {
    return /*#__PURE__*/_jsx(Box, {
      position: "absolute",
      bottom: 0,
      right: 0,
      pb: 16,
      pr: 16,
      children: /*#__PURE__*/_jsx(BetaSticker, {})
    });
  }
  if (tag && tagColor) {
    return /*#__PURE__*/_jsx(BottomTag, {
      text: tag,
      color: tagColor
    });
  }
  return null;
};