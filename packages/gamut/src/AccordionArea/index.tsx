import { useState } from 'react';
import * as React from 'react';

import { Rotation, TextButton, WithChildrenProp } from '..';
import { Box } from '../Box';
import { Text } from '../Typography'

export type AccordionAreaProps = {
  body: string,
}

export const AccordionArea: React.FC<AccordionAreaProps> = ({
  body
}) => {

  return (
    <Box width="100%">
      <Text >
        {body}
      </Text>
    </Box>
  )
}
