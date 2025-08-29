import {
  Badge,
  Box,
  Checkbox,
  FillButton,
  FlexBox,
  FormGroup,
  GridBox,
  IconButton,
  Input,
  Menu,
  MenuItem,
  Radio,
  Text,
} from '@codecademy/gamut';
import { SearchIcon } from '@codecademy/gamut-icons';
import React from 'react';

// Generated after adding rules to github copilot
// using claude 4

export const McpLandingPageExample: React.FC = () => {
  return (
    <Box width="100%">
      {/* Hero Section */}
      <Box
        bg="white"
        color="navy"
        position="relative"
        px={96}
        py={96}
        width="100%"
      >
        <FlexBox
          alignItems="center"
          flexDirection="column"
          gap={32}
          position="relative"
          zIndex={2}
        >
          <FlexBox
            alignItems="flex-start"
            flexDirection="column"
            gap={8}
            width="100%"
          >
            <Badge variant="accent">New</Badge>

            <Text
              as="h1"
              fontFamily="base"
              fontSize={64}
              fontWeight="title"
              lineHeight="spacedTitle"
            >
              From canvas to code—automagically.
            </Text>

            <Text fontSize={18} fontWeight="base" maxWidth="624px">
              You can now inspect a Figma file and get back real, usable code
              thanks to MCP.
            </Text>
          </FlexBox>
        </FlexBox>

        {/* Background pattern overlay */}
        <Box
          bg="navy"
          inset={0}
          opacity={0.05}
          position="absolute"
          zIndex={1}
        />
      </Box>

      {/* How it works section */}
      <Box bg="beige" px={64} py={48} width="100%">
        <FlexBox flexDirection="column" gap={48}>
          <Text as="h2" fontSize={44} fontWeight="title">
            How it works
          </Text>

          {/* Step 1 */}
          <GridBox gap={32} gridTemplateColumns="1fr 1fr" minHeight="148px">
            <FlexBox flexDirection="column" gap={8} justifyContent="center">
              <Text as="h3" fontSize={26} fontWeight="title">
                1. Design with real components
              </Text>
              <Text fontSize={18}>
                Use components from your design system directly in Figma. Each
                one is mapped to a real implementation in code—no need to fake
                it.
              </Text>
            </FlexBox>
            <Box
              alignItems="center"
              bg="text-disabled"
              borderRadius="md"
              display="flex"
              justifyContent="center"
              minHeight="148px"
              opacity={0.3}
            >
              <Text fontSize={14}>replace with a screenshot</Text>
            </Box>
          </GridBox>

          {/* Divider */}
          <Box bg="navy" height="4px" width="100%" />

          {/* Step 2 */}
          <GridBox gap={32} gridTemplateColumns="1fr 1fr" minHeight="148px">
            <Box
              alignItems="center"
              bg="text-disabled"
              borderRadius="md"
              display="flex"
              justifyContent="center"
              minHeight="148px"
              opacity={0.3}
            >
              <Text fontSize={14}>replace with a screenshot</Text>
            </Box>
            <FlexBox flexDirection="column" gap={8} justifyContent="center">
              <Text as="h3" fontSize={26} fontWeight="title">
                2. Inspect in Dev Mode
              </Text>
              <Text fontSize={18}>
                With the MCP server running, Figma Dev Mode shows the actual
                component name, available props, and design tokens used (like
                spacing, color, and typography).
              </Text>
            </FlexBox>
          </GridBox>

          {/* Divider */}
          <Box bg="navy" height="4px" width="100%" />

          {/* Step 3 */}
          <GridBox gap={32} gridTemplateColumns="1fr 1fr" minHeight="148px">
            <FlexBox flexDirection="column" gap={8} justifyContent="center">
              <Text as="h3" fontSize={26} fontWeight="title">
                3. Copy usable code
              </Text>
              <Text fontSize={18}>
                Developers get production-ready code they can copy straight from
                the design—no guessing, no redlining, no translation.
              </Text>
            </FlexBox>
            <Box
              alignItems="center"
              bg="text-disabled"
              borderRadius="md"
              display="flex"
              justifyContent="center"
              minHeight="148px"
              opacity={0.3}
            >
              <Text fontSize={14}>replace with a screenshot</Text>
            </Box>
          </GridBox>
        </FlexBox>
      </Box>

      {/* Inspectable components section */}
      <Box bg="white" color="navy" px={64} py={48} width="100%">
        <FlexBox flexDirection="column" gap={48}>
          <FlexBox flexDirection="column" gap={8}>
            <Text as="h2" fontSize={44} fontWeight="title">
              Inspectable components
            </Text>
            <Text fontSize={18}>
              Each of these elements below are real Gamut components. Open Dev
              Mode to view props, tokens, and usable code.
            </Text>
          </FlexBox>

          {/* Components showcase */}
          <Box border={1} borderColor="text-disabled" borderRadius="md" p={48}>
            <FlexBox
              alignItems="flex-start"
              flexWrap="wrap"
              gap={64}
              justifyContent="flex-start"
            >
              {/* Fill Button */}
              <FillButton variant="primary">Button text</FillButton>

              {/* Icon Button */}
              <IconButton icon={SearchIcon} tip="Search" variant="primary" />

              {/* Menu */}
              <Box
                bg="white"
                borderRadius="sm"
                minWidth={192}
                overflow="hidden"
              >
                <Menu variant="fixed">
                  <MenuItem active>Menu item</MenuItem>
                  <MenuItem>Menu item</MenuItem>
                  <MenuItem>Menu item</MenuItem>
                </Menu>
              </Box>

              {/* Input */}
              <Box minWidth={223}>
                <FormGroup htmlFor="demo-input" label="Form element label*">
                  <Input id="demo-input" placeholder="Input text" type="text" />
                </FormGroup>
              </Box>

              {/* Checkboxes */}
              <FlexBox flexDirection="column" gap={4}>
                <Checkbox htmlFor="checkbox-1" label="Label" />
                <Checkbox htmlFor="checkbox-2" label="Label" />
                <Checkbox htmlFor="checkbox-3" label="Label" />
              </FlexBox>

              {/* Radio buttons */}
              <FlexBox flexDirection="column" gap={4}>
                <Radio
                  htmlFor="radio-1"
                  label="Label"
                  name="radio-group"
                  value="option1"
                />
                <Radio
                  htmlFor="radio-2"
                  label="Label"
                  name="radio-group"
                  value="option2"
                />
                <Radio
                  htmlFor="radio-3"
                  label="Label"
                  name="radio-group"
                  value="option3"
                />
              </FlexBox>
            </FlexBox>
          </Box>
        </FlexBox>
      </Box>
    </Box>
  );
};
