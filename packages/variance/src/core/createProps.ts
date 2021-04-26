import { Prop, TransformerMap } from '../types/config';
import { createParser } from './createParser';
import { createTransform } from './createTransform';

export function createProps<Config extends Record<string, Prop>>(
  config: Config
) {
  const transforms = {} as TransformerMap<Config>;

  // Create a transform function for each of the props
  for (const prop in config) {
    if (typeof prop === 'string') {
      transforms[prop] = createTransform(prop, config[prop]);
    }
  }

  // Create a parser that handles all the props within the config
  return createParser(transforms);
}
