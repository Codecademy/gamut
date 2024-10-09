import { useContext } from 'react';
import * as React from 'react';
import { DocsContext, Title } from '@storybook/addon-docs/blocks';
import { Figma } from 'storybook-addon-designs/blocks';

import { Parameters } from '@storybook/addons';
import { useNavigation } from '../Navigation/NavigationProvider';

import {
  Anchor,
  ContentContainer,
  GridBox,
  Markdown,
  Text,
  InfoTip,
  Box,
} from '@codecademy/gamut/src';
import { BreadCrumbs } from '../Navigation/BreadCrumbs';
import { OpenIcon } from '@codecademy/gamut-icons';
import { Background } from '@codecademy/gamut-styles/src';
import { StatusIndicator } from './StatusIndicator';

const isLocalhost = globalThis.location?.toString().includes('localhost');

export interface GamutParameters extends Parameters {
  subtitle?: string;
  status?: 'current' | 'updating' | 'deprecated' | 'static';
  figmaId?: string;
  source?: string;
}

const STATUS = {
  deprecated: {
    infotip:
      'This component uses our old visual identity or uses CSS Modules for styling and should not be used in new work',
    label: 'Old Style',
    status: 'deprecated',
  },
  current: {
    infotip:
      'This component is up to date with our latest visual identity and styling standards',
    label: 'Up to date',
    status: 'current',
  },
  updating: {
    infotip:
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
    parameters: { design = {}, source, modes },
  } = storyStore?._kinds[kind];

  const showMeta = type === 'element';
  const npmLink = `https://www.npmjs.com/package/@codecademy/${source}`;

  const renderStatus = () => {
    if (storyStatus === 'static') return null;
    const { label, status, infotip } = STATUS[storyStatus] ?? {};

    return (
      <Text as="strong">
        Status: <StatusIndicator status={status}>{label}</StatusIndicator>
        <Text fontWeight="normal">
          <InfoTip info={infotip} />
        </Text>
      </Text>
    );
  };

  const linkIcon = <OpenIcon size={14} ml={8} />;
  return (
    <Background minHeight="100vh" bg="gray-50" py={48}>
      <ContentContainer>
        <BreadCrumbs />
        <Title>{title}</Title>
        <Text as="p" fontSize={20} mb={16}>
          <Markdown inline text={subtitle} />
        </Text>
        {showMeta && (
          <Background p={16} bg="white">
            <GridBox
              gap={16}
              fontWeight={700}
              gridAutoFlow={['row', , 'column']}
              gridAutoColumns="max-content"
              alignItems="end"
            >
              {renderStatus()}
              {modes && (
                <Text fontWeight={700}>
                  Color Modes: <Text textColor="green">Active</Text>
                </Text>
              )}
              {source && (
                <Anchor target="_blank" href={npmLink}>
                  @codecademy/{source} {linkIcon}
                </Anchor>
              )}
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
        {children}
      </ContentContainer>
    </Background>
  );
};
