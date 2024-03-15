import { FlexBox } from '@codecademy/gamut';
import React from 'react';
import { Tab } from './Tab';
import { isTabPanelGuard } from './utils';
export var TabList = function TabList(_ref) {
  var children = _ref.children,
      activeTabIndex = _ref.activeTabIndex,
      setActiveTabIndex = _ref.setActiveTabIndex;
  return /*#__PURE__*/React.createElement(FlexBox, {
    role: "tablist"
  }, React.Children.toArray(children).filter(isTabPanelGuard).map(function (panelChild, i) {
    var title = panelChild.props.title;
    return /*#__PURE__*/React.createElement(Tab, {
      title: title,
      isActiveTab: i === activeTabIndex,
      onClick: function onClick() {
        return setActiveTabIndex(i);
      },
      key: "tab-".concat(title)
    });
  }));
};