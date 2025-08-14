import { Anchor, Box, GridBox, Text, Toast } from '@codecademy/gamut';
import * as icons from '@codecademy/gamut-icons';
import { Target } from '@codecademy/gamut-illustrations';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Toast> = {
  component: Toast,
  args: {},
  argTypes: {
    icon: {
      control: {
        type: 'select',
      },
      options: Object.keys(icons),
      mapping: icons,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Icons: Story = {
  args: {
    icon: <Target width="100%" />,
    children: `Inline has hasn't been this cool since the disney channel original movie
    Brink!`,
  },
};

const ContentExample = () => {
  return (
    <GridBox gap={32} gridTemplateColumns="max-content max-content" py={24}>
      <Box>
        <Toast
          title={
            <>
              <icons.TrophyIcon mr={4} verticalAlign="middle" /> Congrats you
              won!
            </>
          }
          onClose={() => {}}
        >
          Some message that informs you where to claim your physical trophy.
        </Toast>
      </Box>
      <Box>
        <Toast onClose={() => {}}>
          Feedback fruit loops. <Anchor>Go go go!</Anchor>
        </Toast>
      </Box>
    </GridBox>
  );
};

export const Content: Story = {
  render: () => <ContentExample />,
};

const exampleToasts = [
  {
    icon: 'https://static-assets.codecademy.com/assets/achievements/weekly-streak-4.svg',
    title: 'I have a toast!',
    children: "Here's to us :)",
  },
  {
    icon: 'https://static-assets.codecademy.com/assets/achievements/weekly-streak-2.svg',
    children:
      'This message can be longer than most as we do not have to worry about a title taking all the space.',
  },
  { title: 'I have a toast!', children: "Here's to us :)" },
  {
    children:
      'This message can be longer than most as we do not have to worry about a title or icon taking all the space.',
  },
];

const DefaultExample = () => {
  return (
    <GridBox gap={32} gridTemplateColumns="max-content max-content" py={24}>
      {exampleToasts.map((toast) => (
        <Box>
          <Text mb={16} variant="title-xs">
            {Object.keys(toast).join(' + ')}
          </Text>
          <Box>
            <Toast key={`toast-${toast.title}`} onClose={() => {}} {...toast} />
          </Box>
        </Box>
      ))}
    </GridBox>
  );
};

export const Default: Story = {
  render: () => <DefaultExample />,
};
