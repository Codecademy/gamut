import React from 'react';
import styled from '@emotion/styled';

import { Markdown } from '@codecademy/gamut';

const Description = styled.div`
  margin: 2rem 0 0;
`;

export type LandingPageSectionDescriptionProps = {
  text: string;
  className?: string;
  testId?: string;
};

export const LandingPageSectionDescription: React.FC<LandingPageSectionDescriptionProps> = ({
  text,
  className,
  testId,
}) => (
  <Description className={className} data-testid={testId}>
    <Markdown text={text} />
  </Description>
);
