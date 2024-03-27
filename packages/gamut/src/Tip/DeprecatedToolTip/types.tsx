import { ReactNode } from 'react';

import {
  TipBaseAlignment,
  tipDefaultProps,
  TipStaticAlignment,
} from '../shared/types';

export type DeprecatedToolTipInlineProps = {
  /**
   * How to align the tooltip relative to the target.
   */
  alignment?: TipStaticAlignment;

  /**
   * Whether Tooltip should be inline or floating (should only be used in certain overflow situations).
   */
  placement?: 'inline';
};

export type DeprecatedToolTipFloatingProps = {
  /**
   * How to align the tooltip relative to the target.
   */
  alignment?: TipBaseAlignment;

  /**
   * Whether Tooltip should be inline or floating (should only be used in certain overflow situations).
   */
  placement: 'floating';
};

export type DeprecatedToolTipContainerProps =
  | DeprecatedToolTipFloatingProps
  | DeprecatedToolTipInlineProps;

export type DeprecatedToolTipProps = DeprecatedToolTipContainerProps & {
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

export type DeprecatedToolTipPlacementComponentProps = Omit<
  DeprecatedToolTipProps,
  'placement'
>;

export const deprecatedTooltipDefaultProps: Required<
  Pick<DeprecatedToolTipProps, 'alignment' | 'placement' | 'widthMode'>
> = {
  alignment: 'top-right',
  widthMode: 'standard',
  ...tipDefaultProps,
};
