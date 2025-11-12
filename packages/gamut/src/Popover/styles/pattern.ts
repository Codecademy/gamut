export const patternContainerBaseStyles = {
  bg: 'transparent',
  borderRadius: 'sm',
  overflow: 'hidden',
  position: 'absolute',
  width: '100%',
} as const;

export const patternVariantArray = [
  'above-left',
  'above-right',
  'below-left',
  'below-right',
];

export const patternAbove = {
  top: '-8px',
};

export const patternBelow = {
  top: '8px',
};

export const patternRight = {
  left: '-8px',
};

export const patternLeft = {
  left: '8px',
};

export const createPatternVariantFromAlignment = (alignment: string) => {
  let styleObject = {};

  if (alignment.includes('above')) {
    styleObject = { ...patternAbove };
  } else {
    styleObject = { ...patternBelow };
  }
  if (alignment.includes('right')) {
    styleObject = { ...patternRight, ...styleObject };
  } else {
    styleObject = { ...patternLeft, ...styleObject };
  }

  return { ...styleObject };
};
