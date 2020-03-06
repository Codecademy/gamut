import React, { ReactElement, Component } from 'react';
import { isNumber } from 'lodash';
import TabPanel from '../TabPanel';
import TabList from '../TabList';

export interface TabsProps {
  activeTabIndex?: number;
  children: ReactElement<any, any>[];
  className?: string;
  defaultActiveTabIndex?: number;
  onChange?: (activeTabIndex: number) => void;
  renderAllPanels?: boolean;
}

export interface TabsState {
  activeTabIndex: number;
}

export class Tabs extends Component<TabsProps> {
  state: TabsState = {
    activeTabIndex: this.props.defaultActiveTabIndex || 0,
  };

  componentDidUpdate(prevProps: TabsProps, prevState: TabsState) {
    const stateIndexChanged =
      this.state.activeTabIndex !== prevState.activeTabIndex;
    if (stateIndexChanged && this.props.onChange) {
      this.props.onChange(this.state.activeTabIndex);
    }
  }

  idPrefix = Math.random()
    .toString()
    .replace('.', '');

  createBaseId = (index: number) => `${this.idPrefix}-${index}`;

  isControlled = () => isNumber(this.props.activeTabIndex);

  updateTabIndexState = (index: number) => {
    this.setState({ activeTabIndex: index });
  };

  render() {
    let activeTabIndex = this.isControlled()
      ? this.props.activeTabIndex
      : this.state.activeTabIndex;

    const onChange = this.isControlled()
      ? this.props.onChange
      : this.updateTabIndexState;

    if (!onChange) {
      throw new Error(
        'Tabs component is controlled but no tab change callback (onChange) was provided'
      );
    }

    const childrenArray = React.Children.toArray(
      this.props.children
    ) as ReactElement[];
    let clonedTabPanels = childrenArray.filter(c => c.type === TabPanel);

    if (activeTabIndex >= clonedTabPanels.length) {
      activeTabIndex = clonedTabPanels.length - 1;
    }

    const tabListChild = childrenArray.find(c => c.type === TabList);
    const clonedTabList = React.cloneElement(tabListChild, {
      activeTabIndex,
      onChange,
      createBaseId: this.createBaseId,
    });

    clonedTabPanels = clonedTabPanels.map((panel, index) =>
      React.cloneElement(panel, {
        active: index === activeTabIndex,
        renderAllPanels: this.props.renderAllPanels,
        id: `${this.createBaseId(index)}-panel`,
        key: this.createBaseId(index),
      })
    );

    return (
      <div>
        {clonedTabList}
        {clonedTabPanels}
      </div>
    );
  }
}

export default Tabs;
