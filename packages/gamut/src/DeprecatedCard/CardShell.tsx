import { theme, variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

/**
 * @deprecated
 * This component is deprecated and is no longer supported.
 *
 * See [Card](https://gamut.codecademy.com/storybook/?path=/docs/atoms-card--card) for similiar functionality
 */

export const CardShell = styled.div(
  variant({
    defaultVariant: 'shadowed',
    base: {
      background: 'white',
      borderRadius: '2px',
      boxShadow: `0 2px 8px 0  ${theme.colors['shadow-black-slight']}`,
      position: 'relative',
      transition: 'box-shadow 250ms ease-in',
    },
    variants: {
      shadowed: {},
      flat: {
        boxShadow: 'none',
      },
      hoverable: {
        '&:hover': {
          boxShadow: `-2px 8px 22px 0 ${theme.colors['shadow-black-slight']}`,
        },
      },
    },
  })
);
