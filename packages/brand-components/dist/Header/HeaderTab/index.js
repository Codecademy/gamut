import React from 'react';
import cx from 'classnames';
import s from './styles.module.scss';
export var HeaderTab = function HeaderTab(_ref) {
  var className = _ref.className,
      children = _ref.children,
      id = _ref.id,
      testId = _ref.testId;
  var classes = cx(s.headerTab, className);
  return React.createElement("div", {
    id: id,
    className: classes,
    "data-testid": testId
  }, children);
};
export default HeaderTab;