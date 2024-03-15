function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import cx from 'classnames';
import React from 'react'; // eslint-disable-next-line gamut/no-css-standalone

import styles from './styles/index.module.scss';
export var AppBarSection = function AppBarSection(_ref) {
  var _cx;

  var position = _ref.position,
      className = _ref.className,
      children = _ref.children;
  var classes = cx(styles.section, (_cx = {}, _defineProperty(_cx, styles.sectionRight, position === 'right'), _defineProperty(_cx, styles.sectionLeft, position === 'left'), _defineProperty(_cx, styles.sectionCenter, position === 'center'), _cx), className);
  return /*#__PURE__*/React.createElement("div", {
    className: classes
  }, children);
};