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
  if (a < b) return SORT.A_BEFORE_B;
  if (b < a) return SORT.B_BEFORE_A;
  return SORT.EQUAL;
};

/**
 * Orders all properties by the most dependent props
 * @param config
 */
export const orderPropNames = (config: Record<string, BaseProperty>) =>
  Object.keys(config).sort((a, b) => {
    const { [a]: aConf, [b]: bConf } = config;

    const { property: aProp, properties: aProperties = [] } = aConf;
    const { property: bProp, properties: bProperties = [] } = bConf;

    const aIsShorthand = SHORTHAND_PROPERTIES.includes(aProp);
    const bIsShorthand = SHORTHAND_PROPERTIES.includes(bProp);

    if (aIsShorthand && bIsShorthand) {
      const aNum = aProperties.length;
      const bNum = bProperties.length;

      if (aProp !== bProp) {
        return compare(
          SHORTHAND_PROPERTIES.indexOf(aProp),
          SHORTHAND_PROPERTIES.indexOf(bProp)
        );
      }

      if (aProp === bProp) {
        if (aNum === 0) return SORT.A_BEFORE_B;
        if (bNum === 0) return SORT.B_BEFORE_A;
      }

      return compare(bNum, aNum);
    }

    if (aIsShorthand) return SORT.A_BEFORE_B;
    if (bIsShorthand) return SORT.B_BEFORE_A;

    return SORT.EQUAL;
  });
