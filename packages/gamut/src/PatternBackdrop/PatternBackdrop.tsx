import { CheckerDense } from '@codecademy/gamut-patterns';
import { styledOptions, system } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import { ComponentProps, forwardRef } from 'react';

import { Box } from '../Box';

const backdropBodyProps = variance.compose(system.layout, system.padding);

const PatternBackdropBody = styled('div', styledOptions)<
  StyleProps<typeof backdropBodyProps>
>(
  system.css({
    position: 'relative',
    zIndex: 'foreground',
    bg: 'background',
    border: 1,
    maxWidth: 1,
  }),
  backdropBodyProps
);

type PatternBackdropProps = ComponentProps<typeof PatternBackdropBody>;

/**
 * Internal bordered surface with a bottom-left checker pattern offset.
 * Composed via `styled(PatternBackdrop)` by Toast and Modal; not exported — use those or `Card`.
 */
export const PatternBackdrop = forwardRef<HTMLDivElement, PatternBackdropProps>(
  ({ children, ...rest }, ref) => (
    <Box
      display="inline-block"
      maxWidth="100%"
      position="relative"
      zIndex="foreground"
    >
      <CheckerDense
        dimensions={1}
        left="-0.5rem"
        position="absolute"
        top="0.5rem"
      />
      <PatternBackdropBody {...rest} ref={ref}>
        {children}
      </PatternBackdropBody>
    </Box>
  )
);
