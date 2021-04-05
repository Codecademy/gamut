import { BaseProperty } from '../types/config';

const SHORTHAND_PROPERTIES = [
  'border',
  'borderTop',
  'borderBottom',
  'borderLeft',
  'borderRight',
  'borderWidth',
  'borderStyle',
  'borderColor',
  'background',
  'flex',
  'margin',
  'padding',
  'transition',
  'gap',
  'grid',
  'gridArea',
  'gridColumn',
  'gridRow',
  'gridTemplate',
  'overflow',
  'transition',
];

const SORT = {
  A_BEFORE_B: -1,
  B_BEFORE_A: 1,
  EQUAL: 1,
};

const compare = (a: number, b: number) => {
  switch (Math.sign(a - b)) {
    case -1:
      return SORT.B_BEFORE_A;
    case 1:
      return SORT.A_BEFORE_B;
    default:
      return SORT.EQUAL;
  }
};

/**
 * Orders all properties by the most dependent props
 * @param config
 */
export const orderPropNames = (config: Record<string, BaseProperty>) =>
  Object.keys(config).sort((a, b) => {
    const aProp = config?.[a].property;
    const bProp = config?.[b].property;

    const aProps = config?.[a].properties?.length ?? 0;
    const bProps = config?.[b].properties?.length ?? 0;
    const aIsShorthand = SHORTHAND_PROPERTIES.includes(aProp) && aProps === 0;
    const bIsShorthand = SHORTHAND_PROPERTIES.includes(bProp) && bProps === 0;

    // True shorthands go first (border etc)
    if (aIsShorthand && !bIsShorthand) return SORT.A_BEFORE_B;
    if (bIsShorthand && !aIsShorthand) return SORT.B_BEFORE_A;

    if (aIsShorthand && bIsShorthand) {
      const aPriority = SHORTHAND_PROPERTIES.indexOf(aProp);
      const bPriority = SHORTHAND_PROPERTIES.indexOf(bProp);

      return compare(aPriority, bPriority);
    }

    // If its not a true short hand compare number of properties the prop is responsible for, longest first.
    return compare(aProps, bProps);
  });
