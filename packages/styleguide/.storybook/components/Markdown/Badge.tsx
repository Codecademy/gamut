import styled from '@emotion/styled';
import { variant, fontSmoothing, themed } from '@codecademy/gamut-styles';

export const badgeVariants = variant({
  prop: 'status',
  variants: {
    static: {
      backgroundColor: 'gray-200',
    },
    current: {
      backgroundColor: 'green',
    },
    updating: {
      backgroundColor: 'blue',
    },
    deprecated: {
      backgroundColor: 'orange',
    },
    unknown: {
      backgroundColor: 'gray-500',
    },
  },
});

export const Badge = styled.div<Parameters<typeof badgeVariants>[0]>`
  ${badgeVariants}
  display: inline-block;
  align-items: center;
  padding: 0.15rem 0.75rem 0;
  line-height: 2;
  font-size: 0.8rem;
  font-weight: 900;
  line-height: 1.75;
  border-radius: 0.75rem;
  text-transform: uppercase;
  color: ${themed('colors.white')};
  ${fontSmoothing()}
`;
