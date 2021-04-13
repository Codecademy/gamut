import cx from 'classnames';
import React, { FunctionComponent, ReactNode } from 'react';

import styles from './styles.module.scss';

export type TabPanelProps = {
  active?: boolean;
  children?: ReactNode;
  className?: string;
  id?: string;
  renderAllPanels?: boolean;
};

/**
 * @deprecated
 * This component is deprecated and is no longer supported.
 *
 * Check the [Gamut Board](https://www.notion.so/codecademy/Gamut-Status-Timeline-dd3c135d3848464ea6eb1b48e68fbb1d) for component status
 */

export const TabPanel: FunctionComponent<TabPanelProps> = ({
  children,
  active,
  renderAllPanels,
  id,
  className,
}) => (
  <div
    id={id}
    // id should be passed by the TabList - confusing, but workable.
    aria-labelledby={id!.replace('-panel', '')}
    aria-hidden={!active}
    role="tabpanel"
    className={cx(className, {
      [styles.active]: active,
      [styles.hidden]: !active,
    })}
  >
    {active || renderAllPanels ? children : null}
  </div>
);
