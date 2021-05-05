import { Box, FlexBox, Pattern, Text } from '@codecademy/gamut';
import { IllustrationProps } from '@codecademy/gamut-illustrations';
import { pxRem, system, themed } from '@codecademy/gamut-styles';
import { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

export type EmptySectionProps = {
  bodyText: string;
  children: ReactNode;
  headingText: string;
  illustration: React.ComponentType<IllustrationProps>;
  illustrationPosition?: 'left' | 'right';
  innerBGColor: keyof Theme['colors'];
  stretchDirection: 'left' | 'right';
};

const Dots = styled(Pattern)(
  system.variant({
    prop: 'stretchDirection',
    base: {
      position: 'absolute',
      top: 0,
      bottom: 0,
    },
    variants: {
      left: {
        right: 0,
        left: '-100vw',
      },
      right: {
        left: 0,
        right: '-100vw',
      },
    },
  })
);

type IllustrationContainerProps = {
  illustrationPosition: string;
};

const IllustrationContainer = styled.div<IllustrationContainerProps>`
  margin: 0 auto 2rem;
  ${themed('breakpoints.sm')} {
    margin: ${({ illustrationPosition }) =>
      illustrationPosition === 'right' ? '0 0 0 3rem' : ' 0 3rem 0 0'};
  }
`;

export const EmptySection: React.FC<EmptySectionProps> = ({
  bodyText,
  children,
  headingText,
  illustration: Illustration,
  illustrationPosition = 'right',
  innerBGColor,
  stretchDirection = 'left',
}) => {
  const direction = illustrationPosition === 'right' ? 'row-reverse' : 'row';
  const paddingDirection = stretchDirection === 'right' ? 'pr' : 'pl';
  const styleProps = { [paddingDirection]: [0, 0, 0] } as Record<
    'pr' | 'pl',
    [0]
  >;

  return (
    <Box
      position="relative"
      px={{ _: 16, xs: 48, sm: 96 }}
      py={{ _: 32, xs: 48, sm: 96 }}
      {...styleProps}
    >
      <Dots name="dotLoose" stretchDirection={stretchDirection} />
      <FlexBox
        position="relative"
        bg={innerBGColor}
        py={48}
        px={64}
        zIndex={1}
        flexDirection={{ _: 'column', sm: direction }}
        justifyContent={{ _: 'space-around', md: 'space-between' }}
        alignItems="center"
        textAlign={{ _: 'center', sm: 'start' }}
      >
        <IllustrationContainer illustrationPosition={illustrationPosition}>
          <Illustration width={pxRem(100)} />
        </IllustrationContainer>
        <FlexBox
          flexDirection="column"
          alignItems={{ _: 'center', sm: 'start' }}
        >
          <Text as="h2" fontSize={22} mb={8}>
            {headingText}
          </Text>
          <Text mb={32}>{bodyText}</Text>
          {children}
        </FlexBox>
      </FlexBox>
    </Box>
  );
};
