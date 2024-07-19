import { css, theme, variant } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';

import { FloatingCard } from '../FloatingCard/FloatingCard';

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
    display: 'grid',
    p: 24,
    rowGap: 12,
    columnGap: 16,
    gridTemplateColumns: '1fr min-content 2rem',
    gridTemplateRows: 'max-content 1fr max-content',
    '&:focus-visible': {
      outlineOffset: '4px',
      outline: `2px solid ${theme.colors.primary} !important`,
    },
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

export const ModalContainer = styled(FloatingCard)<ModalContainerProps>(
  sizeVariant,
  layoutVariant,
);
