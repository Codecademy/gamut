import { variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import * as React from 'react';

import { WithChildrenProp } from '..';
import { FlexBox } from '../Box';
import { DisclosureArea } from '../DisclosureArea';
import { DisclosureButton } from '../DisclosureButton';
import { DisclosureProps } from './types';

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
);

// Appearances can be made optional and given a reasonable default value
export const Disclosure: React.FC<DisclosureProps> = ({
  disabled = false,
  header,
  variant,
  headingLevel = 'h3',
  initiallyExpanded = true,
  // Remove these defaults later (maybe keep spacing)
  overline = 'overline is optional',
  spacing = 'normal',
  subheader = 'subheader is optional',
  body,
  withBackground,
  ctaText,
  ctaCallback,
}) => {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);

  return (
    <StyledFlexBox width="100%" column variant={variant}>
      <DisclosureButton
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
            <DisclosureArea
              body={body}
              withBackground={withBackground}
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
