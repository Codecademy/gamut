import { Box, Markdown } from '@codecademy/gamut';
import React from 'react';
import styled from '@emotion/styled';

import { BaseProps, ColorMode } from './types';
import { modeVariants } from './variants';

const DescriptionContainer = styled(Box)<{ mode?: ColorMode }>`
  ${modeVariants}
  margin: 1rem 0 0;
  max-width: 38rem;
`;

export type DescriptionProps = {
  text: string;
  mode?: ColorMode;
  className?: string;
} & Pick<BaseProps, 'onAnchorClick'>;

export const Description: React.FC<DescriptionProps> = ({
  text,
  mode = 'light',
  className,
  onAnchorClick,
}) => (
  <DescriptionContainer
    maxWidth="38rem"
    marginTop={16}
    className={className}
    mode={mode}
  >
    <Markdown text={text} onAnchorClick={onAnchorClick} />
  </DescriptionContainer>
);
