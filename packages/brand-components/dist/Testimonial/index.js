function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { Avatar, Byline, Quote } from '../index';
import { VisualTheme } from '@codecademy/gamut';
import cx from 'classnames';
import s from './styles.module.scss';
export var Testimonial = function Testimonial(_ref) {
  var _cx;

  var testimonial = _ref.testimonial,
      size = _ref.size,
      theme = _ref.theme;
  var firstName = testimonial.firstName,
      lastName = testimonial.lastName,
      occupation = testimonial.occupation,
      quote = testimonial.quote,
      imageUrl = testimonial.imageUrl,
      company = testimonial.company;
  return React.createElement("div", {
    className: cx(s.testimonialWrapper, (_cx = {}, _defineProperty(_cx, s.darkWrapper, theme === VisualTheme.DarkMode), _defineProperty(_cx, s.lightWrapper, theme === VisualTheme.LightMode), _cx))
  }, React.createElement("div", {
    className: s.testimonialCardContainer
  }, React.createElement("div", {
    className: cx(s.contentContainer, s["".concat(size, "Container")])
  }, imageUrl && React.createElement("div", {
    className: s.avatarContainer
  }, React.createElement(Avatar, {
    src: imageUrl,
    alt: "Photo of ".concat(firstName, " ").concat(lastName),
    theme: theme,
    className: cx(_defineProperty({}, s.largeContainerAvatar, size === 'large'))
  })), React.createElement("div", {
    className: s.bylineContainer
  }, React.createElement(Byline, {
    firstName: firstName,
    occupation: occupation,
    company: company,
    lastName: lastName
  })), React.createElement("div", {
    className: s.quoteContainer
  }, React.createElement(Quote, {
    text: quote,
    theme: theme
  })))));
};
export default Testimonial;