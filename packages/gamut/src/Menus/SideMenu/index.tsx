import cx from 'classnames';
import React from 'react';

import styles from './styles.module.scss';

export type SideMenuProps = {
  className?: string;
};

/**
 * @deprecated
 */

export const SideMenu: React.FC<SideMenuProps> = ({ children, className }) => {
  return <ul className={cx(styles.sideMenu, className)}>{children}</ul>;
};
