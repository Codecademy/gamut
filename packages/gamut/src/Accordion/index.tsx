import { MiniChevronDownIcon } from '@codecademy/gamut-icons';
// import { breakpoints, useCurrentMode } from '@codecademy/gamut-styles';
import { useState } from 'react';
import * as React from 'react';

import { Rotation, TextButton, WithChildrenProp } from '..';
import { Box } from '../Box';

export type AccordionProps = {
  header: string,
  body: string,
}

export const Accordion: React.FC<AccordionProps> = ({
  header,
  body
}) => {
  // TODO: find out what sets this
  const [expanded, setExpanded] = useState(false)

  const handleClick = () => {
    setExpanded(prev => !prev)
  }
  return (
    <Box width="100%">
      <TextButton
        onClick={() => handleClick()}
        icon={MiniChevronDownIcon}
        iconPosition="right"
      >
        {header}
      </TextButton>
      <Box>
        {expanded ? body : ""}
      </Box>
    </Box>
  )
}
