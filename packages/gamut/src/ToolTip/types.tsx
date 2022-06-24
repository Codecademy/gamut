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

export type ToolTipInlineProps = {
  /**
   * How to align the tooltip relative to the target.
   */
  alignment?: ToolTipStaticAlignment;

  /**
   * Whether if should be a popover tooltip (only should be used in certain overflow situations).
   */
  isPopover?: never;
};

export type ToolTipPopoverProps = {
  /**
   * How to align the tooltip relative to the target.
   */
  alignment?: ToolTipBaseAlignment;

  /**
   * Whether if should be a popover tooltip (only should be used in certain overflow situations).
   */
  isPopover: true;
};

type ToolTipContainerProps = ToolTipPopoverProps | ToolTipInlineProps;

export type ToolTipProps = ToolTipContainerProps & {
  children?: ReactNode;

  /**
   * Whether to manually add a tabIndex of 0 to the target container, for tooltips without focusable children.
   */
  focusable?: boolean;

  id: string;

  target?: ReactNode;

  /**
   * If Tooltip content should override width restrictions
   */
  widthMode?: 'standard' | 'unlimited';
};

export const tooltipDefaultProps: Required<
  Pick<ToolTipProps, 'alignment' | 'focusable' | 'widthMode'>
> = {
  alignment: 'top-right',
  focusable: true,
  widthMode: 'standard',
};
