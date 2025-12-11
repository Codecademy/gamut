import {
  Box,
  FlexBox,
  FormGroup,
  Radio,
  RadioGroup,
  Text,
} from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';
import { ChangeEvent, useState } from 'react';

const meta: Meta<typeof Box> = {
  title: 'Foundations/System/Props/Space',
  component: Box,
};

export default meta;
type Story = StoryObj<typeof Box>;

export const MarginBlock: Story = {
  render: () => (
    <Box bg="background-selected" p={16}>
      <Box bg="primary" color="white" mbl={32} textAlign="center">
        This box has <code>mbl={32}</code> (marginBlock), which applies margin
        to both block start and block end. In LTR, this is equivalent to
        margin-top and margin-bottom.
      </Box>
      <Box border={1} width={1} />
      <Box bg="secondary" color="white" my={32} textAlign="center">
        This box uses <code>my={32}</code> for comparison. Notice how the
        logical property <code>mbl</code> provides the same visual result but is
        RTL-aware.
      </Box>
    </Box>
  ),
};

export const MarginInline: Story = {
  render: () => (
    <Box bg="background-selected" p={16}>
      <Box display="flex" gap={16}>
        <Box bg="primary" color="white" mi={32} textAlign="center">
          This box has <code>mi={32}</code> (marginInline), which applies margin
          to both inline start and inline end. In LTR, this is equivalent to
          margin-left and margin-right.
        </Box>
        <Box bg="secondary" color="white" mx={32} textAlign="center">
          This box uses <code>mx={32}</code> for comparison. Notice how the
          logical property <code>mi</code> provides the same visual result but
          is RTL-aware.
        </Box>
      </Box>
    </Box>
  ),
};

export const RTLComparison: Story = {
  render: () => {
    const Component = () => {
      const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');
      const [writingMode, setWritingMode] = useState<
        'horizontal-tb' | 'vertical-rl' | 'vertical-lr'
      >('horizontal-tb');

      return (
        <Box p={16}>
          {/* Controls */}
          <FlexBox gap={32} mb={24}>
            <Box flex={1}>
              <FormGroup htmlFor="direction" label="Text Direction">
                <RadioGroup
                  htmlForPrefix="direction"
                  name="direction"
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setDirection(event.target.value as 'ltr' | 'rtl');
                  }}
                >
                  <Radio
                    checked={direction === 'ltr'}
                    htmlFor="direction"
                    label="LTR"
                    name="direction"
                    value="ltr"
                  />
                  <Radio
                    checked={direction === 'rtl'}
                    htmlFor="direction"
                    label="RTL"
                    name="direction"
                    value="rtl"
                  />
                </RadioGroup>
              </FormGroup>
            </Box>
            <Box flex={1}>
              <FormGroup htmlFor="writing-mode" label="Writing Mode">
                <RadioGroup
                  htmlForPrefix="writing-mode"
                  name="writing-mode"
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setWritingMode(
                      event.target.value as
                        | 'horizontal-tb'
                        | 'vertical-rl'
                        | 'vertical-lr'
                    );
                  }}
                >
                  <Radio
                    checked={writingMode === 'horizontal-tb'}
                    htmlFor="writing-mode"
                    label="Horizontal"
                    name="writing-mode"
                    value="horizontal-tb"
                  />
                  <Radio
                    checked={writingMode === 'vertical-rl'}
                    htmlFor="writing-mode"
                    label="Vertical RL"
                    name="writing-mode"
                    value="vertical-rl"
                  />
                  <Radio
                    checked={writingMode === 'vertical-lr'}
                    htmlFor="writing-mode"
                    label="Vertical LR"
                    name="writing-mode"
                    value="vertical-lr"
                  />
                </RadioGroup>
              </FormGroup>
            </Box>
          </FlexBox>

          {/* Demo Container */}
          <Box>
            <Text as="h3" fontSize={18} fontWeight="bold" mb={16}>
              {direction === 'ltr' ? 'LTR' : 'RTL'} ({writingMode})
            </Text>
            <Box bg="background-selected" border={1}>
              <FlexBox>
                <Box
                  bg="yellow"
                  dir={direction}
                  flex={1}
                  style={{ writingMode }}
                >
                  <Box
                    bg="primary"
                    borderRadius="sm"
                    color="white"
                    mis={48}
                    style={{ blockSize: '100%' }}
                    textAlign="center"
                  >
                    <Text as="strong" display="block" fontSize={16} mb={8}>
                      marginInlineStart={48}
                    </Text>
                    <Text fontSize={14}>Logical property</Text>
                    <br />
                    <Text fontSize={14} mt={4}>
                      Margin on start (adapts to direction & writing mode)
                    </Text>
                  </Box>
                </Box>
                <Box border={1} borderColor="danger" borderWidth={2}/>
                <Box
                  bg="yellow"
                  dir={direction}
                  flex={1}
                  style={{ writingMode }}
                >
                  <Box
                    bg="secondary"
                    borderRadius="sm"
                    color="white"
                    ml={48}
                    style={{ blockSize: '100%' }}
                    textAlign="center"
                  >
                    <Text as="strong" display="block" fontSize={16} mb={8}>
                      marginLeft={48}
                    </Text>
                    <Text fontSize={14}>Physical property</Text>
                    <br />
                    <Text fontSize={14} mt={4}>
                      Margin on left (always fixed)
                    </Text>
                  </Box>
                </Box>
              </FlexBox>
            </Box>
          </Box>
          <Text color="text-disabled" fontSize={14} textAlign="center">
            <Text as="strong" color="primary">
              Notice:
            </Text>{' '}
            <code>marginInlineStart</code> adapts to direction and writing mode,{' '}
            <code>marginLeft</code> stays fixed
          </Text>
        </Box>
      );
    };
    return <Component />;
  },
};
