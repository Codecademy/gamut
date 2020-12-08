import { Markdown } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

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
