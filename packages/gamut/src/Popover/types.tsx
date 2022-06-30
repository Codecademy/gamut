import { PatternProps } from '@codecademy/gamut-patterns';
import { HTMLAttributes } from 'react';

export type FocusTrapPopoverProps = {
  /**
   * Called when the Popover requests to be closed,
   * this could be due to clicking outside of the popover, or by clicking the escape key.
   */
  onRequestClose?: () => void;
  /**
   * Whether to include the focus trap - should only be skipped if parent of Popover is handling focus managment and accessibility (as is the case with FloatingToolTip). This also disables you from being to specify FocusTrap specific event handlers.
   */
  skipFocusTrap?: never;
};

export type SkippedFocusTrapPopoverProps = {
  /**
   * Called when the Popover requests to be closed,
   * this could be due to clicking outside of the popover, or by clicking the escape key.
   */
  onRequestClose?: never;
  /**
   * Whether to include the focus trap - should only be skipped if parent of Popover is handling focus managment and accessibility (as is the case with FloatingToolTip). This also disables you from being to specify FocusTrap specific event handlers. tl;dr: use with caution
   */
  skipFocusTrap: true;
};

export type PopoverBaseProps =
  | FocusTrapPopoverProps
  | SkippedFocusTrapPopoverProps;

export type PopoverProps = PopoverBaseProps &
  Pick<HTMLAttributes<HTMLDivElement>, 'role'> & {
    /**
     * Choice of animation - none by default.
     */
    animation?: 'fade';
    children: React.ReactElement<any>;
    className?: string;
    /**
     * Which vertical edge of the source component to align against.
     */
    align?: 'left' | 'right';
    /**
     * Number of pixels to offset the popover vertically from the source component.
     */
    verticalOffset?: number;
    /**
     * Number of pixels to offset the popover horizontally from the source component.
     */
    horizontalOffset?: number;
    /**
     * Whether to add outline style (i.e. used for dropdowns and coachmarks).
     */
    outline?: boolean;
    /**
     * Which horizontal edge of the source componet to align against.
     */
    position?: 'above' | 'below';
    /**
     * Which side to position the beak. If not provided, beak will not be rendered.
     */
    beak?: 'left' | 'right';
    /**
     * Whether the popover is rendered.
     */
    isOpen: boolean;
    /**
     * Pattern component to use as a background.
     */
    pattern?: React.ComponentType<PatternProps>;
    /**
     * Large popover vs smaller tooltip-style Popovers
     */
    size?: 'sml' | 'lrg';

    /**
     * The target element around which the popover will be positioned.
     */
    targetRef: React.RefObject<
      Pick<HTMLDivElement, 'getBoundingClientRect' | 'contains'>
    >;

    /**
     * Whether to add width restrictions to Popover.
     */
    widthRestricted?: boolean;
  };
