const iconSizeMap = {
  base: 16,
  sm: 8,
} as const;

export const determineIconSize = (size: keyof typeof iconSizeMap) => {
  return iconSizeMap[size];
};

const iconSpaceMap = {
  base: 8,
  sm: 4,
} as const;

export const determineIconSpacing = (size: keyof typeof iconSpaceMap) => {
  return iconSpaceMap[size];
};

const TextTopMarginSpaceMap = {
  // Badges with icon need less spacing, but since 4 is the lowest we can go, we'll use 2 and set it as `any` as to not throw TS errors
  base: 2 as any,
  sm: 0,
} as const;

export const determineTextTopMargin = (size: keyof typeof TextTopMarginSpaceMap) => {
  return TextTopMarginSpaceMap[size];
};

const TextBottomMarginSpaceMap = {
  base: 0,
  // Badges with icon need less spacing, but since 4 is the lowest we can go, we'll use 0.5 and set it as `any` as to not throw TS errors
  sm: 0.5 as any,
  // sm: 0,
} as const;

export const determineTextBottomMargin = (size: keyof typeof TextBottomMarginSpaceMap) => {
  return TextBottomMarginSpaceMap[size];
};
