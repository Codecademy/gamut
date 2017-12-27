import React from 'react';
import PropTypes from 'prop-types';
import TabPanel from '../TabPanel';
import TabList from '../TabList';

export default class Tabs extends React.Component {
  static defaultProps = {};

  static propTypes = {
    activeTabIndex: PropTypes.number,
    children: PropTypes.arrayOf(PropTypes.node),
    updateTabIndex: PropTypes.func,
    renderAllPanels: PropTypes.bool,
    defaultActiveTabIndex: PropTypes.number,
  };

  state = {
    activeTabIndex: this.props.defaultActiveTabIndex || 0,
  };

  idPrefix = Math.random()
    .toString()
    .replace('.', '');

  createBaseId = index => `${this.idPrefix}-${index}`;

  isControlled = () => this.props.activeTabIndex !== undefined;

  updateTabIndex = index => {
    this.setState({ activeTabIndex: index });
  };

  render() {
    const activeTabIndex = this.isControlled()
      ? this.props.activeTabIndex
      : this.state.activeTabIndex;

    const updateTabIndex = this.isControlled()
      ? this.props.updateTabIndex
      : this.updateTabIndex;

    const childrenArray = React.Children.toArray(this.props.children);
    const tabListChild = childrenArray.filter(c => c.type === TabList)[0];
    const clonedTabList = React.cloneElement(tabListChild, {
      activeTabIndex,
      updateTabIndex,
      createBaseId: this.createBaseId,
    });
    const clonedTabPanels = childrenArray
      .filter(c => c.type === TabPanel)
      .map((panel, index) =>
        React.cloneElement(panel, {
          isActive: index === activeTabIndex,
          renderAllPanels: this.props.renderAllPanels,
          id: `${this.createBaseId(index)}-panel`,
          key: this.createBaseId(index),
          updateTabIndex,
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
