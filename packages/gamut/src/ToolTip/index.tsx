import { ColorModes } from '@codecademy/gamut-styles';
import React, { ReactNode } from 'react';

import { PopoverToolTip } from './PopoverToolTip';
import { StaticToolTip } from './StaticToolTip';

export type ToolTipAlignment =
  | 'bottom-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-center'
  | 'top-left'
  | 'top-right';

type ToolTipBodyProps = {
  /**
   * How to align the tooltip relative to the target.
   */
  alignment?: ToolTipAlignment;

  mode?: ColorModes;

  widthMode?: 'standard' | 'unlimited';
};

type ToolTipContainerProps = ToolTipBodyProps;

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

  /**
   * Whether if should be a popover tooltip (only should be used in certain overflow situations).
   */
  isPopover?: boolean;

  id: string;

  target?: ReactNode;
};

export const ToolTip: React.FC<ToolTipProps> = ({ isPopover, ...rest }) => {
  if (isPopover) return <PopoverToolTip {...rest} />;
  return <StaticToolTip {...rest} />;
};
