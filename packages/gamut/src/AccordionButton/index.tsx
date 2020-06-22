import cx from 'classnames';
import React from 'react';
import { ArrowChevronDownIcon } from '@codecademy/gamut-icons';

import Button from '../Button';
import styles from './styles.module.scss';
import ButtonBase from '../ButtonBase';

export type AccordionButtonProps = {
  className?: string;
  expanded?: boolean;
  onClick: () => void;
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
      outline: true,
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
  theme,
}) => {
  const { component: ButtonComponent, props } = buttonThemes[theme];

  return (
    <ButtonComponent
      aria-expanded={expanded}
      className={cx(styles.accordionButton, styles[theme], className)}
      onClick={onClick}
      {...props}
    >
      {children}
      <ArrowChevronDownIcon
        className={cx(
          styles.expansionIcon,
          expanded && styles.expansionIconExpanded
        )}
      />
    </ButtonComponent>
  );
};

export default AccordionButton;
