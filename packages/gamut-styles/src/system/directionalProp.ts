import { directionalProperty } from 'polished';
import { MarginProps, PaddingProps } from './spacing';
import { BorderProps } from './borders';

const PROP_MAP = {
  border: 'border-width',
  margin: 'margin',
  padding: 'padding',
};

export function directionalShorthand(
  propertyName: 'border' | 'margin' | 'padding'
) {
  return (props: MarginProps & PaddingProps & BorderProps) => {
    const {
      [propertyName]: base,
      [`${propertyName}X`]: x = base,
      [`${propertyName}Y`]: y = base,
      [`${propertyName}Left`]: l = x,
      [`${propertyName}Right`]: r = x,
      [`${propertyName}Top`]: t = y,
      [`${propertyName}Bottom`]: b = y,
    } = props as Record<string, string | number>;

    return directionalProperty(PROP_MAP[propertyName], t, r, b, l);
  };
}
