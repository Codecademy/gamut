import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles';

const propTypes = {
  createBaseId: PropTypes.func.isRequired,
  activeTabIndex: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.string,
  center: PropTypes.bool,
  className: PropTypes.string,
};

const defaultProps = {
  createBaseId: () => {},
  activeTabIndex: 0,
  onChange: () => {},
};

const TabList = ({
  children,
  activeTabIndex,
  onChange,
  createBaseId,
  center,
  maxWidth,
  className,
}) => {
  const classes = cx(s.tabList, className, { [s.center]: center });
  return (
    <ul className={classes} style={{ maxWidth }}>
      {React.Children.map(children, (tab, index) =>
        React.cloneElement(tab, {
          active: activeTabIndex === index,
          tabIndex: index,
          onChange,
          id: createBaseId(index),
          key: index,
        })
      )}
    </ul>
  );
};

TabList.propTypes = propTypes;
TabList.defaultProps = defaultProps;

export default TabList;
