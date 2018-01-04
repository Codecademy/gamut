import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import { TabList, Tab, TabPanel, Wrapper } from 'react-aria-tabpanel';

import s from './styles';

export default class Tabs extends Component {
  static propTypes = {
    config: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        default: PropTypes.bool,
      })
    ).isRequired,
    onChange: PropTypes.func,
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    renderAllChildren: PropTypes.bool,
    animatedUnderlineStyle: PropTypes.bool,
  };

  state = { activeTabId: undefined };

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

  renderTabList = activeTabId => {
    // leftPercent determines where the animated underline should be positioned
    // if animatedUnderlineStyle === true
    const leftPercent =
      this.props.config.findIndex((c, i) => this.createId(i) === activeTabId) /
      this.props.config.length *
      100;

    return (
      <TabList className={s.tabList}>
        {this.props.config.map((c, i) => {
          const key = this.createId(i);
          return (
            <Tab
              id={key}
              key={key}
              className={`${s.tab} ${
                this.props.animatedUnderlineStyle
                  ? s.animatedUnderline
                  : s.traditional
              }`}
              active={key === activeTabId}
            >
              {c.text}
            </Tab>
          );
        })}
        {this.props.animatedUnderlineStyle && (
          <div
            className={s.tabIndicator}
            style={{
              left: `${leftPercent}%`,
              width: `${100 / this.props.config.length}%`,
            }}
            aria-hidden
          />
        )}
      </TabList>
    );
  };

  renderTabPanels = activeTabId => (
    // render all tab panels, but only active tab panel contains anything
    <div className={s.tabPanelContainer}>
      {this.props.config.map((c, i) => {
        const key = this.createId(i);
        const isActive = key === activeTabId;
        return (
          <TabPanel
            tabId={key}
            key={key}
            active={isActive}
            className={s.tabPanel}
          >
            {isActive || this.props.renderAllChildren ? (
              Children.toArray(this.props.children)[i]
            ) : (
              <div />
            )}
          </TabPanel>
        );
      })}
    </div>
  );

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

    return (
      <Wrapper
        onChange={this.onChange}
        activeTabId={activeTabId}
        className={s.tabContainer}
      >
        {this.renderTabList(activeTabId)}
        {this.renderTabPanels(activeTabId)}
      </Wrapper>
    );
  }

  onChange = id => {
    if (this.props.onChange) this.props.onChange(id);
    this.setState(() => ({ activeTabId: id }));
  };
}
