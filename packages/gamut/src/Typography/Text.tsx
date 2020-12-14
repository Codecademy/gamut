import cx from 'classnames';
import React from 'react';

import { ContainerElementProps } from '../Layout/types';
import { ResponsiveProperty } from '../typings/responsive-properties';
import { generateResponsiveClassnames } from '../utils/generateResponsiveClassnames';
import styles from './styles/Text.module.scss';
import { AllowedStyles } from './types';

export type TextTags = 'p' | 'span' | 'div';
export type TextSizes = 'sm' | 'md' | 'lg';

type TextProps = {
  /** Text based tags */
  as?: TextTags;
  /** A font-size/font-family pair */
  fontSize?: ResponsiveProperty<TextSizes>;
  /** Allows you to pass color attributes directly to the tag */
  style?: AllowedStyles;
} & ContainerElementProps;

export const Text: React.FC<TextProps> = ({
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
