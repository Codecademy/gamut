import {
  FlexBox,
  PopoverContainer,
  PopoverContainerProps,
  Text,
} from '@codecademy/gamut';
import { Background } from '@codecademy/gamut-styles';
import { useRef } from 'react';
import * as React from 'react';

const SINGLE_DIRECTIONS = ['top', 'bottom', 'left', 'right'] as const;

const MULTI_DIRECTIONS = [
  'top-left',
  'top-right',
  'bottom-right',
  'bottom-left',
] as const;

export const PopoverTemplate: React.FC<PopoverContainerProps> = (args) => {
  const target = useRef<HTMLDivElement>(null);

  return (
    <FlexBox minHeight="480px" width={1} position="relative">
      <FlexBox center flex={1}>
        <PopoverContainer isOpen inline targetRef={target} {...args}>
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

export const AlignmentsTemplate: React.FC<PopoverContainerProps> = (args) => {
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

export const InvertAxisTemplate: React.FC<PopoverContainerProps> = (args) => {
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

export const OffsetTemplate: React.FC<PopoverContainerProps> = ({ offset }) => {
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

export const XandYTemplate: React.FC<PopoverContainerProps> = ({ x, y }) => {
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
