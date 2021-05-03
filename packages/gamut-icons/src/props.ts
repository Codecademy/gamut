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

export const IconSvg = styled.svg<IconStyleProps>(iconProps);
