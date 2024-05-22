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
