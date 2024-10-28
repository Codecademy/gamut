import { Anchor } from '@codecademy/gamut';
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
