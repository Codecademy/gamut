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
import { Title as TitleBlock, Subtitle } from '@storybook/blocks';
import * as React from 'react';

import { StatusIndicator } from './StatusIndicator';

export interface ComponentHeaderProps {
  title?: string;
  subtitle?: string;
  status?: 'current' | 'updating' | 'deprecated' | 'static';
  design?: { url?: string };
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
  title,
  subtitle,
  status: storyStatus = 'static',
  design,
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

  const linkIcon = <OpenIcon size={14} ml={8} />;

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
        {<TitleBlock />}
        <Subtitle />
        {(design?.url || storyStatus !== 'static') && (
          <Background p={16} bg="white" borderRadius="md">
            <GridBox
              gap={16}
              fontWeight={700}
              gridAutoFlow={['row', , 'column']}
              gridAutoColumns="max-content"
            >
              {renderStatus()}
              {design?.url && (
                <Anchor fontSize={16} target="_blank" href={design?.url}>
                  Figma Source File {linkIcon}
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
