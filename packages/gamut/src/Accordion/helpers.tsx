const verticalSpacingMap = {
  normal: 16,
  condensed: 8,
  compact: 4,
} as const;

export const determineVerticalSpacing = (spacing: keyof typeof verticalSpacingMap ) => {
  return verticalSpacingMap[spacing];
};

const horizontalSpacingMap = {
  normal: 16,
  condensed: 8,
  compact: 4,
} as const;

export const determineHorizontalSpacing = (spacing: keyof typeof horizontalSpacingMap) => {
  return horizontalSpacingMap[spacing];
};
