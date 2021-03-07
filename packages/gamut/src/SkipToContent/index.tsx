import { ArrowDownIcon } from '@codecademy/gamut-icons';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { Box } from '../Box';

export type SkipToContentProps = {
  className?: string;
  contentId: string;
};

const SkipToContentLink = styled.a(
  ({ theme }) => css`
    color: ${theme.colors.navy};
    background-color: ${theme.colors.white};
    cursor: pointer;
    display: flex;
    font-weight: ${theme.fontWeight.title};
    justify-content: center;
    opacity: 0;
    padding: 1.5rem 0;
    position: absolute;
    text-decoration: none;
    left: -1000px;
    z-index: 15;

    &:focus {
      opacity: 1;
      left: 50%;
      transform: translate(-50%, 0);
      top: calc(${theme.elements.headerHeight} + 1rem);
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
      <Box as="span" marginRight={8}>
        Skip to Content
      </Box>
      <ArrowDownIcon aria-hidden />
    </SkipToContentLink>
  );
};
