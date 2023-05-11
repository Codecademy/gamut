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
  /**
   * Optional image to display in the modal. Image should have 16:9 aspect ratio and have the appropriate alt text.
   */
  image?: React.ReactNode;
  size?: ComponentProps<typeof ModalContainer>['size'];
  /**
   * Whether to hide the default close button and pass your own through children
   */
  hideCloseButton?: boolean;
  /**
   * Whether to show scrollbar on content overflow
   */
  scrollable?: boolean;
  /**
   * Whether to disable X button at top right of modal
   */
  closeDisabled?: boolean;
}
