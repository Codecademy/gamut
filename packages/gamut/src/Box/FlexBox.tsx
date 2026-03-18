import { css, styledOptions } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { ComponentProps, ComponentType, Ref } from 'react';

import { boxProps, FlexBoxProps, flexStates, sharedStates } from './props';

const FlexBoxStyled = styled(
  'div',
  styledOptions(['fit', 'wrap', 'center', 'column', 'row', 'inline'])
)<FlexBoxProps>(css({ display: 'flex' }), sharedStates, flexStates, boxProps);

export const FlexBox = FlexBoxStyled as ComponentType<
  Omit<ComponentProps<typeof FlexBoxStyled>, 'ref'> & {
    ref?: Ref<HTMLElement | null>;
  }
>;

export type { FlexBoxProps } from './props';
