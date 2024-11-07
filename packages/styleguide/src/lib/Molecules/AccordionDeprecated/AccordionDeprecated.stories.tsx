import { AccordionAreaDeprecated,AccordionButtonDeprecated, AccordionDeprecated } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';


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

// export const AccordionAreaDeprecatedExample: Story = {
//   render: () => <AccordionAreaDeprecated expanded top={<AccordionButtonDeprecated expanded>Finer Control</AccordionButtonDeprecated>}>Expanded Details</AccordionAreaDeprecated>,
//   name: 'AccordionAreaDeprecatedExample',
// };


export const AccordionAreaDeprecatedExample: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <AccordionAreaDeprecated expanded={expanded} top={<AccordionButtonDeprecated expanded={expanded} onClick={() => setExpanded(!expanded)}>Finer control!</AccordionButtonDeprecated>}>
      Expanded Details
    </AccordionAreaDeprecated>
  );
}

export const AccordionAreaDeprecatedClickable: Story= {
  render: () => <AccordionAreaDeprecatedExample />,
}
