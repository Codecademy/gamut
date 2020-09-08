import { AbstractSystemConfig, AnyStyle } from '../types';
import { propMap } from './constants';

export const standardStyle = <
  T extends Record<string, unknown>,
  K extends AbstractSystemConfig
>(
  config: K
): ((props: T) => AnyStyle) => {
  const { propName, computeValue } = config;

  if (typeof propName === 'string') {
    return (props: T) =>
      props[propName] &&
      `
  ${propMap[propName]}: ${computeValue(props[propName])};
 `;
  }

  return (props: T) =>
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
