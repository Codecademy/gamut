import { GamutIconProps } from '@codecademy/gamut-icons';
// eslint-disable-next-line gamut/import-paths
import * as icons from '@codecademy/gamut-icons/src/icons/regular';
import type { Meta, StoryObj } from '@storybook/react';

import { ImageGallery } from '~styleguide/blocks';

import { LE_ICONS, SKILLS_ICONS, UI_ICONS, VENDOR_ICONS } from '../constants';

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

export const RegularInterfaceIcons: Story = {
  render: () => {
    const icons = Object.entries(UI_ICONS).map(([name, Icon]) => ({
      name,
      image: Icon,
    }));

    return <ImageGallery images={icons} />;
  },
};

export const RegularLearningEnvironmentIcons: Story = {
  render: () => {
    const icons = Object.entries(LE_ICONS).map(([name, Icon]) => ({
      name,
      image: Icon,
    }));

    return <ImageGallery images={icons} />;
  },
};

export const RegularVendorIcons: Story = {
  render: () => {
    const icons = Object.entries(VENDOR_ICONS).map(([name, Icon]) => ({
      name,
      image: Icon,
    }));

    return <ImageGallery images={icons} />;
  },
};

export const RegularSkillIcons: Story = {
  render: () => {
    const icons = Object.entries(SKILLS_ICONS).map(([name, Icon]) => ({
      name,
      image: Icon,
    }));

    return <ImageGallery images={icons} />;
  },
};
