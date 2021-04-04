import React, { useContext } from 'react';
import { DocsContext } from '@storybook/addon-docs/blocks';

import { Description } from '@storybook/addon-docs/blocks';
import {
  Link,
  Reset,
  SectionLink,
  SectionStatus,
} from './Markdown/MarkdownElements';
import { ContentItem, ContentLink, NavigationContext } from './Navigation';
import { Box, Card, Text } from '@codecademy/gamut/src';

export const TableOfContents = () => {
  const { kind } = useContext(DocsContext);
  const storyNavigation = useContext(NavigationContext);
  const { children = [] } = storyNavigation?.getTableOfContents?.(kind!) || {};
  return (
    <Box
      paddingTop={16}
      display="grid"
      maxWidth="100%"
      gridTemplateColumns={{
        base: '1fr',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(3, 1fr)',
      }}
      columnGap={32}
      rowGap={32}
    >
      {children.map((link: ContentItem) => (
        <ToCItem {...link} key={`toc-item-${link.kind}-${link.story}`} />
      ))}
    </Box>
  );
};

export const BreadCrumbs: React.FC<{ links: ContentLink[] }> = ({ links }) => {
  return (
    <Box
      display="flex"
      columnGap={8}
      marginBottom={8}
      fontWeight="title"
      fontSize={16}
    >
      {links.map(({ title, story, kind }, i) => {
        const current = i === links.length - 1;
        const key = `breadcrumb-${kind}-${story}`;
        if (!story || !kind) {
          return null;
        }
        if (current) {
          return <span key={key}>{title}</span>;
        }
        return (
          <React.Fragment key={key}>
            <Link
              variant="standard"
              disabled={current}
              kind={kind}
              name={story}
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
            top="0"
            backgroundColor="navy"
            minHeight="1px"
          />
          <Box
            display="flex"
            columnGap={16}
            maxHeight="1rem"
            fontWeight="title"
            flexWrap="wrap"
            overflow="hidden"
            fontSize={14}
            onClick={(e) => e.stopPropagation()}
          >
            {links.map(({ title, kind, story }) => {
              return (
                <Link
                  variant="standard"
                  key={`${title}-story-${story}`}
                  kind={kind}
                  name={story}
                >
                  {title}
                </Link>
              );
            })}
          </Box>
        </>
      );
    }
  };

  const subsection = links.length > 1 && renderSubsection();

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
      <SectionLink box kind={kind} name={story}>
        <Box position="relative">
          <Text as="h2" fontSize={22}>
            {title}
            {status && <SectionStatus status={status} />}
          </Text>
        </Box>
      </SectionLink>
      <Box overflowY="hidden">
        <Reset>{subtitle && <Description>{subtitle}</Description>}</Reset>
      </Box>
      <Box
        display="grid"
        alignItems="center"
        paddingX={24}
        paddingBottom={4}
        position="absolute"
        zIndex={subsection ? 1 : -1}
        bottom="0"
        height="3rem"
        width="100%"
      >
        {subsection}
      </Box>
    </Card>
  );
};
