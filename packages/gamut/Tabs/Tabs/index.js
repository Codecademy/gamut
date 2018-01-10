import React from 'react';
import { isNumber } from 'lodash';
import PropTypes from 'prop-types';
import TabPanel from '../TabPanel';
import TabList from '../TabList';

class Tabs extends React.Component {
  static defaultProps = {};

  static propTypes = {
    activeTabIndex: PropTypes.number,
    children: PropTypes.arrayOf(PropTypes.node),
    updateTabIndex: PropTypes.func,
    renderAllPanels: PropTypes.bool,
    defaultActiveTabIndex: PropTypes.number,
    onChange: PropTypes.func,
  };

  state = {
    activeTabIndex: this.props.defaultActiveTabIndex || 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.onChange) {
      return;
    }
    const propsIndexChanged =
      this.props.activeTabIndex !== undefined &&
      this.props.activeTabIndex !== prevProps.activeTabIndex;
    if (propsIndexChanged) {
      this.props.onChange(this.props.activeTabIndex);
      return;
    }

    const stateIndexChanged =
      this.state.activeTabIndex !== prevState.activeTabIndex;
    if (stateIndexChanged) {
      this.props.onChange(this.state.activeTabIndex);
    }
  }

  idPrefix = Math.random()
    .toString()
    .replace('.', '');

  createBaseId = index => `${this.idPrefix}-${index}`;

  isControlled = () => isNumber(this.props.activeTabIndex);

  updateTabIndex = index => {
    this.setState({ activeTabIndex: index });
  };

  render() {
    let activeTabIndex = this.isControlled()
      ? this.props.activeTabIndex
      : this.state.activeTabIndex;

    const updateTabIndex = this.isControlled()
      ? this.props.updateTabIndex
      : this.updateTabIndex;

    if (!updateTabIndex) {
      throw new Error(
        'Tabs component is controlled but no tab change callback (updateTabIndex) was provided'
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
      updateTabIndex,
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
