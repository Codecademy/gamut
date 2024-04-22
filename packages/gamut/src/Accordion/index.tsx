import {
  ArrowChevronDownIcon,
  MiniChevronDownIcon,
} from '@codecademy/gamut-icons';
import { variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { AnimatePresence, motion  } from 'framer-motion';
// import { breakpoints, useCurrentMode } from '@codecademy/gamut-styles';
import { useState } from 'react';
import * as React from 'react';

import { Anchor, Rotation, Text, TextButton, TextProps, WithChildrenProp } from '..';
import { AccordionArea, AccordionAreaProps } from '../AccordionArea';
import { AccordionButton, AccordionButtonProps  } from '../AccordionButton';
import { Box, FlexBox } from '../Box';

const ExpandInCollapseOut: React.FC<WithChildrenProp> = ({ children }) => {
  return (
    <motion.div
      initial="collapsed"
      exit="collapsed"
      animate="expanded"
      style={{ overflow: 'hidden' }}
      variants={{
        expanded: { height: 'auto' },
        collapsed: { height: 0 },
      }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
};


interface AccordionProps extends AccordionButtonProps, AccordionAreaProps {
  initiallyExpanded: boolean;
  variant?: 'default' | 'block'
}

const StyledFlexBox = styled(FlexBox)(
  variant({
    defaultVariant: 'default',
    variants: {
      default: {
        bg: 'background-current',
        border: 1,
      },
      block: {
        bg: 'background',
        border: 'none',
      },
    },
  })
)

export const Accordion: React.FC<AccordionProps> = ({
  disabled=false,
  header,
  variant,
  headingLevel = 'h3',
  initiallyExpanded = true,
  overline = 'overline is optional',
  spacing = 'normal',
  subheader = 'subheader is optional',
  body,
  bodyBg,
  ctaText,
  ctaCallback,
}) => {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);

  return (
    <StyledFlexBox
      width="100%"
      border="solid 1px"
      column
      variant={variant}
    >
      <AccordionButton
        spacing={spacing}
        header={header}
        headingLevel={headingLevel}
        overline={overline}
        subheader={subheader}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        disabled={disabled}
      />
      <AnimatePresence>
        {isExpanded && (
            <ExpandInCollapseOut>
              <AccordionArea
                body={body}
                bodyBg={bodyBg}
                ctaText={ctaText}
                spacing={spacing}
                ctaCallback={ctaCallback}
              />
            </ExpandInCollapseOut>
        )}
      </AnimatePresence>
    </StyledFlexBox>
  );
};
