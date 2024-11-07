import { AccordionAreaDeprecated,AccordionButtonDeprecated, AccordionDeprecated } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';


const meta: Meta<typeof AccordionDeprecated> = {
  component: AccordionDeprecated,

};

export default meta;
type Story = StoryObj<typeof AccordionDeprecated>;

export const Default: Story = {
  args: {
    top: "Click me!",
    children: 'Hidden treasure!',
  },
};

export const Area: Story = {
  render: () => <AccordionAreaDeprecated expanded top={<AccordionButtonDeprecated expanded>Finer Control</AccordionButtonDeprecated>}>Expanded Details</AccordionAreaDeprecated>,
  name: 'AccordionAreaDeprecatedExample',
};
