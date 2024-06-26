import {
  StyledFillButton,
  StyledStrokeButton,
  StyledTextButton,
} from './elements';

export const getSpacing = (spacing: 'compact' | 'condensed' | 'normal') => {
  const verticalSpacingMap = {
    compact: 4,
    condensed: 8,
    normal: 16,
  } as const;

  const horizontalSpacingMap = {
    compact: 8,
    condensed: 8,
    normal: 16,
  } as const;

  return {
    verticalSpacing: verticalSpacingMap[spacing],
    horizontalSpacing: horizontalSpacingMap[spacing],
  };
};

const titleVariantMap = {
  compact: 'p-base',
  condensed: 'title-xs',
  normal: 'title-sm',
} as const;

export const getTitleSize = (spacing: keyof typeof titleVariantMap) => {
  return titleVariantMap[spacing];
};

export const getRotationSize = (
  spacing: 'compact' | 'condensed' | 'normal'
) => {
  return spacing === 'normal' ? 24 : 16;
};

export const renderButton = (buttonProps: {
  buttonPlacement: 'left' | 'right';
  buttonType: 'FillButton' | 'StrokeButton' | 'TextButton';
  ctaCallback: () => void;
  ctaText: string;
  href?: string | undefined;
}) => {
  const {
    buttonPlacement,
    buttonType,
    ctaCallback,
    ctaText,
    href,
  } = buttonProps;
  const sharedProps = {
    mt: 8 as const,
    lineHeight: 'normal',
    onClick: ctaCallback ? () => ctaCallback() : undefined,
    textAlign: buttonPlacement,
    href,
    placement: buttonPlacement,
  };
  switch (buttonType) {
    case 'FillButton':
      return <StyledFillButton {...sharedProps}>{ctaText}</StyledFillButton>;
    case 'StrokeButton':
      return (
        <StyledStrokeButton {...sharedProps}>{ctaText}</StyledStrokeButton>
      );
    case 'TextButton':
      return <StyledTextButton {...sharedProps}>{ctaText}</StyledTextButton>;
    default:
      return null;
  }
};
