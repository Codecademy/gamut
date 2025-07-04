import { ConnectedForm, FlexBox, SubmitButton, Text } from '@codecademy/gamut';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SubmitButton> = {
  component: SubmitButton,
  args: {},
};

export default meta;
type Story = StoryObj<typeof SubmitButton>;

const SubmitButtonStates = () => {
  return (
    <ConnectedForm
      display="flex"
      my={24}
      onSubmit={(values) => {
        action('Form Submitted')(values);
      }}
    >
      <FlexBox alignItems="center" flexDirection="column" p={16}>
        <Text variant="title-xs">default</Text>
        <SubmitButton m={8}>submit the form, please</SubmitButton>
      </FlexBox>
      <FlexBox
        alignItems="center"
        borderLeft={1}
        borderRight={1}
        flexDirection="column"
        p={16}
      >
        <Text variant="title-xs">loading</Text>
        <SubmitButton loading m={8}>
          submit the form, please
        </SubmitButton>
      </FlexBox>
      <FlexBox alignItems="center" flexDirection="column" p={16}>
        <Text variant="title-xs">disabled</Text>
        <SubmitButton disabled m={8}>
          you cannot submit this form
        </SubmitButton>
      </FlexBox>
    </ConnectedForm>
  );
};

export const Default: Story = {
  render: () => <SubmitButtonStates />,
};
