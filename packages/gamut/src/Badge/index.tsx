import styled from '@emotion/styled';
import { colors } from '@codecademy/gamut-styles/utils/variables';

export const Badge = styled.span`
  background: ${colors.blue[500]};
  border-radius: 3px;
  color: ${colors.white};
  display: inline-block;
  font-size: 0.85em;
  margin: 0 0.5em;
  padding: 0.25em 0.75em;
`;

export default Badge;
