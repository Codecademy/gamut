import cx from 'classnames';
import React from 'react';
import styles from './styles.module.scss';
export var Interstitial = function Interstitial(_ref) {
  var buttons = _ref.buttons,
      children = _ref.children,
      className = _ref.className,
      decoration = _ref.decoration,
      title = _ref.title;
  return React.createElement("div", {
    className: cx(styles.Interstitial, className)
  }, React.createElement("div", {
    className: styles.content
  }, React.createElement("h1", {
    className: styles.title
  }, decoration && React.createElement("div", {
    className: styles.decoration
  }, decoration), title), React.createElement("div", {
    className: styles.children
  }, children)), buttons && React.createElement("div", {
    className: styles.buttons
  }, buttons));
};
export default Interstitial;