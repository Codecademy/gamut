import * as React from 'react';
import { FocusOn } from 'react-focus-on';
import { ReactFocusOnProps } from 'react-focus-on/dist/es5/types';

import { WithChildrenProp } from '..';

const focusOnStyles = {
  /**
   * Prevent the focus-on wrapper from interfering with parent layout
   */
  display: 'contents',
};

export interface FocusTrapProps extends WithChildrenProp {
  className?: string;
  /**
   * Called when the FocusTrap requests to be closed via the escape key
   * Overrides default onRequestClose if defined
   */
  onEscapeKey?: ReactFocusOnProps['onEscapeKey'];
  /**
   * Called when the FocusTrap requests to be closed via clicking outside of the FocusTrap children
   * Overrides default onRequestClose if defined
   */
  onClickOutside?: ReactFocusOnProps['onClickOutside'];
  /**
   * Whether the focus trap is active
   */
  active?: boolean;
  /**
   * Allow page scrolling and click events outside of the focus trap
   * This is useful for dropdowns and popovers, where the page should still be interactive
   */
  allowPageInteraction?: boolean;
  /**
   * Passthrough for react-focus-on library props
   */
  focusOnProps?: Omit<ReactFocusOnProps, 'children'>;
}

export const FocusTrap: React.FC<FocusTrapProps> = ({
  className,
  children,
  onClickOutside,
  onEscapeKey,
  active = true,
  allowPageInteraction = false,
  focusOnProps,
}) => {
  return (
    <FocusOn
      enabled={active}
      onClickOutside={onClickOutside}
      onEscapeKey={onEscapeKey}
      style={focusOnStyles}
      className={className}
      scrollLock={!allowPageInteraction}
      noIsolation={allowPageInteraction}
      data-testid="focus-trap"
      {...focusOnProps}
    >
      {children}
    </FocusOn>
  );
};
