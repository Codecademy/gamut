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

// export type AccordionDisplayProps = {
//   normal: {
//     bg: 'background-current'
//   },
//   block: {
//     bg: 'background',
//     border: 'none'
//   }
// }

// TODO: BODY CAN BE ANYTHING, not just a string!
export type AccordionProps = {
  header: string,
  headingLevel: 'h1'|'h2'|'h3'|'h4'|'h5',
  body: string,
  bodyBg: boolean,
  initiallyExpanded: boolean,
  // display: AccordionDisplayProps
  size: 'normal' | 'condensed' | 'compact',
  colorMode: 'light' | 'dark'
  overline?: string,
  subheader?: string,
  appearance: 'standard' | 'block',
  ctaText?: string,
}

// NTS: THIS WORKS, but couldn't render background properly
const StyledAnchor = styled(Anchor)`
  &:hover,
  &:focus {
    color: ${theme.colors.text};
  }
`;

// NTS: this works, but css wasn't needed
// const StyledAnchorWithStates = styled(Anchor)(css({
//   '&:hover': {
//     color: 'text',
//     textDecoration: 'none',
//     bg: 'background-hover'
//   },
//   '&:focus': {
//     color: 'text',
//     background: 'background-selected'
//   },
//   '&:disabled': {
//     color: 'text-disabled',
//     background: 'background-disabled'
//   },
//   variant({
//     prop: 'style',
//     variants: {
//       standard: {
//         bg: 'background-current',
//         border: 'solid'
//       },
//       block: {
//         bg: 'background',
//         border: 'none'
//       }
//     }
//   })
// }))

const StyledFlexBox = styled(FlexBox)(
  variant({
    prop: 'appearance',
    variants: {
      standard: {
        bg: 'background-current',
      },
      block: {
        bg: 'background',
        border: 'none'
      }
    }
  })
)

const StyledAnchorWithStates = styled(Anchor)(
  variant({
    prop: 'appearance',
    base: {
      '&:hover': {
        color: 'text',
        bg: 'background-hover'
      },
      '&:focus': {
        color: 'text',
        bg: 'background-selected'
      },
      '&:disabled': {
        color: 'text',
        bg: 'background-disabled'
      }
    },
    variants: {
      standard: {
        bg: 'background-current',
      },
      block: {
        bg: 'background',
        border: 'none'
      }
    }
  })
)

// NTS: this doesn't work
const StyledAnchors2 = styled(Anchor)(variant({
  variants: {
    '&:hover': {
      color: 'text',
      textDecoration: 'none',
      bg: 'background-hover'
    },
    '&:focus': {
      color: 'text',
      bg: 'background-selected'
    },
    '&:disabled': {
      color: 'text',
      bg: 'background-disabled'
    }
  }
}))

const stylingVariants = variant({
  prop: 'appearance',
  variants: {
    standard: {
      bg: 'background-current',
      border: 'solid'
    },
    block: {
      bg: 'background',
      border: 'none'
    }
  }
})

// THESE CAN PROBABLY BE SOME HELPER FUNCTIONS
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
  bodyBg=true,
  initiallyExpanded = true,
  // display='background-current',
  colorMode='light',
  overline='overline is optional',
  size='normal',
  subheader='subheader is optional',
  appearance='standard',
  ctaText
}) => {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded)

  const handleClick = () => {
    setIsExpanded(prev => !prev)
  }
  return (
    <ColorMode mode={colorMode}>
      <StyledFlexBox
        appearance={appearance}
        width="100%"
        border='solid 1px'
        column
        py={determineVerticalPadding(size)}
        px={determineHorizontalPadding(size)}
      >
        <StyledAnchorWithStates
          aria-label={isExpanded ? 'Collapse Content' : 'Expand Content'}
          aria-expanded={isExpanded}
          onClick={handleClick}
          width="100%"
          variant="interface"
          appearance={appearance}
        >
          <Text textAlign="start" width="100%" color='text-secondary'>
            {overline && overline}
          </Text>
          <FlexBox
            flexDirection='row'
            justifyContent="space-between"
            columnGap={40}
          >
            <Text textAlign='start' as={headingLevel} width="100%">
              {header}
            </Text>
            <Rotation rotated={isExpanded}>
              { size === 'normal' ? <ArrowChevronDownIcon /> : <MiniChevronDownIcon/> }
            </Rotation>
          </FlexBox>
          <Text textAlign="start" width="100%">
            {subheader && subheader}
          </Text>
        </StyledAnchorWithStates>
        {isExpanded && <AccordionArea body={body} bodyBg={bodyBg} ctaText={ctaText}/> }
      </StyledFlexBox>
    </ColorMode>
  )
}
