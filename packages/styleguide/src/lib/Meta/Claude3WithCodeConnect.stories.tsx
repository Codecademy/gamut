import {
  Badge,
  Box,
  Checkbox,
  FillButton,
  FlexBox,
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

const meta: Meta<typeof Background> = {
  title: 'Meta/Claude3WithCodeConnect',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Background>;

const StyledSection = styled.section`
  padding: 6rem;
  width: 100%;
`;

const ComponentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  padding: 3rem;
  border: 1px solid var(--color-navy-800);
`;

export const MainExample: Story = {
  render: () => (
    <Background bg="navy-800">
      <FlexBox flexDirection="column" height="100%">
        {/* Hero Section */}
        <StyledSection>
          <Box maxWidth="800px">
            <Badge variant="accent">New</Badge>
            <Text as="h1" fontSize={64} fontWeight={700}>
              From canvas to code—automagically.
            </Text>
            <Text as="p" fontSize={18}>
              You can now inspect a Figma file and get back real, usable code
              thanks to MCP.
            </Text>
          </Box>
        </StyledSection>

        {/* How it Works Section */}
        <Background bg="text-accent">
          <StyledSection>
            <Text as="h2" fontSize={44} fontWeight={700}>
              How it works
            </Text>

            <FlexBox flexDirection="column" gap={32} mt={32}>
              <Box>
                <Text as="h3" fontSize={26} fontWeight={700}>
                  1. Design with real components
                </Text>
                <Text fontSize={18}>
                  Use components from your design system directly in Figma. Each
                  one is mapped to a real implementation in code—no need to fake
                  it.
                </Text>
              </Box>

              <Box>
                <Text as="h3" fontSize={26} fontWeight={700}>
                  2. Inspect in Dev Mode
                </Text>
                <Text fontSize={18}>
                  With the MCP server running, Figma Dev Mode shows the actual
                  component name, available props, and design tokens used (like
                  spacing, color, and typography).
                </Text>
              </Box>

              <Box>
                <Text as="h3" fontSize={26} fontWeight={700}>
                  3. Copy usable code
                </Text>
                <Text fontSize={18}>
                  Developers get production-ready code they can copy straight
                  from the design—no guessing, no redlining, no translation.
                </Text>
              </Box>
            </FlexBox>
          </StyledSection>
        </Background>

        {/* Inspectable Components Section */}
        <Background bg="white">
          <StyledSection>
            <Text as="h2" fontSize={44} fontWeight={700}>
              Inspectable components
            </Text>
            <Text fontSize={18} mb={32}>
              Each of these elements below are real Gamut components. Open Dev
              Mode to view props, tokens, and usable code.
            </Text>

            <ComponentsGrid>
              <FillButton>Button text</FillButton>
              <IconButton icon={SearchIcon} tip="Search" />
              <Menu>
                <MenuItem>Menu Item</MenuItem>
                <MenuItem>Menu Item</MenuItem>
                <MenuItem>Menu Item</MenuItem>
              </Menu>
              <Input label="Form element label" />
              <Box>
                <Checkbox
                  aria-label="Label"
                  htmlFor="checkbox-1"
                  id="checkbox-1"
                  label="Label"
                />
                <Checkbox
                  aria-label="Label"
                  htmlFor="checkbox-2"
                  id="checkbox-2"
                  label="Label"
                />
                <Checkbox
                  aria-label="Label"
                  htmlFor="checkbox-3"
                  id="checkbox-3"
                  label="Label"
                />
              </Box>
              <Box>
                <Radio label="Label" name="group" />
                <Radio label="Label" name="group" />
                <Radio label="Label" name="group" />
              </Box>
            </ComponentsGrid>
          </StyledSection>
        </Background>
      </FlexBox>
    </Background>
  ),
};
