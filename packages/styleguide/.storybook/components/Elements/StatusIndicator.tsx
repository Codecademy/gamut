import styled from '@emotion/styled';
import { css, variant } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';

export const badgeVariants = variant({
  prop: 'status',
  variants: {
    static: {
      textColor: 'green',
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
  },
});

export const StatusIndicator = styled.span(badgeVariants, css({ mr: 4 }));

export const StatusTab = styled.div<StyleProps<typeof badgeVariants>>`
  position: absolute;
  left: calc(100% + 1rem);
  top: 0;
  height: 100%;
  width: 0.5rem;
  border-radius: 0.25rem 0 0 0.25rem;
  background-color: currentColor;
  ${badgeVariants}
`;
