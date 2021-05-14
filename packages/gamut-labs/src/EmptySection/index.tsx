import { ButtonProps, FlexBox, Pattern, Text } from '@codecademy/gamut';
import { IllustrationProps } from '@codecademy/gamut-illustrations';
import { pxRem, styledConfig, system } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { DropdownButtonProps } from '..';

export type EmptySectionProps = {
  /**
   * Paragraph text that displays beneath the heading text
   */
  bodyText: string;
  /**
   * Button or dropdown button with an action for the user to take
   */
  children: React.ReactElement<ButtonProps | DropdownButtonProps>;
  /**
   * The larger heading text that appears over the body text
   */
  headingText: string;
  illustration: React.ComponentType<IllustrationProps>;
  /**
   * Whether the illustration appears to the left or right of the rest of the section's content
   */
  illustrationPosition?: 'left' | 'right';
  /**
   * This should be the same as the background color in order to create a patterned border effect
   */
  innerBGColor: keyof Theme['colors'];
  /**
   * Whether the pattern background stretches to the end of the left or right of the viewport
   */
  stretchDirection: 'left' | 'right';
};

const EmptyContainer = styled(FlexBox)(
  system.variant({
    prop: 'stretchDirection',
    defaultVariant: 'left',
    base: {
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

  return (
    <EmptyContainer stretchDirection={stretchDirection}>
      <Dots name="dotLoose" stretchDirection={stretchDirection} />
      <FlexBox
        maxWidth="822px"
        flexBasis="100%"
        position="relative"
        bg={innerBGColor}
        py={48}
        px={64}
        zIndex={1}
        flexDirection={{ _: 'column', sm: flexDirection }}
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
    </EmptyContainer>
  );
};
