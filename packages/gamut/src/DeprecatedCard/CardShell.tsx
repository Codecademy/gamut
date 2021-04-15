import { effectColors, system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

/**
 * @deprecated
 * This component is deprecated and is no longer supported.
 *
 * See [Card](https://gamut.codecademy.com/storybook/?path=/docs/atoms-card--card) for similiar functionality
 */

export const CardShell = styled.div(
  system.variant({
    base: {
      background: 'white',
      borderRadius: '2px',
      boxShadow: `0 2px 8px 0 ${effectColors.slightShadow}`,
      position: 'relative',
      transition: 'box-shadow 250ms ease-in',
    },
    variants: {
      flat: {
        boxShadow: 'none',
      },
      hoverable: {
        '&:hover': {
          boxShadow: `-2px 8px 22px 0 ${effectColors.slightShadow}`,
        },
      },
    },
  })
);
