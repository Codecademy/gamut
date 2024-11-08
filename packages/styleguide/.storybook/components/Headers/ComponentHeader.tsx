import {
  Anchor,
  Box,
  ContentContainer,
  GridBox,
  InfoTip,
  Text,
} from '@codecademy/gamut';
import { OpenIcon } from '@codecademy/gamut-icons';
import { Background } from '@codecademy/gamut-styles';
import { Figma } from '@storybook/addon-designs/blocks';
import { Title } from '@storybook/blocks';
import * as React from 'react';

import { StatusIndicator } from '../Elements/StatusIndicator';

export interface ComponentHeaderProps {
  title?: string;
  subtitle?: string;
  status?: 'current' | 'updating' | 'deprecated' | 'static';
  design?: { url?: string };
  source?: { repo: string; githubLink?: string };
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

  const npmLink =
    source?.githubLink ??
    `https://www.npmjs.com/package/@codecademy/${source?.repo}`;

  return (
    <Box
      bg="navy-100"
      border={1}
      borderColor="navy-300"
      borderRadius="md"
      py={48}
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
          <Background py={16} px={24} bg="white" borderRadius="md">
            <GridBox
              gap={8}
              fontWeight={700}
              gridAutoFlow={['row', , 'column']}
              gridTemplateColumns={['1fr', , 'repeat(3, auto)']}
              justifyContent={'space-between'}
            >
              {renderStatus()}
              {source && (
                <Anchor
                  href={npmLink}
                  icon={OpenIcon}
                  iconPosition="right"
                  target="_blank"
                >
                  @codecademy/{source.repo}
                </Anchor>
              )}
              {design?.url && (
                <Anchor
                  fontSize={16}
                  href={design?.url}
                  icon={OpenIcon}
                  iconPosition="right"
                  target="_blank"
                >
                  Figma Source File
                </Anchor>
              )}
            </GridBox>
          </Background>
        )}

        {design?.url && (
          <GridBox mb={32}>
            <Figma height="56.25%" collapsable url={design?.url} />
          </GridBox>
        )}
      </ContentContainer>
    </Box>
  );
};
