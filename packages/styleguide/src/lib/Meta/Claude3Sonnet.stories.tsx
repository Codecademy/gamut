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
import { Background } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import type { Meta, StoryObj } from '@storybook/react';

const Pattern = styled.div<{ pattern: string }>`
  position: absolute;
  inset: 0;
  background-color: ${({ theme }) => theme.colors.navy[800]};
  mask-image: url(${({ pattern }) => pattern});
  mask-repeat: repeat;
  mask-size: 64px;
`;

const HeroSection = styled.section`
  padding: 96px 32px;
  position: relative;
  overflow: hidden;
`;

const ComponentGrid = styled(GridBox)`
  gap: 4rem;
  padding: 3rem;
  border: 1px solid rgba(16, 22, 47, 0.06);
`;

const Claude3Sonnet = () => {
  return (
    <Background bg="navy-800">
      <Box>
        <HeroSection>
          <Pattern pattern="http://localhost:3845/assets/bae8062c976dafe321fee47dd54b7e5a2a48df0e.png" />
          <Box maxWidth="1200px" mx="auto">
            <Badge variant="accent">New</Badge>
            <Text
              as="h1"
              color="white"
              fontSize={64}
              fontWeight="title"
              mt={16}
            >
              From canvas to code—automagically.
            </Text>
            <Text as="p" color="white" fontSize={18} maxWidth="624px" mt={16}>
              You can now inspect a Figma file and get back real, usable code
              thanks to MCP.
            </Text>
          </Box>
        </HeroSection>

        <Box bg="beige-100" position="relative" px={32} py={48}>
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
                {/* Placeholder for screenshot */}
              </Box>
            </GridBox>

            <Pattern
              pattern="http://localhost:3845/assets/78806cfcd7ec296fc7c73a7e236a80cd1e42a6d4.png"
              style={{ height: '16px' }}
            />

            <GridBox gap={32} gridTemplateColumns="1fr 1fr" my={32}>
              <Box bg="background-selected" p={16}>
                {/* Placeholder for screenshot */}
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

            <Pattern
              pattern="http://localhost:3845/assets/78806cfcd7ec296fc7c73a7e236a80cd1e42a6d4.png"
              style={{ height: '16px' }}
            />

            <GridBox gap={32} gridTemplateColumns="1fr 1fr" mt={32}>
              <Box>
                <Text as="h3" fontSize={26} fontWeight="title" mb={16}>
                  3. Copy usable code
                </Text>
                <Text fontSize={18}>
                  Developers get production-ready code they can copy straight
                  from the design—no guessing, no redlining, no translation.
                </Text>
              </Box>
              <Box bg="background-selected" p={16}>
                {/* Placeholder for screenshot */}
              </Box>
            </GridBox>
          </Box>
        </Box>

        <Box position="relative" px={32} py={48}>
          <Box maxWidth="1200px" mx="auto">
            <Text
              as="h2"
              color="white"
              fontSize={44}
              fontWeight="title"
              mb={16}
            >
              Inspectable components
            </Text>
            <Text color="white" fontSize={18} mb={48}>
              Each of these elements below are real Gamut components. Open Dev
              Mode to view props, tokens, and usable code.
            </Text>

            <ComponentGrid>
              <FillButton variant="primary">Button text</FillButton>
              <IconButton icon={SearchIcon} tip="Search" variant="secondary" />
              <Menu>
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
    </Background>
  );
};

const meta: Meta<typeof Claude3Sonnet> = {
  title: 'Meta/Claude3Sonnet',
  component: Claude3Sonnet,
};

export default meta;
type Story = StoryObj<typeof Claude3Sonnet>;

export const Example: Story = {};
