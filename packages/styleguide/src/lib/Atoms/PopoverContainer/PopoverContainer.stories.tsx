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
    <FlexBox minHeight="480px" position="relative" width={1}>
      <FlexBox center flex={1}>
        <PopoverContainer {...args} inline isOpen targetRef={target}>
          <Background
            alignItems="center"
            bg="navy"
            dimensions="100px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            Pop Tart
          </Background>
        </PopoverContainer>
        <FlexBox
          alignItems="center"
          border={1}
          dimensions="200px"
          justifyContent="center"
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
    <FlexBox minHeight="480px" position="relative" width={1}>
      <FlexBox center flex={1}>
        {[...SINGLE_DIRECTIONS, ...MULTI_DIRECTIONS].map((alignment) => {
          return (
            <PopoverContainer
              {...args}
              alignment={alignment}
              inline
              isOpen
              key={alignment}
              offset={20}
              targetRef={target}
            >
              <Background
                alignItems="center"
                bg="navy"
                dimensions="100px"
                display="flex"
                flexDirection="column"
                justifyContent="center"
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
          alignItems="center"
          border={1}
          dimensions="200px"
          justifyContent="center"
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
    <FlexBox minHeight="480px" position="relative" width={1}>
      <FlexBox center flex={1}>
        {(['x', 'y'] as const).map((axis) => {
          return MULTI_DIRECTIONS.map((alignment) => {
            return (
              <PopoverContainer
                {...args}
                alignment={alignment}
                inline
                invertAxis={axis}
                isOpen
                key={`${alignment}-${axis}`}
                offset={20}
                targetRef={target}
              >
                <Background
                  alignItems="center"
                  bg="navy"
                  dimensions="100px"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
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
          alignItems="center"
          border={1}
          dimensions="200px"
          justifyContent="center"
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
    <FlexBox minHeight="480px" position="relative" width={1}>
      <FlexBox center flex={1}>
        {[...SINGLE_DIRECTIONS, ...MULTI_DIRECTIONS].map((alignment) => {
          return (
            <PopoverContainer
              alignment={alignment}
              inline
              isOpen
              key={`${alignment}-${offset}`}
              offset={offset}
              targetRef={target}
            >
              <Background
                alignItems="center"
                bg="navy"
                dimensions="100px"
                display="flex"
                flexDirection="column"
                justifyContent="center"
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
          alignItems="center"
          border={1}
          dimensions="200px"
          justifyContent="center"
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
    <FlexBox minHeight="480px" position="relative" width={1}>
      <FlexBox center flex={1}>
        {[...SINGLE_DIRECTIONS, ...MULTI_DIRECTIONS].map((alignment) => {
          return (
            <PopoverContainer
              alignment={alignment}
              inline
              isOpen
              key={`${alignment}-${x}-${y}`}
              targetRef={target}
              x={x}
              y={y}
            >
              <Background
                alignItems="center"
                bg="navy"
                dimensions="100px"
                display="flex"
                flexDirection="column"
                justifyContent="center"
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
          alignItems="center"
          border={1}
          dimensions="200px"
          justifyContent="center"
          ref={target}
        >
          Transform Axis
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};
