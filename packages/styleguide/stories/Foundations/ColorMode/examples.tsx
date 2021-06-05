/* eslint-disable local-rules/gamut-import-paths */
import {
  Anchor,
  Box,
  CTAButton,
  FillButton,
  FlexBox,
  GridBox,
  IconButton,
  Logo,
  ProLabel,
  StrokeButton,
  Text,
  TextButton,
  Toggle,
} from '@codecademy/gamut/src';
import { ButtonProps } from '@codecademy/gamut/src/Button/shared';
import {
  MiniArrowRightIcon,
  MiniDeleteIcon,
  SearchIcon,
} from '@codecademy/gamut-icons';
import { Background, ColorMode } from '@codecademy/gamut-styles/src';
import React, { ComponentProps, useState } from 'react';

const renderButtons = (
  variant?: ButtonProps['variant'],
  disabled = false,
  icon = false
) => {
  const props = { variant, disabled };
  const adjacentIcon = icon ? <MiniArrowRightIcon ml={8} /> : null;
  return (
    <GridBox
      rowGap={16}
      columnGap={16}
      gridTemplateColumns="150px repeat(4, max-content)"
      alignItems="start"
      justifyItems="start"
      pt={16}
    >
      <GridBox gridRowEnd="span 2">
        {variant === 'primary' ? (
          <CTAButton variant={variant} disabled={disabled}>
            Action {adjacentIcon}
          </CTAButton>
        ) : (
          <Box />
        )}
      </GridBox>
      <FillButton {...props}>Fill {adjacentIcon}</FillButton>
      <StrokeButton {...props}>Stroke {adjacentIcon}</StrokeButton>
      <TextButton {...props}>Text {adjacentIcon}</TextButton>
      {!icon && (
        <>
          <IconButton {...props} icon={SearchIcon} />
          <FillButton {...props} size="small">
            Fill
          </FillButton>
          <StrokeButton {...props} size="small">
            Stroke
          </StrokeButton>
          <TextButton {...props} size="small">
            Text
          </TextButton>
          <IconButton {...props} size="small" icon={MiniDeleteIcon} />
        </>
      )}
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
          {renderButtons('primary', false, true)}
          {renderButtons('primary')}
          {renderButtons('primary', true)}
          {renderButtons('secondary')}
          {renderButtons('danger')}
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
