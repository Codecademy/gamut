import { get } from 'lodash';
import { AbstractTheme } from '../../types/system';

export const themeScaleValue = (
  { theme }: { theme: AbstractTheme },
  scaleKey: unknown,
  value: string | number
) => get(theme, `${scaleKey}.${value}`) ?? value;
