import { variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { AnimatePresence, motion  } from 'framer-motion';
import { useState } from 'react';
import * as React from 'react';

import { WithChildrenProp } from '..';
import { AccordionArea, AccordionAreaProps } from '../AccordionArea';
import { AccordionButton, AccordionButtonProps  } from '../AccordionButton';
import { FlexBox } from '../Box';

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


// Appearances can be made optional and given a reasonable default value
export const Accordion: React.FC<AccordionProps> = ({
  disabled=false,
  header,
  variant,
  headingLevel = 'h3',
  initiallyExpanded = true,
  // Remove these defaults later (maybe keep spacing)
  overline = 'overline is optional',
  spacing = 'normal',
  subheader = 'subheader is optional',
  body,
  areaBackground,
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
              areaBackground={areaBackground}
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

// const testAcc: React.FC<> = () => (
//   <Accordion
//     initiallyExpanded/>
// )
