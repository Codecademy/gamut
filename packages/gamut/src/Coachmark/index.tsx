import { useRef } from 'react';
import * as React from 'react';

import { DelayedRenderWrapper } from '../DelayedRenderWrapper';
import {
  Popover,
  PopoverFocusProps,
  PopoverProps,
  PopoverYPositionType,
} from '../Popover';

export type CoachmarkProps = PopoverFocusProps & {
  /**
   * Applied to the element to which the coachmark points.
   */
  activeElClassName?: string;
  /**
   * A Coachmark should have children since it is a wrapper component.
   */
  children: React.ReactNode | React.ReactNode[];
  /**
   * Amount of time (in ms) to delay rendering the coachmark.
   * @default 0
   */
  delay?: number;
  /**
   * Whether the coachmark is rendered.
   */
  shouldShow: boolean;
  /**
   * Function that returns the contents of the coachmark.
   */
  renderPopover: (onDismiss?: () => void) => React.JSX.Element;
  /**
   * Props to be passed into the popover component.
   */
  popoverProps?: Partial<
    Omit<PopoverProps, 'beak' | 'position'> & PopoverYPositionType
  >;
};

export const Coachmark: React.FC<CoachmarkProps> = ({
  children,
  shouldShow,
  activeElClassName,
  delay = 0,
  renderPopover,
  popoverProps,
  skipFocusTrap = true,
  onRequestClose,
}) => {
  const activeElRef = useRef<HTMLDivElement>(null);

  const skipFocusTrapProps = skipFocusTrap
    ? ({ skipFocusTrap: true, onRequestClose: undefined } as const)
    : ({ skipFocusTrap: undefined, onRequestClose } as const);

  const PopoverContainer = () => (
    <Popover
      {...popoverProps}
      isOpen={shouldShow}
      targetRef={activeElRef}
      {...skipFocusTrapProps}
      animation="fade"
    >
      {renderPopover()}
    </Popover>
  );

  return (
    <>
      <div className={activeElClassName} ref={activeElRef}>
        {children}
      </div>
      {shouldShow && (
        <DelayedRenderWrapper delay={delay}>
          {PopoverContainer()}
        </DelayedRenderWrapper>
      )}
    </>
  );
};
