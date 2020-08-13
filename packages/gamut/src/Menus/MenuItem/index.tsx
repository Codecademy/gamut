import cx from 'classnames';
import React from 'react';

import { ChildComponentDescriptor } from '../../typings/react';
import s from './styles.module.scss';

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
};

export const MenuItem: React.FC<MenuItemProps> = ({
  as: As = 'a',
  asProps = {},
  selected,
  children,
}) => {
  const childClassName = cx(s.link, asProps.className);

  return (
    <li className={cx(s.menuItem, { [s.selected]: selected })}>
      <As {...asProps} className={childClassName}>
        {children}
      </As>
    </li>
  );
};
