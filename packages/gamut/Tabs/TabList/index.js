import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles';
import Tab from '../Tab';

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
      {React.Children.toArray(children)
        .filter(c => c && c.type === Tab)
        .map((tab, index) => {
          const baseId = createBaseId(index);

          return React.cloneElement(tab, {
            active: activeTabIndex === index,
            tabIndex: index,
            onChange,
            id: baseId,
            key: baseId,
          });
        })}
    </ul>
  );
};

TabList.propTypes = propTypes;
TabList.defaultProps = defaultProps;

export default TabList;
