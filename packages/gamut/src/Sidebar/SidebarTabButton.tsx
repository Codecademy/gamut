import {
  ButtonDeprecated,
  ButtonDeprecatedBaseProps,
} from '@codecademy/gamut/src';
import { ArrowChevronRightIcon } from '@codecademy/gamut-icons';
import { SidebarComponentSideProps } from './shared';
import React from 'react';

import styled from '@emotion/styled';

export type SidebarTabButtonProps = ButtonDeprecatedBaseProps &
  SidebarComponentSideProps & {
    expanded: boolean;
    onClick: () => void;
  };

export type RotatingArrowProps = SidebarComponentSideProps & {
  expanded: boolean;
};

const ArrowButton = styled(ButtonDeprecated)<SidebarComponentSideProps>`
  position: absolute;
  left: ${(props) => (props.openFrom === 'left' ? '100%' : 'initial')};
  right: ${(props) => (props.openFrom === 'right' ? '100%' : 'initial')};
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
