import { css, properties, variant } from '@codecademy/gamut-styles';
import { HandlerProps } from '@codecademy/gamut-system';
import styled from '@emotion/styled';

const anchorVariants = variant({
  inline: {
    textColor: 'paleBlue',
  },
  interface: {
    textDecoration: 'none',
  },
});

export type AnchorProps = HandlerProps<typeof anchorVariants> &
  HandlerProps<typeof properties.textColor>;

export const Anchor = styled.a<AnchorProps>`
  ${properties.textColor}
  ${anchorVariants}
  ${css({
    ':hover': {
      backgroundColor: { base: 'green', xl: 'blue' },
    },
  })}
`;

Anchor.defaultProps = {
  variant: 'inline',
};
