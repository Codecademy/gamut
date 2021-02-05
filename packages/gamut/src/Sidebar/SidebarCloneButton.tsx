import { ButtonDeprecatedBaseProps } from '@codecademy/gamut/src';
import React from 'react';

export type SidebarCloneButtonProps = ButtonDeprecatedBaseProps & {
  onClick: () => void;
  tab?: boolean;
  children?: React.ReactNode;
};

export const SidebarCloneButton: React.FC<SidebarCloneButtonProps> = ({
  onClick,
  children,
}) => {
  return React.cloneElement(children, {
    onClick: onClick,
  });
};
