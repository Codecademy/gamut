import {
  ButtonDeprecated,
  ButtonDeprecatedBaseProps,
} from '@codecademy/gamut/src';
import { ArrowChevronRightIcon } from '@codecademy/gamut-icons';
import React from 'react';

import styled from '@emotion/styled';

export type SidebarTabButtonProps = ButtonDeprecatedBaseProps & {
  expanded: boolean;
  onClick: () => void;
};

export type RotatingArrowProps = {
  expanded: boolean;
};

const ArrowButton = styled(ButtonDeprecated)`
  position: absolute;
  left: 100%;
  top: 2rem;
  display: flex;
  align-content: center;
  background-color: inherit;
  color: inherit;
  height: 3rem;
  min-width: 2.3rem;
  margin: 1rem 0;
  padding: 0;
`;

const RotatingArrow = styled(ArrowChevronRightIcon)<RotatingArrowProps>`
  transition: transform 0.35s ease-out;
  transform: ${(props) => (props.expanded ? `rotate(180deg)` : `none`)};
`;

export const SidebarTabButton: React.FC<SidebarTabButtonProps> = ({
  expanded,
  onClick,
}) => {
  return (
    <ArrowButton
      aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
      aria-expanded={expanded}
      onClick={onClick}
    >
      <RotatingArrow height={25} width={25} expanded={expanded} aria-hidden />
    </ArrowButton>
  );
};
