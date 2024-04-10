import { ArrowChevronDownIcon, ArrowChevronUpIcon,  MiniChevronDownIcon } from '@codecademy/gamut-icons';
import { ColorMode, theme, variant } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
// import { breakpoints, useCurrentMode } from '@codecademy/gamut-styles';
import { useState } from 'react';
import * as React from 'react';

import { Anchor, Rotation, Text,TextButton, WithChildrenProp } from '..';
import { AccordionArea } from '../AccordionArea';
import { Box, FlexBox } from '../Box';

const StyledRotation = styled(Rotation)(css({
  '&:hover': {
    background: 'beige'
  }
}))

export type AccordionDisplayProps = {
  normal: {
    bg: 'background-current'
  },
  block: {
    bg: 'background',
    border: 'none'
  }
}

export type AccordionProps = {
  header: string,
  body: string,
  initiallyExpanded: boolean,
  display: AccordionDisplayProps
  lineSpacing: 'normal' | 'condensed' | 'compact',
  colorMode: 'light' | 'dark'
  overline?: string
}


const StyledAnchor = styled(Anchor)`
  &:hover,
  &:focus {
    color: ${theme.colors.text};
  }
`;

const stylingVariants = variant({
  prop: 'style',
  variants: {
    standard: {
      bg: 'background-current'
    },
    block: {
      bg: 'background'
    }
  }
})

export const Accordion: React.FC<AccordionProps> = ({
  header,
  body,
  initiallyExpanded = false,
  display='background-current',
  colorMode='light',
  overline='overline is optional'
}) => {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded)

  const handleClick = () => {
    setIsExpanded(prev => !prev)
  }
  return (
    <ColorMode mode={colorMode}>
      <FlexBox width="100%" bg={display} border='solid 1px' column>
        <Text>
          {overline && overline}
        </Text>
        <StyledAnchor
          aria-label={isExpanded ? 'Collapse Content' : 'Expand Content'}
          aria-expanded={isExpanded}
          onClick={handleClick}
          width="100%"
          // py={{ _: 16, sm: 32 }}
          // px={{ _: 0, sm: 64, lg: 0 }}
          p={4}
          variant="interface"
        >
          <FlexBox
            flexDirection={{ _: 'column', sm: 'row' }}
            justifyContent="space-between"
            center
          >
            {header}
            <Rotation rotated={isExpanded}>
              <ArrowChevronDownIcon />
            </Rotation>
          </FlexBox>
        </StyledAnchor>
        {/* <StyledRotation rotated={isExpanded}>
          <ArrowChevronDownIcon color="text-disabled" />
        </StyledRotation> */}
        <Box>
          {isExpanded && <AccordionArea body={body}/>}
        </Box>
      </FlexBox>
    </ColorMode>
  )
}
