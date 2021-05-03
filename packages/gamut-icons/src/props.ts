import { system } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';

const iconProps = variance.compose(
  system.layout,
  system.color,
  system.space,
  system.positioning
);

export interface IconStyleProps extends StyleProps<typeof iconProps> {}

export interface GamutIconProps
  extends Omit<React.SVGProps<SVGSVGElement>, keyof IconStyleProps>,
    IconStyleProps {
  /**
   * A suffix added to the end of the unique generated ID for the icon. This is useful if you have multiple of the same icon on the page and need to pass accessibility guidelines.
   */
  titleId?: string;
  title?: string;
  ref?: React.Ref<SVGSVGElement>;
  /**
   * See:  https://github.com/DefinitelyTyped/DefinitelyTyped/pull/42404
   * Generated definitions may not match with other vesions @types/react in ^16.9 this ensures that the type exists and is optional as it would in >16.9.21
   */
  path?: string;
  color?: string;
  size?: number | string;
}

export const IconSvg = styled.svg<IconStyleProps>(iconProps);

export const getAttrValue = (prop: GamutIconProps['width' | 'height']) => {
  switch (typeof prop) {
    case 'string':
    case 'number':
      return prop;
    default:
      return undefined;
  }
};
