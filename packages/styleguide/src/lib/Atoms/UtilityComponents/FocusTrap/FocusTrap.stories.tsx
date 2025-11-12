import { Box, FillButton, FocusTrap, GridForm } from '@codecademy/gamut';
import type { Meta } from '@storybook/react';
import { ComponentProps, useEffect, useState } from 'react';

const meta: Meta<typeof FocusTrap> = {
  component: FocusTrap,
  args: {
    active: false,
  },
};

export default meta;

export const Default: React.FC<ComponentProps<typeof FocusTrap>> = (args) => {
  const [trapActive, setActive] = useState(args.active);
  useEffect(() => {
    setActive(args.active);
  }, [args.active]);
  return (
    <>
      <Box>
        <FillButton onClick={() => setActive(true)}>
          Enable Focus Trap
        </FillButton>
        <FocusTrap {...args} active={trapActive}>
          <Box
            border={1}
            borderColor={trapActive ? 'black' : 'gray-200'}
            my={24}
            p={24}
          >
            <GridForm
              fields={[
                {
                  label: 'email',
                  name: 'email-text',
                  size: 12,
                  type: 'text',
                },
                {
                  label: 'password',
                  name: 'password-text',
                  size: 12,
                  type: 'password',
                },
              ]}
              submit={{
                contents: 'Disable Focus Trap',
                position: 'right',
                size: 12,
              }}
              onSubmit={() => {
                setActive(false);
              }}
            />
          </Box>
        </FocusTrap>
      </Box>
    </>
  );
};
