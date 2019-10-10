import React, { Component } from 'react';
import { isNumber } from 'lodash';
import TabPanel from '../TabPanel';
import TabList from '../TabList';
class Tabs extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      activeTabIndex: this.props.defaultActiveTabIndex || 0,
    };
    this.idPrefix = Math.random()
      .toString()
      .replace('.', '');
    this.createBaseId = index => `${this.idPrefix}-${index}`;
    this.isControlled = () => isNumber(this.props.activeTabIndex);
    this.updateTabIndexState = index => {
      this.setState({ activeTabIndex: index });
    };
  }
  componentDidUpdate(prevProps, prevState) {
    const stateIndexChanged =
      this.state.activeTabIndex !== prevState.activeTabIndex;
    if (stateIndexChanged && this.props.onChange) {
      this.props.onChange(this.state.activeTabIndex);
    }
  }
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
    const childrenArray = React.Children.toArray(this.props.children);
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
    return React.createElement('div', null, clonedTabList, clonedTabPanels);
  }
}
export default Tabs;
//# sourceMappingURL=index.js.map
