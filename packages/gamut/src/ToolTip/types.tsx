import React, { ReactNode } from 'react';

import { ToolTip } from './ToolTip';

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

export type ToolTipPlacements = 'inline' | 'floating';

export type ToolTipBaseAlignment = typeof toolTipBaseAlignmentArray[number];

export type ToolTipStaticAlignment = typeof toolTipAlignmentArray[number];

export type ToolTipInlineProps = {
  /**
   * How to align the tooltip relative to the target.
   */
  alignment?: ToolTipStaticAlignment;

  /**
   * Whether Tooltip should be inline or floating (should only be used in certain overflow situations).
   */
  placement?: 'inline';
};

export type ToolTipPopoverProps = {
  /**
   * How to align the tooltip relative to the target.
   */
  alignment?: ToolTipBaseAlignment;

  /**
   * Whether Tooltip should be inline or floating (should only be used in certain overflow situations).
   */
  placement: 'floating';
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
  Pick<ToolTipProps, 'alignment' | 'focusable' | 'placement' | 'widthMode'>
> = {
  alignment: 'top-right',
  focusable: true,
  placement: 'inline',
  widthMode: 'standard',
};

export type ToolTipPlacementComponentProps = Omit<ToolTipProps, 'placement'>;
