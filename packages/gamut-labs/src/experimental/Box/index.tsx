import styled from '@emotion/styled';

import {
  padding,
  margin,
  display,
  dimensions,
} from '@codecademy/gamut-styles/dist/system';
import { HandlerProps } from '@codecademy/gamut-styles/dist/system/types';

type BoxProps = HandlerProps<typeof padding> &
  HandlerProps<typeof margin> &
  HandlerProps<typeof dimensions> &
  HandlerProps<typeof display>;

export const Box = styled.div<BoxProps>`
  ${padding}
  ${margin}
  ${dimensions}
  ${display}
`;
