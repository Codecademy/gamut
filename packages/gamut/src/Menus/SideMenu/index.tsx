import cx from 'classnames';
import React from 'react';

import s from './styles.scss';

export type SideMenuProps = {
  className?: string;
};

export const SideMenu: React.FC<SideMenuProps> = ({ children, className }) => {
  return <ul className={cx(s.sideMenu, className)}>{children}</ul>;
};

export default SideMenu;
