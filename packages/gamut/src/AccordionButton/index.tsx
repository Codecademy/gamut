import { ArrowChevronDownIcon } from '@codecademy/gamut-icons';
import cx from 'classnames';
import React from 'react';

import Button from '../Button';
import styles from './styles.module.scss';
import ButtonBase from '../ButtonBase';

export type AccordionButtonProps = {
  className?: string;
  /**
   * Whether the button should display as open or closed.
   */
  expanded?: boolean;
  /**
   * Called when the button is clicked.
   */
  onClick: () => void;
  /**
   * Determines the size of the button.
   */
  size?: 'normal' | 'large';
  /**
   * Visual theme for the clickable header button.
   */
  theme: 'blue' | 'plain' | 'yellow';
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
  onClick,
  size,
  theme,
}) => {
  const { component: ButtonComponent, props } = buttonThemes[theme];

  return (
    <ButtonComponent
      aria-expanded={expanded}
      className={cx(
        styles.accordionButton,
        styles[theme],
        styles[size],
        className
      )}
      onClick={onClick}
      flat
      {...props}
    >
      <span className={styles.children}>{children}</span>
      <ArrowChevronDownIcon
        className={cx(
          styles.expansionIcon,
          expanded && styles.expansionIconExpanded
        )}
        size={size === 'large' ? 30 : undefined}
      />
    </ButtonComponent>
  );
};

export default AccordionButton;
