import cx from 'classnames';
import React from 'react';
import { AppBar, AppBarSection } from '@codecademy/gamut';
import styles from './styles.module.scss';
export var HeaderContainer = function HeaderContainer(_ref) {
  var className = _ref.className,
      _ref$sections = _ref.sections;
  _ref$sections = _ref$sections === void 0 ? {} : _ref$sections;
  var after = _ref$sections.after,
      left = _ref$sections.left,
      right = _ref$sections.right;
  return React.createElement("header", {
    className: cx(styles.container, className),
    "data-testid": "AppHeader"
  }, React.createElement(AppBar, {
    className: styles.appBar
  }, React.createElement(AppBarSection, {
    position: "left"
  }, left), React.createElement(AppBarSection, {
    position: "right"
  }, right)), after);
};
export default HeaderContainer;