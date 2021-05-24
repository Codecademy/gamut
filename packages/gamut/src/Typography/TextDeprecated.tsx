import cx from 'classnames';
import React from 'react';

import { ResponsiveProperty } from '../typings/responsive-properties';
import { generateResponsiveClassnames } from '../utils/generateResponsiveClassnames';
import styles from './styles/Text.module.scss';
import { AllowedStyles } from './types';

export type TextTags = 'p' | 'span' | 'div';
export type TextSizes = 'sm' | 'md' | 'lg';

type TextDeprecatedProps = {
  className?: string;
  testId?: string;
  /** Text based tags */
  as?: TextTags;
  /** A font-size/font-family pair */
  fontSize?: ResponsiveProperty<TextSizes>;
  /** Allows you to pass color attributes directly to the tag */
  style?: AllowedStyles;
};

/**
 * @deprecated
 * This component is deprecated and is no longer supported.
 *
 * Please use the new [Text](https://gamut.codecademy.com/storybook/?path=/docs/typography-text--text) typography component
 * ```
 * import { Text } from '@codecademy/gamut';
 *
 * <Text as="p">paragraph text</Text>
 * ```
 */

export const TextDeprecated: React.FC<TextDeprecatedProps> = ({
  children,
  as: Element = 'p',
  fontSize = 'md',
  className,
  testId,
  style,
}) => {
  return (
    <Element
      className={cx(
        styles.text,
        className,
        generateResponsiveClassnames({ fontSize }, styles)
      )}
      data-testid={testId}
      style={style}
    >
      {children}
    </Element>
  );
};
