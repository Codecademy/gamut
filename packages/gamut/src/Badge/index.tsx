import styled from '@emotion/styled';
import { colors, fontSize } from '@codecademy/gamut-styles';

export const Badge = styled.span`
  background: ${colors.blue[500]};
  border-radius: 3px;
  color: ${colors.white};
  display: inline-block;
  font-size: ${fontSize[14]};
  margin: 0 0.5em;
  padding: 0.25em 0.75em;
`;
