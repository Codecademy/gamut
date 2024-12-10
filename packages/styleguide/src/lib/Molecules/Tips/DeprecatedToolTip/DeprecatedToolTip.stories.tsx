import {
  Box,
  DeprecatedToolTip,
  FillButton,
  FlexBox,
  GridBox,
} from '@codecademy/gamut';
import { InfoCircleIcon } from '@codecademy/gamut-icons';
import type { Meta, StoryObj } from '@storybook/react';
import upperFirst from 'lodash/upperFirst';

const meta: Meta<typeof DeprecatedToolTip> = {
  component: DeprecatedToolTip,
  args: {
    children: `I am helpful text related to this target`,
    target: <InfoCircleIcon size={16} />,
    id: 'my-unique-id',
  },
};

export default meta;
type Story = StoryObj<typeof DeprecatedToolTip>;

interface TipBaseAlignmentProps {
  alignment?:
    | 'bottom-center'
    | 'top-center'
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left';
  target?: React.ReactNode;
  children?: React.ReactNode;
  id?: string;
}

const SmallAligmentExample: React.FC<TipBaseAlignmentProps> = (args) => {
  return (
    <FlexBox py={48} justifyContent="space-around">
      {(['bottom-center', 'top-center'] as const).map((alignment) => {
        return (
          <Box key={alignment}>
            <DeprecatedToolTip
              {...args}
              id={args.id || 'default-id'}
              alignment={alignment}
              target={
                <FillButton>
                  {alignment.split('-').map(upperFirst).join(' ')}
                </FillButton>
              }
            >
              Hi!
            </DeprecatedToolTip>
          </Box>
        );
      })}
    </FlexBox>
  );
};

export const SmallAlignments: Story = {
  render: (args) => <SmallAligmentExample {...args} />,
};

const LargerAlignmentExample: React.FC<TipBaseAlignmentProps> = (args) => {
  return (
    <GridBox gap={24} py={64} ml={8} gridTemplateColumns="1fr 1fr">
      {(['top-right', 'top-left', 'bottom-right', 'bottom-left'] as const).map(
        (alignment) => {
          return (
            <Box key={alignment}>
              <DeprecatedToolTip
                {...args}
                alignment={alignment}
                id={args.id || 'default-id'}
                target={
                  <FillButton>
                    {alignment.split('-').map(upperFirst).join(' ')}
                  </FillButton>
                }
              />
            </Box>
          );
        }
      )}
    </GridBox>
  );
};

export const LargerAlignments: Story = {
  render: (args) => <LargerAlignmentExample {...args} />,
};

const FocusableExample: React.FC<TipBaseAlignmentProps> = (args) => {
  return (
    <Box pt={64} pl={12}>
      <DeprecatedToolTip
        {...args}
        focusable
        id={args.id || 'default-id'}
        target="Information!"
      />
    </Box>
  );
};

export const Focusable: Story = {
  render: (args) => <FocusableExample {...args} />,
};

const PlacementExample: React.FC<TipBaseAlignmentProps> = () => {
  return (
    <FlexBox alignItems="center" justifyContent="space-around" p={4}>
      <DeprecatedToolTip
        id="floating-focusable-id"
        placement="floating"
        target={<FillButton> Hey! </FillButton>}
      >
        I am a floating Tooltip who has a focusable target
      </DeprecatedToolTip>
      <Box>
        Some cool info
        <DeprecatedToolTip
          id="floating-focusable-id"
          focusable
          placement="floating"
          target={<InfoCircleIcon size={20} />}
        >
          I am a floating Tooltip who does not have a focusable target
        </DeprecatedToolTip>
      </Box>
    </FlexBox>
  );
};

export const Placement: Story = {
  render: (args) => <PlacementExample {...args} />,
};
