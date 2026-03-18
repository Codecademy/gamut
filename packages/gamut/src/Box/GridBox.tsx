import { styledOptions, system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { ComponentProps, ComponentType, Ref } from 'react';

import { boxProps, GridBoxProps, gridStates, sharedStates } from './props';

const GridBoxStyled = styled(
  'div',
  styledOptions(['fit', 'center', 'fitContent'])
)<GridBoxProps>(
  system.css({ display: 'grid' }),
  sharedStates,
  gridStates,
  boxProps
);

export const GridBox = GridBoxStyled as ComponentType<
  Omit<ComponentProps<typeof GridBoxStyled>, 'ref'> & {
    ref?: Ref<HTMLElement | null>;
  }
>;
