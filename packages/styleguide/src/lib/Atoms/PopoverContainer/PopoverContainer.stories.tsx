import { FlexBox, PopoverContainer, Text } from '@codecademy/gamut';
import { Background } from '@codecademy/gamut-styles';
import type { Meta } from '@storybook/react';
import { ComponentProps, useRef } from 'react';

const meta: Meta<typeof PopoverContainer> = {
  component: PopoverContainer,
  args: {
    alignment: 'top-left',
    isOpen: true,
    inline: true,
    x: 0,
    y: 0,
    offset: 20,
  },
  argTypes: {
    targetRef: {
      control: {
        disable: true,
      },
    },
  },
};

export default meta;

const SINGLE_DIRECTIONS = ['top', 'bottom', 'left', 'right'] as const;

const MULTI_DIRECTIONS = [
  'top-left',
  'top-right',
  'bottom-right',
  'bottom-left',
] as const;

export const Default: React.FC<ComponentProps<typeof PopoverContainer>> = (
  args
) => {
  const target = useRef<HTMLDivElement>(null);

  return (
    <FlexBox minHeight="480px" width={1} position="relative">
      <FlexBox center flex={1}>
        <PopoverContainer {...args} isOpen inline targetRef={target}>
          <Background
            display="flex"
            bg="navy"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            dimensions="100px"
          >
            Pop Tart
          </Background>
        </PopoverContainer>
        <FlexBox
          justifyContent="center"
          alignItems="center"
          dimensions="200px"
          border={1}
          ref={target}
        >
          This balanced breakfast
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export const Alignment: React.FC<ComponentProps<typeof PopoverContainer>> = (
  args
) => {
  const target = useRef<HTMLDivElement>(null);

  return (
    <FlexBox minHeight="480px" width={1} position="relative">
      <FlexBox center flex={1}>
        {[...SINGLE_DIRECTIONS, ...MULTI_DIRECTIONS].map((alignment) => {
          return (
            <PopoverContainer
              {...args}
              key={alignment}
              isOpen
              inline
              targetRef={target}
              alignment={alignment}
              offset={20}
            >
              <Background
                display="flex"
                bg="navy"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                dimensions="100px"
              >
                {alignment.split('-').map((val) => (
                  <Text as="p" variant="p-small">
                    {val}
                  </Text>
                ))}
              </Background>
            </PopoverContainer>
          );
        })}
        <FlexBox
          justifyContent="center"
          alignItems="center"
          dimensions="200px"
          border={1}
          ref={target}
        >
          Transform Axis
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export const InvertAxis: React.FC<ComponentProps<typeof PopoverContainer>> = (
  args
) => {
  const target = useRef<HTMLDivElement>(null);

  return (
    <FlexBox minHeight="480px" width={1} position="relative">
      <FlexBox center flex={1}>
        {(['x', 'y'] as const).map((axis) => {
          return MULTI_DIRECTIONS.map((alignment) => {
            return (
              <PopoverContainer
                {...args}
                key={`${alignment}-${axis}`}
                isOpen
                invertAxis={axis}
                targetRef={target}
                alignment={alignment}
                inline
                offset={20}
              >
                <Background
                  display="flex"
                  bg="navy"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                  dimensions="100px"
                >
                  <Text as="p" variant="p-small">
                    {alignment}
                  </Text>
                  <Text as="p" variant="p-small">
                    {axis} - axis
                  </Text>
                </Background>
              </PopoverContainer>
            );
          });
        })}

        <FlexBox
          justifyContent="center"
          alignItems="center"
          dimensions="200px"
          border={1}
          ref={target}
        >
          Transform Axis
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export const Offset: React.FC<ComponentProps<typeof PopoverContainer>> = ({
  offset,
}) => {
  const target = useRef<HTMLDivElement>(null);

  return (
    <FlexBox minHeight="480px" width={1} position="relative">
      <FlexBox center flex={1}>
        {[...SINGLE_DIRECTIONS, ...MULTI_DIRECTIONS].map((alignment) => {
          return (
            <PopoverContainer
              key={`${alignment}-${offset}`}
              isOpen
              targetRef={target}
              alignment={alignment}
              inline
              offset={offset}
            >
              <Background
                display="flex"
                bg="navy"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                dimensions="100px"
              >
                <Text as="p" variant="p-small">
                  {alignment}
                </Text>
                <Text as="p" variant="p-small">
                  {offset}px
                </Text>
              </Background>
            </PopoverContainer>
          );
        })}

        <FlexBox
          justifyContent="center"
          alignItems="center"
          dimensions="200px"
          border={1}
          ref={target}
        >
          Transform Axis
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export const XandY: React.FC<ComponentProps<typeof PopoverContainer>> = ({
  x,
  y,
}) => {
  const target = useRef<HTMLDivElement>(null);

  return (
    <FlexBox minHeight="480px" width={1} position="relative">
      <FlexBox center flex={1}>
        {[...SINGLE_DIRECTIONS, ...MULTI_DIRECTIONS].map((alignment) => {
          return (
            <PopoverContainer
              key={`${alignment}-${x}-${y}`}
              isOpen
              targetRef={target}
              alignment={alignment}
              inline
              x={x}
              y={y}
            >
              <Background
                display="flex"
                bg="navy"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                dimensions="100px"
              >
                <Text as="p" variant="p-small">
                  {alignment}
                </Text>
                <Text as="p" variant="p-small">
                  {x}px / {y}px
                </Text>
              </Background>
            </PopoverContainer>
          );
        })}

        <FlexBox
          justifyContent="center"
          alignItems="center"
          dimensions="200px"
          border={1}
          ref={target}
        >
          Transform Axis
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};
