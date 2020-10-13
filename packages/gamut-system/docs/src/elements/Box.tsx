import { compose } from '@codecademy/gamut-system';
import { css } from '@emotion/core';
import {
  styled,
  layout,
  spacing,
  typography,
  grid,
  flex,
  border,
  background,
  positioning,
  variant,
} from '../system';

const containerProps = compose(
  typography,
  layout,
  spacing,
  grid,
  flex,
  border,
  background,
  positioning
);

export const Container = styled.div(containerProps);

const colorVariants = variant({
  prop: 'colorVariant',
  variants: {
    primary: {
      backgroundColor: 'primary',
      color: 'primary',
    },
    secondary: {
      backgroundColor: 'accent',
      color: 'primary',
    },
    tertiary: {
      backgroundColor: 'secondary',
      color: 'primary',
    },
  },
});

const borderVariants = variant({
  prop: 'borderVariant',
  variants: {
    bordered: {
      borderStyle: 'solid',
      borderWidth: 2,
      borderRadius: 'sm',
      borderColor: 'contrast',
    },
  },
});

type BoxProps = Parameters<typeof borderVariants>[0] &
  Parameters<typeof colorVariants>[0] & { as?: 'button' | 'div' };

export const Box = styled(Container)<BoxProps>`
  ${borderVariants}
  ${colorVariants}

  ${({ as, theme }) =>
    as === 'button' &&
    css`
      cursor: pointer;

      &:focus,
      &:active {
        outline-color: ${theme.textColor.accent};
      }
    `}
`;
