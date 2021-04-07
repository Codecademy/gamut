import { StandardProperties, StandardPropertiesHyphen } from 'csstype';

export const transitionConcatenator = (
  arrayOfProperties: Array<keyof StandardPropertiesHyphen>,
  duration: `${number}ms`,
  timingFunction: StandardProperties['animationTimingFunction']
) => {
  const transition = `${duration} ${timingFunction}`;

  return {
    transition: arrayOfProperties
      .map((prop) => `${prop} ${transition}`)
      .join(', '),
  };
};
