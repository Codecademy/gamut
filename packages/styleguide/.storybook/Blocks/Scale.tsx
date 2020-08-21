import { styled } from '@storybook/theming';
import { colors, fontSize } from '@codecademy/gamut-styles';
import { fontFamily } from '@codecademy/gamut-styles/src';

export const ScaleColumn = styled.div`
  font-size: ${fontSize.text.sm};
  color: ${colors.gray[400]};
  font-family: ${fontFamily.monospace};
  display: grid;
  align-content: center;
`;

export const ScaleRow = styled.div<{ hasAlias?: boolean }>`
  display: grid;
  grid-template-columns: ${({ hasAlias }) =>
    hasAlias ? 'minmax(max-content, 5rem) 1fr' : '1fr'};
  grid-column-gap: 2rem;
`;
