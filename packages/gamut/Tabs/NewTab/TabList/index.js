import React from 'react';
import PropTypes from 'prop-types';
import s from './styles';

const TabList = ({
  children,
  activeTabIndex,
  updateTabIndex,
  createBaseId,
  onTabIndexUpdate,
  allCaps,
  center,
  maxWidth,
}) => (
  <ul
    className={`${s.tabList} ${center ? s.center : ''}`}
    style={{ maxWidth: maxWidth }}
  >
    {React.Children.map(children, (tab, index) =>
      React.cloneElement(tab, {
        isActive: activeTabIndex === index,
        updateTabIndex: updateTabIndex.bind(null, index),
        id: createBaseId(index),
        key: index,
        onTabIndexUpdate:
          onTabIndexUpdate && onTabIndexUpdate.bind(null, index),
        allCaps: allCaps,
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
  allCaps: PropTypes.bool,
  onTabIndexUpdate: PropTypes.func,
  maxWidth: PropTypes.string,
  center: PropTypes.bool,
};
