import { styledOptions, system } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled, { StyledComponent } from '@emotion/styled';

export interface IconStyleProps extends StyleProps<typeof iconProps> {
  /**
   * Set both the width and height of the icon at the same time
   * Otherwise the default size is 24 for regular icons and 16 for mini icons
   */
  size?: StyleProps<typeof iconProps>['width'];
}

export interface GamutBaseIconProps
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

interface GamutHiddenIconProps extends GamutBaseIconProps {
  'aria-hidden'?: true;
  'aria-label'?: never;
}
interface GamutVisibleIconProps extends GamutBaseIconProps {
  'aria-hidden': false;
  'aria-label': string;
}

export type GamutIconProps = GamutHiddenIconProps | GamutVisibleIconProps;
export type ForwardableProps = Omit<GamutBaseIconProps, keyof IconStyleProps>;

export const iconProps = variance.compose(
  system.layout,
  system.color,
  system.space,
  system.positioning,
  system.border
);

export const Svg: StyledComponent<GamutBaseIconProps, {}, {}> = styled(
  'svg',
  styledOptions<'svg'>()
)(iconProps);
