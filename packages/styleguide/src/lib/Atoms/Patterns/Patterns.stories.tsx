import type { PatternProps } from '@codecademy/gamut-patterns';
import * as patterns from '@codecademy/gamut-patterns';
import type { Meta, StoryObj } from '@storybook/react';

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
      control: {
        type: 'select',
      },
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
