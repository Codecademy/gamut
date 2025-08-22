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
  RadioGroup,
  Text,
} from '@codecademy/gamut';
import { SearchIcon } from '@codecademy/gamut-icons';

// Made after adding Atoms into Code Connect
// Using Claude Sonnet 4
export const FigmaMcpLandingPage = () => {
  return (
    <Box background="navy" color="white" minHeight="100vh" width="100%">
      {/* Hero Section */}
      <Box background="navy" position="relative" px={96} py={96}>
        <Box background="white" borderRadius="sm" p={32}>
          <FlexBox alignItems="flex-start" flexDirection="column" gap={8}>
            <Badge variant="accent">New</Badge>
            <Text as="h1" color="navy" fontSize={64} fontWeight="title">
              From canvas to code—automagically.
            </Text>
            <Text color="navy" fontSize={18} maxWidth="624px">
              You can now inspect a Figma file and get back real, usable code
              thanks to MCP.
            </Text>
          </FlexBox>
        </Box>
        {/* Pattern overlay */}
        <Box
          bottom={0}
          css={{
            backgroundImage:
              'radial-gradient(circle, #10162f 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            pointerEvents: 'none',
          }}
          left={0}
          opacity={0.1}
          position="absolute"
          right={0}
          top={0}
        />
      </Box>

      {/* How it Works Section */}
      <Box background="#fff0e5" color="navy" px={64} py={48}>
        <Text as="h2" fontSize={44} fontWeight="title" mb={48}>
          How it works
        </Text>

        {/* Step 1 */}
        <GridBox gap={32} gridTemplateColumns="1fr 1fr" mb={16}>
          <FlexBox flexDirection="column" gap={8}>
            <Text fontSize={26} fontWeight="title">
              1. Design with real components
            </Text>
            <Text fontSize={18}>
              Use components from your design system directly in Figma. Each one
              is mapped to a real implementation in code—no need to fake it.
            </Text>
          </FlexBox>
          <FlexBox
            alignItems="center"
            background="rgba(16,22,47,0.12)"
            justifyContent="center"
            minHeight="148px"
            p={8}
          >
            <Text color="navy" fontSize={14}>
              replace with a screenshot
            </Text>
          </FlexBox>
        </GridBox>

        {/* Pattern divider */}
        <Box
          css={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #10162f, #10162f 2px, transparent 2px, transparent 8px)',
          }}
          height={16}
          mb={16}
        />

        {/* Step 2 */}
        <GridBox gap={32} gridTemplateColumns="1fr 1fr" mb={16}>
          <FlexBox
            alignItems="center"
            background="rgba(16,22,47,0.12)"
            justifyContent="center"
            minHeight="148px"
            p={8}
          >
            <Text color="navy" fontSize={14}>
              replace with a screenshot
            </Text>
          </FlexBox>
          <FlexBox flexDirection="column" gap={8}>
            <Text fontSize={26} fontWeight="title">
              2. Inspect in Dev Mode
            </Text>
            <Text fontSize={18}>
              With the MCP server running, Figma Dev Mode shows the actual
              component name, available props, and design tokens used (like
              spacing, color, and typography).
            </Text>
          </FlexBox>
        </GridBox>

        {/* Pattern divider */}
        <Box
          css={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #10162f, #10162f 2px, transparent 2px, transparent 8px)',
          }}
          height={16}
          mb={16}
        />

        {/* Step 3 */}
        <GridBox gap={32} gridTemplateColumns="1fr 1fr">
          <FlexBox flexDirection="column" gap={8}>
            <Text fontSize={26} fontWeight="title">
              3. Copy usable code
            </Text>
            <Text fontSize={18}>
              Developers get production-ready code they can copy straight from
              the design—no guessing, no redlining, no translation.
            </Text>
          </FlexBox>
          <FlexBox
            alignItems="center"
            background="rgba(16,22,47,0.12)"
            justifyContent="center"
            minHeight="148px"
            p={8}
          >
            <Text color="navy" fontSize={14}>
              replace with a screenshot
            </Text>
          </FlexBox>
        </GridBox>
      </Box>

      {/* Inspectable Components Section */}
      <Box background="white" px={64} py={48}>
        <FlexBox flexDirection="column" gap={8} mb={48}>
          <Text as="h2" color="navy" fontSize={44} fontWeight="title">
            Inspectable components
          </Text>
          <Text color="navy" fontSize={18}>
            Each of these elements below are real Gamut components. Open Dev
            Mode to view props, tokens, and usable code.
          </Text>
        </FlexBox>

        <FlexBox
          border={1}
          borderColor="border-primary"
          css={{
            borderColor: 'rgba(16,22,47,0.06)',
          }}
          flexWrap="wrap"
          gap={64}
          p={48}
        >
          {/* Fill Button */}
          <FillButton>Button text</FillButton>

          {/* Icon Button */}
          <IconButton icon={SearchIcon} tip="Search" />

          {/* Menu */}
          <Box
            background="white"
            borderRadius="sm"
            overflow="hidden"
            width="192px"
          >
            <Menu>
              <MenuItem active>Menu item</MenuItem>
              <MenuItem>Menu item</MenuItem>
              <MenuItem>Menu item</MenuItem>
            </Menu>
          </Box>

          {/* Input */}
          <FormGroup label="Form element label" required>
            <Input placeholder="Input text" />
          </FormGroup>

          {/* Checkboxes */}
          <FlexBox flexDirection="column">
            <Checkbox htmlFor="checkbox1" label="Label" />
            <Checkbox htmlFor="checkbox2" label="Label" />
            <Checkbox htmlFor="checkbox3" label="Label" />
          </FlexBox>

          {/* Radio buttons */}
          <RadioGroup name="radio-example">
            <Radio label="Label" value="1" />
            <Radio label="Label" value="2" />
            <Radio label="Label" value="3" />
          </RadioGroup>
        </FlexBox>
      </Box>
    </Box>
  );
};
