import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles';

const TabList = ({
  children,
  activeTabIndex,
  updateTabIndex,
  createBaseId,
  center,
  maxWidth,
}) => {
  const classes = cx(s.tabList, { [s.center]: center });
  return (
    <ul className={classes} style={{ maxWidth: maxWidth }}>
      {React.Children.map(children, (tab, index) =>
        React.cloneElement(tab, {
          active: activeTabIndex === index,
          updateTabIndex: updateTabIndex.bind(null, index),
          id: createBaseId(index),
          key: index,
        })
      )}
    </ul>
  );
};

TabList.propTypes = {
  createBaseId: PropTypes.func,
  activeTabIndex: PropTypes.number,
  updateTabIndex: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  maxWidth: PropTypes.string,
  center: PropTypes.bool,
};

export default TabList;
