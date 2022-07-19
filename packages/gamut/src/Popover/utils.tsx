const popoverAbove = {
  borderRight: 'inherit',
  borderBottom: 'inherit',
  top: 'calc(100% - 10px)',
} as const;

const popoverBelow = {
  borderLeft: 'inherit',
  borderTop: 'inherit',
  top: '-10px',
} as const;

const beakRight = {
  right: '25px',
};

const beakLeft = {
  left: '25px',
};

const popoverAboveSml = {
  borderRight: 'inherit',
  borderBottom: 'inherit',
  top: 'calc(100% - 8px)',
} as const;

const popoverBelowSml = {
  borderLeft: 'inherit',
  borderTop: 'inherit',
  top: '-8px',
} as const;

const beakRightSml = {
  right: '1.5rem',
};

const beakLeftSml = {
  left: '1.5rem',
};

export const createBeakVariantFromAlignment = (alignment: string) => {
  let styleObject = {};

  if (alignment.includes('sml')) {
    if (alignment.includes('above')) {
      styleObject = { ...popoverAboveSml };
    } else {
      styleObject = { ...popoverBelowSml };
    }
    if (alignment.includes('right')) {
      styleObject = { ...beakRightSml, ...styleObject };
    } else {
      styleObject = { ...beakLeftSml, ...styleObject };
    }
  } else {
    if (alignment.includes('above')) {
      styleObject = { ...popoverAbove };
    } else {
      styleObject = { ...popoverBelow };
    }
    if (alignment.includes('right')) {
      styleObject = { ...beakRight, ...styleObject };
    } else {
      styleObject = { ...beakLeft, ...styleObject };
    }
  }

  return { ...styleObject };
};

const patternAbove = {
  top: '-8px',
};

const patternBelow = {
  top: '8px',
};

const patternRight = {
  left: '-8px',
};

const patternLeft = {
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
