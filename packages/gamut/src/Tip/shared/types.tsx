import { ReactNode } from 'react';

export const tipBaseAlignmentArray = [
  'bottom-left',
  'bottom-right',
  'top-left',
  'top-right',
] as const;

const tipCenterAlignmentArray = [] as const;

export const tipAlignmentArray = [
  'bottom-left',
  'bottom-right',
  'top-left',
  'top-right',
  'bottom-center',
  'top-center',
];

export const tipAlignmentArray2 = [
  ...tipBaseAlignmentArray,
  ...tipCenterAlignmentArray,
] as const;

export type TipPlacements = 'inline' | 'floating';

export type TipBaseAlignment = typeof tipBaseAlignmentArray[number];

export type TipCenterAlignment = typeof tipCenterAlignmentArray[number];

export type TipStaticAlignment = typeof tipAlignmentArray[number];

export interface TipBaseProps {
  info: string | ReactNode;
  placement?: 'floating' | 'inline';
}

export const tipDefaultProps: Required<Pick<TipBaseProps, 'placement'>> = {
  placement: 'inline',
};

export type TipPlacementComponentProps = Omit<
  TipBaseProps,
  'placement' | 'emphasis'
> & {
  alignment: TipStaticAlignment;
  escapeKeyPressHandler?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  id?: string;
  isTipHidden?: boolean;
  type: 'info' | 'tool';
  wrapperRef?: React.RefObject<HTMLDivElement>;
};
