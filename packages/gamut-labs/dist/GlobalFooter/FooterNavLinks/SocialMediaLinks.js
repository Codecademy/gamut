import { Anchor, Box } from '@codecademy/gamut';
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from '@codecademy/gamut-icons';
import React from 'react';
import { FooterLinkItems } from '../FooterLinks';
var media = [{
  label: 'Follow us on Twitter',
  url: 'https://twitter.com/Codecademy',
  icon: TwitterIcon
}, {
  label: 'Like us on Facebook',
  url: 'https://codecademy.com/users/redirect?redirect_url=https://www.facebook.com/groups/codecademy.community',
  icon: FacebookIcon
}, {
  label: 'Follow us on Instagram',
  url: 'https://instagram.com/codecademy',
  icon: InstagramIcon
}, {
  label: 'Subscribe to Codecademy on YouTube',
  url: 'https://www.youtube.com/channel/UC5CMtpogD_P3mOoeiDHD5eQ',
  icon: YoutubeIcon
}];
export var SocialMediaLinks = function SocialMediaLinks() {
  return /*#__PURE__*/React.createElement(FooterLinkItems, {
    "aria-label": "Social Media"
  }, media.map(function (_ref) {
    var label = _ref.label,
        url = _ref.url,
        IconComponent = _ref.icon;
    return /*#__PURE__*/React.createElement(Box, {
      as: "li",
      display: "inline-block",
      key: label
    }, /*#__PURE__*/React.createElement(Anchor, {
      "aria-label": label,
      fontSize: 20,
      href: url,
      mr: 8,
      rel: "noopener noreferrer",
      target: "_blank",
      variant: "interface"
    }, /*#__PURE__*/React.createElement(IconComponent, null)));
  }));
};