import { FlexBox } from '@codecademy/gamut';
import * as React from 'react';
import { Tab } from './Tab';
import { isTabPanelGuard } from './utils';
import { jsx as _jsx } from "react/jsx-runtime";
export var TabList = function TabList(_ref) {
  var children = _ref.children,
    activeTabIndex = _ref.activeTabIndex,
    setActiveTabIndex = _ref.setActiveTabIndex;
  return /*#__PURE__*/_jsx(FlexBox, {
    role: "tablist",
    children: React.Children.toArray(children).filter(isTabPanelGuard).map(function (panelChild, i) {
      var title = panelChild.props.title;
      return /*#__PURE__*/_jsx(Tab, {
        title: title,
        isActiveTab: i === activeTabIndex,
        onClick: function onClick() {
          return setActiveTabIndex(i);
        }
      }, "tab-".concat(title));
    })
  });
};