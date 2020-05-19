import cx from 'classnames';
import React, { ReactNode, FunctionComponent } from 'react';

import { pickDataProps } from '../../utils/pickDataProps';

import ButtonBase from '../../ButtonBase';

import s from './styles.module.scss';

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
  const tabClasses = cx(s.tab, className, {
    [s.tab_default]: defaultTheme,
    [s.active]: active,
    [s.tab_default__active]: defaultTheme && active,
    [activeClassName]: active && activeClassName,
    [s.disabled]: disabled,
  });
  const dataPropsToTransfer = pickDataProps(rest);

  return (
    <ButtonBase
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
      {...dataPropsToTransfer}
    >
      {children}
    </ButtonBase>
  );
};

export default Tab;
