import { Box, FlexBox, Pattern, Text } from '@codecademy/gamut';
import { IllustrationProps } from '@codecademy/gamut-illustrations';
import { colors, pxRem, themed } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

export type EmptySectionProps = {
  bodyText: string;
  children?: ReactNode;
  headingText: string;
  illustration: React.ComponentType<IllustrationProps>;
  illustrationPosition?: 'left' | 'right';
  innerBGColor: keyof Theme['colors'];
};

const Dots = styled(Pattern)`
  position: absolute;
  top: 0;
  right: -1rem;
  height: calc(100% + 8rem);
  width: calc(100% + 2rem);
  ${themed('breakpoints.xs')} {
    width: calc(100% + 4rem);
    right: -2rem;
  }
  ${themed('breakpoints.sm')} {
    width: calc(100% + 8rem);
    right: -4rem;
  }
  ${themed('breakpoints.md')} {
    width: calc(100% + 4rem);
    right: 0;
  }
  ${themed('breakpoints.lg')} {
    width: calc(100% + 6rem);
  }
`;

const Title = styled(Text)`
  margin-bottom: 0.5rem;
`;

type IllustrationContainerProps = {
  illustrationPosition: string;
};

const IllustrationContainer = styled.div<IllustrationContainerProps>`
  margin: 0 auto 2rem;
  ${themed('breakpoints.md')} {
    margin: ${({ illustrationPosition }) =>
      illustrationPosition === 'right' ? '0 0 0 6rem' : ' 0 6rem 0 0'};
  }
`;

export const EmptySection: React.FC<EmptySectionProps> = ({
  bodyText,
  children,
  headingText,
  illustration: Illustration,
  illustrationPosition = 'right',
  innerBGColor,
}) => {
  const direction = illustrationPosition === 'right' ? 'row-reverse' : 'row';

  return (
    <Box position="relative">
      <Dots name="dotLoose" />
      <FlexBox
        backgroundColor={innerBGColor}
        flexDirection={{ base: 'column', sm: direction }}
        justifyContent={{ base: 'space-around', md: 'space-between' }}
        alignItems="center"
        textAlign={{ base: 'center', sm: 'start' }}
        position="relative"
        top="4rem"
        marginLeft={{ base: 32, sm: 0 }}
        marginRight={{ base: 32, sm: 0, md: 64, lg: 96 }}
        marginBottom={{ base: pxRem(138) as any }}
        paddingX={{ base: 16, xs: 48, sm: 96, md: 32 }}
        paddingY={{ base: 32, xs: 48 }}
      >
        <IllustrationContainer illustrationPosition={illustrationPosition}>
          <Illustration width={pxRem(100)} />
        </IllustrationContainer>
        <FlexBox
          flexDirection="column"
          alignItems={{ base: 'center', sm: 'start' }}
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
