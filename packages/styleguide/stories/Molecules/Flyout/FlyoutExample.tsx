import { Box, StrokeButton } from '@codecademy/gamut';
import { Flyout, FlyoutProps } from '@codecademy/gamut-labs';
import React, { useState } from 'react';

export const FlyoutExample: React.FC<FlyoutProps> = (args) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Flyout
        {...args}
        expanded={expanded}
        title="About Baharroth"
        onClose={() => setExpanded(false)}
      >
        <Box bg="background" textColor="text" m={16}>
          Baharroth, &quot;the Cry of the Wind,&quot; is the Winged Phoenix, the
          oldest of the Swooping Hawks and the first Exarch of those winged
          Aspect Warriors. Baharroth is the founder of the Eldar Warrior Path
          that is represented today by the Swooping Hawks Aspect Shrines.
          Baharroth is also known for his speed and is said to be the fastest of
          all the Eldar who have ever lived, a formidable claim that would make
          him a deadly opponent indeed. Though he moves with the subtlety and
          grace of a zephyr, he attacks with the force of a hurricane.
        </Box>
      </Flyout>
      <StrokeButton onClick={() => setExpanded(true)}>
        Tell me more?!
      </StrokeButton>
    </>
  );
};
