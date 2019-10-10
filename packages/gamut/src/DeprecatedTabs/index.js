import React, { Component, Children } from 'react';
import { TabList, Tab, TabPanel, Wrapper } from 'react-aria-tabpanel';
import s from './styles/index.scss';
class Tabs extends Component {
  constructor() {
    super(...arguments);
    this.state = { activeTabId: undefined };
    this.renderTabList = activeTabId => {
      // leftPercent determines where the animated underline should be positioned
      // if animatedUnderlineStyle === true
      const leftPercent =
        (this.props.config.findIndex(
          (c, i) => this.createId(i) === activeTabId
        ) /
          this.props.config.length) *
        100;
      return React.createElement(
        TabList,
        { className: s.tabList },
        this.props.config.map((c, i) => {
          const key = this.createId(i);
          return React.createElement(
            Tab,
            {
              id: key,
              key: key,
              className: `${s.tab} ${
                this.props.animatedUnderlineStyle
                  ? s.animatedUnderline
                  : s.traditional
              }`,
              active: key === activeTabId,
            },
            c.text
          );
        }),
        this.props.animatedUnderlineStyle &&
          React.createElement('div', {
            className: s.tabIndicator,
            style: {
              left: `${leftPercent}%`,
              width: `${100 / this.props.config.length}%`,
            },
            'aria-hidden': true,
          })
      );
    };
    this.renderTabPanels = activeTabId =>
      // render all tab panels, but only active tab panel contains anything
      React.createElement(
        'div',
        { className: s.tabPanelContainer },
        this.props.config.map((c, i) => {
          const key = this.createId(i);
          const isActive = key === activeTabId;
          return React.createElement(
            TabPanel,
            { tabId: key, key: key, active: isActive, className: s.tabPanel },
            isActive || this.props.renderAllChildren
              ? Children.toArray(this.props.children)[i]
              : React.createElement('div', null)
          );
        })
      );
    this.onChange = id => {
      if (this.props.onChange) this.props.onChange(id);
      this.setState(() => ({ activeTabId: id }));
    };
  }
  componentWillMount() {
    // for unique tab ids (in case there are multiple
    // tab widgets on the page)
    this.idPrefix = Math.random()
      .toString()
      .replace('.', '');
  }
  createId(index) {
    return `${this.idPrefix}-${index}`;
  }
  render() {
    let activeTabId;
    // which tab should be shown right now?
    if (this.state.activeTabId) {
      activeTabId = this.state.activeTabId;
    } else if (this.props.config.findIndex(c => c.default) !== -1) {
      activeTabId = this.createId(this.props.config.findIndex(c => c.default));
    } else {
      activeTabId = this.createId(0);
    }
    return React.createElement(
      Wrapper,
      {
        onChange: this.onChange,
        activeTabId: activeTabId,
        className: s.tabContainer,
      },
      this.renderTabList(activeTabId),
      this.renderTabPanels(activeTabId)
    );
  }
}
export default Tabs;
//# sourceMappingURL=index.js.map
