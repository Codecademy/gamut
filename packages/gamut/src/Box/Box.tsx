import { styledOptions } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { ComponentProps, ComponentType, Ref } from 'react';

import { BoxProps, boxProps, sharedStates } from './props';

const BoxStyled = styled('div', styledOptions(['fit']))<BoxProps>(
  sharedStates,
  boxProps
);

export const Box = BoxStyled as ComponentType<
  Omit<ComponentProps<typeof BoxStyled>, 'ref'> & {
    ref?: Ref<HTMLElement | null>;
  }
>;

export type { BoxProps } from './props';
