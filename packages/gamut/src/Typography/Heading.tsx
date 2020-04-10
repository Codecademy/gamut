import React from 'react';
import cx from 'classnames';

import s from './styles/Heading.module.scss';
import { ContainerElementProps } from '../Layout/types';
import { generateClassnames } from '../utils/generateClassnames';
import { ResponsiveProperty } from '../typings/responsive-properties';

export type HeadingTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type FontSizes = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type AllowedStyles = { color?: string };

type HeadingProps = {
  as: HeadingTags;
  fontSize: ResponsiveProperty<FontSizes>;
  style?: AllowedStyles;
  hideMargin?: boolean;
} & ContainerElementProps;

export const Heading: React.FC<HeadingProps> = React.memo(
  ({
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
          s.heading,
          className,
          generateClassnames({ fontSize }, s),
          {
            [s.hideMargin]: hideMargin,
          }
        )}
        data-testid={testId}
        style={style}
      >
        {children}
      </Element>
    );
  }
);

export default Heading;
