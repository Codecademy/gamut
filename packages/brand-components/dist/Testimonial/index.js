function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { Avatar, Byline, Quote } from '../index';
import { VisualTheme } from '@codecademy/gamut';
import cx from 'classnames';
import s from './styles.module.scss';
export var Testimonial = function Testimonial(_ref) {
  var _cx, _cx2;

  var testimonial = _ref.testimonial,
      size = _ref.size,
      theme = _ref.theme;
  return React.createElement("div", {
    className: cx(s.testimonialWrapper, (_cx = {}, _defineProperty(_cx, s.darkWrapper, theme === VisualTheme.DarkMode), _defineProperty(_cx, s.lightWrapper, theme === VisualTheme.LightMode), _cx))
  }, React.createElement("div", {
    className: s.testimonialCardContainer
  }, React.createElement("div", {
    className: cx(s.contentContainer, s["".concat(size, "Container")], (_cx2 = {}, _defineProperty(_cx2, s.darkContainer, theme === VisualTheme.DarkMode), _defineProperty(_cx2, s.lightContainer, theme === VisualTheme.LightMode), _cx2))
  }, React.createElement("div", {
    className: s.avatarContainer
  }, React.createElement(Avatar, {
    src: testimonial.imageUrl,
    alt: "Photo of ".concat(testimonial.name),
    theme: theme
  })), React.createElement("div", {
    className: cx(s.bylineContainer, s["".concat(size, "Byline")])
  }, React.createElement(Byline, {
    name: testimonial.name,
    occupation: testimonial.occupation
  })), React.createElement("div", {
    className: s.quoteContainer
  }, React.createElement(Quote, {
    text: testimonial.quote,
    theme: theme
  })))));
};
export default Testimonial;