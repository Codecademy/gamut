import { Markdown } from '@codecademy/gamut';
import { colors } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { BaseProps } from './types';

const DescriptionContainer = styled.div<{ mode?: 'dark' | 'light' }>`
  margin: 1rem 0 0;
  max-width: 38rem;
  ${({ mode }) => mode === 'dark' && `color: ${colors.beige};`}
`;

export type DescriptionProps = {
  text: string;
  mode?: 'dark' | 'light';
  className?: string;
  testId?: string;
} & Pick<BaseProps, 'onAnchorClick'>;

export const Description: React.FC<DescriptionProps> = ({
  text,
  mode,
  className,
  testId,
  onAnchorClick,
}) => (
  <DescriptionContainer className={className} mode={mode} data-testid={testId}>
    <Markdown text={text} onAnchorClick={onAnchorClick} />
  </DescriptionContainer>
);
