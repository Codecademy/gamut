import React from 'react';
import cx from 'classnames';

import s from './styles/Text.module.scss';
import { ContainerElementProps } from '../Layout/types';
import { generateResponsiveClassnames } from '../utils/generateResponsiveClassnames';
import { ResponsiveProperty } from '../typings/responsive-properties';
import { AllowedStyles } from './types';

type TextTags = 'p' | 'span' | 'div';
type FontSizes = 'sm' | 'lg';

type TextProps = {
  /** Text based tags */
  as?: TextTags;
  /** A font-size/font-family pair */
  fontSize?: ResponsiveProperty<FontSizes>;
  /** Allows you to pass color attributes directly to the tag */
  style?: AllowedStyles;
} & ContainerElementProps;

export const Text: React.FC<TextProps> = ({
  children,
  as: Element = 'p',
  fontSize = 'lg',
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

export default Text;
