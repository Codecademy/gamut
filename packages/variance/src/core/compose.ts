import { AbstractParser, Compose } from '../types/config';
import { createParser } from './createParser';

export function compose<Args extends AbstractParser[]>(...parsers: Args) {
  return createParser(
    parsers.reduce(
      (carry, parser) => ({ ...carry, ...parser.config }),
      {}
    ) as Compose<Args>
  );
}
