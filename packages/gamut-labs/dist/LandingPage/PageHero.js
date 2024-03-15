function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { PageSingleFeature } from './PageSingleFeature';

var getMediaWidth = function getMediaWidth(mediaType, textLength) {
  if (mediaType === 'video') {
    return 5;
  }

  if (mediaType === 'image') {
    return textLength === 'short' ? 6 : 3;
  }
};

export var PageHero = function PageHero(_ref) {
  var _props$media;

  var showImageOnMobile = _ref.showImageOnMobile,
      _ref$textLength = _ref.textLength,
      textLength = _ref$textLength === void 0 ? 'long' : _ref$textLength,
      props = _objectWithoutProperties(_ref, ["showImageOnMobile", "textLength"]);

  return /*#__PURE__*/React.createElement(PageSingleFeature, _extends({}, props, {
    isPageHeading: true,
    hideImageOnMobile: !showImageOnMobile,
    mediaWidth: getMediaWidth((_props$media = props.media) === null || _props$media === void 0 ? void 0 : _props$media.type, textLength)
  }));
};