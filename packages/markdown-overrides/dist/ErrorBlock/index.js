import cx from 'classnames';
import React from 'react'; // eslint-disable-next-line gamut/no-css-standalone

import styles from './styles.module.scss';
export var ErrorBlock = function ErrorBlock(_ref) {
  var children = _ref.children,
      className = _ref.className;
  return /*#__PURE__*/React.createElement("code", {
    className: cx(styles.errorBlock, className)
  }, children);
};