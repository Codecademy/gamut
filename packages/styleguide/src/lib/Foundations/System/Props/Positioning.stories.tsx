import { Box, FlexBox, Markdown, Text } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Box> = {
  title: 'Foundations/System/Props/Positioning',
  component: Box,
};

export default meta;
type Story = StoryObj<typeof Box>;

export const PositionExample: Story = {
  render: () => (
    <Box bg="background-selected" height="250px" position="relative">
      <Box
        bg="primary"
        color="background-contrast"
        left={16}
        p={16}
        position="absolute"
        top={16}
      >
        This box has{' '}
        <Markdown text="`position='absolute'`, `top={16}`, and `left={16}`." />{' '}
        Inspect the example to see what CSS properties are rendered. You can
        also change the value of{' '}
        <Markdown text="`useLogicalProperties` and `direction`" /> in the
        toolbar to see how the box renders differently.
      </Box>
    </Box>
  ),
};

/**
 * Both panels contain an identical child at `zIndex="modal"` (500), and the same
 * bar at `zIndex="foreground"` (100) crosses both. The only difference is
 * `isolation` on the right-hand panel.
 */
export const IsolationExample: Story = {
  render: () => (
    <Box position="relative">
      <FlexBox gap={24}>
        <Box
          bg="background-selected"
          height="220px"
          position="relative"
          width="50%"
        >
          <Box p={16}>
            <Text fontWeight="bold">Without isolation</Text>
            <Text variant="p-small">
              <Markdown
                inline
                text="`position='relative'` only — no stacking context"
              />
            </Text>
          </Box>
          <Box
            bg="primary"
            bottom={16}
            color="background-contrast"
            left={16}
            p={12}
            position="absolute"
            right={16}
            zIndex="modal"
          >
            <Text variant="p-small">
              <Markdown
                inline
                text="child `zIndex='modal'` escapes above the bar"
              />
            </Text>
          </Box>
        </Box>

        <Box
          bg="background-selected"
          height="220px"
          isolation="isolate"
          position="relative"
          width="50%"
        >
          <Box p={16}>
            <Text fontWeight="bold">With isolation</Text>
            <Text variant="p-small">
              <Markdown
                inline
                text="`isolation='isolate'` creates a stacking context"
              />
            </Text>
          </Box>
          <Box
            bg="primary"
            bottom={16}
            color="background-contrast"
            left={16}
            p={12}
            position="absolute"
            right={16}
            zIndex="modal"
          >
            <Text variant="p-small">
              <Markdown
                inline
                text="child `zIndex='modal'` is scoped — the bar covers it"
              />
            </Text>
          </Box>
        </Box>
      </FlexBox>

      <Box
        bg="feedback-warning"
        left={0}
        position="absolute"
        px={16}
        py={12}
        right={0}
        top="150px"
        zIndex="foreground"
      >
        <Text variant="p-small">
          <Markdown inline text="sibling bar — `zIndex='foreground'` (100)" />
        </Text>
      </Box>
    </Box>
  ),
};
