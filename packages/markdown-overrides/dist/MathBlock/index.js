/* eslint-disable gamut/no-css-standalone */
import 'katex/dist/katex.css';
import cx from 'classnames';
import katex from 'katex';
import React from 'react';
import styles from './styles.module.scss';

var getKatex = function getKatex(children) {
  try {
    return katex.renderToString(children, {
      displayMode: true
    });
  } catch (error) {
    return error instanceof Error ? error.message : 'Error';
  }
};

export var MathBlock = function MathBlock(_ref) {
  var children = _ref.children,
      className = _ref.className,
      _ref$wrap = _ref.wrap,
      wrap = _ref$wrap === void 0 ? true : _ref$wrap;
  var classes = cx(wrap && styles.wrap, styles.MathBlock, className);
  var html = getKatex(children);
  return /*#__PURE__*/React.createElement("span", {
    className: classes
  }, /*#__PURE__*/React.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: html
    }
  }));
};