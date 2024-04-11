import { ArrowChevronDownIcon, MiniChevronDownIcon } from '@codecademy/gamut-icons';
import { ColorMode, theme, variant } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
// import { breakpoints, useCurrentMode } from '@codecademy/gamut-styles';
import { useState } from 'react';
import * as React from 'react';

import { Anchor, Rotation, Text,TextButton, WithChildrenProp } from '..';
import { AccordionArea } from '../AccordionArea';
import { Box, FlexBox } from '../Box';

export type AccordionDisplayProps = {
  normal: {
    bg: 'background-current'
  },
  block: {
    bg: 'background',
    border: 'none'
  }
}

// TODO: BODY CAN BE ANYTHING, not just a string!
export type AccordionProps = {
  header: string,
  headingLevel: 'h1'|'h2'|'h3'|'h4'|'h5',
  body: string,
  initiallyExpanded: boolean,
  display: AccordionDisplayProps
  size: 'normal' | 'condensed' | 'compact',
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

const determineVerticalPadding = (size) => {
  const verticalPaddingSizeMapping = {
    'normal': 16,
    'condensed': 8,
    'compact': 4
  }
  return verticalPaddingSizeMapping[size]
}

const determineHorizontalPadding = (size) => {
  const horizontalPaddingSizeMapping = {
    'normal': 16,
    'condensed': 8,
    'compact': 8
  }
  return horizontalPaddingSizeMapping[size]
}

export const Accordion: React.FC<AccordionProps> = ({
  header,
  headingLevel='h3',
  body,
  initiallyExpanded = false,
  display='background-current',
  colorMode='light',
  overline='overline is optional',
  size='normal'
}) => {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded)

  const handleClick = () => {
    setIsExpanded(prev => !prev)
  }
  return (
    <ColorMode mode={colorMode}>
      <FlexBox
        width="100%"
        bg={display}
        border='solid 1px'
        column
        py={determineVerticalPadding(size)}
        px={determineHorizontalPadding(size)}

      >
        <Text>
          {overline && overline}
        </Text>
        <StyledAnchor
          aria-label={isExpanded ? 'Collapse Content' : 'Expand Content'}
          aria-expanded={isExpanded}
          onClick={handleClick}
          width="100%"
          variant="interface"
        >
          <FlexBox
            flexDirection={{ _: 'column', sm: 'row' }}
            justifyContent="space-between"
            center
            columnGap={40}
          >
            <Text alignSelf='start' as={headingLevel}>
              {header}
            </Text>
            <Rotation rotated={isExpanded}>
              { size === 'normal' ? <ArrowChevronDownIcon /> : <MiniChevronDownIcon/> }
            </Rotation>
          </FlexBox>
        </StyledAnchor>
        <Box>
          {isExpanded && <AccordionArea body={body}/>}
        </Box>
      </FlexBox>
    </ColorMode>
  )
}
