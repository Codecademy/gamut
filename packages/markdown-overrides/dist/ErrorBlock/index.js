import cx from 'classnames';
import * as React from 'react';
// eslint-disable-next-line gamut/no-css-standalone
import styles from './styles.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
export var ErrorBlock = function ErrorBlock(_ref) {
  var children = _ref.children,
    className = _ref.className;
  return /*#__PURE__*/_jsx("code", {
    className: cx(styles.errorBlock, className),
    children: children
  });
};