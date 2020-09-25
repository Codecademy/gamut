import { get, isObject } from 'lodash';
import { AbstractTheme } from '../../types/system';

export const themeScaleValue = (
  { theme }: { theme: AbstractTheme },
  scaleKey: unknown,
  value: string | number
) => {
  if (typeof scaleKey === 'string' && isObject(theme)) {
    return get(theme, [scaleKey, value]);
  }

  return value;
};
