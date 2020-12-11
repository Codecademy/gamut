import cx from 'classnames';
import React, { FunctionComponent, ReactNode } from 'react';

import { omitProps } from '../../utils/omitProps';
import styles from './styles.module.scss';

export type TabProps = {
  active?: boolean;
  activeClassName?: string;
  children?: ReactNode;
  className?: string;
  id?: string;
  disabled?: boolean;
  onChange?: (newTabIndex: number) => void;
  tabIndex?: number;
  defaultTheme?: boolean;
};

export const Tab: FunctionComponent<TabProps> = ({
  active,
  children,
  activeClassName,
  className,
  disabled,
  id,
  defaultTheme = true,
  onChange = () => {},
  tabIndex = 0,
  ...rest
}: TabProps) => {
  const tabClasses = cx(styles.tab, className, {
    [styles.tab_default]: defaultTheme,
    [styles.active]: active,
    [styles.tab_default__active]: defaultTheme && active,
    [activeClassName!]: active && activeClassName,
    [styles.disabled]: disabled,
  });
  const dataPropsToTransfer = omitProps([], rest);

  return (
    <button
      id={id}
      className={tabClasses}
      aria-selected={active}
      aria-controls={`${id}-panel`}
      onClick={(e: React.MouseEvent) => {
        e.preventDefault();

        if (disabled) {
          return;
        }

        onChange(tabIndex);
      }}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (disabled) {
          return;
        }

        // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_link_role
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          onChange(tabIndex);
        }
      }}
      role="tab"
      tabIndex={disabled ? -1 : 0}
      type="button"
      {...dataPropsToTransfer}
    >
      {children}
    </button>
  );
};
