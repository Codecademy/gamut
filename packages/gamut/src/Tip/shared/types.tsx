import { ComponentProps, ReactNode } from 'react';

import { Text } from '../../Typography';

export const tipBaseAlignmentArray = [
  'bottom-left',
  'bottom-right',
  'top-left',
  'top-right',
] as const;

const tipCenterAlignmentArray = [
  'bottom-center',
  'left-center',
  'right-center',
  'top-center',
] as const;

export const tipAlignmentArray = [
  ...tipBaseAlignmentArray,
  ...tipCenterAlignmentArray,
] as const;

export type TipPlacements = 'inline' | 'floating';

export type TipBaseAlignment = (typeof tipBaseAlignmentArray)[number];

export type TipCenterAlignment = (typeof tipCenterAlignmentArray)[number];

export type TipStaticAlignment = (typeof tipAlignmentArray)[number];

export type PreviewTipContent = {
  /**
   * ReactNode avatar to display - including an avatar will automatically defer to the avatar type.
   */
  avatar?: ReactNode;
  overline?: string;
  username?: string;
  loading?: boolean;
  truncateLines?: ComponentProps<typeof Text>['truncateLines'];
};

export interface TipNewBaseProps {
  info: string | ReactNode;
  placement?: 'floating' | 'inline';
  /**
   * Forces the tooltip to be its narrowest width. For use along the edges of the page or other tight spaces.
   */
  narrow?: boolean;
  /**
   * If ToolTipWrapper should inherit the dimensions of the parent element. Can only be used for inline tips.
   */
  inheritDims?: boolean;
}
export interface TipInlineProps extends TipNewBaseProps {
  placement?: 'inline';
  zIndex?: number;
}
export interface TipFloatingProps extends TipNewBaseProps {
  placement: 'floating';
  zIndex?: never;
  inheritDims?: never;
}

export type TipBaseProps = TipInlineProps | TipFloatingProps;

export const tipDefaultProps: Required<Pick<TipNewBaseProps, 'placement'>> = {
  placement: 'inline',
};

export type TipWrapperProps = TipPlacementComponentProps & PreviewTipContent;

export type TipPlacementComponentProps = Omit<
  TipNewBaseProps,
  'placement' | 'emphasis'
> & {
  alignment: TipStaticAlignment;
  escapeKeyPressHandler?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  id?: string;
  isTipHidden?: boolean;
  contentRef?:
    | React.RefObject<HTMLDivElement>
    | ((node: HTMLDivElement | null) => void);
  type: 'info' | 'tool' | 'preview';
  wrapperRef?: React.RefObject<HTMLDivElement>;
  zIndex?: number;
} & React.PropsWithChildren;
