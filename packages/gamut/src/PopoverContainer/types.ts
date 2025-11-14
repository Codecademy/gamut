import { RefObject } from 'react';

import { WithChildrenProp } from '../utils';

export type Alignments =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right';

export interface TargetRef
  extends Pick<
    HTMLDivElement,
    | 'getBoundingClientRect'
    | 'contains'
    | 'offsetHeight'
    | 'offsetWidth'
    | 'offsetTop'
    | 'offsetLeft'
    | 'offsetParent'
  > {}

export interface PositionContext {
  width: number;
  height: number;
  top: number;
  left: number;
  right: number;
  bottom: number;
}

export interface ContainerState {
  parent: PositionContext;
  viewport: DOMRect;
}

export interface PopoverAlignment {
  /**
   * Which vertical edge of the source component to align against.
   */
  alignment?: Alignments;
  /** Align to the inside edge of the target div */
  invertAxis?: 'x' | 'y';
  /** Whether the popover renders inside the current DOM context or escapes with a portal */
  inline?: boolean;
  /**
   * Number of pixels to offset the popover vertically from the source component.
   */
  y?: number;
  /**
   * Number of pixels to offset the popover horizontally from the source component.
   */
  x?: number;
  /**
   * Offset from center in the direct of the alignment
   */
  offset?: number;
}

export interface PopoverPositionConfig extends PopoverAlignment {
  container: PositionContext;
  alignment: Alignments;
}

export interface PopoverContainerProps
  extends PopoverAlignment,
    WithChildrenProp {
  className?: string;
  /**
   * Whether the popover is rendered.
   */
  isOpen: boolean;
  /**
   * Called when the Popover requests to be closed,
   * this could be due to clicking outside of the popover, or by clicking the escape key.
   */
  onRequestClose?: () => void;
  /**
   * The target element around which the popover will be positioned.
   */
  targetRef: RefObject<TargetRef>;
  /**
   * If true, it will allow outside page interaction. Popover container will still close when clicking outside of the popover or hitting the escape key.
   */
  allowPageInteraction?: boolean;
  /**
   * If true, the popover will automatically close when the target element moves out of viewport.
   * Defaults to false.
   */
  closeOnViewportExit?: boolean;
}
