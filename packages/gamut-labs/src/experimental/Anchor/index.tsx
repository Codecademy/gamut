import { variant, properties } from '@codecademy/gamut-styles';
import { HandlerProps } from '@codecademy/gamut-system';
import styled from '@emotion/styled';

const anchorVariants = variant({
  inline: {
    textDecoration: 'underline',
    textColor: 'hyper',
  },
  notInline: {
    display: 'block',
    textDecoration: 'none',
  },
});

export type AnchorProps = HandlerProps<typeof anchorVariants> &
  HandlerProps<typeof properties.textColor>;

export const Anchor = styled.a<AnchorProps>`
  ${properties.textColor}
  ${anchorVariants}
`;

Anchor.defaultProps = {
  variant: 'inline',
};
