import { Popover, PopoverProps } from '@codecademy/gamut-labs/src/experimental';
import React, { useEffect, useRef, useState } from 'react';

export type CoachmarkProps = {
  activeClassName?: string;
  delay?: number;
  shouldShow: boolean;
  showOverlay?: boolean;
  renderPopover: (onDismiss?: () => void) => JSX.Element;
  popoverProps: Partial<PopoverProps>;
};

export const Coachmark: React.FC<CoachmarkProps> = ({
  children,
  shouldShow,
  activeClassName,
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
    <div>
      <div ref={activeElRef}>{children}</div>
      <Popover {...popoverProps} targetRef={activeElRef} isOpen={isOpen}>
        {renderPopover()}
      </Popover>
    </div>
  );
};
