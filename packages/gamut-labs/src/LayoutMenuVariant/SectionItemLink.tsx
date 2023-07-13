import { Anchor, WithChildrenProp } from '@codecademy/gamut';
import React from 'react';

export interface SectionItemLinkProps extends WithChildrenProp {
  onClick: (event: React.MouseEvent) => void;
  href: string;
}

export const SectionItemLink: React.FC<SectionItemLinkProps> = ({
  onClick,
  href,
  children,
}) => {
  return (
    <Anchor variant="interface" display="block" href={href} onClick={onClick}>
      {children}
    </Anchor>
  );
};
