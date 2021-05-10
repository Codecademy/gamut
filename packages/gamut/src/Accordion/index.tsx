import React, { useState } from 'react';

import { AccordionArea } from '../AccordionArea';
import {
  AccordionButton,
  AccordionButtonSize,
  AccordionButtonTheme,
} from '../AccordionButton';

export type ChildrenOrExpandedRender =
  | React.ReactNode
  | ((expanded: boolean) => React.ReactNode);

export type AccordionProps = {
  children: ChildrenOrExpandedRender;

  /**
   * CSS class name added to the root area container.
   */
  className?: string;

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
  top: ChildrenOrExpandedRender;
};

/**
 * @deprecated
 * This component is in the old visual identity and will be updated soon.
 *
 * Check the [Gamut Board](https://www.notion.so/codecademy/Gamut-Status-Timeline-dd3c135d3848464ea6eb1b48e68fbb1d) for component status
 */

export const Accordion: React.FC<AccordionProps> = ({
  children,
  className,
  initiallyExpanded,
  onClick,
  size,
  theme,
  top,
}) => {
  const [expanded, setExpanded] = useState(!!initiallyExpanded);
  const expandRenderer = (renderer: ChildrenOrExpandedRender) =>
    renderer instanceof Function ? renderer(expanded) : renderer;

  return (
    <AccordionArea
      className={className}
      expanded={expanded}
      top={
        <AccordionButton
          expanded={expanded}
          onClick={() => {
            setExpanded(!expanded);
            onClick?.(!expanded);
          }}
          size={size}
          theme={theme}
        >
          {expandRenderer(top)}
        </AccordionButton>
      }
    >
      {expandRenderer(children)}
    </AccordionArea>
  );
};
