import { Anchor, Box } from '@codecademy/gamut';
import { theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { FooterHeading } from '../FooterHeading';
import { LinkArea } from '../FooterLinkArea';
import { FooterLinkItem } from '../FooterLinkItem';
import { FooterSubHeading } from '../FooterSubHeading';

const CatalogLinksContainer = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.navy};
  margin-top: 2rem;

  ${theme.breakpoints.sm} {
    padding-top: 2rem;
  }

  ${theme.breakpoints.md} {
    border-left: 1px solid ${({ theme }) => theme.colors.navy};
    border-top: none;
    margin-left: 0;
    margin-top: 0;
    padding-left: 2rem;
    padding-top: 0;
  }

  ${theme.breakpoints.lg} {
    padding-left: 4rem;
  }
`;

const CatalogContents = styled.div`
  display: flex;
  flex-direction: column;

  ${theme.breakpoints.sm} {
    flex-direction: row;
  }

  ${theme.breakpoints.md} {
    flex-direction: row-reverse;
  }
`;

const CatalogLinkArea = styled(LinkArea)<{ fullHeight?: boolean }>`
  display: flex;
  max-height: 14rem;
  flex-direction: column;
  flex-wrap: wrap;
  margin-bottom: 1rem;

  ${({ fullHeight }) =>
    fullHeight &&
    `${theme.breakpoints.md} {
      max-height: none;
    }
  `}
`;

const CatalogFooterLinkItem = styled(FooterLinkItem)`
  margin: 0.25rem 0;
`;

const languages = [
  ['html-css', 'HTML & CSS'],
  ['python', 'R'],
  ['javascript', 'Python'],
  ['java', 'JavaScript'],
  ['sql', 'Java'],
  ['bash', 'SQL'],
  ['ruby', 'Bash/Shell'],
  ['c-plus-plus', 'Ruby'],
  ['r', 'C++'],
  ['c-sharp', 'R'],
  ['php', 'C#'],
  ['go', 'Go'],
  ['swift', 'Swift'],
  ['kotlin', 'Kotlin'],
];

const subjects = [
  ['web-development', 'Web Development'],
  ['data-science', 'Data Science'],
  ['computer-science', 'Computer Science'],
  ['developer-tools', 'Developer Tools'],
  ['machine-learning', 'Machine Learning'],
  ['code-foundations', 'Code Foundations'],
  ['web-design', 'Web Design'],
];

export const CatalogLinks: React.FC = () => {
  return (
    <CatalogLinksContainer>
      <FooterHeading>Course Catalog</FooterHeading>
      <CatalogContents>
        <Box width={{ base: '100%', md: '50%' }}>
          <FooterSubHeading as="h3">Languages</FooterSubHeading>
          <CatalogLinkArea>
            {languages.map(([slug, text]) => (
              <CatalogFooterLinkItem key={slug}>
                <Anchor href={`/catalog/language/${slug}`} variant="interface">
                  {text}
                </Anchor>
              </CatalogFooterLinkItem>
            ))}
          </CatalogLinkArea>
        </Box>
        <Box width={{ base: '100%', md: '50%' }}>
          <FooterSubHeading as="h3">Subjects</FooterSubHeading>
          <CatalogLinkArea fullHeight>
            {subjects.map(([slug, text]) => (
              <CatalogFooterLinkItem key={slug}>
                <Anchor href={`/catalog/subject/${slug}`} variant="interface">
                  {text}
                </Anchor>
              </CatalogFooterLinkItem>
            ))}
            <CatalogFooterLinkItem>—</CatalogFooterLinkItem>
            <CatalogFooterLinkItem>
              <Anchor href="/catalog/subject/all" variant="interface">
                Full Catalog
              </Anchor>
            </CatalogFooterLinkItem>
            <CatalogFooterLinkItem>
              <Anchor href="/learn/beta-content" variant="interface">
                Beta Content
              </Anchor>
            </CatalogFooterLinkItem>
            <CatalogFooterLinkItem>
              <Anchor
                href="https://trello.com/b/vAgDXtT6/codecademy-releases-roadmap"
                variant="interface"
              >
                Roadmap
              </Anchor>
            </CatalogFooterLinkItem>
          </CatalogLinkArea>
        </Box>
      </CatalogContents>
    </CatalogLinksContainer>
  );
};
