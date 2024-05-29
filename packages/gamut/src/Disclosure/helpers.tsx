import { StyledFillButton, StyledStrokeButton, StyledTextButton } from './elements';

export const getSpacing = (spacing: 'compact' | 'condensed' | 'normal') => {
  const verticalSpacingMap = {
    compact: 4,
    condensed: 8,
    normal: 16,
  } as const;

  const horizontalSpacingMap = {
    compact: 4,
    condensed: 8,
    normal: 16,
  } as const;

  return {verticalSpacing: verticalSpacingMap[spacing], horizontalSpacing: horizontalSpacingMap[spacing] }
}

const titleVariantMap = {
  compact: 'p-base',
  condensed: 'title-xs',
  normal: 'title-sm',
} as const;

export const getTitleSize = (spacing: keyof typeof titleVariantMap) => {
  return titleVariantMap[spacing];
};

export const getRotationSize = (
  spacing: 'compact' | 'condensed' |  'normal'
) => {
  return spacing === 'normal' ? 24 : 12;
};

export const renderButton = (
  buttonPlacement: 'left' | 'right',
  buttonType: 'TextButton' | 'FillButton' | 'StrokeButton',
  ctaCallback: () => void,
  ctaText: string,
  href?: string
) => {
  const buttonProps = {
    pt: 8 as const,
    lineHeight: 'normal',
    onClick: ctaCallback ? () => ctaCallback() : undefined,
    textAlign: buttonPlacement,
    href,
    placement: buttonPlacement,
  };
  switch (buttonType) {
    case 'FillButton':
      return <StyledFillButton {...buttonProps}>{ctaText}</StyledFillButton>;
    case 'StrokeButton':
      return (
        <StyledStrokeButton {...buttonProps}>{ctaText}</StyledStrokeButton>
      );
    case 'TextButton':
      return <StyledTextButton {...buttonProps}>{ctaText}</StyledTextButton>;
    default:
      return null;
  }
};
