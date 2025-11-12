import { variant } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';

import { InternalFloatingCard } from '../InternalFloatingCard/InternalFloatingCard';
import { focusVisibleStyle } from '../utils';

const modalFocusVisibleStyle = focusVisibleStyle();

const sizeVariant = variant({
  prop: 'size',
  defaultVariant: 'small',
  base: { maxWidth: 'calc(100vw - 4rem)', maxHeight: 'calc(100vh - 4rem)' },
  variants: {
    small: { width: '400px', minHeight: '170px' },
    medium: { width: '540px', minHeight: '240px' },
    large: { width: '680px', minHeight: '310px' },
    fluid: {
      width: 'max-content',
    },
  },
});

const layoutVariant = variant({
  prop: 'layout',
  defaultVariant: 'standard',
  base: {
    borderRadius: 'sm',
    p: 24,
    columnGap: 16,
    display: 'grid',
    gridTemplateColumns: '1fr min-content 2rem',
    gridTemplateRows: 'max-content 1fr max-content',
    ...modalFocusVisibleStyle,
  },
  variants: {
    standard: {
      gridTemplateAreas: `'title title close'
      'content content content'
      'content content content'`,
    },
    dialog: {
      gridTemplateAreas: `'title title close'
      'content content content'
      'cancel confirm confirm'`,
    },
  },
});
export interface ModalContainerProps
  extends StyleProps<typeof sizeVariant>,
    StyleProps<typeof layoutVariant> {}

export const ModalContainer = styled(InternalFloatingCard)<ModalContainerProps>(
  sizeVariant,
  layoutVariant
);
