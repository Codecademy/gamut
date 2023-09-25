function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { Box, GridBox, Text } from '@codecademy/gamut';
import { FacebookIcon, LinkedinIcon, TwitterIcon } from '@codecademy/gamut-icons';
import * as React from 'react';
import { SocialShareIconLink } from './SocialShareIconLink';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var createShareLink = function createShareLink(formatter, baseUri, payload) {
  var params = formatter(payload);
  var url = new URL(baseUri);
  Object.keys(params).forEach(function (key) {
    url.searchParams.append(key, params[key]);
  });
  return url.toString();
};

// https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview
// https://developers.facebook.com/docs/sharing/reference/share-dialog
// https://docs.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/share-on-linkedin?context=linkedin/consumer/context#create-an-article-or-url-share
export var SOCIAL_SHARING_PLATFORMS = [{
  id: 'facebook',
  displayName: 'Facebook',
  icon: FacebookIcon,
  baseUrl: 'https://www.facebook.com/dialog/share?app_id=212500508799908',
  formatShare: function formatShare(_ref) {
    var url = _ref.url,
      message = _ref.message;
    return _objectSpread(_objectSpread(_objectSpread({}, url && {
      href: url
    }), message && {
      quote: message
    }), {}, {
      hashtag: '#codecademy'
    });
  }
}, {
  id: 'twitter',
  displayName: 'Twitter',
  icon: TwitterIcon,
  baseUrl: 'https://twitter.com/intent/tweet?',
  formatShare: function formatShare(_ref2) {
    var url = _ref2.url,
      message = _ref2.message,
      hashtags = _ref2.hashtags,
      mention = _ref2.mention;
    return _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, url && {
      url: url
    }), message && {
      text: message
    }), hashtags && {
      hashtags: hashtags.join(',')
    }), mention && {
      via: mention
    });
  }
}, {
  id: 'linkedin',
  displayName: 'LinkedIn',
  icon: LinkedinIcon,
  baseUrl: 'https://www.linkedin.com/shareArticle',
  formatShare: function formatShare(_ref3) {
    var url = _ref3.url;
    return {
      url: url
    };
  }
}];
export var SocialMediaSharing = function SocialMediaSharing(_ref4) {
  var url = _ref4.url,
    message = _ref4.message,
    hashtags = _ref4.hashtags,
    mention = _ref4.mention,
    action = _ref4.action,
    label = _ref4.label,
    sectionId = _ref4.sectionId,
    _ref4$size = _ref4.size,
    size = _ref4$size === void 0 ? 'normal' : _ref4$size,
    iconStyles = _ref4.iconStyles;
  return /*#__PURE__*/_jsxs(Box, {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    children: [label && /*#__PURE__*/_jsx(Text, {
      fontSize: size === 'small' ? 14 : 16,
      textColor: "text",
      mb: 16,
      "data-testid": "social-sharing-label",
      children: label
    }), /*#__PURE__*/_jsx(GridBox, {
      gridAutoColumns: "max-content",
      gridAutoFlow: "column",
      gap: 16,
      className: iconStyles,
      children: SOCIAL_SHARING_PLATFORMS.map(function (_ref5) {
        var id = _ref5.id,
          icon = _ref5.icon,
          formatShare = _ref5.formatShare,
          baseUrl = _ref5.baseUrl;
        return /*#__PURE__*/_jsx(SocialShareIconLink, {
          id: id,
          sectionId: sectionId,
          href: createShareLink(formatShare, baseUrl, {
            url: url,
            message: message,
            hashtags: hashtags,
            mention: mention
          }),
          icon: icon,
          size: size,
          onClick: function onClick(e) {
            return action === null || action === void 0 ? void 0 : action(e, "".concat(id, "_share"));
          }
        }, id);
      })
    })]
  });
};