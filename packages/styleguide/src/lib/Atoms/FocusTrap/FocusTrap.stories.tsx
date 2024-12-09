import { Box, FillButton, FocusTrap, GridForm } from '@codecademy/gamut';
import type { Meta } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof FocusTrap> = {
  component: FocusTrap,
  args: {},
};

export default meta;

export const Default: React.FC = () => {
  const [trapActive, setActive] = useState(false);
  return (
    <>
      <Box>
        <FillButton onClick={() => setActive(true)}>
          Enable Focus Trap
        </FillButton>
        <FocusTrap active={trapActive}>
          <Box
            p={24}
            my={24}
            border={1}
            borderColor={trapActive ? 'black' : 'gray-200'}
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
              onSubmit={() => {
                setActive(false);
              }}
              submit={{
                contents: 'Disable Focus Trap',
                position: 'right',
                size: 12,
              }}
            />
          </Box>
        </FocusTrap>
      </Box>
    </>
  );
};
