import { ArrowChevronDownIcon } from '@codecademy/gamut-icons';
import cx from 'classnames';
import * as React from 'react';

import { ButtonDeprecated } from './ButtonDeprecated';
import {
  ButtonDeprecatedBase,
  ButtonDeprecatedBaseProps,
} from './ButtonDeprecatedBase';
// eslint-disable-next-line gamut/no-css-standalone
import styles from './styles.module.scss';

export type AccordionButtonSize = 'normal' | 'large';

export type AccordionButtonTheme = 'blue' | 'plain' | 'yellow';

export type AccordionButtonDeprecatedProps = ButtonDeprecatedBaseProps & {
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
    component: ButtonDeprecated,
    props: {
      flat: true,
      theme: 'white',
    },
  },
  plain: {
    component: ButtonDeprecated,
    props: {
      flat: true,
      theme: 'brand-dark-blue',
    },
  },
  yellow: {
    component: ButtonDeprecatedBase,
    props: {},
  },
} as const;

/**
 * @deprecated
 * This component is in the old visual identity and will be updated soon.
 *
 * Check the [Gamut Board](https://www.notion.so/codecademy/Gamut-Status-Timeline-dd3c135d3848464ea6eb1b48e68fbb1d) for component status
 */

export const AccordionButtonDeprecated: React.FC<
  AccordionButtonDeprecatedProps
> = ({
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
      {...baseProps}
      {...props}
    >
      <span className={styles.children}>{children}</span>
      <ArrowChevronDownIcon
        aria-hidden
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
