import styled from '@emotion/styled';
import { variant } from '@codecademy/gamut-styles';

import { Box } from '@codecademy/gamut';
import { HandlerProps } from '@codecademy/gamut-system';
import { ShadowOffset, createShadow } from './shadow';

export type CardBoxProps = { shadowOffset?: ShadowOffset } & HandlerProps<
  typeof cardVariants
>;

const cardVariants = variant({
  yellow: {
    backgroundColor: 'yellow',
    textColor: 'navy',
    borderColor: 'navy',
  },
  navy: {
    backgroundColor: 'navy',
    textColor: 'white',
    borderColor: 'navy',
  },
  white: {
    backgroundColor: 'white',
    textColor: 'navy',
    borderColor: 'navy',
  },
});

export const CardBox = styled(Box)<CardBoxProps>`
  ${cardVariants}
  ${({ shadowOffset, variant }) =>
    shadowOffset &&
    createShadow(shadowOffset, variant === 'navy' ? 'white' : 'none')}
`;

CardBox.defaultProps = {
  padding: 16,
  variant: 'white',
  borderRadius: '2px',
  borderWidth: '1px',
  borderStyle: 'solid',
};
