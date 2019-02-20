import React, { Component, Children, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { TabList, Tab, TabPanel, Wrapper } from 'react-aria-tabpanel';

import s from './styles/index.scss';

export interface TabsProps {
  config: {
    default?: boolean;
    text: string;
  }[];

  animatedUnderlineStyle?: boolean;
  children: ReactNode[];
  onChange?: (id: string) => void;
  renderAllChildren?: boolean;
}

interface TabsState {
  activeTabId?: string;
}

class Tabs extends Component<TabsProps, TabsState> {
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

  state = { activeTabId: undefined } as TabsState;

  private idPrefix!: string;

  componentWillMount() {
    // for unique tab ids (in case there are multiple
    // tab widgets on the page)
    this.idPrefix = Math.random()
      .toString()
      .replace('.', '');
  }

  createId(index: number) {
    return `${this.idPrefix}-${index}`;
  }

  renderTabList = (activeTabId: string) => {
    // leftPercent determines where the animated underline should be positioned
    // if animatedUnderlineStyle === true
    const leftPercent =
      (this.props.config.findIndex((c, i) => this.createId(i) === activeTabId) /
        this.props.config.length) *
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

  renderTabPanels = (activeTabId: string) => (
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

  onChange = (id: string) => {
    if (this.props.onChange) this.props.onChange(id);
    this.setState(() => ({ activeTabId: id }));
  };

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
}

export default Tabs;
