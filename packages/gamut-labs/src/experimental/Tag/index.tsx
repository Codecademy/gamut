import styled from '@emotion/styled';
import {
  spacing,
  colors,
  fontSize,
  fontWeight,
} from '@codecademy/gamut-styles';
import { startCase, get } from 'lodash';

export type TagProps = {
  background: 'blue' | 'pink' | 'green' | 'yellow';
};

export const Tag = styled.div<TagProps>`
  font-size: ${fontSize.text.sm};
  font-weight: ${fontWeight.heading};
  padding: ${spacing[4]} ${spacing[8]};
  background-color: ${({ background }) =>
    get(colors, `standard.pale${startCase(background)}`)};
`;
