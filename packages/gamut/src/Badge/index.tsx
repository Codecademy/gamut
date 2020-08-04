import styled, {
  colors,
  brandColors,
  fontSize,
} from '@codecademy/gamut-styles';

export const Badge = styled.span`
  background: ${colors.blue[500]};
  border-radius: 3px;
  color: ${brandColors.white};
  display: inline-block;
  font-size: ${fontSize.text.sm};
  margin: 0 0.5em;
  padding: 0.25em 0.75em;
`;

export default Badge;
