import { MiniArrowDownIcon } from '@codecademy/gamut-icons';
import {
  theme,
  themed,
  transitionConcatenator,
} from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { Box } from '../Box';

export type SkipToContentProps = {
  className?: string;
  contentId: string;
};

const SkipToContentLink = styled.a`
  color: ${themed('colors.navy')};
  background-color: ${themed('colors.white')};
  cursor: pointer;
  display: flex;
  font-weight: ${themed('fontWeight.title')};
  justify-content: center;
  align-items: center;
  opacity: 0;
  padding: ${themed('spacing.24')} ${themed('spacing.16')};
  position: absolute;
  text-decoration: none;
  transform: translate(-50%, -100%);
  top: 0;
  left: 50%;
  z-index: 15;
  width: 12rem;
  transition: ${transitionConcatenator(
    ['opacity', 'transform'],
    theme.timing.fast,
    'cubic-bezier(0.075, 0.82, 0.165, 1)'
  )};

  &:hover {
    text-decoration: none;
  }

  &:focus {
    outline-color: ${themed('colors.hyper')};
    opacity: 1;
    transform: translate(-50%, 1rem);
  }
`;

export const SkipToContent: React.FC<SkipToContentProps> = ({
  contentId,
  ...rest
}) => {
  const href = `#${contentId}`;
  const onClick = () => document.querySelector<HTMLElement>(href)!.focus();

  return (
    <SkipToContentLink href={href} onClick={onClick} type="button" {...rest}>
      Skip to Content
      <Box marginLeft={8}>
        <MiniArrowDownIcon aria-hidden />
      </Box>
    </SkipToContentLink>
  );
};

export const SkipToContentTarget = styled.div`
  margin-top: calc(${themed('header.height')} * -1);
  position: absolute;
`;

SkipToContentTarget.defaultProps = {
  tabIndex: -1,
  ...({ 'data-testid': 'skip-to-content-target' } as Record<string, string>),
};
