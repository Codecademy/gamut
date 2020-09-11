import styled from '@emotion/styled';

import { padding, margin } from '@codecademy/gamut-styles/dist/system';
import { HandlerProps } from '@codecademy/gamut-styles/dist/system/types';

type BoxProps = HandlerProps<typeof padding> & HandlerProps<typeof margin>;

export const Box = styled.div<BoxProps>`
  ${padding}
  ${margin}
`;
