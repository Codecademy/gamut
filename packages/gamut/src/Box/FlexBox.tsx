import { css, styledOptions } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import type { CompatibleStyledComponentProps } from '../utils/types';
import { asCompatibleForwardRefComponentWithStyled } from '../utils/types';
import { boxProps, FlexBoxProps, flexStates, sharedStates } from './props';

const StyledFlexBox = styled(
  'div',
  styledOptions(['fit', 'wrap', 'center', 'column', 'row', 'inline'])
)<FlexBoxProps>(css({ display: 'flex' }), sharedStates, flexStates, boxProps);

export const FlexBox = asCompatibleForwardRefComponentWithStyled<
  CompatibleStyledComponentProps<typeof StyledFlexBox, HTMLDivElement>,
  typeof StyledFlexBox
>(StyledFlexBox);

export type { FlexBoxProps } from './props';
