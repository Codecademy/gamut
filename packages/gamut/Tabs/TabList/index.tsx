import React, { ReactElement, FunctionComponent } from 'react';
import cx from 'classnames';
import s from './styles/index.scss';
import Tab from '../Tab';

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
    </ul>
  );
};

TabList.defaultProps = defaultProps;

export default TabList;
