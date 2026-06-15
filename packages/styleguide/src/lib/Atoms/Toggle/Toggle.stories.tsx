import { Text, Toggle } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect } from 'storybook/test';

const meta: Meta<typeof Toggle> = {
  component: Toggle,
  args: {},
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {},
};

export const Medium: Story = {
  args: {
    size: 'medium',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};

export const LabelLeft: Story = {
  args: {
    label: 'My label is to the left',
    labelSide: 'left',
  },
};

export const LabelRight: Story = {
  args: {
    label: 'My label is to the right',
    labelSide: 'right',
  },
};

export const ReactComponentLabel: Story = {
  args: {
    checked: false,
    label: <Text>I am a Text component</Text>,
    ariaLabel: 'Hello there',
  },
};

export const InputElement: Story = {
  args: {
    label: 'input toggle',
    onChange: () => null,
  },
};

export const ButtonElement: Story = {
  args: {
    as: 'button',
    checked: true,
    label: 'button toggle',
    onChange: undefined,
    onClick: () => null,
  },
};

export const InteractiveInputToggle: Story = {
  // TODO: remove parameters block when we enable interactions globally in preview.ts
  parameters: {
    interactions: {
      disable: false,
    },
  },
  render: function InteractiveInputToggleStory() {
    const [checked, setChecked] = useState(false);
    return (
      <Toggle
        checked={checked}
        label="interactive input toggle"
        onChange={() => setChecked((value) => !value)}
      />
    );
  },
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole('checkbox');
    // initial state assertion
    await expect(toggle).not.toBeChecked();

    // click and assert its new state
    await userEvent.click(toggle);
    await expect(toggle).toBeChecked();

    // restore to initial state
    await userEvent.click(toggle);
    await expect(toggle).not.toBeChecked();
  },
};

export const InteractiveButtonToggle: React.FC = () => {
  const [checked, setChecked] = useState(false);
  const changeHandler = () => {
    setChecked(!checked);
  };

  return (
    <Toggle
      as="button"
      checked={checked}
      label="interactive button toggle"
      onClick={changeHandler}
    />
  );
};
