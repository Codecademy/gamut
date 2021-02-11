import { contentWidths, variant } from '@codecademy/gamut-styles';
import { HandlerProps } from '@codecademy/gamut-system';
import styled from '@emotion/styled';

export const contentContainerVariants = variant({
  prop: 'size',
  default: 'medium',
  variants: {
    medium: {
      paddingX: [16, 32, 64, , 96],
      maxWidth: contentWidths.max,
    },
    wide: {
      paddingX: [, , 24, 32],
      maxWidth: 0,
    },
  },
});

export type ContentContainerProps = HandlerProps<
  typeof contentContainerVariants
> & {
  className?: string;
};

export const ContentContainer = styled('div')<ContentContainerProps>`
  ${contentContainerVariants}
  height: 100%;
  width: 100%;
`;
