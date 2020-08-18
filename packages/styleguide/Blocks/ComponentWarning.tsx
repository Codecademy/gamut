import { styled } from '@storybook/theming';
import { colors } from '@codecademy/gamut-styles';

export const ComponentWarning = styled.div`
  padding: 0.75rem;
  margin: 1rem 0;
  font-size: 1rem;
  font-weight: 900;
  border-radius: 2px;
  text-transform: uppercase;
  color: ${colors.black};
  background-color: ${colors.yellow[700]};
`;
