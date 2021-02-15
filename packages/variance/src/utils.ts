import { MediaQueryMap } from './types/props';

export const isMediaArray = (val: unknown): val is (string | number)[] =>
  Array.isArray(val);

export const isMediaMap = (
  val: object
): val is MediaQueryMap<string | number> => {
  for (const key in val) {
    if (['base', 'xs', 'sm', 'md', 'lg', 'xl'].includes(key)) {
      return true;
    }
  }
  return false;
};

export const identity = <T extends string | number>(val: T) => val;
