import React from 'react';

import { Description } from '@storybook/addon-docs/blocks';
import { Link, Reset } from '../Markdown/Elements';
import { ContentItem, useNavigation } from '.';
import { Box, Card, FlexBox, GridBox, Text } from '@codecademy/gamut/src';
import { pxRem } from '@codecademy/gamut-styles/src';
import { StatusTab } from '../Docs/StatusIndicator';

export const TableOfContents = () => {
  const { toc } = useNavigation();
  return (
    <GridBox pt={16} maxWidth={1} cols={['1', , , '1:1', '1:1:1']} gap={32}>
      {toc.children.map((link: ContentItem) => (
        <Section {...link} key={`toc-item-${link.id}`} />
      ))}
    </GridBox>
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
  const position = hasSubsections ? 'relative' : 'initial';
  return (
    <Card
      shadow="medium"
      p={0}
      rowGap={8}
      display="grid"
      gridTemplateRows={`max-content ${pxRem(14 * 1.5 + 24)}`}
      position="relative"
    >
      <GridBox rows="min:4.5rem" position={position} gap={8} p={24}>
        <Link variant="area" id={id}>
          <Box position="relative">
            <Text as="h2" fontSize={22}>
              {title}
              {status && <StatusTab status={status} />}
            </Text>
          </Box>
        </Link>
        <Box overflowY="hidden">
          <Reset>{subtitle && <Description>{subtitle}</Description>}</Reset>
        </Box>
      </GridBox>
      <FlexBox borderTop={hasSubsections ? 1 : 'none'} px={24} py={12}>
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
