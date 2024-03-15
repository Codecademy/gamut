import { useCurrentMode } from '@codecademy/gamut-styles';
import { useTheme } from '@emotion/react';
import cx from 'classnames';
import React from 'react'; // eslint-disable-next-line gamut/no-css-standalone

import styles from './styles.module.scss';
export var Loading = function Loading(_ref) {
  var className = _ref.className;

  var _useTheme = useTheme(),
      colors = _useTheme.colors;

  var mode = useCurrentMode();
  var color1 = mode === 'light' ? colors['gray-300'] : colors['navy-600'];
  var color2 = mode === 'light' ? colors['blue-800'] : colors['navy-200'];
  var icon = /*#__PURE__*/React.createElement("svg", {
    className: cx(styles.loading, className),
    "data-testid": "loading",
    xmlns: "https://www.w3.org/2000/svg",
    width: "123",
    height: "98.7",
    viewBox: "0 0 123 98.7"
  }, /*#__PURE__*/React.createElement("title", null, "Loading Icon"), /*#__PURE__*/React.createElement("path", {
    className: cx(styles.path, styles.c),
    stroke: color1,
    fill: "none",
    strokeMiterlimit: "10",
    d: "M18.7 57.6c0 4.2.4 7.4 1.2 9.8 2.3 7.1 8.4 11 16.3 11 5.9 0 10.6-2.4 13.7-6.1.2-.4.3-.8-.1-1.2l-5.2-4.5c-.4-.3-.8-.3-1.2.1-2 2.2-4 3.5-7.3 3.5-3.5 0-6.2-1.7-7.4-5.1-.7-2-.8-4.4-.8-7.4 0-3.1.2-5.4.8-7.4 1.1-3.5 3.9-5.2 7.4-5.2 3.3 0 5.3 1.2 7.3 3.5.3.4.7.5 1.2.2l5.2-4.5c.4-.3.3-.8.1-1.2-3.1-3.8-7.8-6.2-13.7-6.2-7.9 0-14 3.9-16.3 11-.8 2.3-1.2 5.5-1.2 9.7"
  }), /*#__PURE__*/React.createElement("path", {
    className: cx(styles.path, styles.underline),
    stroke: color1,
    fill: "none",
    strokeMiterlimit: "10",
    d: "M120.7 97.2c.5 0 .8-.3.8-.8v-7.5c0-.5-.3-.8-.8-.8h-28c-.5 0-.8.3-.8.8v7.5c0 .5.3.8.8.8h28"
  }), /*#__PURE__*/React.createElement("path", {
    className: cx(styles.path, styles.outer),
    stroke: color1,
    fill: "none",
    strokeMiterlimit: "10",
    d: "M42.7 1.5H2.1 2c-.3.2-.5.5-.5.8v94c0 .3.1.5.3.7.1.1.3.1.5.1h80.8c.3 0 .5-.1.6-.3.1-.1.2-.3.2-.5v-94c0-.2-.1-.4-.2-.6-.1-.1-.3-.2-.6-.2H42.7"
  }), /*#__PURE__*/React.createElement("path", {
    className: cx(styles.path, styles.inner),
    stroke: color1,
    fill: "none",
    strokeMiterlimit: "10",
    d: "M42.7 88H11.3h-.1c-.3-.1-.5-.4-.5-.7V11.5c0-.4.2-.6.5-.8h63.1c.3.1.5.4.5.8v75.7c0 .4-.2.6-.5.7H42.7"
  }), /*#__PURE__*/React.createElement("path", {
    className: cx(styles.pathTwo, styles.c),
    stroke: color2,
    fill: "none",
    strokeWidth: "3",
    strokeMiterlimit: "10",
    d: "M18.7 57.6c0 4.2.4 7.4 1.2 9.8 2.3 7.1 8.4 11 16.3 11 5.9 0 10.6-2.4 13.7-6.1.2-.4.3-.8-.1-1.2l-5.2-4.5c-.4-.3-.8-.3-1.2.1-2 2.2-4 3.5-7.3 3.5-3.5 0-6.2-1.7-7.4-5.1-.7-2-.8-4.4-.8-7.4 0-3.1.2-5.4.8-7.4 1.1-3.5 3.9-5.2 7.4-5.2 3.3 0 5.3 1.2 7.3 3.5.3.4.7.5 1.2.2l5.2-4.5c.4-.3.3-.8.1-1.2-3.1-3.8-7.8-6.2-13.7-6.2-7.9 0-14 3.9-16.3 11-.8 2.3-1.2 5.5-1.2 9.7"
  }), /*#__PURE__*/React.createElement("path", {
    className: cx(styles.pathTwo, styles.underline),
    stroke: color2,
    fill: "none",
    strokeWidth: "3",
    strokeMiterlimit: "10",
    d: "M120.7 97.2c.5 0 .8-.3.8-.8v-7.5c0-.5-.3-.8-.8-.8h-28c-.5 0-.8.3-.8.8v7.5c0 .5.3.8.8.8h28"
  }), /*#__PURE__*/React.createElement("path", {
    className: cx(styles.pathTwo, styles.outer),
    stroke: color2,
    fill: "none",
    strokeWidth: "3",
    strokeMiterlimit: "10",
    d: "M42.7 1.5H2.1 2c-.3.2-.5.5-.5.8v94c0 .3.1.5.3.7.1.1.3.1.5.1h80.8c.3 0 .5-.1.6-.3.1-.1.2-.3.2-.5v-94c0-.2-.1-.4-.2-.6-.1-.1-.3-.2-.6-.2H42.7"
  }), /*#__PURE__*/React.createElement("path", {
    className: cx(styles.pathTwo, styles.inner),
    stroke: color2,
    fill: "none",
    strokeWidth: "3",
    strokeMiterlimit: "10",
    d: "M42.7 88H11.3h-.1c-.3-.1-.5-.4-.5-.7V11.5c0-.4.2-.6.5-.8h63.1c.3.1.5.4.5.8v75.7c0 .4-.2.6-.5.7H42.7"
  }));
  return icon;
};