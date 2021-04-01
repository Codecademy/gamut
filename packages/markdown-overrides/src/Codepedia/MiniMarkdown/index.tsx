import styled from '@emotion/styled';
import { Markdown as GamutMarkdown } from '@codecademy/gamut';

export const MiniMarkdown = styled(GamutMarkdown)`
  margin: 0;
  padding: 0 1.25rem;
  overflow-y: auto;

  h1 {
    font-size: 1.5rem;
  }

  h2 {
    font-size: 1.2rem;
  }
`;
