import { styledOptions, system } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';

const patternStyles = variance.compose(
  system.layout,
  system.positioning,
  system.space
);

export type PatternStyleProps = StyleProps<typeof patternStyles>;
export interface PatternProps
  extends Omit<React.SVGProps<SVGSVGElement>, keyof PatternStyleProps>,
    PatternStyleProps {
  /**
   * A suffix added to the end of the unique generated ID for the icon. This is useful if you have multiple of the same icon on the page and need to pass accessibility guidelines.
   */
  titleId?: string;
  title?: string;
  ref?: React.Ref<SVGSVGElement>;
}

export const Svg = styled(
  'svg',
  styledOptions<'svg'>()
)<PatternProps>(patternStyles);

Svg.defaultProps = {
  width: '100%',
  height: '100%',
};
