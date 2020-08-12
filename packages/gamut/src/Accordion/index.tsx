import React, { useState } from 'react';
import AccordionArea from '../AccordionArea';
import AccordionButton, {
  AccordionButtonSize,
  AccordionButtonTheme,
} from '../AccordionButton';

export type AccordionProps = {
  /**
   * Whether the accordion should start off with expanded state.
   */
  initiallyExpanded?: boolean;

  /**
   * Called when the top button is clicked.
   *
   * @param expanding - New expanded state the accordion will transition to.
   */
  onClick?: (expanding: boolean) => void;

  /**
   * Visual size of the top button.
   */
  size?: AccordionButtonSize;

  /**
   * Visual theme of the top button.
   */
  theme?: AccordionButtonTheme;

  /**
   * Contents to place within the top button.
   */
  top: React.ReactNode;
};

export const Accordion: React.FC<AccordionProps> = ({
  children,
  initiallyExpanded,
  onClick,
  size,
  theme,
  top,
}) => {
  const [expanded, setExpanded] = useState(!!initiallyExpanded);

  return (
    <AccordionArea
      expanded={expanded}
      top={
        <AccordionButton
          expanded={expanded}
          onClick={() => {
            console.log('onClick firing');
            setExpanded(!expanded);
            onClick?.(!expanded);
          }}
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
