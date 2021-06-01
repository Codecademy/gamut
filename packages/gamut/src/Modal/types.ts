import { OverlayProps } from '../Overlay';

export type ModalOverlayProps = Partial<
  Pick<OverlayProps, 'clickOutsideCloses' | 'escapeCloses' | 'className'>
>;

export type ModalProps = {
  children?: React.ReactNode;
  className?: string;
  /**
   * Whether the ModalD is open or closed
   */
  isOpen: boolean;

  /**
   * A function that is called when the Modal expects to be closed
   * Triggered automatically by the Overlay component in certain situations
   */
  onRequestClose: () => void;

  /**
   * See Overlay component for prop definitions
   * @description ModalOverlayProps
   */
  overlayProps?: ModalOverlayProps;

  /**
   * Whether to hide the default close button and pass your own through children
   */
  hideDefaultCloseButton?: boolean;

  ariaLabel?: string;
};
