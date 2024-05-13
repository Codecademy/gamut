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

export const renderButton = (
  buttonType: "TextButton" | "FillButton" | "StrokeButton",
  ctaText: string,
  ctaCallback: () => void
) => {
  switch (buttonType) {
    case "FillButton":
      return (
        <FillButton
          alignSelf="flex-end"
          pt={8}
          onClick={ctaCallback ? () => ctaCallback() : undefined}
        >
          {ctaText}
        </FillButton>
      );
    case "StrokeButton":
      return (
        <StrokeButton
          alignSelf="flex-end"
          pt={8}
          onClick={ctaCallback ? () => ctaCallback() : undefined}
        >
          {ctaText}
        </StrokeButton>
      );
    case "TextButton":
      return (
        <TextButton
          alignSelf="flex-end"
          pt={8}
          onClick={ctaCallback ? () => ctaCallback() : undefined}
        >
          {ctaText}
        </TextButton>
      );
    default:
      return null;
  }
};
