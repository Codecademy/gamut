import { FlexBox, Pattern, Text } from '@codecademy/gamut';
import { IllustrationProps } from '@codecademy/gamut-illustrations';
import { pxRem, styledConfig, system, themed } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
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

const EmptyContainer = styled(FlexBox)(
  system.variant({
    prop: 'stretchDirection',
    defaultVariant: 'left',
    base: {
      maxWidth: '600px',
      justifySelf: 'center',
      position: 'relative',
      px: [16, 48, 96],
      py: [32, 48, 96],
    },
    variants: {
      left: {
        pl: [0, 0, 0],
      },
      right: {
        pr: [0, 0, 0],
      },
    },
  })
);

const Dots = styled(Pattern)(
  system.variant({
    prop: 'stretchDirection',
    defaultVariant: 'left',
    base: {
      position: 'absolute',
      top: 0,
      bottom: 0,
    },
    variants: {
      left: {
        right: 0,
        left: { _: '-100vw', xl: '-96px' },
      },
      right: {
        left: 0,
        right: { _: '-100vw', xl: '-96px' },
      },
    },
  })
);

const illustrationPositionVariants = system.variant({
  prop: 'illustrationPosition',
  defaultVariant: 'right',
  base: {
    margin: '0 auto 2rem',
  },
  variants: {
    left: {
      mt: { sm: 0 },
      mr: { sm: 48 },
      ml: { sm: 0 },
      mb: { sm: 0 },
    },
    right: {
      mt: { sm: 0 },
      mr: { sm: 0 },
      ml: { sm: 48 },
      mb: { sm: 0 },
    },
  },
});

type IllustrationContainerProps = StyleProps<
  typeof illustrationPositionVariants
>;

const IllustrationContainer = styled(
  'div',
  styledConfig
)<IllustrationContainerProps>(illustrationPositionVariants);

export const EmptySection: React.FC<EmptySectionProps> = ({
  bodyText,
  children,
  headingText,
  illustration: Illustration,
  illustrationPosition = 'right',
  innerBGColor,
  stretchDirection,
}) => {
  const flexDirection =
    illustrationPosition === 'right' ? 'row-reverse' : 'row';

  const leftPosition = stretchDirection === 'right' ? '-1rem' : '1rem';

  return (
    <EmptyContainer stretchDirection={stretchDirection}>
      <Dots name="dotLoose" stretchDirection={stretchDirection} />
      <FlexBox
        position="relative"
        bg={innerBGColor}
        py={48}
        px={64}
        zIndex={1}
        flexDirection={{ _: 'column', sm: flexDirection }}
        justifyContent={{ _: 'space-around', md: 'space-between' }}
        alignItems="center"
        textAlign={{ _: 'center', sm: 'start' }}
        left={{ _: leftPosition, md: 'unset' }}
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
    </EmptyContainer>
  );
};
