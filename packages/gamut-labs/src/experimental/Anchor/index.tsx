import { variant } from '@codecademy/gamut-styles';
import { HandlerProps } from '@codecademy/gamut-system';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const anchorVariants = variant({
  inline: {
    textDecoration: 'underline',
  },
  notInline: {
    textDecoration: 'none',
  },
});

export type AnchorProps = HandlerProps<typeof anchorVariants> & {
  color?: string;
};

export const Anchor = styled.a`
  ${anchorVariants}
  ${({ color, variant }) => {
    if (variant === 'notInline' && color) {
      return css`
        color: ${color};
      `;
    }
  }}
  text-decoration: 'underline'
`;

Anchor.defaultProps = {
  variant: 'inline',
};
