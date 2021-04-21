import React, { useContext } from 'react';
import { DocsContext, Title } from '@storybook/addon-docs/blocks';

import styled from '@emotion/styled';
import { Parameters } from '@storybook/addons';
import { useNavigation } from '../Navigation/NavigationProvider';

import {
  Anchor,
  Box,
  ContentContainer,
  Markdown,
  Text,
  ToolTip,
} from '@codecademy/gamut/src';
import { BreadCrumbs } from '../Navigation/BreadCrumbs';
import { OpenIcon } from '@codecademy/gamut-icons';
import { themed } from '@codecademy/gamut-styles';
import { StatusIndicator } from './StatusIndicator';

export const MetaContainer = styled(Box)`
  display: grid;
  background-color: ${themed('colors.white')};
  padding: ${themed('spacing.16')};
  grid-column-gap: 2rem;
  grid-row-gap: 0.5rem;
`;

export interface GamutParameters extends Parameters {
  subtitle?: string;
  status?: 'current' | 'updating' | 'deprecated' | 'static';
  figmaId?: string;
  source?: string;
}

const STATUS = {
  deprecated: {
    tooltip:
      'This component uses our old visual identity or uses CSS Modules for styling and should not be used in new work',
    label: 'Old Style',
    status: 'deprecated',
  },
  current: {
    tooltip:
      'This component is up to date with our latest visual identity and styling standards',
    label: 'Up to date',
    status: 'current',
  },
  updating: {
    tooltip:
      "We're actively working on updating this component! This is safe to use, but may change in behavior.",
    label: 'Updating',
    status: 'updating',
  },
} as const;

export const DocsPage: React.FC = ({ children }) => {
  const { kind, storyStore } = useContext(DocsContext);
  const {
    toc: { type, title, subtitle, status: storyStatus },
  } = useNavigation();

  if (!kind) {
    return <>{children}</>;
  }

  const {
    parameters: { figmaId, source },
  } = storyStore?._kinds[kind];

  const showMeta = type === 'element';
  const npmLink = `https://www.npmjs.com/package/@codecademy/${source}`;
  const figmaLink = `https://www.figma.com/file/${figmaId}`;

  const renderStatus = () => {
    if (storyStatus === 'static') return null;
    const { label, status, tooltip } = STATUS[storyStatus];

    return (
      <Text fontSize={16} as="strong">
        Status:{' '}
        <ToolTip
          id="status"
          target={<StatusIndicator status={status}>{label}</StatusIndicator>}
        >
          <Text fontWeight="base">{tooltip}</Text>
        </ToolTip>
      </Text>
    );
  };

  const linkIcon = (
    <Box display="inline-block" ml={8} verticalAlign="baseline" height="16px">
      <OpenIcon size={18} />
    </Box>
  );
  return (
    <Box minHeight="100vh" bg="paleBlue" py={48}>
      <ContentContainer>
        <BreadCrumbs />
        <Title>{title}</Title>
        <Text as="p" fontSize={20} marginBottom={16}>
          <Markdown inline text={subtitle} />
        </Text>
        {showMeta && (
          <MetaContainer
            bg="paleBlue"
            gridAutoFlow={['row', , 'column']}
            gridAutoColumns={['minmax(0, 1fr)', , 'minmax(0, max-content)']}
          >
            {renderStatus()}
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
