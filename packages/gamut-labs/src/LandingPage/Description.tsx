import { Box, Markdown } from '@codecademy/gamut';
import * as React from 'react';

import { BaseProps } from './types';

export type DescriptionProps = {
  text: string;
} & Pick<BaseProps, 'onAnchorClick'>;

export const Description: React.FC<DescriptionProps> = ({
  text,
  onAnchorClick,
}) => (
  <Box maxWidth="38rem" mt={16}>
    <Markdown text={text} onAnchorClick={onAnchorClick} />
  </Box>
);
