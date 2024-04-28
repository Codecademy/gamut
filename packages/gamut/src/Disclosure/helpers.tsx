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
  buttonName: string,
  ctaText: string,
  ctaCallback: () => void
) => {
  if (buttonName.match(/fill/i)) {
    return (
      <FillButton
        alignSelf="flex-end"
        pt={8}
        onClick={ctaCallback ? () => ctaCallback() : undefined}
      >
        {ctaText}
      </FillButton>
    );
  }
  if (buttonName.match(/stroke/i)) {
    return (
      <StrokeButton
        alignSelf="flex-end"
        pt={8}
        onClick={ctaCallback ? () => ctaCallback() : undefined}
      >
        {ctaText}
      </StrokeButton>
    );
  }
  return (
    <TextButton
      alignSelf="flex-end"
      pt={8}
      onClick={ctaCallback ? () => ctaCallback() : undefined}
    >
      {ctaText}
    </TextButton>
  );
};
