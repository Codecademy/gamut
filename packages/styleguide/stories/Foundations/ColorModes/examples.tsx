/* eslint-disable local-rules/gamut-import-paths */
import {
  Anchor,
  Box,
  Coachmark,
  Column,
  ContentContainer,
  CTAButton,
  Dialog,
  FillButton,
  FlexBox,
  GridBox,
  IconButton,
  LayoutGrid,
  Logo,
  ProLabel,
  StrokeButton,
  Text,
  TextButton,
  Toast,
  Toggle,
} from '@codecademy/gamut/src';
import { MiniDeleteIcon, SearchIcon } from '@codecademy/gamut-icons';
import { Background, ColorMode } from '@codecademy/gamut-styles/src';
import React, { ComponentProps, useState } from 'react';

const renderButtons = (variant?: 'primary' | 'secondary', disabled = false) => {
  return (
    <Column
      gap={16}
      gridTemplateColumns="repeat(5, max-content)"
      gridAutoRows="3rem"
      justifyItems="start"
      alignItems="start"
    >
      <GridBox gridRowEnd="span 2">
        <CTAButton
          variant={variant}
          disabled={disabled}
          opacity={variant === 'primary' ? 1 : 0}
        >
          CTA
        </CTAButton>
      </GridBox>
      <FillButton variant={variant} disabled={disabled}>
        Fill
      </FillButton>
      <StrokeButton variant={variant} disabled={disabled}>
        Stroke
      </StrokeButton>
      <TextButton variant={variant} disabled={disabled}>
        Text
      </TextButton>
      <IconButton variant={variant} icon={SearchIcon} disabled={disabled} />
      <FillButton variant={variant} size="small" disabled={disabled}>
        Fill
      </FillButton>
      <StrokeButton variant={variant} size="small" disabled={disabled}>
        Stroke
      </StrokeButton>
      <TextButton variant={variant} size="small" disabled={disabled}>
        Text
      </TextButton>
      <IconButton
        variant={variant}
        size="small"
        icon={MiniDeleteIcon}
        disabled={disabled}
      />
    </Column>
  );
};

const renderAtoms = () => {
  return (
    <>
      <Column size={6} variant={false}>
        <LayoutGrid gap={24}>
          <Column>
            <Text as="h4">Typography</Text>
          </Column>
          <Column>
            <Text as="p">
              Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut
              labore et dolore <Anchor>magna aliqua</Anchor>. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat.
            </Text>
          </Column>
          <Column>
            <Text as="h4">Links</Text>
          </Column>
          <Column gridTemplateColumns="repeat(3, max-content)" gap={16}>
            <Anchor>Inline Link</Anchor>
            <Anchor variant="standard">Standard Link</Anchor>
            <Anchor variant="interface">Interface Link</Anchor>
          </Column>
          <Column>
            <Text as="h4">Logos</Text>
          </Column>
          <Column gridTemplateColumns="repeat(4, max-content)" gap={16}>
            <Logo variant="default" />
            <Logo variant="pro" />
            <Logo variant="mini" />
            <ProLabel height={30} verticalAlign="text-bottom" />
          </Column>
        </LayoutGrid>
      </Column>
      <Column size={6} variant={false}>
        <LayoutGrid gap={24}>
          <Column>
            <Text as="h4">Buttons</Text>
          </Column>
          {renderButtons('primary')}
          {renderButtons('primary', true)}
          {renderButtons('secondary')}
        </LayoutGrid>
      </Column>
    </>
  );
};

const renderMolecules = () => (
  <>
    <Column size={4} variant={false}>
      <Text as="h4" mb={24}>
        Dialog
      </Text>
      <Dialog
        title="Hello"
        confirmCta={{ children: 'Click Me' }}
        cancelCta={{ children: "Or Don't!" }}
      >
        World
      </Dialog>
    </Column>
    <Column size={4} variant={false}>
      <Text as="h4" mb={24}>
        Toast
      </Text>
      <Toast
        title="Toast Title"
        message="This is the message content!"
        icon="icon"
        onClose={() => {}}
      />
    </Column>
    <Column size={4} variant={false}>
      <Text as="h4" mb={24}>
        Coachmark
      </Text>

      <Coachmark
        title="Hello"
        message="world"
        cta={{ onClick: () => {}, text: 'Click me!' }}
        beak="bottom-left"
      />
    </Column>
  </>
);

export const ColorModeExample = () => {
  const [isDark, setIsDark] = useState(false);
  return (
    <Box marginY={8} marginBottom={32}>
      <FlexBox fontWeight="title" marginBottom={8} alignItems="center">
        <Text mr={8} as="strong">
          Use Dark Mode
        </Text>
        <Toggle
          label="color-mode"
          size="small"
          variant="hyper"
          checked={isDark}
          onChange={() => setIsDark(!isDark)}
        />
      </FlexBox>
      <ColorMode mode={isDark ? 'dark' : 'light'}>
        <Box
          backgroundColor="background"
          padding={24}
          borderColor="text"
          borderStyle="solid"
          borderWidth="1px"
        >
          <LayoutGrid gap={24}>
            <Column>
              <Text as="h3">{isDark ? 'Dark' : 'Light'} Mode</Text>
            </Column>
            {renderAtoms()}
          </LayoutGrid>
        </Box>
      </ColorMode>
    </Box>
  );
};

export const ColorModeKitchenSinkExample = () => {
  const [isDark, setIsDark] = useState(false);
  return (
    <ColorMode
      mode={isDark ? 'dark' : 'light'}
      bg="background"
      p={24}
      minHeight="100vh"
    >
      <ContentContainer>
        <LayoutGrid gap={24}>
          <Column>
            <FlexBox alignItems="center">
              <Text mr={8} as="strong">
                Use Dark Mode
              </Text>
              <Toggle
                label="color-mode"
                size="small"
                variant="hyper"
                checked={isDark}
                onChange={() => setIsDark(!isDark)}
              />
            </FlexBox>
          </Column>
          <Column>
            <Text as="h3">{isDark ? 'Dark' : 'Light'} Mode</Text>
          </Column>
          {renderAtoms()}
          {renderMolecules()}
        </LayoutGrid>
      </ContentContainer>
    </ColorMode>
  );
};

export const BackgroundExample: React.FC<ComponentProps<typeof Background>> = ({
  children,
  ...rest
}) => {
  return (
    <Background {...rest} p={24}>
      <Text as="p" fontSize={26} fontWeight="title" mb={16}>
        {rest.bg}
      </Text>
      <Text as="p" mb={16}>
        Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore
        et dolore <Anchor>magna aliqua</Anchor>. Ut enim ad minim veniam, quis
        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </Text>
      {children}
    </Background>
  );
};
