import cx from 'classnames';
import React from 'react';

import Button from '../Button';
import ChevronDownIcon from '../Icon/icons/ChevronDownIcon';
import styles from './styles.module.scss';
import ButtonBase from '../ButtonBase';

export type AccordionTopProps = {
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

export const AccordionTop: React.FC<AccordionTopProps> = ({
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
      className={cx(styles.accordionTop, styles[theme], className)}
      onClick={onClick}
      {...props}
    >
      {children}
      <ChevronDownIcon
        className={cx(
          styles.expansionIcon,
          expanded && styles.expansionIconExpanded
        )}
      />
    </ButtonComponent>
  );
};

export default AccordionTop;
