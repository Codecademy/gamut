import { ComponentProps } from 'react';
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
  inline?: boolean;
}
