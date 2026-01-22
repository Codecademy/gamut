import { styledOptions, system } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled, { StyledComponent } from '@emotion/styled';
import { forwardRef } from 'react';

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

const StyledSvg: StyledComponent<PatternProps, {}, {}> = styled(
  'svg',
  styledOptions<'svg'>()
)(patternStyles);

export const Svg = forwardRef<SVGSVGElement, PatternProps>(
  ({ height = '100%', width = '100%', ...rest }, ref) => (
    <StyledSvg height={height} ref={ref} width={width} {...rest} />
  )
);
