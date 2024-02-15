import { ReactNode } from 'react';

import { InfoTipProps } from '../InfoTip';

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

export type ToolTipFloatingProps = {
  /**
   * How to align the tooltip relative to the target.
   */
  alignment?: ToolTipBaseAlignment;

  /**
   * Whether Tooltip should be inline or floating (should only be used in certain overflow situations).
   */
  placement: 'floating';
};

export type ToolTipContainerProps = ToolTipFloatingProps | ToolTipInlineProps;

export type ToolTipProps = ToolTipContainerProps & {
  children?: ReactNode;

  /**
   * Whether to  add a tabIndex of 0 to the target container, for tooltips without focusable children.
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
  Pick<ToolTipProps, 'alignment' | 'placement' | 'widthMode'>
> = {
  alignment: 'top-right',
  placement: 'inline',
  widthMode: 'standard',
};

export type TipPlacementComponentProps = Omit<
  InfoTipProps,
  'placement' | 'emphasis'
> & {
  isTipHidden: boolean;
  escapeKeyPressHandler: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  wrapperRef?: React.RefObject<HTMLDivElement>;
};

export type DeprecatedToolTipPlacementComponentProps = Omit<
  ToolTipProps,
  'placement'
>;
