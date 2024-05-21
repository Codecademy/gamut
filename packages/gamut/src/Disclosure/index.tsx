import { variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import * as React from 'react';

import { ExpandInCollapseOut } from '../Animation/ExpandInCollapseOut';
import { FlexBox } from '../Box';
import { DisclosureBody } from './DisclosureBody';
import { DisclosureButton } from './DisclosureButton';
import { DisclosureProps } from './types';

const StyledFlexBox = styled(FlexBox)(
  variant({
    defaultVariant: 'default',
    variants: {
      default: {
        bg: 'background-current',
        border: 1,
        maxHeight: 'fit-content',
      },
      block: {
        bg: 'background',
        border: 'none',
      },
    },
  })
);

export const Disclosure: React.FC<DisclosureProps> = ({
  disabled = false,
  header,
  variant,
  headingLevel = 'h3',
  initiallyExpanded,
  spacing = 'normal',
  overline,
  subheader,
  body,
  withBackground,
  ctaText,
  ctaCallback,
  buttonPlacement = 'right',
  href
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

      {isExpanded && (
        <AnimatePresence>
          <ExpandInCollapseOut>
            <DisclosureBody
              body={body}
              withBackground={withBackground}
              ctaText={ctaText}
              spacing={spacing}
              ctaCallback={ctaCallback}
              buttonPlacement={buttonPlacement}
              href={href}
            />
          </ExpandInCollapseOut>
        </AnimatePresence>
      )}
    </StyledFlexBox>
  );
};
