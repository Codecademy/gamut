import { Box, Markdown } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

import { BaseProps, DarkModeProps } from './types';
import { darkModeVariants } from './variants';

const DescriptionContainer = styled(Box)<DarkModeProps>`
  ${darkModeVariants}
  margin: 1rem 0 0;
  max-width: 38rem;
`;

export type DescriptionProps = DarkModeProps & {
  text: string;
  className?: string;
} & Pick<BaseProps, 'onAnchorClick'>;

export const Description: React.FC<DescriptionProps> = ({
  text,
  mode,
  className,
  onAnchorClick,
}) => (
  <DescriptionContainer
    maxWidth="38rem"
    mt={16}
    className={className}
    mode={mode}
  >
    <Markdown text={text} onAnchorClick={onAnchorClick} />
  </DescriptionContainer>
);
