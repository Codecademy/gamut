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
    return <ImageGallery imageType="icon" images={UI_ICONS} />;
  },
};

export const RegularLearningEnvironmentIcons: Story = {
  render: () => {
    return <ImageGallery imageType="icon" images={LE_ICONS} />;
  },
};

export const RegularVendorIcons: Story = {
  render: () => {
    return <ImageGallery imageType="icon" images={VENDOR_ICONS} />;
  },
};

export const RegularSkillIcons: Story = {
  render: () => {
    return <ImageGallery imageType="icon" images={SKILLS_ICONS} />;
  },
};
