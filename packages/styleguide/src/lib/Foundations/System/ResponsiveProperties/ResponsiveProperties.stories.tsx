import { Box, FlexBox } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof FlexBox> = {
  title: 'Foundations/System/Responsive properties',
  component: FlexBox,
  args: {
    center: true,
    height: '500px',
    width: 1,
  },
};

export default meta;
type Story = StoryObj<typeof Box>;

export const MediaQueries: Story = {
  render: (args) => (
    <FlexBox {...args}>
      <Box
        bg={{ _: 'paleBlue', md: 'orange' }}
        border={1}
        borderRadius="sm"
        p={16}
      >
        My background color will change at the medium media-query breakpoint.
      </Box>
    </FlexBox>
  ),
};

export const ContainerQueries: Story = {
  render: (args) => (
    <FlexBox containerType="inline-size" {...args}>
      <Box
        bg={{ _: 'paleBlue', c_md: 'orange' }}
        border={1}
        borderRadius="sm"
        p={16}
      >
        My background color will change at the medium container-query
        breakpoint.
      </Box>
    </FlexBox>
  ),
};

export const CombinedQueries: Story = {
  render: (args) => (
    <FlexBox containerType="inline-size" {...args}>
      <Box
        bg={{
          _: 'beige',
          md: 'background-disabled',
          c_lg: 'primary-inverse',
        }}
        border={1}
        borderRadius="sm"
        p={16}
      >
        My background color will change at the medium media-query breakpoint and
        at the large container-query breakpoint.
      </Box>
    </FlexBox>
  ),
};
