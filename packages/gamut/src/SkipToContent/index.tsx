import { MiniArrowDownIcon } from '@codecademy/gamut-icons';
import { system, timing } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { Anchor } from '../Anchor';
import { Box } from '../Box';

export type SkipToContentProps = {
  className?: string;
  contentId: string;
};

const SkipToContentLink = styled(Anchor)(
  system.css({
    fontWeight: 'title',
    bg: 'background',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    position: 'absolute',
    width: '12rem',
    p: 16,
    transform: 'translate(-50%, -100%)',
    top: 0,
    left: 0.5,
    zIndex: ({ elements }) => elements.headerZ,
    transition: `all ${timing.fast} cubic-bezier(0.075, 0.82, 0.165, 1)`,
    '&:hover': {
      textDecoration: 'none',
    },
    '&:focus-visible': {
      opacity: 1,
      transform: `translate(-50%, 1rem)`,
    },
  })
);

export const SkipToContent: React.FC<SkipToContentProps> = ({
  contentId,
  ...rest
}) => {
  const href = `#${contentId}`;
  const onClick = () => document.querySelector<HTMLElement>(href)!.focus();

  return (
    <Box role="region" aria-labelledby="skip-to-content">
      <SkipToContentLink
        id="skip-to-content"
        href={href}
        onClick={onClick}
        {...rest}
      >
        Skip to Content
        <MiniArrowDownIcon ml={8} aria-hidden />
      </SkipToContentLink>
    </Box>
  );
};

export const SkipToContentTarget = styled.div(({ theme, children }) => {
  const offset = theme.elements.headerHeight;
  if (children) {
    return css`
      padding-top: calc(${offset} + 1rem);
      margin-top: calc(${offset} * -1);
    `;
  }
  return css`
    color: ${theme.colors.text};
    margin-top: calc(${offset} * -1);
    position: absolute;
  `;
});

SkipToContentTarget.defaultProps = {
  tabIndex: -1,
  ...({ 'data-testid': 'skip-to-content-target' } as Record<string, string>),
};
