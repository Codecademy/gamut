import * as illustrations from '@codecademy/gamut-illustrations';
import type { Meta, StoryObj } from '@storybook/react';

type IllustrationComponentProps = illustrations.IllustrationProps & {
  illustration: keyof typeof illustrations;
};
const IllustrationComponent: React.FC<IllustrationComponentProps> = ({
  illustration: Illustration,
  ...rest
}) => {
  return <Illustration {...rest} />;
};

const meta: Meta<IllustrationComponentProps> = {
  component: IllustrationComponent,
  argTypes: {
    illustration: {
      options: Object.keys(illustrations),
      mapping: illustrations,
      control: {
        type: 'select',
      },
    },
  },
  args: {
    illustration: 'NumberBlocks',
  },
};

export default meta;
type Story = StoryObj<typeof IllustrationComponent>;

export const Default: Story = {
  args: {
    width: 256,
  },
};
