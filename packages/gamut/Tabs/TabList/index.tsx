import React, { ReactElement, FunctionComponent } from 'react';
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

export type TabListProps = {
  activeTabIndex: number;
  center?: boolean;
  children: ReactElement<any, any> | ReactElement<any, any>[];
  className?: string;
  createBaseId: (index: number) => string;
  maxWidth?: string;
  onChange: () => void;
};

const defaultProps = {
  createBaseId: (i: number) => `${i}`,
  activeTabIndex: 0,
  onChange: () => {},
};

const TabList: FunctionComponent<TabListProps> = ({
  activeTabIndex,
  center,
  children,
  className,
  createBaseId,
  maxWidth,
  onChange,
}) => {
  const classes = cx(s.tabList, className, { [s.center]: center });
  return (
    <ul className={classes} style={{ maxWidth }}>
      {React.Children.toArray(children)
        // @ts-ignore
        .filter(c => c && c.type === Tab)
        .map((tab, index) => {
          const baseId = createBaseId ? createBaseId(index) : index;
          // @ts-ignore
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

TabList.defaultProps = defaultProps;

export default TabList;
