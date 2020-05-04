import { colors } from '@codecademy/gamut-styles/utils/variables';
import { styled } from '@storybook/theming';

export const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  padding: 25px;
`;

export const Content = styled.div`
  color: ${colors.white};
  display: grid;
  padding: 15px;
  background-color: ${({ theme }) => theme.barSelectedColor};
  justify-content: center;
  align-content: center;
`;
