import { AbstractSystemConfig, SystemProps } from '../types';
import { propMap } from './constants';

export const standardStyle = (config: AbstractSystemConfig) => {
  const { propName, computeValue } = config;

  if (typeof propName === 'string') {
    return (props: SystemProps<typeof config>) =>
      props[propName] &&
      `
  ${propMap[propName]}: ${computeValue(props[propName])};
 `;
  }

  return (props: SystemProps<typeof config>) =>
    `${propName
      .map(
        (propKey) =>
          props[propKey] &&
          `
      ${propMap[propKey]}: ${computeValue(props[propKey])};
    `
      )
      .join('')}`;
};
