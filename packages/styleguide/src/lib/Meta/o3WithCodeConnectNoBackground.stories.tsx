import {
  Badge,
  Box,
  Checkbox,
  FillButton,
  GridBox,
  IconButton,
  Input,
  Menu,
  MenuItem,
  Radio,
  Text,
} from '@codecademy/gamut';
import { SearchIcon } from '@codecademy/gamut-icons';
import { DiagonalADense, DiagonalALoose } from '@codecademy/gamut-patterns';
import styled from '@emotion/styled';
import type { Meta, StoryObj } from '@storybook/react';

// Generic wrapper used to absolutely-position SVG patterns
const PatternOverlay = styled(Box)`
  position: absolute;
  inset: 0;
  pointer-events: none; /* Ensure overlay doesn't affect layout / clicks */
  z-index: 0; /* Sit behind content */
`;

// Section wrappers
const HeroSection = styled.section`
  padding: 96px 32px;
  position: relative;
  overflow: hidden;
`;

const ComponentGrid = styled(GridBox)`
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem; /* 24px for tighter spacing */
  padding: 3rem; /* matches Figma 48px (3rem) padding */
  border: 1px solid rgba(16, 22, 47, 0.06);
  align-items: flex-start; /* keep rows aligned to top */
`;

const O3WithCodeConnectNoBackground = () => {
  return (
    <Box>
      {/* Hero */}
      <Box>
        <HeroSection>
          <PatternOverlay color="text">
            <DiagonalALoose
              height="100%"
              preserveAspectRatio="none"
              width="100%"
            />
          </PatternOverlay>
          <Box
            bg="background"
            maxWidth="1200px"
            mx="auto"
            position="relative"
            zIndex={1}
          >
            <Badge variant="accent">New</Badge>
            <Text as="h1" fontSize={64} fontWeight="title" mt={16}>
              From canvas to code—automagically.
            </Text>
            <Text as="p" fontSize={18} maxWidth="624px" mt={16}>
              You can now inspect a Figma file and get back real, usable code
              thanks to MCP.
            </Text>
          </Box>
        </HeroSection>
      </Box>

      {/* How it Works */}
      <Box position="relative" px={32} py={48}>
        <Box maxWidth="1200px" mx="auto">
          <Text as="h2" fontSize={44} fontWeight="title" mb={48}>
            How it works
          </Text>

          <GridBox gap={32} gridTemplateColumns="1fr 1fr" mb={32}>
            <Box>
              <Text as="h3" fontSize={26} fontWeight="title" mb={16}>
                1. Design with real components
              </Text>
              <Text fontSize={18}>
                Use components from your design system directly in Figma. Each
                one is mapped to a real implementation in code—no need to fake
                it.
              </Text>
            </Box>
            <Box bg="background-selected" p={16}>
              {/* screenshot placeholder */}
            </Box>
          </GridBox>

          <Box color="text" height="16px" position="relative">
            <DiagonalADense
              height="100%"
              preserveAspectRatio="none"
              width="100%"
            />
          </Box>

          <GridBox gap={32} gridTemplateColumns="1fr 1fr" my={32}>
            <Box bg="background-selected" p={16}>
              {/* screenshot placeholder */}
            </Box>
            <Box>
              <Text as="h3" fontSize={26} fontWeight="title" mb={16}>
                2. Inspect in Dev Mode
              </Text>
              <Text fontSize={18}>
                With the MCP server running, Figma Dev Mode shows the actual
                component name, available props, and design tokens used (like
                spacing, color, and typography).
              </Text>
            </Box>
          </GridBox>

          <Box color="text" height="16px" position="relative">
            <DiagonalADense
              height="100%"
              preserveAspectRatio="none"
              width="100%"
            />
          </Box>

          <GridBox gap={32} gridTemplateColumns="1fr 1fr" mt={32}>
            <Box>
              <Text as="h3" fontSize={26} fontWeight="title" mb={16}>
                3. Copy usable code
              </Text>
              <Text fontSize={18}>
                Developers get production-ready code they can copy straight from
                the design—no guessing, no redlining, no translation.
              </Text>
            </Box>
            <Box bg="background-selected" p={16}>
              {/* screenshot placeholder */}
            </Box>
          </GridBox>
        </Box>
      </Box>

      {/* Inspectable Components */}
      <Box px={32} py={48}>
        <Box maxWidth="1200px" mx="auto">
          <Text as="h2" fontSize={44} fontWeight="title" mb={16}>
            Inspectable components
          </Text>
          <Text fontSize={18} mb={48}>
            Each of these elements below are real Gamut components. Open Dev
            Mode to view props, tokens, and usable code.
          </Text>

          <ComponentGrid>
            <FillButton variant="primary">Button text</FillButton>
            <IconButton icon={SearchIcon} tip="Search" variant="secondary" />
            <Menu variant="fixed" spacing="condensed" width="200px">
              <MenuItem active>Menu item</MenuItem>
              <MenuItem>Menu item</MenuItem>
              <MenuItem>Menu item</MenuItem>
            </Menu>
            <Input label="Form element label*" />
            <Box>
              <Checkbox htmlFor="checkbox1" id="checkbox1" label="Label" />
              <Checkbox htmlFor="checkbox2" id="checkbox2" label="Label" />
              <Checkbox htmlFor="checkbox3" id="checkbox3" label="Label" />
            </Box>
            <Box>
              <Radio
                aria-label="Example radio 1"
                label="Label"
                name="example"
              />
              <Radio
                aria-label="Example radio 2"
                label="Label"
                name="example"
              />
              <Radio
                aria-label="Example radio 3"
                label="Label"
                name="example"
              />
            </Box>
          </ComponentGrid>
        </Box>
      </Box>
    </Box>
  );
};

const meta: Meta<typeof O3WithCodeConnectNoBackground> = {
  title: 'Meta/o3WithCodeConnectNoBackground',
  component: O3WithCodeConnectNoBackground,
};

export default meta;

type Story = StoryObj<typeof O3WithCodeConnectNoBackground>;

export const Example: Story = {};
