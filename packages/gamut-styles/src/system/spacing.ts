import { SpaceSizes } from '../variables/spacing';
import { SystemProp } from './types';
import { createSystemHandler } from './responsive';
import { directionalShorthand } from './directionalProp';

const paddingProps = [
  'padding',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'paddingX',
  'paddingY',
] as const;

const marginProps = [
  'margin',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'marginX',
  'marginY',
] as const;

type AllMarginProperties = typeof paddingProps[number];
type AllPaddingProperties = typeof marginProps[number];

export type PaddingProps = SystemProp<AllPaddingProperties, SpaceSizes>;
export type MarginProps = SystemProp<AllMarginProperties, SpaceSizes>;

export const getMargin = createSystemHandler<MarginProps>(
  directionalShorthand('margin')
);
export const getPadding = createSystemHandler<PaddingProps>(
  directionalShorthand('padding')
);
