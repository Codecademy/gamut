import cx from 'classnames';
import React from 'react';

import s from './styles.module.scss';

export type SideMenuProps = {
  className?: string;
};

export const SideMenu: React.FC<SideMenuProps> = ({ children, className }) => {
  return <ul className={cx(s.sideMenu, className)}>{children}</ul>;
};
