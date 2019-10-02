import React, { ReactElement, FunctionComponent, ReactNode } from 'react';
import cx from 'classnames';
import Tab from '../Tab';
import s from './styles.scss';

export type TabListProps = {
  activeTabIndex?: number;
  center?: boolean;
  children: ReactNode;
  className?: string;
  createBaseId?: (index: number) => string;
  maxWidth?: string;
  onChange?: () => void;
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
    <div className={classes} role="tablist" style={{ maxWidth }}>
      {React.Children.toArray(children)
        .filter((c: ReactElement) => c && c.type === Tab)
        .map((tab: ReactElement, index) => {
          const baseId = createBaseId ? createBaseId(index) : index;
          return React.cloneElement(tab, {
            active: activeTabIndex === index,
            tabIndex: index,
            onChange,
            id: baseId,
            key: baseId,
          });
        })}
    </div>
  );
};

TabList.defaultProps = defaultProps;

export default TabList;
