import { SpaceSizes, spacing } from '../variables/spacing';
import { pick, keys, mapKeys } from 'lodash';

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

export type PaddingProps = Partial<Record<AllPaddingProperties, SpaceSizes>>;
export type MarginProps = Partial<Record<AllMarginProperties, SpaceSizes>>;

const space = (size: SpaceSizes | undefined) => (size ? spacing[size] : 0);

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
  const values = [t, r, b, l].map(space);

  return values.some((val) => val) && `${type}: ${values.join(' ')};`;
};

export const getMargin = templateSpacing('margin');
export const getPadding = templateSpacing('padding');
