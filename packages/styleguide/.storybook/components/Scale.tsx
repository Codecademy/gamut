import { styled } from '@storybook/theming';
import { allProps } from './styles';

export const Row = styled.div`
  display: grid;
  column-gap: 2rem;
  row-gap: 1rem;
  grid-template-columns: max-content 1fr;
`;

export const Column = styled.div`
  display: grid;
  align-items: center;
  justify-content: start;
`;

export const Example = styled.div(allProps);
