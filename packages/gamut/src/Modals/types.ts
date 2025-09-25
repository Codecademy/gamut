import { ComponentProps, Ref } from 'react';
import * as React from 'react';

import { OverlayProps } from '../Overlay';
import { ModalContainer } from './elements';

export interface ModalOverlayProps
  extends Pick<
    OverlayProps,
    | 'isOpen'
    | 'onRequestClose'
    | 'clickOutsideCloses'
    | 'escapeCloses'
    | 'shroud'
  > {}

export interface ModalBaseProps
  extends ModalOverlayProps,
    Omit<ComponentProps<typeof ModalContainer>, 'title'> {
  title?: React.ReactNode;
  /**
   * Heading titles for the Modal. They should almost always be the default `h2`, but should sometimes be `h1` if the Modal takes up the entire page
   */
  headingLevel?: 'h1' | 'h2';
  image?: React.ReactNode;
  /**
   * An optional ref to be passed to the modal container for programmatic focus management.
   * This is useful for when you want to focus the modal container when the modal programmatically.
   * Otherwise, the ModalWrapper does has data-autofocus which will gain focus when the Modal is opened.

   */
  modalFocusRef?: Ref<HTMLDivElement>;
}
