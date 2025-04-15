import { useRef } from 'react';
import * as React from 'react';

import { Popover, PopoverBaseProps, PopoverProps } from '../Popover';
import { DelayedRenderWrapper, WithChildrenProp } from '../utils';

export type CoachmarkProps = WithChildrenProp &
  PopoverBaseProps & {
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

  return (
    <>
      <div ref={activeElRef} className={activeElClassName}>
        {children}
      </div>
      <Popover
        {...popoverProps}
        targetRef={activeElRef}
        isOpen={shouldShow}
        {...skipFocusTrapProps}
      >
        {delay > 0 ? (
          <>
            <DelayedRenderWrapper delay={delay}>
              {renderPopover()}
            </DelayedRenderWrapper>
          </>
        ) : (
          renderPopover()
        )}
      </Popover>
    </>
  );
};
