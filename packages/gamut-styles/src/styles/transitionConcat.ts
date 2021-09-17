import { Property, StandardPropertiesHyphen } from 'csstype';

import { timing } from '../variables';

export const transitionConcat = (
  arrayOfProperties: (keyof StandardPropertiesHyphen)[],
  transition: keyof typeof timing,
  timingFn: Property.TransitionTimingFunction = 'linear'
) => {
  const transitionString = `${timing[transition]} ${timingFn}`;

  const cssString = `${arrayOfProperties.join(
    ` ${transitionString},`
  )} ${transitionString}`;

  return cssString;
};
