import {
  Box,
  ContentContainer,
  GridBox,
  InfoTip,
  Text,
} from '@codecademy/gamut';
import { Figma } from '@storybook/addon-designs/blocks';
import { Title } from '@storybook/blocks';
import * as React from 'react';

import { StatusIndicator } from '../Elements/StatusIndicator';
import {
  ComponentSource,
  SourceAnchor,
  sourceAnchorProps,
} from '../Elements/ComponentSource';
import { SourceWrapper } from '../Elements/Wrappers';

export type Source = { repo: string; githubLink?: string };

export interface ComponentHeaderProps {
  title?: string;
  subtitle?: string;
  status?: 'current' | 'updating' | 'deprecated' | 'static';
  design?: { type?: string; url?: string };
  source?: Source;
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

export const ComponentHeader: React.FC<ComponentHeaderProps> = ({
  design,
  source,
  status: storyStatus = 'static',
  subtitle,
  title,
}) => {
  const renderStatus = () => {
    if (storyStatus === 'static') return null;
    const { label, status, tooltip } = STATUS[storyStatus] ?? {};

    return (
      <Text as="strong">
        Status: <StatusIndicator status={status}>{label}</StatusIndicator>
        <Text variant="title-xs">
          <InfoTip info={tooltip} />
        </Text>
      </Text>
    );
  };

  return (
    <Box
      bg="navy-100"
      border={1}
      borderColor="border-tertiary"
      borderRadius="md"
      pb={design?.url ? 0 : 24}
      pt={32}
      mb={24}
    >
      <ContentContainer>
        {title ? (
          <Text as="h1" fontSize={28 as any}>
            {title}
          </Text>
        ) : (
          <Title />
        )}
        <Text mt={8} mb={16}>
          {subtitle}
        </Text>
        {(design?.url || storyStatus !== 'static') && (
          <SourceWrapper>
            <GridBox
              gap={16}
              fontWeight={700}
              gridAutoFlow={['row', , 'column']}
              gridAutoColumns={'max-content'}
            >
              {renderStatus()}
              {source && <ComponentSource {...source} />}
              {design?.url && (
                <SourceAnchor href={design?.url} {...sourceAnchorProps}>
                  Figma Source File
                </SourceAnchor>
              )}
            </GridBox>
          </SourceWrapper>
        )}

        {design?.url && (
          <GridBox>
            <Figma height="56.25%" collapsable url={design?.url} />
          </GridBox>
        )}
      </ContentContainer>
    </Box>
  );
};
