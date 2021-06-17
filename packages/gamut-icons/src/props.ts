import { styledOptions, system } from '@codecademy/gamut-styles';
import { StyleProps, transformSize, variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import { pickBy } from 'lodash';

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
}

export type ForwardableProps = Omit<GamutIconProps, keyof IconStyleProps>;

export const iconProps = variance.compose(
  system.layout,
  system.color,
  system.space,
  system.positioning,
  system.border,
  variance.create({
    size: {
      property: 'width',
      properties: ['width', 'height'],
      transform: transformSize,
    },
  })
);

export const Svg = styled('svg', styledOptions<'svg'>())(iconProps);

export const getForwardableProps = (props: GamutIconProps): ForwardableProps =>
  pickBy(props, (value, key) => styledOptions.shouldForwardProp(key));
