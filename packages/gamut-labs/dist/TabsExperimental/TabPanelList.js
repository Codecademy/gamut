import * as React from 'react';
import { DerivedTabPanel } from './TabPanelExperimental';
import { isTabPanelGuard } from './utils';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export var TabPanelList = function TabPanelList(_ref) {
  var children = _ref.children,
    activeTabIndex = _ref.activeTabIndex;
  return /*#__PURE__*/_jsx(_Fragment, {
    children: React.Children.toArray(children).filter(isTabPanelGuard).map(function (panelChild, i) {
      var _panelChild$props = panelChild.props,
        panelChildren = _panelChild$props.children,
        className = _panelChild$props.className,
        title = _panelChild$props.title;
      return /*#__PURE__*/_jsx(DerivedTabPanel, {
        isActiveTab: i === activeTabIndex,
        className: className,
        children: panelChildren
      }, "panel-".concat(title));
    })
  });
};