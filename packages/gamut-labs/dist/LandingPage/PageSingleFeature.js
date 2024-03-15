function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { Anchor, Box, Column, LayoutGrid, Text, Video } from '@codecademy/gamut';
import React from 'react';
import { PausableImage } from '../PausableImage';
import { CTA } from './CTA';
import { Description } from './Description';
import { Title } from './Title';

var FeaturedImage = function FeaturedImage(_ref) {
  var src = _ref.src,
      alt = _ref.alt,
      linkUrl = _ref.linkUrl,
      hideImageOnMobile = _ref.hideImageOnMobile;
  var Container = linkUrl ? Anchor : Box;
  return /*#__PURE__*/React.createElement(Container, {
    display: {
      _: hideImageOnMobile ? 'none' : 'initial',
      sm: 'initial'
    },
    href: linkUrl,
    width: 1,
    tabIndex: linkUrl ? 0 : undefined
  }, /*#__PURE__*/React.createElement(PausableImage, {
    src: src,
    alt: alt,
    "data-testid": "feature-image"
  }));
};

export var PageSingleFeature = function PageSingleFeature(_ref2) {
  var cta = _ref2.cta,
      desc = _ref2.desc,
      eyebrow = _ref2.eyebrow,
      hideImageOnMobile = _ref2.hideImageOnMobile,
      isPageHeading = _ref2.isPageHeading,
      media = _ref2.media,
      _ref2$mediaWidth = _ref2.mediaWidth,
      mediaWidth = _ref2$mediaWidth === void 0 ? 6 : _ref2$mediaWidth,
      onAnchorClick = _ref2.onAnchorClick,
      testId = _ref2.testId,
      title = _ref2.title;
  var primaryContent = /*#__PURE__*/React.createElement(React.Fragment, null, title && /*#__PURE__*/React.createElement(Title, {
    isPageHeading: isPageHeading
  }, eyebrow && /*#__PURE__*/React.createElement(Text, {
    fontSize: {
      _: 20,
      sm: 22
    },
    fontFamily: "accent",
    mb: 16,
    display: "block",
    color: eyebrow.accent ? 'blue' : undefined
  }, eyebrow.text), title), desc && /*#__PURE__*/React.createElement(Description, {
    text: desc,
    onAnchorClick: onAnchorClick
  }), cta && /*#__PURE__*/React.createElement(Box, {
    mt: 32
  }, /*#__PURE__*/React.createElement(CTA, {
    href: cta.href,
    onClick: cta.onClick,
    buttonType: cta.buttonType
  }, cta.text)));

  if (!media) {
    return /*#__PURE__*/React.createElement("div", {
      "data-testid": testId
    }, primaryContent);
  }

  var textWidth = 12 - mediaWidth;
  return /*#__PURE__*/React.createElement(LayoutGrid, {
    "data-testid": testId,
    rowGap: 16,
    columnGap: {
      _: 8,
      sm: 32
    }
  }, /*#__PURE__*/React.createElement(Column, {
    size: {
      sm: textWidth
    },
    alignContent: "flex-start"
  }, primaryContent), /*#__PURE__*/React.createElement(Column, {
    size: {
      sm: mediaWidth
    },
    gridRowStart: {
      _: hideImageOnMobile ? 'initial' : 1,
      sm: 'initial'
    },
    alignContent: "flex-start"
  }, media.type === 'image' && /*#__PURE__*/React.createElement(FeaturedImage, _extends({}, media, {
    hideImageOnMobile: hideImageOnMobile
  })), media.type === 'video' && /*#__PURE__*/React.createElement(Video, media)));
};