import { SpaceSizes } from '../variables/spacing';
import { ResponsiveProp } from './types';
import { createSystemHandler } from './responsive';
import { directionalShorthand } from './directionalProp';

export const spacingProps = {
  padding: {
    padding: 'base',
    paddingLeft: 'l',
    paddingRight: 'r',
    paddingTop: 't',
    paddingBottom: 'b',
    paddingX: 'x',
    paddingY: 'y',
  },
  margin: {
    margin: 'base',
    marginLeft: 'l',
    marginRight: 'r',
    marginTop: 't',
    marginBottom: 'b',
    marginX: 'x',
    marginY: 'y',
  },
} as const;

type AllMarginProperties = keyof typeof spacingProps['margin'];
type AllPaddingProperties = keyof typeof spacingProps['padding'];

export type PaddingProps = Partial<
  Record<AllPaddingProperties, SpaceSizes | ResponsiveProp<SpaceSizes>>
>;
export type MarginProps = Partial<
  Record<AllMarginProperties, SpaceSizes | ResponsiveProp<SpaceSizes>>
>;

export const getMargin = createSystemHandler<MarginProps>(
  directionalShorthand('margin')
);
export const getPadding = createSystemHandler<PaddingProps>(
  directionalShorthand('padding')
);
