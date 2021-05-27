import { ButtonDeprecatedBaseProps } from '@codecademy/gamut';
import React from 'react';

export type SidebarCloneButtonProps = ButtonDeprecatedBaseProps & {
  onClick: () => void;
  children: React.ReactNode;
};

export const SidebarCloneButton: React.FC<SidebarCloneButtonProps> = ({
  onClick,
  children,
}) => {
  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick,
    });
  }
  return null;
};
