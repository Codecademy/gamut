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

const DemoCard = () => {
  return <Card>Test testing tester</Card>;
};

export const DemoPlaceholder: Story = {
  render: () => <DemoCard />,
};

export const StaticLight: Story = {
  render: () => (
    <Background bg="white">
      <FlexBox border={1} gap={16} p={16} row>
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
      <FlexBox border={1} gap={16} p={16} row>
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
      <FlexBox border={1} p={16}>
        <Box flexGrow={1}>
          <Card>Default variant</Card>
        </Box>
      </FlexBox>
      <Background bg="white">
        <FlexBox border={1} gap={16} p={16} row>
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
        <FlexBox border={1} gap={16} p={16} row>
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
      <FlexBox border={1} p={24}>
        <Box flexGrow={1}>
          <Card shadow="outline">Default with outline</Card>
        </Box>
      </FlexBox>
      <Background bg="white">
        <FlexBox border={1} gap={16} p={24} row>
          <Box flexGrow={1}>
            <Card shadow="outline" variant="white">
              White with outline
            </Card>
          </Box>
          <Box flexGrow={1}>
            <Card shadow="outline" variant="yellow">
              Yellow with outline
            </Card>
          </Box>
          <Box flexGrow={1}>
            <Card shadow="outline" variant="beige">
              Beige with outline
            </Card>
          </Box>
        </FlexBox>
      </Background>
      <Background bg="navy">
        <FlexBox border={1} gap={16} p={24} row>
          <Box flexGrow={1}>
            <Card shadow="outline" variant="navy">
              Navy with outline
            </Card>
          </Box>
          <Box flexGrow={1}>
            <Card shadow="outline" variant="hyper">
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
      <FlexBox border={1} p={24}>
        <Box flexGrow={1}>
          <Card shadow="patternLeft">Default with patternLeft</Card>
        </Box>
      </FlexBox>
      <Background bg="white">
        <FlexBox border={1} gap={16} p={24} row>
          <Box flexGrow={1}>
            <Card shadow="patternLeft" variant="white">
              White with patternLeft
            </Card>
          </Box>
          <Box flexGrow={1}>
            <Card shadow="patternLeft" variant="yellow">
              Yellow with patternLeft
            </Card>
          </Box>
          <Box flexGrow={1}>
            <Card shadow="patternLeft" variant="beige">
              Beige with patternLeft
            </Card>
          </Box>
        </FlexBox>
      </Background>
      <Background bg="navy">
        <FlexBox border={1} gap={16} p={24} row>
          <Box flexGrow={1}>
            <Card shadow="patternLeft" variant="navy">
              Navy with patternLeft
            </Card>
          </Box>
          <Box flexGrow={1}>
            <Card shadow="patternLeft" variant="hyper">
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
      <FlexBox border={1} p={24}>
        <Box flexGrow={1}>
          <Card shadow="patternRight">Default with patternRight</Card>
        </Box>
      </FlexBox>
      <Background bg="white">
        <FlexBox border={1} gap={16} p={24} row>
          <Box flexGrow={1}>
            <Card shadow="patternRight" variant="white">
              White with patternRight
            </Card>
          </Box>
          <Box flexGrow={1}>
            <Card shadow="patternRight" variant="yellow">
              Yellow with patternRight
            </Card>
          </Box>
          <Box flexGrow={1}>
            <Card shadow="patternRight" variant="beige">
              Beige with patternRight
            </Card>
          </Box>
        </FlexBox>
      </Background>
      <Background bg="navy">
        <FlexBox border={1} gap={16} p={24} row>
          <Box flexGrow={1}>
            <Card shadow="patternRight" variant="navy">
              Navy with patternRight
            </Card>
          </Box>
          <Box flexGrow={1}>
            <Card shadow="patternRight" variant="hyper">
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
      <FlexBox border={1} p={24}>
        <Box flexGrow={1}>
          <Anchor dimensions={1} href="" variant="interface">
            <Card isInteractive shadow="patternRight">
              Default, patternRight, and isInteractive
            </Card>
          </Anchor>
        </Box>
      </FlexBox>
      <Background bg="white">
        <FlexBox border={1} gap={16} p={24} row>
          <Box flexGrow={1}>
            <Anchor dimensions={1} href="" variant="interface">
              <Card isInteractive shadow="none" variant="white">
                White, no shadow, and isInteractive
              </Card>
            </Anchor>
          </Box>
          <Box flexGrow={1}>
            <Anchor dimensions={1} href="" variant="interface">
              <Card isInteractive shadow="patternLeft" variant="yellow">
                Yellow, patternLeft, and isInteractive
              </Card>
            </Anchor>
          </Box>
          <Box flexGrow={1}>
            <Anchor dimensions={1} href="" variant="interface">
              <Card isInteractive shadow="outline" variant="beige">
                Beige, outline, and isInteractive
              </Card>
            </Anchor>
          </Box>
        </FlexBox>
      </Background>
      <Background bg="navy">
        <FlexBox border={1} gap={16} p={24} row>
          <Box flexGrow={1}>
            <Anchor dimensions={1} href="" variant="interface">
              <Card isInteractive shadow="patternLeft" variant="navy">
                Navy, patternLeft, and isInteractive
              </Card>
            </Anchor>
          </Box>
          <Box flexGrow={1}>
            <Anchor dimensions={1} href="" variant="interface">
              <Card isInteractive shadow="patternRight" variant="hyper">
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
      <Background bg="white" border={1} flexGrow={1} p={32}>
        <Card>Lookie here, a default variant in light mode!</Card>
      </Background>
      <Background bg="navy" flexGrow={1} p={32}>
        <Card>Lookie here, a default variant in dark mode!</Card>
      </Background>
    </FlexBox>
  ),
};

export const BorderRadius: Story = {
  render: () => (
    <FlexBox border={1} gap={16} p={24}>
      <Box flexGrow={1}>
        <Card borderRadius="sm" isInteractive shadow="outline" variant="yellow">
          Yellow, isInteractive, outline, and borderRadius is &apos;sm&apos;
        </Card>
      </Box>
      <Box flexGrow={1}>
        <Card borderRadius="xl" shadow="patternLeft" variant="beige">
          Beige, patternLeft, and borderRadius is &apos;xl&apos;
        </Card>
      </Box>
    </FlexBox>
  ),
};
