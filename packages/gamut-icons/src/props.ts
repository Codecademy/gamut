import { system } from '@codecademy/gamut-styles';
import { variance } from '@codecademy/variance';
import styled from '@emotion/styled';

export const IconSvg = styled.svg(
  variance.compose(
    system.layout,
    system.color,
    system.space,
    system.positioning
  )
);
