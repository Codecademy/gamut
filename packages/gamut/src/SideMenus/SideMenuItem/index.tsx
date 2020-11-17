import cx from 'classnames';
import React from 'react';

import { ChildComponentDescriptor } from '../../typings/react';
import styles from './styles.module.scss';

export type AsProps = {
  className?: string;
};

export type MenuItemProps = {
  /**
   * Component type to wrap children with.
   *
   * @remarks If not the default, it should be a component that returns an `<a>`.
   * @default "a"
   */
  as?: ChildComponentDescriptor;

  /**
   * @remarks We would love to properly type this with generics, but cannot yet.
   * @see https://github.com/Codecademy/client-modules/pull/270#discussion_r270917147
   * @see https://github.com/Microsoft/TypeScript/issues/21048
   */
  asProps?: any;

  selected?: boolean;
  ariaLabel?: string;
};

export const SideMenuItem: React.FC<MenuItemProps> = ({
  as: As = 'a',
  asProps = {},
  selected,
  children,
  ariaLabel,
}) => {
  const childClassName = cx(styles.link, asProps.className);

  return (
    <li className={cx(styles.menuItem, { [styles.selected]: selected })}>
      <As {...asProps} className={childClassName} aria-label={ariaLabel}>
        {children}
      </As>
    </li>
  );
};
