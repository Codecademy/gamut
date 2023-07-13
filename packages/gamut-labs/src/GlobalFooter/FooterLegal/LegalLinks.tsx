import { Anchor } from '@codecademy/gamut';
import { theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import * as React from 'react';

import { GlobalFooterClickHandler } from '../types';

const urls = [
  ['Privacy Policy', '/policy', 'policy'],
  ['Cookie Policy', '/cookie-policy', 'cookie_policy'],
  [
    'Do Not Sell My Personal Information',
    'https://privacy.codecademy.com',
    'data_privacy',
  ],
  ['Terms', '/terms', 'terms'],
];

const LinksList = styled.ul`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style-type: none;
  margin-bottom: 0.5rem;
  padding-left: 0;

  ${theme.breakpoints.md} {
    justify-content: flex-start;
    display: inline-flex;
  }
`;

const LinksItem = styled.li`
  &::after {
    content: '|';
    margin: 0 0.375rem;
    font-size: 1rem;
  }

  &:last-of-type::after {
    opacity: 0;
  }
`;

export type LegalLinksProps = {
  onClick: GlobalFooterClickHandler;
};

export const LegalLinks: React.FC<LegalLinksProps> = ({ onClick }) => {
  return (
    <LinksList aria-label="Legal" role="list">
      {urls.map(([children, href, target]) => {
        return (
          <LinksItem key={href}>
            <Anchor
              href={href}
              onClick={(event) => onClick({ event, target })}
              variant="interface"
            >
              {children}
            </Anchor>
          </LinksItem>
        );
      })}
    </LinksList>
  );
};
