import { Property, StandardPropertiesHyphen } from 'csstype';

import { timing } from '../variables';

export const transitionConcat = (
  arrayOfProperties: Array<keyof StandardPropertiesHyphen>,
  transition: keyof typeof timing,
  timingFn: Property.TransitionTimingFunction = 'linear'
) => {
  const cssString = `${arrayOfProperties.join(` ${timing},`)} ${timingFn}`;

  return cssString;
};
