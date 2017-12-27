import React from 'react';
import PropTypes from 'prop-types';
import s from './styles';

const TabList = ({
  children,
  activeTabIndex,
  updateTabIndex,
  createBaseId,
}) => (
  <ul role="tablist" className={s.tabList}>
    {React.Children.map(children, (tab, index) =>
      React.cloneElement(tab, {
        isActive: activeTabIndex === index,
        updateTabIndex: updateTabIndex.bind(null, index),
        id: createBaseId(index),
        key: index,
      })
    )}
  </ul>
);
export default TabList;

TabList.defaultProps = {};
TabList.propTypes = {
  createBaseId: PropTypes.func,
  activeTabIndex: PropTypes.number,
  updateTabIndex: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
