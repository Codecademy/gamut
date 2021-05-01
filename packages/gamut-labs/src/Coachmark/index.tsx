import { Box } from '@codecademy/gamut';
import React, { useEffect, useRef, useState } from 'react';

import { Popover, PopoverProps } from '../Popover';

export type CoachmarkProps = {
  /**
   * Applied to the element to which the coachmark points.
   */
  className?: string;
  /**
   * Amount of time (in ms) to delay rendering the coachmark.
   * @default 500
   */
  delay?: number;
  /**
   * Whether the coachmark is rendered.
   */
  shouldShow: boolean;
  /**
   * Function that returns the contents of the coachmark.
   */
  renderPopover: (onDismiss?: () => void) => JSX.Element;
} & Partial<Omit<PopoverProps, 'isOpen' | 'targetRef' | 'beak'>>;

export const Coachmark: React.FC<CoachmarkProps> = ({
  children,
  shouldShow,
  className,
  delay = 500,
  renderPopover,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const activeElRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (shouldShow) {
      timer = setTimeout(() => {
        setIsOpen(shouldShow);
      }, delay);
    } else {
      setIsOpen(shouldShow);
    }

    return () => clearTimeout(timer);
  }, [shouldShow, delay]);

  return (
    <Box display="inline-block" ref={activeElRef} className={className}>
      {children}
      <Popover {...rest} beak targetRef={activeElRef} isOpen={isOpen}>
        {renderPopover()}
      </Popover>
    </Box>
  );
};
