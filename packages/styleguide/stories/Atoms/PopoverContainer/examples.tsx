import { FlexBox, PopoverContainer, Text } from '@codecademy/gamut';
import { Background } from '@codecademy/gamut-styles';
import React, { useRef } from 'react';

const SINGLE_DIRECTIONS = ['top', 'bottom', 'left', 'right'] as const;

const MULTI_DIRECTIONS = [
  'top-left',
  'top-right',
  'bottom-right',
  'bottom-left',
] as const;

export const SingleDirection = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLDivElement>(null);

  return (
    <FlexBox minHeight="640px" width={1} position="relative">
      <FlexBox alignItems="center" justifyContent="center" flex={1}>
        {[...SINGLE_DIRECTIONS, ...MULTI_DIRECTIONS].map((alignment, i) => {
          return (
            <PopoverContainer
              key={alignment}
              isOpen
              targetRef={targetRef}
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
          ref={targetRef}
        >
          Transform Axis
        </FlexBox>
      </FlexBox>
      <FlexBox alignItems="center" justifyContent="center" flex={1}>
        {(['x', 'y'] as const).map((axis) => {
          return MULTI_DIRECTIONS.map((alignment, i) => {
            return (
              <PopoverContainer
                key={`${alignment}-${axis}`}
                isOpen
                insideAxis={axis}
                targetRef={secondRef}
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
          ref={secondRef}
        >
          Transform Axis
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};
