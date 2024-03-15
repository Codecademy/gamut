function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Box, GridBox, Text } from '@codecademy/gamut';
import { FacebookIcon, LinkedinIcon, TwitterIcon } from '@codecademy/gamut-icons';
import React from 'react';
import { SocialShareIconLink } from './SocialShareIconLink';
export var createShareLink = function createShareLink(formatter, baseUri, payload) {
  var params = formatter(payload);
  var url = new URL(baseUri);
  Object.keys(params).forEach(function (key) {
    url.searchParams.append(key, params[key]);
  });
  return url.toString();
}; // https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview
// https://developers.facebook.com/docs/sharing/reference/share-dialog
// https://docs.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/share-on-linkedin?context=linkedin/consumer/context#create-an-article-or-url-share

export var SOCIAL_SHARING_PLATFORMS = [{
  id: 'facebook',
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
  return /*#__PURE__*/React.createElement(Box, {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center"
  }, label && /*#__PURE__*/React.createElement(Text, {
    fontSize: size === 'small' ? 14 : 16,
    textColor: "text",
    mb: 16,
    "data-testid": "social-sharing-label"
  }, label), /*#__PURE__*/React.createElement(GridBox, {
    gridAutoColumns: "max-content",
    gridAutoFlow: "column",
    gap: 16,
    className: iconStyles
  }, SOCIAL_SHARING_PLATFORMS.map(function (_ref5) {
    var id = _ref5.id,
        icon = _ref5.icon,
        formatShare = _ref5.formatShare,
        baseUrl = _ref5.baseUrl;
    return /*#__PURE__*/React.createElement(SocialShareIconLink, {
      key: id,
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
    });
  })));
};