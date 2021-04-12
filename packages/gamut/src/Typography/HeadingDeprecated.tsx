import cx from 'classnames';
import React from 'react';

import { ContainerElementProps } from '../Layout/types';
import { ResponsiveProperty } from '../typings/responsive-properties';
import { generateResponsiveClassnames } from '../utils/generateResponsiveClassnames';
import styles from './styles/Heading.module.scss';
import { AllowedStyles } from './types';

export type HeadingTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type FontSizes = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type HeadingDeprecatedProps = {
  /** @param */
  as: HeadingTags;
  /** A font-size/font-family pair */
  fontSize: ResponsiveProperty<FontSizes>;
  /** Allows you to pass color attributes directly to the tag */
  style?: AllowedStyles;
  /** Toggle default heading margin */
  hideMargin?: boolean;
} & ContainerElementProps;

/**
 * @deprecated  This component is deprecated and is no longer supported
 *
 * Please use the new [Text](https://gamut.codecademy.com/storybook/?path=/docs/typography-text--text) typography component
 * ```
 * import { Text } from '@codecademy/gamut';
 *
 * <Text as="h3">paragraph text</Text>
 * ```
 */

export const HeadingDeprecated: React.FC<HeadingDeprecatedProps> = ({
  children,
  as: Element,
  className,
  fontSize = 'md',
  style,
  testId,
  hideMargin = false,
}) => {
  return (
    <Element
      className={cx(
        styles.heading,
        className,
        generateResponsiveClassnames({ fontSize }, styles),
        {
          [styles.hideMargin]: hideMargin,
        }
      )}
      data-testid={testId}
      style={style}
    >
      {children}
    </Element>
  );
};
