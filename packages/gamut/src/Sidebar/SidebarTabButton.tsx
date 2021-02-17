import { ArrowChevronRightIcon } from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import React from 'react';

import { ButtonOutline, ButtonOutlineProps } from '../Button/ButtonOutline';
import { SidebarComponentSideProps } from './shared';

export type SidebarTabButtonProps = ButtonOutlineProps &
  SidebarComponentSideProps & {
    expanded: boolean;
    onClick: () => void;
  };

export type RotatingArrowProps = SidebarComponentSideProps & {
  expanded: boolean;
};

const ArrowButton = styled(ButtonOutline)<SidebarComponentSideProps>`
  background-color: inherit;
  border: 0;
  border-radius: 0px 3px 3px 0px;
  color: inherit;
  height: 3rem;
  min-width: 2.3rem;
  padding: 1px;
  position: absolute;
  top: 1rem;
  left: ${(props) => (props.openFrom === 'left' ? '100%' : 'initial')};
  right: ${(props) => (props.openFrom === 'right' ? '100%' : 'initial')};

  &:focus-visible {
    box-shadow: 0 0 0 2px inherit;
  }
`;

const RotatingArrow = styled(ArrowChevronRightIcon)<RotatingArrowProps>`
  transition: transform 0.35s ease-out;
  transform: ${(props) =>
    !props.expanded && props.openFrom === 'right'
      ? `scaleX(-1) rotate(180deg)`
      : props.expanded && props.openFrom === 'right'
      ? `scaleX(-1)`
      : props.expanded && props.openFrom === 'left'
      ? `rotate(180deg)`
      : `none`};
`;

export const SidebarTabButton: React.FC<SidebarTabButtonProps> = ({
  expanded,
  onClick,
  openFrom,
}) => {
  return (
    <ArrowButton
      aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
      aria-expanded={expanded}
      onClick={onClick}
      openFrom={openFrom}
    >
      <RotatingArrow
        height={25}
        width={25}
        expanded={expanded}
        openFrom={openFrom}
        aria-hidden
      />
    </ArrowButton>
  );
};
