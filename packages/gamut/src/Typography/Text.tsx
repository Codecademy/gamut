import React from 'react';
import cx from 'classnames';

import s from './styles/Text.module.scss';
import { ContainerElementProps } from '../Layout/types';
import { generateResponsiveClassnames } from '../utils/generateResponsiveClassnames';
import { ResponsiveProperty } from '../typings/responsive-properties';
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
        s.text,
        className,
        generateResponsiveClassnames({ fontSize }, s)
      )}
      data-testid={testId}
      style={style}
    >
      {children}
    </Element>
  );
};
