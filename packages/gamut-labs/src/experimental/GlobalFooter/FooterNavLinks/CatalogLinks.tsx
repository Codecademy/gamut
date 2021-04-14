import { Anchor, Box } from '@codecademy/gamut';
import { theme, variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { FooterHeading } from '../FooterHeading';
import { FooterLinkItem, FooterLinkItems } from '../FooterLinks';
import { FooterSubHeading } from '../FooterSubHeading';
import { GlobalFooterClickHandler } from '../types';

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

const CatalogLinkArea = styled(FooterLinkItems)<{ variant?: 'fullHeight' }>`
  display: flex;
  max-height: 14rem;
  flex-direction: column;
  flex-wrap: wrap;
  margin-bottom: 1rem;

  ${variant({ fullHeight: { maxHeight: { md: 'none' } } })}
`;

const CatalogFooterLinkItem = styled(FooterLinkItem)`
  margin: 0.25rem 0;
`;

const languages = [
  ['html-css', 'HTML & CSS'],
  ['python', 'Python'],
  ['javascript', 'JavaScript'],
  ['java', 'java'],
  ['sql', 'SQL'],
  ['bash', 'Bash/Shell'],
  ['ruby', 'Ruby'],
  ['c-plus-plus', 'C++'],
  ['r', 'R'],
  ['c-sharp', 'C#'],
  ['php', 'PHP'],
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

export type CatalogLinksProps = {
  onClick: GlobalFooterClickHandler;
};

export const CatalogLinks: React.FC<CatalogLinksProps> = ({ onClick }) => {
  const languagesList = (
    <>
      <FooterSubHeading as="h3">Languages</FooterSubHeading>
      <CatalogLinkArea>
        {languages.map(([slug, text]) => (
          <CatalogFooterLinkItem key={slug}>
            <Anchor
              href={`/catalog/language/${slug}`}
              onClick={(event) => onClick({ event, target: slug })}
              variant="interface"
            >
              {text}
            </Anchor>
          </CatalogFooterLinkItem>
        ))}
      </CatalogLinkArea>
    </>
  );

  const subjectsList = (
    <Box width={{ base: '100%', md: '50%' }}>
      <FooterSubHeading as="h3">Subjects</FooterSubHeading>
      <CatalogLinkArea variant="fullHeight">
        {subjects.map(([slug, text]) => (
          <CatalogFooterLinkItem key={slug}>
            <Anchor
              href={`/catalog/subject/${slug}`}
              onClick={(event) => onClick({ event, target: '' })}
              variant="interface"
            >
              {text}
            </Anchor>
          </CatalogFooterLinkItem>
        ))}
        <CatalogFooterLinkItem aria-hidden>—</CatalogFooterLinkItem>
        <CatalogFooterLinkItem>
          <Anchor
            href="/catalog/subject/all"
            onClick={(event) => onClick({ event, target: 'fullCatalog' })}
            variant="interface"
          >
            Full Catalog
          </Anchor>
        </CatalogFooterLinkItem>
        <CatalogFooterLinkItem>
          <Anchor
            href="/learn/beta-content"
            onClick={(event) => onClick({ event, target: 'betaContent' })}
            variant="interface"
          >
            Beta Content
          </Anchor>
        </CatalogFooterLinkItem>
        <CatalogFooterLinkItem>
          <Anchor
            href="https://trello.com/b/vAgDXtT6/codecademy-releases-roadmap"
            onClick={(event) => onClick({ event, target: 'roadmap' })}
            variant="interface"
          >
            Roadmap
          </Anchor>
        </CatalogFooterLinkItem>
      </CatalogLinkArea>
    </Box>
  );

  return (
    <CatalogLinksContainer>
      <FooterHeading>Course Catalog</FooterHeading>
      <Box display="flex" flexDirection={{ base: 'column', sm: 'row' }}>
        <Box
          display={{ base: 'block', md: 'none' }}
          width={{ base: '100%', md: '50%' }}
        >
          {languagesList}
        </Box>
        {subjectsList}
        <Box
          display={{ base: 'none', md: 'block' }}
          width={{ base: '100%', md: '50%' }}
        >
          {languagesList}
        </Box>
      </Box>
    </CatalogLinksContainer>
  );
};
