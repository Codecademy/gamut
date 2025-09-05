import { Rotation, StrokeButton } from '@codecademy/gamut';
import { MiniChevronDownIcon } from '@codecademy/gamut-icons';
import type { Meta } from '@storybook/react';
import { ComponentProps, useEffect, useState } from 'react';

const meta: Meta<typeof Rotation> = {
  component: Rotation,
  args: {},
};

export default meta;

export const Default: React.FC<ComponentProps<typeof Rotation>> = (args) => {
  const [isRotated, setRotated] = useState(args.rotated);

  useEffect(() => {
    setRotated(args.rotated);
  }, [args.rotated]);

  return (
    <StrokeButton onClick={() => setRotated(!isRotated)}>
      <Rotation {...args} rotated={isRotated}>
        <MiniChevronDownIcon />
      </Rotation>
    </StrokeButton>
  );
};
