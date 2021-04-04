import React, { useContext } from 'react';
import { DocsContext, Title } from '@storybook/addon-docs/blocks';

import styled from '@emotion/styled';
import { Parameters } from '@storybook/addons';
import { NavigationContext } from './Navigation/NavigationProvider';

import {
  Anchor,
  Box,
  ContentContainer,
  Markdown,
  Text,
} from '@codecademy/gamut/src';
import { BreadCrumbs } from './TableOfContents';
import { OpenIcon } from '@codecademy/gamut-icons';
import { themed } from '@codecademy/gamut-styles';

const MetaContainer = styled(Box)`
  display: grid;
  background-color: ${themed('colors.white')};
  padding: ${themed('spacing.16')};
  grid-column-gap: 2rem;
  grid-row-gap: 0.5rem;
`;

export interface GamutParameters extends Parameters {
  subtitle?: string;
  status?: 'current' | 'updating' | 'deprecated' | 'unknown' | 'static';
  figmaId?: string;
  source?: string;
}

const STATUS = {
  deprecated: {
    children: 'Old Style',
    textColor: 'orange',
  },
  current: {
    children: 'Up to date',
    textColor: 'green',
  },
  updating: {
    children: 'Updating',
    textColor: 'blue',
  },
  unknown: {
    children: 'Backlog',
    textColor: 'gray-500',
  },
} as const;

export const Page: React.FC = ({ children }) => {
  const { kind, storyStore } = useContext(DocsContext);
  const { getTableOfContents, getBreadCrumbs }: any = useContext(
    NavigationContext
  );

  if (!kind) {
    return <>{children}</>;
  }

  const {
    parameters: { figmaId, source },
  } = storyStore?._kinds[kind];

  const { title, subtitle, status } = getTableOfContents(kind);
  const breadcrumbs = getBreadCrumbs(kind);
  const showMeta = Boolean(figmaId || source);
  const npmLink = `https://www.npmjs.com/package/@codecademy/${source}`;
  const figmaLink = `https://www.figma.com/file/${figmaId}`;

  const linkIcon = (
    <Box
      display="inline-block"
      marginLeft={8}
      verticalAlign="baseline"
      height="16px"
    >
      <OpenIcon size={18} />
    </Box>
  );
  return (
    <Box minHeight="100vh" backgroundColor="paleBlue" paddingY={48}>
      <ContentContainer>
        <BreadCrumbs links={breadcrumbs} />
        <Title>{title}</Title>
        <Text as="p" fontSize={20} marginBottom={16}>
          <Markdown inline text={subtitle} />
        </Text>
        {showMeta && (
          <MetaContainer
            backgroundColor="paleBlue"
            gridAutoFlow={['row', , 'column']}
            gridAutoColumns={['minmax(0, 1fr)', , 'minmax(0, max-content)']}
          >
            {status && (
              <Text fontSize={16} as="strong">
                Status: <Text {...STATUS[status as keyof typeof STATUS]} />
              </Text>
            )}
            {source && (
              <Anchor
                fontSize={16}
                fontWeight="title"
                target="_blank"
                href={npmLink}
              >
                @codecademy/{source} {linkIcon}
              </Anchor>
            )}
            {figmaId && (
              <Anchor
                fontSize={16}
                fontWeight="title"
                target="_blank"
                href={figmaLink}
              >
                Figma Source File {linkIcon}
              </Anchor>
            )}
          </MetaContainer>
        )}
        {children}
      </ContentContainer>
    </Box>
  );
};
