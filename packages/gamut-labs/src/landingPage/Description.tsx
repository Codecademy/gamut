import { Box, Markdown } from '@codecademy/gamut';
import React from 'react';

import { BaseProps } from './types';

export type DescriptionProps = {
  text: string;
  className?: string;
} & Pick<BaseProps, 'onAnchorClick'>;

export const Description: React.FC<DescriptionProps> = ({
  text,
  className,
  onAnchorClick,
}) => (
  <Box maxWidth="38rem" textColor="navy" marginTop={16} className={className}>
    <Markdown text={text} onAnchorClick={onAnchorClick} />
  </Box>
);
