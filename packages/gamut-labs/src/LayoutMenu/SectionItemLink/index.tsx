import { Anchor } from '@codecademy/gamut';
import React from 'react';

export type SectionItemLinkProps = {
  onClick: () => void;
};

export const SectionItemLink: React.FC<SectionItemLinkProps> = ({
  onClick,
  children,
}) => {
  return (
    <Anchor variant="interface" display="block" onClick={onClick}>
      {children}
    </Anchor>
  );
};
