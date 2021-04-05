import styled from '@emotion/styled';
import { variant } from '@codecademy/gamut-styles';

export const badgeVariants = variant({
  prop: 'status',
  variants: {
    static: {
      textColor: 'gray-200',
    },
    current: {
      textColor: 'green',
    },
    updating: {
      textColor: 'blue',
    },
    deprecated: {
      textColor: 'orange',
    },
    unknown: {
      textColor: 'gray-500',
    },
  },
});

export const StatusIndicator = styled.div(badgeVariants);

export const StatusTab = styled.div<Parameters<typeof badgeVariants>[0]>`
  position: absolute;
  left: calc(100% + 1rem);
  top: 0;
  height: 100%;
  width: 0.5rem;
  border-radius: 0.25rem 0 0 0.25rem;
  background-color: currentColor;
  ${badgeVariants}
`;
