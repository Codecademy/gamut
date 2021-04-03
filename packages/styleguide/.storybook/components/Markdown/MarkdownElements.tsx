import LinkTo from '@storybook/addon-links/react';
import {
  boxShadows,
  shouldForwardProp,
  themed,
} from '@codecademy/gamut-styles/src';
import { badgeVariants } from './Badge';
import { Anchor } from '@codecademy/gamut/src';
import React from 'react';
import styled from '@emotion/styled';

export const Reset = styled.div`
  *:first-of-type {
    margin-top: 0;
  }
`;

export const SectionStatus = styled.div<Parameters<typeof badgeVariants>[0]>`
  position: absolute;
  left: calc(100% + 1rem);
  top: 0;
  bottom: 0;
  width: 0.5rem;
  border-radius: 0.25rem 0 0 0.25rem;
  ${badgeVariants}
`;

interface SectionLinkProps {
  story?: string;
  kind?: string;
  box?: boolean;
}

export const SectionLink = styled(LinkTo as any, {
  shouldForwardProp,
})<SectionLinkProps>`
  color: inherit;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: ${boxShadows[1]};
    border-radius: 4px;
    transition: 200ms box-shadow;
  }

  &:hover {
    text-decoration: none;

    &:after {
      box-shadow: ${boxShadows[2]};
    }
  }
`;

export const Link = Anchor.withComponent((props: SectionLinkProps) => (
  <LinkTo {...props} />
));

SectionLink.defaultProps = {
  story: 'page',
};

export const Code = styled.code`
  max-width: 100%;
  overflow-x: auto;
  line-height: 1;
  padding: 5px 7px 1px;
  white-space: nowrap;
  border-radius: 3px;
  font-size: 13px;
  border: 1px solid #eeeeee;
  color: rgba(51, 51, 51, 0.8);
  background-color: ${themed('colors.gray-100')};
  display: inline-block;
  overflow-x: scroll;

  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: #eeeeee;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }
`;
