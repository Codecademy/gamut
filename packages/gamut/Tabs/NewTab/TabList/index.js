import React from 'react';
import PropTypes from 'prop-types';
import s from './styles';

const TabList = ({
  children,
  activeTabIndex,
  updateTabIndex,
  createBaseId,
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
        allCaps: allCaps,
      })
    )}
  </ul>
);

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
  maxWidth: PropTypes.string,
  center: PropTypes.bool,
};

export default TabList;
