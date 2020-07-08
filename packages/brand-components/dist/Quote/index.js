import React from 'react';
import s from './styles.module.scss';
import cx from 'classnames';
import { VisualTheme } from '@codecademy/gamut';
import orangeQuotes from '../assets/orangeQuotes.svg';
import purpleQuotes from '../assets/purpleQuotes.svg';
export var Quote = function Quote(_ref) {
  var text = _ref.text,
      _ref$theme = _ref.theme,
      theme = _ref$theme === void 0 ? VisualTheme.LightMode : _ref$theme,
      _ref$classNames = _ref.classNames,
      classNames = _ref$classNames === void 0 ? {} : _ref$classNames;
  return React.createElement("div", {
    className: cx(theme === VisualTheme.DarkMode ? s.darkContainer : s.lightContainer)
  }, React.createElement("img", {
    src: theme === VisualTheme.DarkMode ? purpleQuotes : orangeQuotes,
    alt: "",
    className: cx(s.icon, classNames.icon)
  }), React.createElement("q", {
    className: cx(s.text, classNames.text)
  }, text));
};
export default Quote;