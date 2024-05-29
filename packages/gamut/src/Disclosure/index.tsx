import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import * as React from 'react';

import { ExpandInCollapseOut } from '../Animation/ExpandInCollapseOut';
import { DisclosureBody } from './DisclosureBody';
import { DisclosureButton } from './DisclosureButton';
import { DisclosureWrapper } from './elements';
import { DisclosureProps } from './types';

export const Disclosure: React.FC<DisclosureProps> = ({
  body,
  buttonType: button,
  buttonPlacement,
  ctaCallback,
  ctaText,
  disabled = false,
  heading,
  headingLevel = 'h3',
  href,
  initiallyExpanded,
  isListItem = false,
  onClick,
  overline,
  hasPanelBg,
  spacing = 'normal',
  subheading,
  variant,
}) => {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);

  return (
    <DisclosureWrapper
      column
      variant={variant}
      onClick={() => onClick()}
      as={isListItem ? 'li' : undefined}
    >
      <DisclosureButton
        spacing={spacing}
        heading={heading}
        headingLevel={headingLevel}
        overline={overline}
        subheading={subheading}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        disabled={disabled}
      />
      {isExpanded && (
        <AnimatePresence>
          <ExpandInCollapseOut>
            <DisclosureBody
              body={body}
              hasPanelBg={hasPanelBg}
              ctaText={ctaText}
              spacing={spacing}
              ctaCallback={ctaCallback}
              buttonPlacement={buttonPlacement}
              href={href}
              buttonType={button}
            />
          </ExpandInCollapseOut>
        </AnimatePresence>
      )}
    </DisclosureWrapper>
  );
};
