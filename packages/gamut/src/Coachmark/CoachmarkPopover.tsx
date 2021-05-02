import React, { ReactNode, useEffect, useRef, useState } from 'react';

import { Box } from '../Box';
import { Popover, PopoverProps } from '../Popover';
import { Coachmark, CoachmarkProps } from './Coachmark';

export type CoachmarkPopoverProps = {
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
} & Partial<Omit<PopoverProps, 'isOpen' | 'targetRef' | 'beak'>> &
  Omit<CoachmarkProps, 'beak'> & { message: ReactNode };

export const CoachmarkPopover: React.FC<CoachmarkPopoverProps> = ({
  children,
  shouldShow,
  className,
  delay = 500,
  cta,
  title,
  message,
  alignment = 'bottom-left',
  inset,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const activeElRef = useRef<HTMLDivElement>(null);

  const onDismiss = () => {
    setIsOpen(false);
    cta?.onClick();
  };

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

  const [yAlign, xAlign] = alignment.split('-') as [
    'top' | 'bottom',
    'left' | 'right'
  ];

  const beakY = yAlign === 'top' ? 'bottom' : 'top';
  const beakX = inset ? xAlign : xAlign === 'left' ? 'right' : 'left';
  const beakAlignment = `${beakY}-${beakX}` as const;

  return (
    <Box display="inline-block" ref={activeElRef} className={className}>
      {children}
      <Popover
        {...rest}
        horizontalOffset={inset ? 0 : -48}
        targetRef={activeElRef}
        isOpen={isOpen}
        alignment={alignment}
        inset={inset}
      >
        <Coachmark
          title={title}
          beak={beakAlignment}
          cta={{ ...cta, onClick: onDismiss }}
        >
          {message}
        </Coachmark>
      </Popover>
    </Box>
  );
};
