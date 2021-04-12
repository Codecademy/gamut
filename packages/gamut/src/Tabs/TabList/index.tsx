import cx from 'classnames';
import React, { FunctionComponent, ReactElement, ReactNode } from 'react';

import { Tab } from '../Tab';
import styles from './styles.module.scss';

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

/**
 * @deprecated  This component is deprecated and is no longer supported..
 *
 * Check the [Gamut Board](https://www.notion.so/codecademy/Gamut-Status-Timeline-dd3c135d3848464ea6eb1b48e68fbb1) for component status
 */

export const TabList: FunctionComponent<TabListProps> = ({
  activeTabIndex,
  center,
  children,
  className,
  createBaseId,
  maxWidth,
  onChange,
}) => {
  const classes = cx(styles.tabList, className, { [styles.center]: center });
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
