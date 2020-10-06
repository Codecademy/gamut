import React, { ReactElement, FunctionComponent, ReactNode } from 'react';
import cx from 'classnames';
import { Tab } from '../Tab';
import s from './styles.module.scss';

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

export const TabList: FunctionComponent<TabListProps> = ({
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
      {(React.Children.toArray(children) as any)
        .filter((c: ReactElement) => c && c.type === Tab)
        .map((tab: ReactElement, index: number) => {
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
