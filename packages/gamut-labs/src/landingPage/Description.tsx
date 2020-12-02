import React from 'react';
import styled from '@emotion/styled';

import { Markdown } from '@codecademy/gamut';

const DescriptionContainer = styled.div`
  margin: 2rem 0 0;
  max-width: 38rem;
`;

export type DescriptionProps = {
  text: string;
  className?: string;
  testId?: string;
};

export const Description: React.FC<DescriptionProps> = ({
  text,
  className,
  testId,
}) => (
  <DescriptionContainer className={className} data-testid={testId}>
    <Markdown text={text} />
  </DescriptionContainer>
);
