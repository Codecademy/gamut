import { FillButton, FlexBox, Overlay, Text } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof Overlay> = {
  component: Overlay,
  args: { shroud: true },
};

export default meta;
type Story = StoryObj<typeof Overlay>;

const DefaultExample = (args: React.ComponentProps<typeof Overlay>) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <FillButton onClick={() => setOpen(true)}>Open Overlay</FillButton>
      <FlexBox>
        <Overlay
          {...args}
          clickOutsideCloses
          isOpen={open}
          onRequestClose={() => setOpen(false)}
        >
          <FlexBox>
            <Text variant="title-lg">Hooray!</Text>
            <FillButton onClick={() => setOpen(false)}>
              Close Overlay
            </FillButton>
          </FlexBox>
        </Overlay>
      </FlexBox>
    </>
  );
};

export const Default: Story = {
  render: (args) => <DefaultExample {...args} />,
};
