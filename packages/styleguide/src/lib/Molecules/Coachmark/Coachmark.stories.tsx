import { Box, Coachmark, FillButton, FlexBox, Text } from '@codecademy/gamut';
import * as patterns from '@codecademy/gamut-patterns';
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps, useEffect, useState } from 'react';
import type { TypeWithDeepControls } from 'storybook-addon-deep-controls';

const meta: TypeWithDeepControls<Meta<typeof Coachmark>> = {
  component: Coachmark,
  args: {
    popoverProps: {
      beak: undefined,
      position: 'below',
    },
  },
  argTypes: {
    skipFocusTrap: {
      control: 'boolean',
    },
    'popoverProps.beak': {
      control: 'radio',
      options: ['left', 'right', 'center'],
      table: {
        type: {
          summary: 'left | right | center',
        },
      },
      description:
        'Which side to position the beak. If not provided, beak will not be rendered. Position `center` Popovers can only be used with `center` beaks.',
    },
    'popoverProps.outline': {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
      },
      description: 'Whether to add outline style.',
    },
    'popoverProps.pattern': {
      control: 'select',
      options: Object.keys(patterns),
      mapping: patterns,
      description: 'Pattern component to use as a background.',
    },
    'popoverProps.position': {
      control: 'radio',
      options: ['above', 'below'],
      table: {
        type: {
          summary: 'above | below',
        },
      },
      description:
        'Which horizontal edge of the source component to align against.',
    },
    'popoverProps.align': {
      control: 'radio',
      options: ['left', 'right', 'center'],
      table: {
        type: {
          summary: 'left | right | center',
        },
      },
      description:
        'Which vertical edge of the source component to align against.',
    },
    'popoverProps.verticalOffset': {
      control: 'number',
      table: {
        type: {
          summary: 'number',
        },
      },
      description:
        'Number of pixels to offset the popover vertically from the source component.',
    },
    'popoverProps.horizontalOffset': {
      control: 'number',
      table: {
        type: {
          summary: 'number',
        },
      },
      description:
        'Number of pixels to offset the popover horizontally from the source component.',
    },
    'popoverProps.widthRestricted': {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
      },
      description: 'Whether to add width restrictions to Popover.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Coachmark>;

export const Default: React.FC<ComponentProps<typeof Coachmark>> = (args) => {
  const [shouldShow, setShouldShow] = useState(args.shouldShow);

  useEffect(() => {
    setShouldShow(args.shouldShow);
  }, [args.shouldShow]);

  return (
    <FlexBox width="min-content">
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
    </FlexBox>
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

export const Customized: Story = {
  args: {
    popoverProps: {
      beak: 'left',
      outline: true,
      pattern: patterns.CheckerDense,
      position: 'above',
    },
  },
  render: function Customized(args) {
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
  },
};

export const ZIndex: Story = {
  args: {
    popoverProps: {
      position: 'below',
      zIndex: 5,
    },
  },
  render: function ZIndexExample(args) {
    const [shouldShow, setShouldShow] = useState(true);

    return (
      <FlexBox flexDirection="column" gap={16}>
        <Box bg="paleBlue" p={16} zIndex={3} position="relative">
          Element with z-index: 3
        </Box>
        <Coachmark
          {...args}
          renderPopover={() => (
            <FlexBox alignItems="flex-start" flexDirection="column" p={16}>
              <Text mb={8}>This coachmark has z-index: 5 via popoverProps</Text>
              <FillButton size="small" onClick={() => setShouldShow(false)}>
                Got it
              </FillButton>
            </FlexBox>
          )}
          shouldShow={shouldShow}
        >
          <FillButton onClick={() => setShouldShow(true)}>
            Show Coachmark
          </FillButton>
        </Coachmark>
      </FlexBox>
    );
  },
};
