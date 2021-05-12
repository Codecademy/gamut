/* eslint-disable local-rules/gamut-import-paths */
import {
  Anchor,
  Box,
  CTAButton,
  FillButton,
  FlexBox,
  GridBox,
  IconButton,
  Input,
  Logo,
  ProLabel,
  SelectDropdown,
  StrokeButton,
  Text,
  TextButton,
  Toggle,
} from '@codecademy/gamut/src';
import { MiniDeleteIcon, SearchIcon } from '@codecademy/gamut-icons';
import { Background, ColorMode } from '@codecademy/gamut-styles/src';
import React, { ComponentProps, useState } from 'react';

const renderButtons = (variant?: 'primary' | 'secondary', disabled = false) => {
  return (
    <GridBox
      rowGap={16}
      columnGap={16}
      gridTemplateColumns="repeat(5, max-content)"
      gridAutoRows="3em"
      alignItems="start"
      justifyItems="start"
      pt={16}
    >
      <GridBox gridRowEnd="span 2">
        <CTAButton variant={variant as any} disabled={disabled}>
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
    </GridBox>
  );
};

const renderLinks = () => {
  return (
    <GridBox
      mt={16}
      columnGap={16}
      gridTemplateColumns="repeat(3, max-content)"
    >
      <Anchor>Inline Link</Anchor>
      <Anchor variant="standard">Standard Link</Anchor>
      <Anchor variant="interface">Interface Link</Anchor>
    </GridBox>
  );
};

const renderInputs = () => {
  return (
    <GridBox
      mt={16}
      columnGap={16}
      gridTemplateColumns="repeat(3, max-content)"
    >
      <Input />
      <Input placeholder="disabled" disabled />
      <Input defaultValue="updog" />
    </GridBox>
  );
};

export const ColorModeExample = () => {
  const [isDark, setIsDark] = useState(false);
  return (
    <Box mt={16} mb={32}>
      <FlexBox mb={8} alignItems="center">
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
        <Box bg="background" p={24} border={1}>
          <Text as="h3" mb={24}>
            {isDark ? 'Dark' : 'Light'} Mode
          </Text>
          <GridBox
            columnGap={16}
            pb={16}
            gridTemplateColumns="max-content max-content max-content"
          >
            <Logo variant="default" />
            <Logo variant="pro" />
            <Logo variant="mini" />
          </GridBox>
          <Text as="p" fontSize={16} fontFamily="accent" mb={16}>
            <ProLabel height={22} verticalAlign="text-bottom" /> Cool Feature
          </Text>
          <Text as="p" mb={16}>
            Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut
            labore et dolore <Anchor>magna aliqua</Anchor>. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </Text>
          {renderLinks()}
          {renderButtons('primary')}
          {renderButtons('secondary')}
          {renderButtons('primary', true)}
          {renderInputs()}
        </Box>
      </ColorMode>
    </Box>
  );
};

export const BackgroundExample: React.FC<ComponentProps<typeof Background>> = ({
  children,
  ...rest
}) => {
  return (
    <Background {...rest} p={24}>
      <Text variant="title-md" mb={16}>
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
