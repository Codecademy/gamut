import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles/index.scss';
import Tab from '../Tab';

const propTypes = {
  activeTabIndex: PropTypes.number.isRequired,
  center: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  createBaseId: PropTypes.func.isRequired,
  maxWidth: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

const defaultProps = {
  createBaseId: () => {},
  activeTabIndex: 0,
  onChange: () => {},
};

export type TabListProps = {
  activeTabIndex: number;
  center?: boolean;
  children: ReactElement<any, any> | ReactElement<any, any>[];
  className?: string;
  createBaseId: (index: number) => string;
  maxWidth?: string;
  onChange: () => void;
};

const TabList = ({
  activeTabIndex,
  center,
  children,
  className,
  createBaseId,
  maxWidth,
  onChange,
}: TabListProps) => {
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
