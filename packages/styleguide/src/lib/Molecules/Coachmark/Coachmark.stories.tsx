import { Coachmark, FillButton, FlexBox, Text } from '@codecademy/gamut';
import { CheckerDense } from '@codecademy/gamut-patterns';
import type { Meta } from '@storybook/react';
import { ComponentProps, useEffect, useState } from 'react';

const meta: Meta<typeof Coachmark> = {
  component: Coachmark,
  args: {},
  argTypes: {
    skipFocusTrap: {
      control: 'boolean',
    },
  },
};

export default meta;

export const Default: React.FC<ComponentProps<typeof Coachmark>> = (args) => {
  const [shouldShow, setShouldShow] = useState(args.shouldShow);

  useEffect(() => {
    setShouldShow(args.shouldShow);
  }, [args.shouldShow]);

  return (
    <Coachmark
      {...args}
      renderPopover={() => (
        <FlexBox alignItems="flex-start" flexDirection="column" p={16}>
          <Text mb={8}>You should click the button.</Text>
          <FillButton
            size="small"
            onClick={() => {
              setShouldShow(false);
            }}
          >
            Got it
          </FillButton>
        </FlexBox>
      )}
      shouldShow={shouldShow}
    >
      <FillButton onClick={() => setShouldShow(true)}>A Button</FillButton>
    </Coachmark>
  );
};

export const Delay: React.FC<ComponentProps<typeof Coachmark>> = (args) => {
  const [shouldShow, setShouldShow] = useState(args.shouldShow);

  useEffect(() => {
    setShouldShow(args.shouldShow);
  }, [args.shouldShow]);

  return (
    <Coachmark
      delay={3000}
      {...args}
      renderPopover={() => (
        <FlexBox alignItems="flex-start" flexDirection="column" p={16}>
          <Text mb={8}>You should click the button.</Text>
          <FillButton
            size="small"
            onClick={() => {
              setShouldShow(false);
            }}
          >
            Got it
          </FillButton>
        </FlexBox>
      )}
      shouldShow={shouldShow}
    >
      <FillButton onClick={() => setShouldShow(true)}>A Button</FillButton>
    </Coachmark>
  );
};

export const Customized: React.FC<ComponentProps<typeof Coachmark>> = (
  args
) => {
  const [shouldShow, setShouldShow] = useState(args.shouldShow);

  useEffect(() => {
    setShouldShow(args.shouldShow);
  }, [args.shouldShow]);

  return (
    <Coachmark
      popoverProps={{
        beak: 'left',
        outline: true,
        pattern: CheckerDense,
        position: 'above',
      }}
      {...args}
      renderPopover={() => (
        <FlexBox alignItems="flex-start" flexDirection="column" p={16}>
          <Text mb={8}>You should click the button.</Text>
          <FillButton
            size="small"
            onClick={() => {
              setShouldShow(false);
            }}
          >
            Got it
          </FillButton>
        </FlexBox>
      )}
      shouldShow={shouldShow}
    >
      <FillButton onClick={() => setShouldShow(true)}>A Button</FillButton>
    </Coachmark>
  );
};
