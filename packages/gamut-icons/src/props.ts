import { system } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';

export const iconProps = variance.compose(
  system.layout,
  system.color,
  system.space,
  system.positioning
);

export interface IconStyleProps extends StyleProps<typeof iconProps> {}

export const iconStyles = (props: IconStyleProps) => iconProps(props);

export const getAttrValue = (prop: IconStyleProps['width' | 'height']) => {
  switch (typeof prop) {
    case 'string':
    case 'number':
      return prop;
    default:
      return undefined;
  }
};
