import React, { useContext } from 'react';
import { DocsContext } from '@storybook/addon-docs/blocks';

import { Description } from '@storybook/addon-docs/blocks';
import { Link, Reset, SectionStatus } from './Markdown/MarkdownElements';
import { ContentItem, NavigationContext } from './Navigation';
import { Box, Card, FlexBox, GridBox, Text } from '@codecademy/gamut/src';
import { pxRem } from '@codecademy/gamut-styles/src';

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
        <Section {...link} key={`toc-item-${link.id}`} />
      ))}
    </Box>
  );
};

export const BreadCrumbs: React.FC = () => {
  const { kind } = useContext(DocsContext);
  const { getBreadCrumbs } = useContext(NavigationContext);
  const links = getBreadCrumbs(kind!) || [];

  return (
    <Box
      display="flex"
      columnGap={8}
      marginBottom={8}
      fontWeight="title"
      fontSize={16}
    >
      {links.map(({ title, id }, i) => {
        const current = i === links.length - 1;
        const key = `breadcrumb-${kind}-${id}`;
        if (!id) return null;

        if (current) {
          return <span key={key}>{title}</span>;
        }
        return (
          <React.Fragment key={key}>
            <Link
              fontWeight="title"
              variant="standard"
              disabled={current}
              id={id}
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
  id,
  status,
  links,
}) => {
  const renderSubsection = () =>
    links.map(({ title, id }) => (
      <Link
        fontSize={14}
        fontWeight="title"
        variant="standard"
        key={`section_${title}-${id}`}
        id={id}
      >
        {title}
      </Link>
    ));

  const hasSubsections = links.length > 1;

  return (
    <Card
      shadowOffset={4}
      padding={0}
      rowGap={8}
      display="grid"
      gridTemplateRows={`max-content ${pxRem(14 * 1.5 + 24)}`}
      position="relative"
    >
      <GridBox
        gridTemplateRows={`min-content 4.5rem`}
        position={hasSubsections ? 'relative' : 'initial'}
        rowGap={8}
        padding={24}
      >
        <Link variant="area" id={id}>
          <Box position="relative">
            <Text as="h2" fontSize={22}>
              {title}
              {status && <SectionStatus status={status} />}
            </Text>
          </Box>
        </Link>
        <Box overflowY="hidden">
          <Reset>{subtitle && <Description>{subtitle}</Description>}</Reset>
        </Box>
      </GridBox>
      <FlexBox
        borderStyleTop={hasSubsections ? 'solid' : 'none'}
        borderWidthTop="1px"
        borderColorTop="navy"
        paddingX={24}
        paddingY={12}
        onClick={(e) => e.stopPropagation()}
      >
        <FlexBox
          flexWrap="wrap"
          overflow="hidden"
          maxHeight={pxRem(14 * 1.5)}
          columnGap={16}
        >
          {hasSubsections && renderSubsection()}
        </FlexBox>
      </FlexBox>
    </Card>
  );
};
