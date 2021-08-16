import React, { ComponentProps } from 'react';

import { OverlayProps } from '../Overlay';
import { ModalContainer } from './elements';

export interface ModalOverlayProps
  extends Pick<
    OverlayProps,
    'isOpen' | 'onRequestClose' | 'clickOutsideCloses' | 'escapeCloses'
  > {}

export interface ModalBaseProps
  extends ModalOverlayProps,
    Omit<ComponentProps<typeof ModalContainer>, 'title'> {
  title?: React.ReactNode;
}
