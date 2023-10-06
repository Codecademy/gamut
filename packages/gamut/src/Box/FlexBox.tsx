import { css, styledOptions } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import { boxProps, FlexBoxProps, flexStates, sharedStates } from './props';

export const FlexBox = styled(
  'div',
  styledOptions(['fit', 'wrap', 'center', 'column', 'row', 'inline'])
)<FlexBoxProps>(css({ display: 'flex' }), sharedStates, flexStates, boxProps);

export type { FlexBoxProps } from './props';
