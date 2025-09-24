import { GamutIconProps } from '@codecademy/gamut-icons';
// eslint-disable-next-line gamut/import-paths
import * as miniIcons from '@codecademy/gamut-icons/src/icons/mini';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { ImageGallery } from '~styleguide/blocks';

type MiniIconProps = GamutIconProps & {
  icon: typeof miniIcons.MiniStarIcon;
};

const MiniIconComponent: React.FC<MiniIconProps> = ({
  icon: Icon,
  ...rest
}) => {
  return <Icon {...rest} />;
};

const meta: Meta<typeof MiniIconComponent> = {
  component: MiniIconComponent,
  argTypes: {
    icon: {
      options: Object.keys(miniIcons),
      mapping: miniIcons,
      control: {
        type: 'select',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MiniIconComponent>;

export const Default: Story = {
  args: {
    size: 16,
    icon: miniIcons.MiniStarIcon,
  },
};

export const AllMiniIcons: Story = {
  render: () => {
    return <ImageGallery imageType="icon" images={miniIcons} />;
  },
};
