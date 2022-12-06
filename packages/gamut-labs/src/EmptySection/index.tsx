import { ButtonProps, FlexBox, Text } from '@codecademy/gamut';
import { IllustrationProps } from '@codecademy/gamut-illustrations';
import { DotLoose } from '@codecademy/gamut-patterns';
import { pxRem, styledOptions, variant } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import * as React from 'react';

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
   * Whether the pattern background stretches to the end of the left or right of the viewport
   */
  stretchDirection: 'left' | 'right';
};

const EmptyContainer = styled(FlexBox)(
  variant({
    prop: 'stretchDirection',
    defaultVariant: 'left',
    base: {
      justifySelf: 'center',
      position: 'relative',
      px: 32,
      py: { _: 64, lg: 96 },
      width: 1,
    },
    variants: {
      left: {
        pl: { sm: 0 },
        pr: { sm: 64, lg: 96 },
      },
      right: {
        pr: { sm: 0 },
        pl: { sm: 64, lg: 96 },
      },
    },
  })
);

const Dots = styled(DotLoose)(
  variant({
    prop: 'stretchDirection',
    defaultVariant: 'left',
    base: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: '-6rem',
      right: '-6rem',
    },
    variants: {
      left: {
        right: { sm: 0 },
      },
      right: {
        left: { sm: 0 },
      },
    },
  })
);

const illustrationPositionVariants = variant({
  prop: 'illustrationPosition',
  defaultVariant: 'right',
  base: {
    mx: { _: 'auto', sm: 0 },
    mb: { _: 32, sm: 0 },
  },
  variants: {
    left: {
      mr: { sm: 48 },
    },
    right: {
      ml: { sm: 48 },
    },
  },
});

type IllustrationContainerProps = StyleProps<
  typeof illustrationPositionVariants
>;

const IllustrationContainer = styled(
  'div',
  styledOptions
)<IllustrationContainerProps>(illustrationPositionVariants);

export const EmptySection: React.FC<EmptySectionProps> = ({
  bodyText,
  children,
  headingText,
  illustration: Illustration,
  stretchDirection,
  illustrationPosition = stretchDirection === 'right' ? 'left' : 'right',
}) => {
  const flexDirection =
    illustrationPosition === 'right' ? 'row-reverse' : 'row';

  return (
    <EmptyContainer stretchDirection={stretchDirection}>
      <Dots stretchDirection={stretchDirection} />
      <FlexBox
        maxWidth="822px"
        flexBasis="100%"
        position="relative"
        bg="background-current"
        py={48}
        px={{ _: 16, sm: 48, md: 64 }}
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
