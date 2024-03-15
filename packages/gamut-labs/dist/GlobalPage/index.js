function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { AppWrapper, SkipToContent, SkipToContentTarget } from '@codecademy/gamut';
import { Background } from '@codecademy/gamut-styles';
import React, { forwardRef } from 'react';
import { Banner } from '../Banner';
import { GlobalFooter } from '../GlobalFooter';
import { GlobalHeader } from '../GlobalHeader';
var defaultSkipToContentId = 'page-skip-to-content-target';
var RestrictedBackground = /*#__PURE__*/forwardRef(function RestrictedBackground(_ref, ref) {
  var children = _ref.children,
      rest = _objectWithoutProperties(_ref, ["children"]);

  return /*#__PURE__*/React.createElement(Background, _extends({
    "data-testid": "global-page-wrapper"
  }, rest, {
    ref: ref
  }), children);
});
var GlobalPageWrapper = AppWrapper.withComponent(RestrictedBackground, {
  target: "e151iuzl0",
  label: "GlobalPageWrapper"
});
export var GlobalPage = function GlobalPage(_ref2) {
  var _ref2$backgroundColor = _ref2.backgroundColor,
      backgroundColor = _ref2$backgroundColor === void 0 ? 'background' : _ref2$backgroundColor,
      banner = _ref2.banner,
      children = _ref2.children,
      _ref2$contentAs = _ref2.contentAs,
      contentAs = _ref2$contentAs === void 0 ? 'div' : _ref2$contentAs,
      footer = _ref2.footer,
      header = _ref2.header,
      skipToContentId = _ref2.skipToContentId;
  return /*#__PURE__*/React.createElement(GlobalPageWrapper, {
    bg: backgroundColor,
    minHeight: "100vh"
  }, /*#__PURE__*/React.createElement(SkipToContent, {
    contentId: skipToContentId || defaultSkipToContentId
  }), banner && /*#__PURE__*/React.createElement(Banner, banner), /*#__PURE__*/React.createElement(GlobalHeader, header), !skipToContentId && /*#__PURE__*/React.createElement(SkipToContentTarget, {
    id: defaultSkipToContentId
  }), /*#__PURE__*/React.createElement(AppWrapper, {
    as: contentAs
  }, children), /*#__PURE__*/React.createElement(GlobalFooter, footer));
};