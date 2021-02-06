import { AbstractProps } from '../../types/config';

export const splitSelectors = (config: AbstractProps = {}) => {
  const base: any = {};
  const pseudo: any = {};

  Object.keys(config).forEach((key) => {
    if (key.indexOf('&') === 0) {
      pseudo[key] = config[key];
    } else {
      base[key] = config[key];
    }
  });

  return [base, pseudo];
};
