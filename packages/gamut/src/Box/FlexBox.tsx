import { css, styledOptions } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import {
  asCompatibleForwardRefComponent,
  CompatibleStyledComponentProps,
} from '../utils';
import { boxProps, FlexBoxProps, flexStates, sharedStates } from './props';

const StyledFlexBox = styled(
  'div',
  styledOptions(['fit', 'wrap', 'center', 'column', 'row', 'inline'])
)<FlexBoxProps>(css({ display: 'flex' }), sharedStates, flexStates, boxProps);

export const FlexBox =
  asCompatibleForwardRefComponent<CompatibleStyledComponentProps<
    typeof StyledFlexBox,
    HTMLDivElement
  >>(StyledFlexBox);

export type { FlexBoxProps } from './props';
