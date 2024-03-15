import { Box, FlexBox, Text } from '@codecademy/gamut';
import React from 'react';
import { BetaSticker } from '../../BetaSticker';
import { BottomTag } from '../BottomTag/index';
export var Footer = function Footer(_ref) {
  var beta = _ref.beta,
      progressState = _ref.progressState,
      tag = _ref.tag,
      tagColor = _ref.tagColor,
      footerTextVariant = _ref.footerTextVariant;

  if (progressState) {
    return /*#__PURE__*/React.createElement(Box, {
      mt: "auto"
    }, progressState === 'completed' && /*#__PURE__*/React.createElement(Text, {
      fontSize: 16,
      fontFamily: "accent",
      textColor: "yellow"
    }, "Completed"), progressState === 'inProgress' && /*#__PURE__*/React.createElement(FlexBox, {
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "flex-end",
      width: "100%"
    }, /*#__PURE__*/React.createElement(Text, {
      fontFamily: "accent",
      fontSize: 14
    }, footerTextVariant === 'inProgress' ? 'In Progress...' : 'Enrolled...'), /*#__PURE__*/React.createElement(Text, {
      textColor: "hyper"
    }, "Keep Going")));
  }

  if (beta) {
    return /*#__PURE__*/React.createElement(Box, {
      position: "absolute",
      bottom: 0,
      right: 0,
      pb: 16,
      pr: 16
    }, /*#__PURE__*/React.createElement(BetaSticker, null));
  }

  if (tag && tagColor) {
    return /*#__PURE__*/React.createElement(BottomTag, {
      text: tag,
      color: tagColor
    });
  }

  return null;
};