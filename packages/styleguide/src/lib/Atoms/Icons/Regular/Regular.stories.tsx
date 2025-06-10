import { GamutIconProps } from '@codecademy/gamut-icons';
// eslint-disable-next-line gamut/import-paths
import * as icons from '@codecademy/gamut-icons/src/icons/regular';
import type { Meta, StoryObj } from '@storybook/react';

type IconProps = GamutIconProps & {
  icon: typeof icons.AlertIcon;
};

const IconComponent: React.FC<IconProps> = ({ icon: Icon, ...rest }) => {
  return <Icon {...rest} />;
};

const meta: Meta<typeof IconComponent> = {
  component: IconComponent,
  argTypes: {
    icon: {
      options: Object.keys(icons),
      mapping: icons,
      control: {
        type: 'select',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconComponent>;

export const Default: Story = {
  args: {
    size: 40,
    icon: icons.AlertIcon,
  },
};
