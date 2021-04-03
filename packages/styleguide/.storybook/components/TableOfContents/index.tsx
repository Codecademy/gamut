import React, { useContext } from 'react';
import { DocsContext } from '@storybook/addon-docs/blocks';

import { Description } from '@storybook/addon-docs/blocks';
import { Box, Link, Reset, SectionLink, SectionStatus } from './elements';
import {
  ContentItem,
  ContentLink,
  NavigationContext,
} from '../NavigationProvider';
import { Card } from '@codecademy/gamut/src';

export const TableOfContents = () => {
  const { kind } = useContext(DocsContext);
  const { getTableOfContents }: any = useContext(NavigationContext);
  const { children } = getTableOfContents(kind);
  return (
    <Box
      paddingTop="1rem"
      display="grid"
      maxWidth="100%"
      gridTemplateColumns={{
        base: '1fr',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(3, 1fr)',
      }}
      columnGap="2rem"
      rowGap="2rem"
    >
      {children.map((link: ContentItem) => (
        <ToCItem {...link} key={`toc-item-${link.story}`} />
      ))}
    </Box>
  );
};

export const BreadCrumbs: React.FC<{ links: ContentLink[] }> = ({ links }) => {
  return (
    <Box
      display="flex"
      columnGap="0.5rem"
      marginBottom="0.5rem"
      fontWeight="bold"
      fontSize="16px"
    >
      {links.map(({ title, story, kind }, i) => {
        const current = i === links.length - 1;
        const key = `breadcrumb-${story}`;
        if (current) {
          return <span key={key}>{title}</span>;
        }
        return (
          <React.Fragment key={key}>
            <Link
              variant="standard"
              disabled={current}
              kind={kind}
              story={story}
            >
              {title}
            </Link>
            <span>&gt;</span>
          </React.Fragment>
        );
      })}
    </Box>
  );
};

export const ToCItem: React.FC<ContentItem> = ({
  title,
  subtitle,
  story,
  kind,
  status,
  links,
}) => {
  const renderSubsection = () => {
    if (links.length > 0) {
      return (
        <>
          <Box
            width="100%"
            position="absolute"
            boxShadow="rgba(0,0,0,.1) 0 -1px 0 0 inset"
            top="0"
            minHeight="1px"
          />
          <Box
            display="flex"
            columnGap="1rem"
            maxHeight="1rem"
            fontWeight="bold"
            flexWrap="wrap"
            overflow="hidden"
            fontSize="14px"
            onClick={(e) => e.stopPropagation()}
          >
            {links.map((link) => (
              <Link
                variant="standard"
                key={`${title}-story-${story}`}
                kind={link.kind}
                story={link.story}
              >
                {link.title}
              </Link>
            ))}
          </Box>
        </>
      );
    }
  };

  const subsection = renderSubsection();

  return (
    <Card
      shadowOffset={4}
      padding={24}
      paddingBottom={8}
      rowGap={8}
      display="grid"
      gridTemplateRows="min-content 4.5rem 3rem"
      position="relative"
    >
      <SectionLink box kind={kind} story={story}>
        <Box
          fontSize="22px"
          lineHeight="1.1"
          fontWeight="bold"
          position="relative"
        >
          {title}
          {status && <SectionStatus status={status} />}
        </Box>
      </SectionLink>
      <Box overflowY="hidden">
        <Reset>{subtitle && <Description>{subtitle}</Description>}</Reset>
      </Box>
      <Box
        display="grid"
        alignItems="center"
        paddingX="1.5rem"
        paddingBottom=".25rem"
        position="absolute"
        zIndex={subsection ? 1 : -1}
        bottom="0"
        height="3rem"
        width="100%"
      >
        {renderSubsection()}
      </Box>
    </Card>
  );
};
