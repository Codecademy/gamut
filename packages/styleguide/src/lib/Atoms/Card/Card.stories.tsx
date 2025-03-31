import { Anchor, Box, Card, FlexBox } from '@codecademy/gamut';
import { Background } from '@codecademy/gamut-styles';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Card> = {
  component: Card,
  args: {
    children: 'Hello world I am a Card',
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    shadow: 'patternRight',
    variant: 'default',
    isInteractive: true,
    borderRadius: 'md',
  },
};

export const StaticLight: Story = {
  render: () => (
    <Background bg="white">
      <FlexBox row gap={16} p={16} border={1}>
        <Box flexGrow={1}>
          <Card variant="white">White variant</Card>
        </Box>
        <Box flexGrow={1}>
          <Card variant="yellow">Yellow variant</Card>
        </Box>
        <Box flexGrow={1}>
          <Card variant="beige">Beige variant</Card>
        </Box>
      </FlexBox>
    </Background>
  ),
};

export const StaticDark: Story = {
  render: () => (
    <Background bg="navy">
      <FlexBox row gap={16} p={16} border={1}>
        <Box flexGrow={1}>
          <Card variant="navy">Navy variant</Card>
        </Box>
        <Box flexGrow={1}>
          <Card variant="hyper">Hyper variant</Card>
        </Box>
      </FlexBox>
    </Background>
  ),
};

export const ShadowNone: Story = {
  render: () => (
    <FlexBox column>
      <FlexBox p={16} border={1}>
        <Box flexGrow={1}>
          <Card>Default variant</Card>
        </Box>
      </FlexBox>
      <Background bg="white">
        <FlexBox row gap={16} p={16} border={1}>
          <Box flexGrow={1}>
            <Card variant="white">White variant</Card>
          </Box>
          <Box flexGrow={1}>
            <Card variant="yellow">Yellow variant</Card>
          </Box>
          <Box flexGrow={1}>
            <Card variant="beige">Beige variant</Card>
          </Box>
        </FlexBox>
      </Background>
      <Background bg="navy">
        <FlexBox row gap={16} p={16} border={1}>
          <Box flexGrow={1}>
            <Card variant="navy">Navy variant</Card>
          </Box>
          <Box flexGrow={1}>
            <Card variant="hyper">Hyper variant</Card>
          </Box>
        </FlexBox>
      </Background>
    </FlexBox>
  ),
};

export const ShadowOutline: Story = {
  render: () => (
    <FlexBox column>
      <FlexBox p={24} border={1}>
        <Box flexGrow={1}>
          <Card shadow="outline">Default with outline</Card>
        </Box>
      </FlexBox>
      <Background bg="white">
        <FlexBox row gap={16} p={24} border={1}>
          <Box flexGrow={1}>
            <Card variant="white" shadow="outline">
              White with outline
            </Card>
          </Box>
          <Box flexGrow={1}>
            <Card variant="yellow" shadow="outline">
              Yellow with outline
            </Card>
          </Box>
          <Box flexGrow={1}>
            <Card variant="beige" shadow="outline">
              Beige with outline
            </Card>
          </Box>
        </FlexBox>
      </Background>
      <Background bg="navy">
        <FlexBox row gap={16} p={24} border={1}>
          <Box flexGrow={1}>
            <Card variant="navy" shadow="outline">
              Navy with outline
            </Card>
          </Box>
          <Box flexGrow={1}>
            <Card variant="hyper" shadow="outline">
              Hyper with outline
            </Card>
          </Box>
        </FlexBox>
      </Background>
    </FlexBox>
  ),
};

export const ShadowPatternLeft: Story = {
  render: () => (
    <FlexBox column>
      <FlexBox p={24} border={1}>
        <Box flexGrow={1}>
          <Card shadow="patternLeft">Default with patternLeft</Card>
        </Box>
      </FlexBox>
      <Background bg="white">
        <FlexBox row gap={16} p={24} border={1}>
          <Box flexGrow={1}>
            <Card variant="white" shadow="patternLeft">
              White with patternLeft
            </Card>
          </Box>
          <Box flexGrow={1}>
            <Card variant="yellow" shadow="patternLeft">
              Yellow with patternLeft
            </Card>
          </Box>
          <Box flexGrow={1}>
            <Card variant="beige" shadow="patternLeft">
              Beige with patternLeft
            </Card>
          </Box>
        </FlexBox>
      </Background>
      <Background bg="navy">
        <FlexBox row gap={16} p={24} border={1}>
          <Box flexGrow={1}>
            <Card variant="navy" shadow="patternLeft">
              Navy with patternLeft
            </Card>
          </Box>
          <Box flexGrow={1}>
            <Card variant="hyper" shadow="patternLeft">
              Hyper with patternLeft
            </Card>
          </Box>
        </FlexBox>
      </Background>
    </FlexBox>
  ),
};

export const ShadowPatternRight: Story = {
  render: () => (
    <FlexBox column>
      <FlexBox p={24} border={1}>
        <Box flexGrow={1}>
          <Card shadow="patternRight">Default with patternRight</Card>
        </Box>
      </FlexBox>
      <Background bg="white">
        <FlexBox row gap={16} p={24} border={1}>
          <Box flexGrow={1}>
            <Card variant="white" shadow="patternRight">
              White with patternRight
            </Card>
          </Box>
          <Box flexGrow={1}>
            <Card variant="yellow" shadow="patternRight">
              Yellow with patternRight
            </Card>
          </Box>
          <Box flexGrow={1}>
            <Card variant="beige" shadow="patternRight">
              Beige with patternRight
            </Card>
          </Box>
        </FlexBox>
      </Background>
      <Background bg="navy">
        <FlexBox row gap={16} p={24} border={1}>
          <Box flexGrow={1}>
            <Card variant="navy" shadow="patternRight">
              Navy with patternRight
            </Card>
          </Box>
          <Box flexGrow={1}>
            <Card variant="hyper" shadow="patternRight">
              Hyper with patternRight
            </Card>
          </Box>
        </FlexBox>
      </Background>
    </FlexBox>
  ),
};

export const IsInteractive: Story = {
  render: () => (
    <FlexBox column>
      <FlexBox p={24} border={1}>
        <Box flexGrow={1}>
          <Anchor dimensions={1} href="" variant="interface">
            <Card shadow="patternRight" isInteractive>
              Default, patternRight, and isInteractive
            </Card>
          </Anchor>
        </Box>
      </FlexBox>
      <Background bg="white">
        <FlexBox row gap={16} p={24} border={1}>
          <Box flexGrow={1}>
            <Anchor dimensions={1} href="" variant="interface">
              <Card variant="white" shadow="none" isInteractive>
                White, no shadow, and isInteractive
              </Card>
            </Anchor>
          </Box>
          <Box flexGrow={1}>
            <Anchor dimensions={1} href="" variant="interface">
              <Card variant="yellow" shadow="patternLeft" isInteractive>
                Yellow, patternLeft, and isInteractive
              </Card>
            </Anchor>
          </Box>
          <Box flexGrow={1}>
            <Anchor dimensions={1} href="" variant="interface">
              <Card variant="beige" shadow="outline" isInteractive>
                Beige, outline, and isInteractive
              </Card>
            </Anchor>
          </Box>
        </FlexBox>
      </Background>
      <Background bg="navy">
        <FlexBox row gap={16} p={24} border={1}>
          <Box flexGrow={1}>
            <Anchor dimensions={1} href="" variant="interface">
              <Card variant="navy" shadow="patternLeft" isInteractive>
                Navy, patternLeft, and isInteractive
              </Card>
            </Anchor>
          </Box>
          <Box flexGrow={1}>
            <Anchor dimensions={1} href="" variant="interface">
              <Card variant="hyper" shadow="patternRight" isInteractive>
                Hyper, patternRight, and isInteractive
              </Card>
            </Anchor>
          </Box>
        </FlexBox>
      </Background>
    </FlexBox>
  ),
};

export const Dynamic: Story = {
  render: () => (
    <FlexBox row>
      <Background p={32} bg="white" border={1} flexGrow={1}>
        <Card>Lookie here, a default variant in light mode!</Card>
      </Background>
      <Background p={32} bg="navy" flexGrow={1}>
        <Card>Lookie here, a default variant in dark mode!</Card>
      </Background>
    </FlexBox>
  ),
};

export const BorderRadius: Story = {
  render: () => (
    <FlexBox p={24} border={1} gap={16}>
      <Box flexGrow={1}>
        <Card shadow="outline" variant="yellow" borderRadius="sm" isInteractive>
          Yellow, isInteractive, outline, and borderRadius is &apos;sm&apos;
        </Card>
      </Box>
      <Box flexGrow={1}>
        <Card shadow="patternLeft" variant="beige" borderRadius="xl">
          Beige, patternLeft, and borderRadius is &apos;xl&apos;
        </Card>
      </Box>
    </FlexBox>
  ),
};
