import type { PatternProps } from '@codecademy/gamut-patterns';
import * as patterns from '@codecademy/gamut-patterns';
import type { Meta, StoryObj } from '@storybook/react';

import { ImageGallery } from '~styleguide/blocks';

type PatternComponentProps = PatternProps & {
  pattern: React.ComponentType<PatternProps>;
};

const PatternComponent: React.FC<PatternComponentProps> = ({
  pattern: Pattern,
  ...rest
}) => {
  return <Pattern {...rest} />;
};

const meta: Meta<typeof PatternComponent> = {
  component: PatternComponent,
  argTypes: {
    pattern: {
      options: Object.keys(patterns),
      mapping: patterns,
      control: 'select',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PatternComponent>;

export const Default: Story = {
  args: {
    height: 200,
    pattern: patterns.DotLoose,
  },
};

export const AllPatterns: Story = {
  render: () => {
    return (
      <ImageGallery
        controls={{ imageSize: 50, maxImageSize: 200 }}
        imageType="pattern"
        images={patterns}
      />
    );
  },
};
