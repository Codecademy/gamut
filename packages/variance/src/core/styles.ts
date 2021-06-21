import { variance } from '../core';

export const createStyle = (config, base, states, variants, props) => {
  const propNames = Object.keys(config);
  const parser = variance.create(config);
};
