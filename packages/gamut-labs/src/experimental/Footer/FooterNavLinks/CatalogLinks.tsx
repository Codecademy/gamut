import { Anchor } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

import { FooterHeading } from '../FooterHeading';
import { LinkArea } from '../FooterLinkArea';
import { FooterLinkItem } from '../FooterLinkItem';
import { FooterSubHeading } from '../FooterSubHeading';

const CatalogContents = styled.div`
  display: grid;
`;

export const CatalogLinks: React.FC = () => {
  return (
    <div>
      <FooterHeading>Course Catalog</FooterHeading>
      <CatalogContents>
        <LinkArea>
          <FooterSubHeading>Subjects</FooterSubHeading>
          <FooterLinkItem>
            <Anchor href="/catalog/subject/web-development" variant="interface">
              Web Development
            </Anchor>
          </FooterLinkItem>
          <FooterLinkItem>
            <Anchor href="/catalog/subject/data-science" variant="interface">
              Data Science
            </Anchor>
          </FooterLinkItem>
          <FooterLinkItem>
            <Anchor
              href="/catalog/subject/computer-science"
              variant="interface"
            >
              Computer Science
            </Anchor>
          </FooterLinkItem>
          <FooterLinkItem>
            <Anchor href="/catalog/subject/developer-tools" variant="interface">
              Developer Tools
            </Anchor>
          </FooterLinkItem>
          <FooterLinkItem>
            <Anchor
              href="/catalog/subject/machine-learning"
              variant="interface"
            >
              Machine Learning
            </Anchor>
          </FooterLinkItem>
          <FooterLinkItem>
            <Anchor
              href="/catalog/subject/code-foundations"
              variant="interface"
            >
              Code Foundations
            </Anchor>
          </FooterLinkItem>
          <FooterLinkItem>
            <Anchor href="/catalog/subject/web-design" variant="interface">
              Web Design
            </Anchor>
          </FooterLinkItem>
        </LinkArea>
      </CatalogContents>
    </div>
  );
};
