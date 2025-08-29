import {
  Badge,
  Box,
  Checkbox,
  FillButton,
  FlexBox,
  GridBox,
  IconButton,
  Input,
  Menu,
  MenuItem,
  Radio,
  Text,
} from '@codecademy/gamut';
import { MiniAddIcon } from '@codecademy/gamut-icons';
import * as React from 'react';

// Made during Hackathon
// Modal unknown
export const FigmaLandingExample: React.FC = () => (
  <Box background="background" fontFamily="base" width="100%">
    {/* Hero Section */}
    <Box
      alignItems="center"
      background="background"
      display="flex"
      flexDirection="column"
      position="relative"
      py={96}
      width="100%"
    >
      <Box
        alignItems="flex-start"
        background="background"
        borderRadius="sm"
        boxShadow="md"
        display="flex"
        flexDirection="column"
        gap={4}
        maxWidth={900}
        px={32}
        py={32}
        width="100%"
      >
        <Badge size="base" variant="accent">
          New
        </Badge>
        <Text as="h1" color="navy" fontSize={64} fontWeight="title" mb={0}>
          From canvas to code—automagically.
        </Text>
        <Text color="navy" fontSize={18} maxWidth={624}>
          You can now inspect a Figma file and get back real, usable code thanks
          to MCP.
        </Text>
      </Box>
      {/* You can add a Box here for the pattern fill background if you want */}
    </Box>

    {/* How it works Section */}
    <Box background="background-primary" px={128 as never} py={48} width="100%">
      <Text as="h2" color="navy" fontSize={44} fontWeight="title" mb={32}>
        How it works
      </Text>
      <GridBox gap={32} gridTemplateColumns="1fr 1fr" mb={32} width="100%">
        {/* Step 1 */}
        <Box>
          <Text as="h3" color="navy" fontSize={26} fontWeight="title">
            1. Design with real components
          </Text>
          <Text color="navy" fontSize={18} mt={8}>
            Use components from your design system directly in Figma. Each one
            is mapped to a real implementation in code—no need to fake it.
          </Text>
        </Box>
        <Box
          alignItems="center"
          background="navy"
          borderRadius="sm"
          display="flex"
          height={148}
          justifyContent="center"
          opacity={0.12}
        >
          <Text color="navy" fontSize={14}>
            replace with a screenshot
          </Text>
        </Box>
        {/* Step 2 */}
        <Box>
          <Text as="h3" color="navy" fontSize={26} fontWeight="title">
            2. Inspect in Dev Mode
          </Text>
          <Text color="navy" fontSize={18} mt={8}>
            With the MCP server running, Figma Dev Mode shows the actual
            component name, available props, and design tokens used (like
            spacing, color, and typography).
          </Text>
        </Box>
        <Box
          alignItems="center"
          background="navy"
          borderRadius="sm"
          display="flex"
          height={148}
          justifyContent="center"
          opacity={0.12}
        >
          <Text color="navy" fontSize={14}>
            replace with a screenshot
          </Text>
        </Box>
        {/* Step 3 */}
        <Box>
          <Text as="h3" color="navy" fontSize={26} fontWeight="title">
            3. Copy usable code
          </Text>
          <Text color="navy" fontSize={18} mt={8}>
            Developers get production-ready code they can copy straight from the
            design—no guessing, no redlining, no translation.
          </Text>
        </Box>
        <Box
          alignItems="center"
          background="navy"
          borderRadius="sm"
          display="flex"
          height={148}
          justifyContent="center"
          opacity={0.12}
        >
          <Text color="navy" fontSize={14}>
            replace with a screenshot
          </Text>
        </Box>
      </GridBox>
    </Box>

    {/* Inspectable Components Section */}
    <Box background="background" px={128 as never} py={48} width="100%">
      <Text as="h2" color="navy" fontSize={44} fontWeight="title" mb={32}>
        Inspectable components
      </Text>
      <Text color="navy" fontSize={18} mb={32}>
        Each of these elements below are real Gamut components. Open Dev Mode to
        view props, tokens, and usable code.
      </Text>
      <FlexBox flexWrap="wrap" gap={48}>
        <FillButton>Button text</FillButton>
        <IconButton icon={MiniAddIcon} tip="Add item" />
        <Menu>
          <MenuItem>Menu item</MenuItem>
          <MenuItem>Menu item</MenuItem>
          <MenuItem>Menu item</MenuItem>
        </Menu>
        <Input label="Input text" />
        <Box>
          <Checkbox htmlFor="checkbox-1" label="Label" />
          <Checkbox htmlFor="checkbox-2" label="Label" />
          <Checkbox htmlFor="checkbox-3" label="Label" />
        </Box>
        <Box>
          <Radio label="Label" />
          <Radio label="Label" />
          <Radio label="Label" />
        </Box>
      </FlexBox>
    </Box>
  </Box>
);

export default FigmaLandingExample;
