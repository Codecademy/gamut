import { ArrowChevronDownIcon } from '@codecademy/gamut-icons';
import cx from 'classnames';
import React from 'react';

import Button from '../Button';
import ButtonBase, { ButtonBaseProps } from '../ButtonBase';
import styles from './styles.module.scss';

export type AccordionButtonSize = 'normal' | 'large';

export type AccordionButtonTheme = 'blue' | 'plain' | 'yellow';

export type AccordionButtonProps = ButtonBaseProps & {
  /**
   * Whether the button should display as open or closed.
   */
  expanded?: boolean;

  /**
   * Determines the size of the button.
   */
  size?: 'normal' | 'large';

  /**
   * Visual theme for the clickable header button.
   */
  theme?: 'blue' | 'plain' | 'yellow';
};

const buttonThemes = {
  blue: {
    component: Button,
    props: {
      flat: true,
      theme: 'white',
    },
  },
  plain: {
    component: Button,
    props: {
      flat: true,
      theme: 'brand-dark-blue',
    },
  },
  yellow: {
    component: ButtonBase,
    props: {},
  },
};

export const AccordionButton: React.FC<AccordionButtonProps> = ({
  children,
  className,
  expanded,
  size = 'normal',
  theme = 'plain',
  ...baseProps
}) => {
  const { component: ButtonComponent, props } = buttonThemes[theme];
  const iconSize = size === 'large' ? 30 : undefined;

  return (
    <ButtonComponent
      aria-expanded={expanded}
      className={cx(
        styles.accordionButton,
        styles[theme],
        styles[size],
        className
      )}
      flat
      {...baseProps}
      {...props}
    >
      <span className={styles.children}>{children}</span>
      <ArrowChevronDownIcon
        className={cx(
          styles.expansionIcon,
          expanded && styles.expansionIconExpanded
        )}
        height={iconSize}
        width={iconSize}
      />
    </ButtonComponent>
  );
};

export default AccordionButton;
