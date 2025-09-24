import type { IllustrationProps } from '@codecademy/gamut-illustrations';
import * as illustrations from '@codecademy/gamut-illustrations';
import type { Meta, StoryObj } from '@storybook/react';

import { ImageGallery } from '~styleguide/blocks';

type IllustrationComponentProps = IllustrationProps & {
  illustration: React.ComponentType<IllustrationProps>;
};

const IllustrationComponent: React.FC<IllustrationComponentProps> = ({
  illustration: Illustration,
  ...rest
}) => {
  return <Illustration {...rest} />;
};

const meta: Meta<typeof IllustrationComponent> = {
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
};

export default meta;
type Story = StoryObj<typeof IllustrationComponent>;

export const Default: Story = {
  args: {
    width: 256,
    height: 256,
    illustration: illustrations.NumberBlocks,
  },
};

export const AllIllustrations: Story = {
  render: () => {
    return (
      <ImageGallery
        controls={{
          minColumns: 1,
          columns: 4,
          maxColumns: 5,
          imageSize: 80,
          maxImageSize: 500,
        }}
        imageType="illustration"
        images={illustrations}
      />
    );
  },
};
