import React from 'react';
import cx from 'classnames';

import s from './styles/Text.module.scss';
import { ContainerElementProps } from '../Layout/types';
import { generateClassnames } from '../utils/generateClassnames';
import { ResponsiveProperty } from '../typings/responsive-properties';

type TextTags = 'p' | 'span';
type FontSizes = 'sm' | 'lg';

type TextProps = {
  as?: TextTags;
  fontSize?: ResponsiveProperty<FontSizes>;
} & ContainerElementProps;

export const Text: React.FC<TextProps> = ({
  children,
  as: Element = 'p',
  fontSize = 'lg',
  className,
  testId,
}) => {
  return (
    <Element
      className={cx(s.text, className, generateClassnames({ fontSize }, s))}
      data-testid={testId}
    >
      {children}
    </Element>
  );
};

export default Text;
