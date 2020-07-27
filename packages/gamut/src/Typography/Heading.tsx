import React from 'react';
import cx from 'classnames';

import s from './styles/Heading.module.scss';
import { generateResponsiveClassnames } from '../utils/generateResponsiveClassnames';
import { ResponsiveProperty } from '../typings/responsive-properties';
import { AllowedStyles } from './types';

export type HeadingTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type FontSizes = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type HeadingProps = {
  /** Heading tags h1 - h6 */
  as: HeadingTags;
  /** A font-size/font-family pair */
  fontSize: ResponsiveProperty<FontSizes>;
  /** Allows you to pass color attributes directly to the tag */
  style?: AllowedStyles;
  /** Toggle default heading margin */
  hideMargin?: boolean;
  testId?: string;
  className?: string;
};

export const Heading: React.FC<HeadingProps> = ({
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
        generateResponsiveClassnames({ fontSize }, s),
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
};

export default Heading;
