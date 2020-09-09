import { spacing, SpaceSizes } from '../../variables/spacing';
import { HandlerProps } from '../types';
import { registerHandler, compose } from '../system';

const marginConfig = {
  scale: [] as SpaceSizes[],
  type: 'directional',
  propName: 'margin',
  computeValue: (value: any) => spacing[value as SpaceSizes],
  altProps: [
    'marginLeft',
    'marginRight',
    'marginTop',
    'marginBottom',
    'marginX',
    'marginY',
  ],
} as const;

export const getMargin = registerHandler(marginConfig);
export type MarginProps = HandlerProps<typeof getMargin>;

const paddingConfig = {
  scale: [] as SpaceSizes[],
  type: 'directional',
  propName: 'padding',
  computeValue: (value: any) => spacing[value as SpaceSizes],
  altProps: [
    'paddingLeft',
    'paddingRight',
    'paddingTop',
    'paddingBottom',
    'paddingX',
    'paddingY',
  ],
} as const;

export const getPadding = registerHandler(paddingConfig);
export type PaddingProps = HandlerProps<typeof getPadding>;

export type SpacingProps = PaddingProps & MarginProps;

export const getSpacing = compose<SpacingProps>(getPadding, getMargin);
