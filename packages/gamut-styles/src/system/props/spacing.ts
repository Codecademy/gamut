import { spacing, SpaceSizes } from '../../variables/spacing';
import { SystemProps } from '../types';
import { system } from '../system';
import { composeSystem } from '../templating/responsiveProp';

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

export type MarginProps = SystemProps<typeof marginConfig>;

export const getMargin = system<PaddingProps>(marginConfig);

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

export type PaddingProps = SystemProps<typeof paddingConfig>;

export const getPadding = system<PaddingProps>(paddingConfig);

export type SpacingProps = PaddingProps & MarginProps;

export const getSpacing = composeSystem(getPadding, getMargin);
