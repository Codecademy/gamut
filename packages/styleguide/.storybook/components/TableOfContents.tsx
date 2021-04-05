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
import { Box, Card, FlexBox, GridBox, Text } from '@codecademy/gamut/src';

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
        <Section {...link} key={`toc-item-${link.kind}-${link.story}`} />
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

export const Section: React.FC<ContentItem> = ({
  title,
  subtitle,
  story,
  kind,
  status,
  links,
}) => {
  const renderSubsection = () =>
    links.map(({ title, kind, story }) => (
      <Link
        fontSize={14}
        fontWeight="title"
        variant="standard"
        key={`${title}-story-${story}`}
        kind={kind}
        name={story}
      >
        {title}
      </Link>
    ));

  return (
    <Card
      shadowOffset={4}
      padding={0}
      rowGap={8}
      display="grid"
      position="relative"
    >
      <GridBox
        gridTemplateRows="min-content 4.5rem"
        position="relative"
        rowGap={8}
        padding={24}
      >
        <SectionLink kind={kind} name={story}>
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
      </GridBox>
      <FlexBox
        borderStyleTop="solid"
        borderWidthTop="1px"
        borderColorTop="navy"
        paddingX={24}
        paddingY={12}
        onClick={(e) => e.stopPropagation()}
      >
        <FlexBox
          flexWrap="wrap"
          overflow="hidden"
          maxHeight={`${14 * 1.5}px`}
          columnGap={16}
        >
          {links.length > 1 && renderSubsection()}
        </FlexBox>
      </FlexBox>
    </Card>
  );
};
