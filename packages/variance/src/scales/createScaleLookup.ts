import get from 'lodash/get';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';

import { Prop } from '../types/config';
import { ThemeProps } from '../types/props';

type GetScaleValue = (
  val: string | number,
  props: ThemeProps
) => string | number | undefined;

export const createScaleLookup = (scale: Prop['scale']): GetScaleValue => {
  if (isString(scale)) {
    return (val, props) => get(props, ['theme', scale, val]);
  }
  if (isArray(scale)) {
    return (val) => val;
  }
  if (isObject(scale)) {
    return (val) => get(scale, val);
  }

  return () => undefined;
};
