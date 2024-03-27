import { ReactNode } from 'react';

export const tipBaseAlignmentArray = [
  'bottom-left',
  'bottom-right',
  'top-left',
  'top-right',
] as const;

const tipCenterAlignmentArray = ['bottom-center', 'top-center'] as const;

export const tipAlignmentArray = [
  ...tipBaseAlignmentArray,
  ...tipCenterAlignmentArray,
] as const;

export type TipPlacements = 'inline' | 'floating';

export type TipBaseAlignment = typeof tipBaseAlignmentArray[number];

export type TipCenterAlignment = typeof tipCenterAlignmentArray[number];

export type TipStaticAlignment = typeof tipAlignmentArray[number];

export interface TipNewBaseProps {
  info: string | ReactNode;
  placement?: 'floating' | 'inline';
  /**
   * Forces the tooltip to be its narrowest width. For use along the edges of the page or other tight spaces.
   */
  narrow?: boolean;
}
export interface TipInlineProps extends TipNewBaseProps {
  placement?: 'inline';
  zIndex?: number;
}
export interface TipFloatingProps extends TipNewBaseProps {
  placement: 'floating';
  zIndex?: never;
}

export type TipBaseProps = TipInlineProps | TipFloatingProps;
export const tipDefaultProps: Required<Pick<TipNewBaseProps, 'placement'>> = {
  placement: 'inline',
};

export type TipPlacementComponentProps = Omit<
  TipNewBaseProps,
  'placement' | 'emphasis'
> & {
  alignment: TipStaticAlignment;
  escapeKeyPressHandler?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  id?: string;
  isTipHidden?: boolean;
  type: 'info' | 'tool';
  wrapperRef?: React.RefObject<HTMLDivElement>;
  zIndex?: number;
};
