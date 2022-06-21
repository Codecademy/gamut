import { ColorModes } from '@codecademy/gamut-styles';
import React, { ReactNode } from 'react';

import { PopoverToolTip } from './PopoverToolTip';
import { StaticToolTip } from './StaticToolTip';

export type ToolTipBaseAlignment =
  | 'bottom-left'
  | 'bottom-right'
  | 'top-left'
  | 'top-right';

export type ToolTipStaticAlignment =
  | ToolTipBaseAlignment
  | 'bottom-center'
  | 'top-center';

export type ToolTipStaticBodyProps = {
  /**
   * How to align the tooltip relative to the target.
   */
  alignment?: ToolTipStaticAlignment;

  /**
   * Whether if should be a popover tooltip (only should be used in certain overflow situations).
   */
  isPopover?: never;

  /**
   * If Tooltip content should have a restricted minimum width
   */
  widthMode?: 'standard' | 'unlimited';
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
  /**
   * If Tooltip content should have a restricted minimum width
   */
  widthMode?: never;
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
};

export const ToolTip: React.FC<ToolTipProps> = ({ isPopover, ...rest }) => {
  if (isPopover) return <PopoverToolTip {...rest} />;
  return <StaticToolTip {...rest} />;
};
