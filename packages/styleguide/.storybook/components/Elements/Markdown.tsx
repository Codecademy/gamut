import { Anchor } from '@codecademy/gamut';
import { themed } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { linkTo } from '@storybook/addon-links';
import { ComponentProps } from 'react';
import * as React from 'react';

export const Reset = styled.div`
  p:first-of-type {
    margin-top: 0;
  }
`;

const AreaLink = styled.a`
  color: inherit;
  cursor: pointer;

  &:hover {
    text-decoration: none;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

type LinkProps = Omit<ComponentProps<typeof Anchor>, 'variant'> & {
  id: string;
  variant?: ComponentProps<typeof Anchor>['variant'] | 'area';
};

export const Link: React.FC<LinkProps> = ({ ref, id, variant, ...props }) => {
  const storyId = id;

  const onClick = linkTo(storyId);

  if (variant === 'area') {
    return <AreaLink {...props} onClick={onClick} />;
  }
  return <Anchor {...props} onClick={onClick} variant={variant} />;
};

export const LinkTo = Link;

export const Code = styled.code`
  max-width: 100%;
  overflow-x: auto;
  line-height: 1;
  padding: 5px 7px 1px;
  white-space: nowrap;
  border-radius: 3px;
  font-size: 0.8em;
  border: 1px solid ${themed('colors.gray-200')};
  color: ${themed('colors.navy-700')};
  background-color: ${themed('colors.gray-100')};
  display: inline-block;
  overflow-x: scroll;

  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: themed('colors.gray-200');
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }
`;
