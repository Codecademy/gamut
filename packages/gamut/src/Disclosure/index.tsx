import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import * as React from 'react';

import { ExpandInCollapseOut } from '../Animation';
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
  hasBorder = true,
  hasPanelBg,
  spacing = 'normal',
  subheading,
  variant,
}) => {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
  const bodyId = `disclosure-body-${heading}`;
  return (
    <DisclosureWrapper
      as={isListItem ? 'li' : undefined}
      column
      hasBorder={hasBorder}
      onClick={() => onClick?.()}
      variant={variant}
    >
      <DisclosureButton
        ariaControlsId={bodyId}
        disabled={disabled}
        heading={heading}
        headingLevel={headingLevel}
        isExpanded={isExpanded}
        overline={overline}
        setIsExpanded={setIsExpanded}
        spacing={spacing}
        subheading={subheading}
      />
      <AnimatePresence>
        {isExpanded && (
          <ExpandInCollapseOut>
            <DisclosureBody
              body={body}
              buttonPlacement={buttonPlacement}
              buttonType={button}
              ctaCallback={ctaCallback}
              ctaText={ctaText}
              hasPanelBg={hasPanelBg}
              href={href}
              id={bodyId}
              spacing={spacing}
            />
          </ExpandInCollapseOut>
        )}
      </AnimatePresence>
    </DisclosureWrapper>
  );
};
