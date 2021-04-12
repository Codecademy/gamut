import cx from 'classnames';
import React from 'react';

import styles from './styles.module.scss';

export type SideMenuProps = {
  className?: string;
};

/**
 * @deprecated
 * This component is deprecated and is no longer supported.
 *
 * Check the [Gamut Board](https://www.notion.so/codecademy/Gamut-Status-Timeline-dd3c135d3848464ea6eb1b48e68fbb1) for component status
 */

export const SideMenu: React.FC<SideMenuProps> = ({ children, className }) => {
  return <ul className={cx(styles.sideMenu, className)}>{children}</ul>;
};
