import React from 'react';
import { DerivedTabPanel } from './TabPanelExperimental';
import { isTabPanelGuard } from './utils';
export var TabPanelList = function TabPanelList(_ref) {
  var children = _ref.children,
      activeTabIndex = _ref.activeTabIndex;
  return /*#__PURE__*/React.createElement(React.Fragment, null, React.Children.toArray(children).filter(isTabPanelGuard).map(function (panelChild, i) {
    var _panelChild$props = panelChild.props,
        panelChildren = _panelChild$props.children,
        className = _panelChild$props.className,
        title = _panelChild$props.title;
    return /*#__PURE__*/React.createElement(DerivedTabPanel, {
      isActiveTab: i === activeTabIndex,
      className: className,
      key: "panel-".concat(title)
    }, panelChildren);
  }));
};