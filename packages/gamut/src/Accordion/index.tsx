import React, { useState } from 'react';
import AccordionArea from '../AccordionArea';
import AccordionButton, {
  AccordionButtonSize,
  AccordionButtonTheme,
} from '../AccordionButton';

export type AccordionProps = {
  initiallyExpanded?: boolean;
  size?: AccordionButtonSize;
  theme?: AccordionButtonTheme;
  top: React.ReactNode;
};

export const Accordion: React.FC<AccordionProps> = ({
  children,
  initiallyExpanded,
  size,
  theme,
  top,
}) => {
  const [expanded, setExpanded] = useState(initiallyExpanded);

  return (
    <AccordionArea
      expanded={expanded}
      top={
        <AccordionButton
          expanded={expanded}
          onClick={() => setExpanded(!expanded)}
          size={size}
          theme={theme}
        >
          {top}
        </AccordionButton>
      }
    >
      {children}
    </AccordionArea>
  );
};

export default Accordion;
