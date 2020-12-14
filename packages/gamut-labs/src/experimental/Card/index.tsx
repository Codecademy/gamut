import { Box } from '@codecademy/gamut';
import { variant } from '@codecademy/gamut-styles';
import { HandlerProps } from '@codecademy/gamut-system';
import styled from '@emotion/styled';

import { createShadow, ShadowOffset } from './shadow';

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
  hyper: {
    backgroundColor: 'hyper',
    textColor: 'white',
    borderColor: 'navy',
  },
});

export type CardProps = HandlerProps<typeof cardVariants> & {
  shadowOffset?: ShadowOffset;
};

export const Card = styled(Box)<CardProps>`
  ${cardVariants}
  ${({ shadowOffset, variant }) => {
    if (shadowOffset) {
      const outlineColor = variant === 'navy' ? 'white' : 'none';
      return createShadow(shadowOffset, outlineColor);
    }
  }}
`;

Card.defaultProps = {
  padding: 16,
  variant: 'white',
  borderRadius: '2px',
  borderWidth: '1px',
  borderStyle: 'solid',
};
