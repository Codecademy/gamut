import React from 'react';

import s from './styles.scss';

const SideMenu: React.FC = ({ children }) => {
  return <ul className={s.sideMenu}>{children}</ul>;
};

export default SideMenu;
