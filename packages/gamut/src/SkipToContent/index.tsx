import { MiniArrowDownIcon } from '@codecademy/gamut-icons';
import { themed, timing } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import * as React from 'react';

import { Box } from '../Box';

export type SkipToContentProps = {
  className?: string;
  contentId: string;
};

const animateFunction = `cubic-bezier(0.075, 0.82, 0.165, 1)`;

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
  z-index: calc(${themed('elements.headerZ')} + 1);
  width: 12rem;
  transition: opacity ${timing.fast} ${animateFunction},
    transform ${timing.fast} ${animateFunction};

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
    <Box aria-labelledby="skip-to-content" role="region">
      <SkipToContentLink
        href={href}
        id="skip-to-content"
        onClick={onClick}
        {...rest}
      >
        Skip to Content
        <MiniArrowDownIcon aria-hidden ml={8} />
      </SkipToContentLink>
    </Box>
  );
};

const StyledSkipToContentTarget = styled.div(({ theme, children }) => {
  const offset = theme.elements.headerHeight;
  if (children) {
    return css`
      padding-top: calc(${offset} + 1rem);
      margin-top: calc(${offset} * -1);
    `;
  }
  return css`
    margin-top: calc(${offset} * -1);
    position: absolute;
  `;
});

type DataTestId = { 'data-testid'?: string };

export const SkipToContentTarget: React.FC<
  React.ComponentProps<typeof StyledSkipToContentTarget> & DataTestId
> = ({
  tabIndex = -1,
  'data-testid': dataTestId = 'skip-to-content-target',
  ...rest
}) => {
  return (
    <StyledSkipToContentTarget
      data-testid={dataTestId}
      tabIndex={tabIndex}
      {...rest}
    />
  );
};
