import React from 'react';

import { Description } from '@storybook/addon-docs/blocks';
import { Link, Reset, SectionStatus } from './Markdown/MarkdownElements';
import { ContentItem, useNavigation } from './Navigation';
import { Box, Card, FlexBox, GridBox, Text } from '@codecademy/gamut/src';
import { pxRem } from '@codecademy/gamut-styles/src';

export const TableOfContents = () => {
  const { toc } = useNavigation();
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
      {toc.children.map((link: ContentItem) => (
        <Section {...link} key={`toc-item-${link.id}`} />
      ))}
    </Box>
  );
};

export const BreadCrumbs: React.FC = () => {
  const { breadcrumbs } = useNavigation();

  return (
    <Box
      display="flex"
      columnGap={8}
      marginBottom={8}
      fontWeight="title"
      fontSize={16}
    >
      {breadcrumbs.map(({ title, id }, i) => {
        const key = `breadcrumb-${title}-${id}`;
        const current = i === breadcrumbs.length - 1;

        if (current) {
          return (
            <Text as="strong" key={key}>
              {title}
            </Text>
          );
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
            <Text as="strong">&gt;</Text>
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
