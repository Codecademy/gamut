import { SpaceSizes, spacing } from '../variables/spacing';
import { pick, keys, mapKeys } from 'lodash';
import { css } from '@emotion/core';
import { ResponsiveProp } from './types';
import { createSystemHandler } from './responsive';

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

export const templateSpacing = (type: 'padding' | 'margin') => (
  props: MarginProps | PaddingProps
) => {
  const aliases = spacingProps[type];
  const {
    base,
    x = base,
    y = base,
    l = x ?? base,
    r = x ?? base,
    t = y ?? base,
    b = y ?? base,
  }: Record<string, SpaceSizes> = mapKeys(
    pick(props, keys(aliases)),
    (value, key) => aliases[key as keyof typeof aliases]
  );

  return css`
    ${type}-top: ${spacing[t]};
    ${type}-right: ${spacing[r]};
    ${type}-bottom: ${spacing[b]};
    ${type}-left: ${spacing[l]};
  `;
};

export const getMargin = createSystemHandler<MarginProps>(
  templateSpacing('margin')
);
export const getPadding = createSystemHandler<PaddingProps>(
  templateSpacing('padding')
);
