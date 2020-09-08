import { AbstractSystemConfig } from './types';
import { standardStyle } from './style/standard';
import { createSystemHandler } from './templating/responsiveProp';
import { directional } from './style/directional';

const typeMap = {
  standard: standardStyle,
  directional: directional,
};

export function system<T>(config: AbstractSystemConfig) {
  const { type = 'standard' } = config;
  const templateFunction = typeMap[type](config);
  return createSystemHandler<T>(templateFunction);
}
