import { Box, Card, GridBox, Text } from '@codecademy/gamut';
import { pxRem } from '@codecademy/gamut-styles';
import * as React from 'react';

import { StatusTab } from '../Elements/StatusIndicator';
import { Link } from '../Elements/Markdown';

type PageLink = {
  id: string;
  status?: 'current' | 'updating' | 'deprecated' | 'static';
  subtitle: string;
  title: string;
};

export const TableOfContents: React.FC<{ links: PageLink[] }> = ({ links }) => {
  return (
    <GridBox
      pt={16}
      maxWidth="100%"
      gridTemplateColumns={{
        _: '1fr',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(3, 1fr)',
      }}
      gap={32}
    >
      {links.map((link) => (
        <TopicCard {...link} key={`toc-item-${link?.href}`} />
      ))}
    </GridBox>
  );
};

export const TopicCard: React.FC<PageLink> = ({
  id,
  status,
  subtitle,
  title,
}) => {
  return (
    <Link variant="area" id={id} tabIndex={0}>
      <Card
        shadow="medium"
        p={0}
        rowGap={8}
        display="grid"
        gridTemplateRows={`max-content ${pxRem(14 * 1.5 + 24)}`}
        position="relative"
      >
        <GridBox
          gridTemplateRows="min-content 4.5rem"
          p={24}
          position={'relative'}
          rowGap={8}
          textAlign={'left'}
        >
          <Box position="relative">
            <Text as="h2" fontSize={22}>
              {title}
              {status && <StatusTab status={status} />}
            </Text>
          </Box>
          <Box overflowY="hidden">
            <Text>{subtitle}</Text>
          </Box>
        </GridBox>
      </Card>
    </Link>
  );
};
