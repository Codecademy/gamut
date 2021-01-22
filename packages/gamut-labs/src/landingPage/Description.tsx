import { Markdown } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

import { BaseProps } from './types';

const DescriptionContainer = styled.div`
  margin: 1rem 0 0;
  max-width: 38rem;
`;

export type DescriptionProps = {
  text: string;
  className?: string;
  testId?: string;
} & Pick<BaseProps, 'onAnchorClick'>;

export const Description: React.FC<DescriptionProps> = ({
  text,
  className,
  testId,
  onAnchorClick,
}) => (
  <DescriptionContainer className={className} data-testid={testId}>
    <Markdown text={text} onAnchorClick={onAnchorClick} />
  </DescriptionContainer>
);
