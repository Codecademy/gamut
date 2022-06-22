import { ColorModes } from '@codecademy/gamut-styles';
import { ReactNode } from 'react';

export const toolTipBaseAlignmentArray = [
  'bottom-left',
  'bottom-right',
  'top-left',
  'top-right',
] as const;

export const toolTipAlignmentArray = [
  ...toolTipBaseAlignmentArray,
  'bottom-center',
  'top-center',
] as const;

export type ToolTipBaseAlignment = typeof toolTipBaseAlignmentArray[number];

export type ToolTipStaticAlignment = typeof toolTipAlignmentArray[number];

export type ToolTipStaticBodyProps = {
  /**
   * How to align the tooltip relative to the target.
   */
  alignment?: ToolTipStaticAlignment;

  /**
   * Whether if should be a popover tooltip (only should be used in certain overflow situations).
   */
  isPopover?: never;
};

type ToolTipBodyProps = {
  /**
   * How to align the tooltip relative to the target.
   */
  alignment?: ToolTipBaseAlignment;

  /**
   * Whether if should be a popover tooltip (only should be used in certain overflow situations).
   */
  isPopover: true;
};

type ToolTipContainerProps = ToolTipBodyProps | ToolTipStaticBodyProps;

export type ToolTipProps = ToolTipContainerProps & {
  children?: ReactNode;

  /**
   * Class name for the hidden-by-default contents.
   *
   * @remarks
   * This is an inner element, not the outermost positioning element.
   * That element is styled with `containerClassName`.
   */
  className?: string;

  /**
   * Class name for the outermost positioning element.
   */
  containerClassName?: string;

  /**
   * Whether to manually add a tabIndex of 0 to the target container, for tooltips without focusable children.
   */
  focusable?: boolean;

  mode?: ColorModes;

  id: string;

  target?: ReactNode;

  /**
   * If Tooltip content should override width restrictions
   */
  widthMode?: 'standard' | 'unlimited';
};
