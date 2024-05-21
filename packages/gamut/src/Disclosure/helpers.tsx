import { variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import { FillButton, StrokeButton, TextButton } from '../Button';

const verticalSpacingMap = {
  normal: 16,
  condensed: 8,
  compact: 4,
} as const;

export const determineVerticalSpacing = (
  spacing: keyof typeof verticalSpacingMap
) => {
  return verticalSpacingMap[spacing];
};

const horizontalSpacingMap = {
  normal: 16,
  condensed: 8,
  compact: 4,
} as const;

export const determineHorizontalSpacing = (
  spacing: keyof typeof horizontalSpacingMap
) => {
  return horizontalSpacingMap[spacing];
};

const sharedVariants = {
  left: {
    alignSelf: 'flex-start',
    justifyContent: 'left'
  },
  right: {
    alignSelf: 'flex-end',
    justifyContent: 'right'
  }
}

const StyledTextButton = styled(TextButton)(
  variant({
    prop: 'placement',
    variants: sharedVariants
  })
)

const StyledStrokeButton = styled(StrokeButton)(
  variant({
    prop: 'placement',
    variants: sharedVariants
  })
)

const StyledFillButton = styled(FillButton)(
  variant({
    prop: 'placement',
    variants: sharedVariants
  })
)

export const renderButton = (
  buttonType: "TextButton" | "FillButton" | "StrokeButton",
  ctaText: string,
  ctaCallback: () => void,
  buttonPlacement: 'right' | 'left',
  href: string,
) => {
  const buttonProps = {
    pt: 8 as const,
    px: 0 as const,
    lineHeight: 'normal',
    onClick: (ctaCallback ? () => ctaCallback() : undefined),
    textAlign: buttonPlacement,
    href
  }
  switch (buttonType) {
    case "FillButton":
      return (
        <StyledFillButton
          {...buttonProps}
        >
          {ctaText}
        </StyledFillButton>
      );
    case "StrokeButton":
      return (
        <StyledStrokeButton
          {...buttonProps}
        >
          {ctaText}
        </StyledStrokeButton>
      );
    case "TextButton":
      return (
        <StyledTextButton
          {...buttonProps}
          placement={buttonPlacement}
        >
          {ctaText}
        </StyledTextButton>
      );
    default:
      return null;
  }
};
