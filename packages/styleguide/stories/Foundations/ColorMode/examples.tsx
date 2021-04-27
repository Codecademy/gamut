/* eslint-disable local-rules/gamut-import-paths */
import {
  Anchor,
  Box,
  CTAButton,
  FillButton,
  FlexBox,
  GridBox,
  IconButton,
  StrokeButton,
  Text,
  TextButton,
  Toggle,
} from '@codecademy/gamut/src';
import { MiniDeleteIcon, SearchIcon } from '@codecademy/gamut-icons';
import { Background, ColorMode } from '@codecademy/gamut-styles/src';
import React, { ComponentProps, useState } from 'react';

const renderButtons = (variant?: 'primary' | 'secondary') => {
  return (
    <GridBox
      rowGap={16}
      columnGap={16}
      gridTemplateColumns="repeat(5, max-content)"
      gridAutoRows="3em"
      alignItems="start"
      justifyItems="start"
      paddingTop={16}
    >
      <GridBox gridRowEnd="span 2">
        <CTAButton variant={variant as any}>CTA</CTAButton>
      </GridBox>
      <FillButton variant={variant}>Fill</FillButton>
      <StrokeButton variant={variant}>Stroke</StrokeButton>
      <TextButton variant={variant}>Text</TextButton>
      <IconButton variant={variant} icon={SearchIcon} />
      <FillButton variant={variant} size="small">
        Fill
      </FillButton>
      <StrokeButton variant={variant} size="small">
        Stroke
      </StrokeButton>
      <TextButton variant={variant} size="small">
        Text
      </TextButton>
      <IconButton variant={variant} size="small" icon={MiniDeleteIcon} />
    </GridBox>
  );
};

const renderLinks = () => {
  return (
    <GridBox
      marginTop={16}
      columnGap={16}
      gridTemplateColumns="repeat(3, max-content)"
    >
      <Anchor>Inline Link</Anchor>
      <Anchor variant="standard">Standard Link</Anchor>
      <Anchor variant="interface">Interface Link</Anchor>
    </GridBox>
  );
};

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
          <Text as="h3" mb={24}>
            {isDark ? 'Dark' : 'Light'} Mode
          </Text>
          <Text as="h4" mb={8}>
            Typography
          </Text>
          <Text>
            Lorem ipsum dolor sit amet, sed do{' '}
            <em> eiusmod tempor incididunt</em> ut labore et dolore{' '}
            <b>magna aliqua</b>. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut <u>aliquip ex ea commodo</u>{' '}
            consequat.
          </Text>
          <Text mb={24}>{renderLinks()}</Text>
          <Text as="h4">Buttons</Text>
          {renderButtons('primary')}
          {renderButtons('secondary')}
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
