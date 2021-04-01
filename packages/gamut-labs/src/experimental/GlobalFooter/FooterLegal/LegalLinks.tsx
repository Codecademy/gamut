import { Anchor } from '@codecademy/gamut';
import { theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

const urls = [
  ['Privacy Policy', '/policy'],
  ['Cookie Policy', '/cookie-policy'],
  ['Do Not Sell My Personal Information', 'https://privacy.codecademy.com'],
  ['Terms', '/terms'],
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

export const LegalLinks = () => {
  return (
    <LinksList aria-label="Legal" role="list">
      {urls.map(([children, href]) => {
        return (
          <LinksItem key={href}>
            <Anchor variant="interface" href={href}>
              {children}
            </Anchor>
          </LinksItem>
        );
      })}
    </LinksList>
  );
};
