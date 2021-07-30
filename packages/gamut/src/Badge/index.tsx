import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import React from 'react';

import { variant } from '../../../gamut-styles/dist';
import { Box } from '../Box';

type BadgeProps = StyleProps<typeof badgeVariants> & {
  children?: React.ReactNode;
};

export const Badge: React.FC<BadgeProps> = ({ children, variant }) => (
  <BadgeWrapper variant={variant}>{children}</BadgeWrapper>
);

const badgeVariants = variant({
  base: {
    borderRadius: '40px',
    mx: 8,
    py: 4,
    px: 12,
    fontSize: 16,
    fontWeight: 400,
    textAlign: 'center',
    textColor: 'white',
    width: 'min-content',
  },
  defaultVariant: 'default',
  variants: {
    default: {
      bg: 'blue',
      borderRadius: '3px',
      textColor: 'white',
      display: 'inline-block',
      fontSize: 14,
      mx: 8,
      py: 4,
      px: 12,
    },
    blueRound: {
      bg: 'blue',
      textColor: 'white',
    },
    yellowRound: {
      bg: 'feedback-warning',
      textColor: 'black',
    },
    greyRound: {
      bg: `navy-500`,
      textColor: 'white',
    },
  },
});

export const BadgeWrapper = styled(Box)(badgeVariants);
