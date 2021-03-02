import { BaseProperty } from '../types/config';

const SORT = {
  A_BEFORE_B: -1,
  B_BEFORE_A: 1,
  EQUAL: 1,
};

/**
 * Orders all properties by the most dependent props
 * @param config
 */
export const orderPropNames = (config: Record<string, BaseProperty>) =>
  Object.keys(config).sort((a, b) => {
    const aProps = config?.[a].properties?.length ?? 0;
    const bProps = config?.[b].properties?.length ?? 0;
    switch (Math.sign(aProps - bProps)) {
      case -1:
        return SORT.A_BEFORE_B;
      case 1:
        return SORT.B_BEFORE_A;
      default:
        return SORT.EQUAL;
    }
  });
