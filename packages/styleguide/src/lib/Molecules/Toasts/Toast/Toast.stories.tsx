import { Anchor, Toast } from '@codecademy/gamut';
import * as icons from '@codecademy/gamut-icons';
import { Target } from '@codecademy/gamut-illustrations';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Toast> = {
  component: Toast,
  args: {},
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {
    icon: 'https://static-assets.codecademy.com/assets/achievements/weekly-streak-4.svg',
    title: 'I have a toast!',
    children: "Here's to us :)",
  },
};

export const Icons: Story = {
  args: {
    icon: <Target width="100%" />,
    children: `Inline has hasn't been this cool since the disney channel original movie
    Brink!`,
  },
};

export const ContentIcon: Story = {
  args: {
    title: (
      <>
        <icons.TrophyIcon mr={4} verticalAlign="middle" /> Congrats you won!
      </>
    ),
    onClose: () => {},
    children:
      'Some message that informs you where to claim your physical trophy.',
  },
};

export const ContentLink: Story = {
  args: {
    children: (
      <>
        Feedback fruit loops. <Anchor>Go go go!</Anchor>
      </>
    ),
    onClose: () => {},
  },
};
