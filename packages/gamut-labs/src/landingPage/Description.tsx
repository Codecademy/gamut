import { Markdown } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

import { BaseProps, ColorMode } from './types';
import { modeVariants } from './variants';

const DescriptionContainer = styled.div<{ mode?: ColorMode }>`
  ${modeVariants}
  margin: 1rem 0 0;
  max-width: 38rem;
`;

export type DescriptionProps = {
  text: string;
  mode?: ColorMode;
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
