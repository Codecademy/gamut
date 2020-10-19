import React, { Component, Children, ReactNode } from 'react';
import { TabList, Tab, TabPanel, Wrapper } from 'react-aria-tabpanel';

import styles from './styles/index.module.scss';

export interface DeprecatedTabsProps {
  config: {
    default?: boolean;
    text: string;
  }[];

  animatedUnderlineStyle?: boolean;
  children: ReactNode[];
  onChange?: (id: string) => void;
  renderAllChildren?: boolean;
}

type DeprecatedTabsState = {
  activeTabId?: string;
};

export class DeprecatedTabs extends Component<
  DeprecatedTabsProps,
  DeprecatedTabsState
> {
  state: DeprecatedTabsState = { activeTabId: undefined };

  private idPrefix!: string;

  UNSAFE_componentWillMount() {
    // for unique tab ids (in case there are multiple
    // tab widgets on the page)
    this.idPrefix = Math.random().toString().replace('.', '');
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
      <TabList className={styles.tabList}>
        {this.props.config.map((c, i) => {
          const key = this.createId(i);
          return (
            <Tab
              id={key}
              key={key}
              className={`${styles.tab} ${
                this.props.animatedUnderlineStyle
                  ? styles.animatedUnderline
                  : styles.traditional
              }`}
              active={key === activeTabId}
            >
              {c.text}
            </Tab>
          );
        })}
        {this.props.animatedUnderlineStyle && (
          <div
            className={styles.tabIndicator}
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
    <div className={styles.tabPanelContainer}>
      {this.props.config.map((c, i) => {
        const key = this.createId(i);
        const isActive = key === activeTabId;
        return (
          <TabPanel
            tabId={key}
            key={key}
            active={isActive}
            className={styles.tabPanel}
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
      // eslint-disable-next-line prefer-destructuring
      activeTabId = this.state.activeTabId;
    } else if (this.props.config.findIndex((c) => c.default) !== -1) {
      activeTabId = this.createId(
        this.props.config.findIndex((c) => c.default)
      );
    } else {
      activeTabId = this.createId(0);
    }

    return (
      <Wrapper
        onChange={this.onChange}
        activeTabId={activeTabId}
        className={styles.tabContainer}
      >
        {this.renderTabList(activeTabId)}
        {this.renderTabPanels(activeTabId)}
      </Wrapper>
    );
  }
}
