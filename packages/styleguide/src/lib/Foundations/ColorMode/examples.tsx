import {
  Anchor,
  Box,
  ButtonProps,
  Checkbox,
  CTAButton,
  FillButton,
  FlexBox,
  FormGroup,
  GridBox,
  IconButton,
  Input,
  Logo,
  Radio,
  RadioGroup,
  StrokeButton,
  Text,
  TextButton,
  Toggle,
} from '@codecademy/gamut';
import {
  MiniArrowRightIcon,
  MiniDeleteIcon,
  SearchIcon,
  StreakIcon,
} from '@codecademy/gamut-icons';
import {
  Background,
  ColorMode,
  usePrefersDarkMode,
} from '@codecademy/gamut-styles';
import { ComponentProps, useState } from 'react';
import * as React from 'react';

const renderText = () => (
  <Text as="p" color="text" mb={16}>
    Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et
    dolore <Anchor>magna aliqua</Anchor>. Ut <Anchor href="#cool">enim</Anchor>{' '}
    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
    ex ea commodo consequat.
  </Text>
);

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
          <IconButton {...props} icon={SearchIcon} tip="Search" />
          <FillButton {...props} size="small">
            Fill
          </FillButton>
          <StrokeButton {...props} size="small">
            Stroke
          </StrokeButton>
          <TextButton {...props} size="small">
            Text
          </TextButton>
          <IconButton
            {...props}
            size="small"
            icon={MiniDeleteIcon}
            tip="Delete"
          />
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

const renderInputs = () => {
  return (
    <GridBox
      mt={32}
      columnGap={32}
      gridTemplateColumns="repeat(2, max-content)"
    >
      <FormGroup
        error="this is still not updog..."
        label="i am a large label, but something is wrong."
        labelSize="large"
      >
        <Input
          defaultValue="123"
          error
          htmlFor="example-123"
          name="example-123"
          placeholder="Placeholder"
        />
      </FormGroup>
      <FormGroup label="ah yes, a radio group">
        <RadioGroup name="example-radio">
          <Radio label="Radio 1" value="1" />
          <Radio label="Radio 2" value="2" />
        </RadioGroup>
      </FormGroup>
      <FormGroup label="you can't type here.">
        <Input
          htmlFor="example-disabled"
          name="example-disabled"
          defaultValue="Ouch"
          disabled
          icon={StreakIcon}
        />
      </FormGroup>
      <FormGroup label="a humble checkbox">
        <Checkbox
          htmlFor="example-checkbox"
          label="ain't i neat?"
          name="example-checkbox"
          checked
        />
      </FormGroup>
    </GridBox>
  );
};

const ColorModeExampleContents = () => {
  return (
    <>
      <GridBox
        columnGap={16}
        pb={16}
        gridTemplateColumns="max-content max-content max-content"
      >
        <Logo variant="default" />
        <Logo variant="pro" />
        <Logo variant="mini" />
      </GridBox>
      <Text as="p" color="text" fontSize={16} fontFamily="accent" mb={16}>
        Cool Feature
      </Text>
      {renderText()}
      {renderLinks()}
      {renderButtons('primary', false, true)}
      {renderButtons('primary')}
      {renderButtons('primary', true)}
      {renderButtons('secondary')}
      {renderButtons('danger')}
      {renderInputs()}
    </>
  );
};

export const ColorModeExampleWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [isDark, setIsDark] = useState(false);
  return (
    <Box mt={16} mb={32}>
      <FlexBox mb={8} alignItems="center">
        <Toggle
          label="Use Dark Mode"
          size="small"
          variant="hyper"
          checked={isDark}
          onChange={() => setIsDark(!isDark)}
        />
      </FlexBox>
      <Background bg={isDark ? 'navy' : 'white'}>
        <Box bg="background" p={24} border={1}>
          <Text as="h3" mb={24} color="text">
            {isDark ? 'Dark' : 'Light'} Mode
          </Text>
          {children}
        </Box>
      </Background>
    </Box>
  );
};

export const ColorModeExample = () => {
  return (
    <ColorModeExampleWrapper>
      <ColorModeExampleContents />
    </ColorModeExampleWrapper>
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
      {renderText()}
      {children}
    </Background>
  );
};

export const SystemColorModeExample = () => {
  const prefersDarkMode = usePrefersDarkMode();
  const mode = prefersDarkMode ? 'dark' : 'light';
  const bg = prefersDarkMode ? 'navy' : 'paleBlue';

  return (
    <ColorMode mode="system">
      <Background bg={bg} p={24}>
        <Text variant="title-md" mb={16}>
          system color mode:{' '}
          <Text color="primary" fontFamily="monospace" ml={8}>
            {mode} mode
          </Text>
        </Text>
        {renderText()}
      </Background>
    </ColorMode>
  );
};

export const PrefersDarkModeExample = () => {
  const prefersDarkMode = usePrefersDarkMode();
  const mode = prefersDarkMode ? 'dark' : 'light';
  const bg = prefersDarkMode ? 'navy' : 'paleBlue';

  return (
    <ColorMode mode={mode}>
      <Background bg={bg} p={24}>
        <Text variant="title-md" mb={16}>
          user prefers dark mode:{' '}
          <Text color="primary" fontFamily="monospace" ml={8}>
            {prefersDarkMode.toString()}
          </Text>
        </Text>
        {renderText()}
      </Background>
    </ColorMode>
  );
};
