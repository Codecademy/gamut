import { properties, styled, variant } from '@codecademy/gamut-styles';
import { HandlerProps } from '@codecademy/gamut-system';

const anchorVariants = variant({
  inline: {
    textDecoration: 'underline',
    textColor: 'hyper',
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
`;

Anchor.defaultProps = {
  variant: 'inline',
};
