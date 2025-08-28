import { Box, FlexBox, Flyout, StrokeButton } from '@codecademy/gamut';
import type { Meta } from '@storybook/react';
import { ComponentProps, useEffect, useState } from 'react';

const meta: Meta<typeof Flyout> = {
  component: Flyout,
  args: {
    expanded: false,
    closeLabel: 'close flyout',
    title: 'About Baharroth',
  },
};

export default meta;

export const Default: React.FC<ComponentProps<typeof Flyout>> = (args) => {
  const [expanded, setExpanded] = useState(args.expanded);

  useEffect(() => {
    setExpanded(args.expanded);
  }, [args.expanded]);

  return (
    <Box height="20rem">
      <Flyout {...args} expanded={expanded} onClose={() => setExpanded(false)}>
        <Box m={16} textColor="text">
          Baharroth, &quot;the Cry of the Wind,&quot; is the Winged Phoenix, the
          oldest of the Swooping Hawks and the first Exarch of those winged
          Aspect Warriors. Baharroth is the founder of the Eldar Warrior Path
          that is represented today by the Swooping Hawks Aspect Shrines.
          Baharroth is also known for his speed and is said to be the fastest of
          all the Eldar who have ever lived, a formidable claim that would make
          him a deadly opponent indeed. Though he moves with the subtlety and
          grace of a zephyr, he attacks with the force of a hurricane...
        </Box>
      </Flyout>
      <StrokeButton aria-expanded={expanded} onClick={() => setExpanded(true)}>
        Tell me more?!
      </StrokeButton>
      <FlexBox>
        An Avatar of Khaine is the term normally applied to the physical form
        that the spirit of an Eldar God has managed to possess and animate. This
        term is most often applied to the physical body possessed by a fragment
        of the spirit of the Eldar God of War Kaela Mensha Khaine, though the
        term can actually apply to any divine entity of the Warp that has found
        some way to take on a corporeal form within realspace.
      </FlexBox>
    </Box>
  );
};
