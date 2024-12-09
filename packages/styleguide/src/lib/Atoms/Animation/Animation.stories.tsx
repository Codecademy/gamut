import { Rotation, StrokeButton } from '@codecademy/gamut';
import { MiniChevronDownIcon } from '@codecademy/gamut-icons';
import type { Meta } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof Rotation> = {
  component: Rotation,
  args: {},
};

export default meta;

export const Default: React.FC = () => {
  const [isRotated, setRotated] = useState(false);

  return (
    <StrokeButton onClick={() => setRotated(!isRotated)}>
      <Rotation rotated={isRotated}>
        <MiniChevronDownIcon />
      </Rotation>
    </StrokeButton>
  );
};
