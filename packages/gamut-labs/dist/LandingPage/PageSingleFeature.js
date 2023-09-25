function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { Anchor, Box, Column, LayoutGrid, Text, Video } from '@codecademy/gamut';
import * as React from 'react';
import { PausableImage } from '../PausableImage';
import { CTA } from './CTA';
import { Description } from './Description';
import { Title } from './Title';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var FeaturedImage = function FeaturedImage(_ref) {
  var src = _ref.src,
    alt = _ref.alt,
    linkUrl = _ref.linkUrl,
    hideImageOnMobile = _ref.hideImageOnMobile;
  var Container = linkUrl ? Anchor : Box;
  return /*#__PURE__*/_jsx(Container, {
    display: {
      _: hideImageOnMobile ? 'none' : 'initial',
      sm: 'initial'
    },
    href: linkUrl,
    width: 1,
    tabIndex: linkUrl ? 0 : undefined,
    children: /*#__PURE__*/_jsx(PausableImage, {
      src: src,
      alt: alt,
      "data-testid": "feature-image"
    })
  });
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
  var primaryContent = /*#__PURE__*/_jsxs(_Fragment, {
    children: [title && /*#__PURE__*/_jsxs(Title, {
      isPageHeading: isPageHeading,
      children: [eyebrow && /*#__PURE__*/_jsx(Text, {
        fontSize: {
          _: 20,
          sm: 22
        },
        fontFamily: "accent",
        mb: 16,
        display: "block",
        color: eyebrow.accent ? 'blue' : undefined,
        children: eyebrow.text
      }), title]
    }), desc && /*#__PURE__*/_jsx(Description, {
      text: desc,
      onAnchorClick: onAnchorClick
    }), cta && /*#__PURE__*/_jsx(Box, {
      mt: 32,
      children: /*#__PURE__*/_jsx(CTA, {
        href: cta.href,
        onClick: cta.onClick,
        buttonType: cta.buttonType,
        children: cta.text
      })
    })]
  });
  if (!media) {
    return /*#__PURE__*/_jsx("div", {
      "data-testid": testId,
      children: primaryContent
    });
  }
  var textWidth = 12 - mediaWidth;
  return /*#__PURE__*/_jsxs(LayoutGrid, {
    "data-testid": testId,
    rowGap: 16,
    columnGap: {
      _: 8,
      sm: 32
    },
    children: [/*#__PURE__*/_jsx(Column, {
      size: {
        sm: textWidth
      },
      alignContent: "flex-start",
      children: primaryContent
    }), /*#__PURE__*/_jsxs(Column, {
      size: {
        sm: mediaWidth
      },
      gridRowStart: {
        _: hideImageOnMobile ? 'initial' : 1,
        sm: 'initial'
      },
      alignContent: "flex-start",
      children: [media.type === 'image' && /*#__PURE__*/_jsx(FeaturedImage, _objectSpread(_objectSpread({}, media), {}, {
        hideImageOnMobile: hideImageOnMobile
      })), media.type === 'video' && /*#__PURE__*/_jsx(Video, _objectSpread({}, media))]
    })]
  });
};