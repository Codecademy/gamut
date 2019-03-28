import cx from 'classnames';
import React from 'react';

import s from './styles.scss';

type MenuItemProps = {
  selected?: boolean;
};

const MenuItem: React.FC<MenuItemProps> = ({ selected, children }) => {
  return (
    <li className={cx(s.menuItem, { [s.selected]: selected })}>
      {children}
    </li>
  );
};

export default MenuItem;
