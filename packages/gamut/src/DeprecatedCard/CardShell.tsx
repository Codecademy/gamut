import { effectColors, system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { HTMLAttributes } from 'react';

const Shell = styled.div(
  system.variant({
    base: {
      background: 'white',
      borderRadius: '2px',
      boxShadow: `0 2px 8px 0 ${effectColors.slightShadow}`,
      position: 'relative',
      transition: 'box-shadow 250ms ease-in',
    },
    variants: {
      hoverable: {
        '&:hover': {
          boxShadow: `-2px 8px 22px 0 ${effectColors.slightShadow}`,
        },
      },
    },
  })
);

/**
 * @deprecated
 * This component is deprecated and is no longer supported.
 *
 * See [Card](https://gamut.codecademy.com/storybook/?path=/docs/atoms-card--card) for similiar functionality
 */

export type CardShellProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Hover effect to show indicate depth and interactivity.
   */
  hoverShadow?: boolean;
};

export const CardShell = React.forwardRef<HTMLDivElement, CardShellProps>(
  ({ children, hoverShadow, className, ...props }, ref) => {
    return (
      <Shell
        ref={ref}
        className={className}
        variant={hoverShadow && 'hoverable'}
        {...props}
      >
        {children}
      </Shell>
    );
  }
);

CardShell.defaultProps = {
  hoverShadow: false,
};
