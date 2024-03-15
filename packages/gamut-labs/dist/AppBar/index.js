import { ContentContainer } from '@codecademy/gamut';
import cx from 'classnames';
import React from 'react'; // eslint-disable-next-line gamut/no-css-standalone

import styles from './styles/index.module.scss';
export var AppBar = function AppBar(_ref) {
  var wide = _ref.wide,
      children = _ref.children,
      className = _ref.className;
  var classes = cx(styles.wrapper, className);
  return /*#__PURE__*/React.createElement(ContentContainer, {
    className: classes,
    display: "flex",
    alignItems: "center",
    height: "100%",
    size: wide ? 'wide' : 'medium'
  }, children);
};