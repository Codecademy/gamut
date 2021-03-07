import { MiniArrowDownIcon } from '@codecademy/gamut-icons';
import { timing } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { Box } from '../Box';

export type SkipToContentProps = {
  className?: string;
  contentId: string;
};

const animateFunction = `cubic-bezier(0.075, 0.82, 0.165, 1)`;

const SkipToContentLink = styled.a(
  ({ theme }) => css`
    color: ${theme.colors.navy};
    background-color: ${theme.colors.white};
    cursor: pointer;
    display: flex;
    font-weight: ${theme.fontWeight.title};
    justify-content: center;
    align-items: center;
    opacity: 0;
    padding: ${theme.spacing[24]} ${theme.spacing[16]};
    position: absolute;
    text-decoration: none;
    transform: translate(-50%, -100%);
    top: 0;
    left: 50%;
    z-index: 15;
    width: 12rem;
    transition: opacity ${timing.fast} ${animateFunction},
      transform ${timing.fast} ${animateFunction};

    &:focus {
      outline-color: ${theme.colors.hyper};
      opacity: 1;
      transform: translate(-50%, 1rem);
    }
  `
);

export const SkipToContent: React.FC<SkipToContentProps> = ({
  contentId,
  ...rest
}) => {
  const href = `#${contentId}`;
  const onClick = () => document.querySelector<HTMLElement>(href)!.focus();

  return (
    <SkipToContentLink href={href} onClick={onClick} type="button" {...rest}>
      <Box as="span" display="inline-block" marginRight={8}>
        Skip to Content
      </Box>
      <MiniArrowDownIcon aria-hidden />
    </SkipToContentLink>
  );
};

export const SkipToContentTarget = styled.div(
  ({ theme }) => css`
    margin-top: -${theme.elements.headerHeight};
    position: absolute;
  `
);

SkipToContentTarget.defaultProps = {
  tabIndex: -1,
  ...({ 'data-testid': 'skip-to-content-target' } as Record<string, string>),
};
