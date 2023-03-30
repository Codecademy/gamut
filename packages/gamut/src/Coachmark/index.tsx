import { useEffect, useRef, useState } from 'react';
import * as React from 'react';

import { WithChildrenProp } from '..';
import { Popover, PopoverProps } from '../Popover';

export interface CoachmarkProps extends WithChildrenProp {
  /**
   * Applied to the element to which the coachmark points.
   */
  activeElClassName?: string;
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
  /**
   * Props to be passed into the popover component.
   */
  popoverProps?: Partial<PopoverProps>;
}

export const Coachmark: React.FC<CoachmarkProps> = ({
  children,
  shouldShow,
  activeElClassName,
  delay = 500,
  renderPopover,
  popoverProps,
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
    <>
      <div ref={activeElRef} className={activeElClassName}>
        {children}
      </div>
      <Popover {...popoverProps} targetRef={activeElRef} isOpen={isOpen}>
        {renderPopover()}
      </Popover>
    </>
  );
};
