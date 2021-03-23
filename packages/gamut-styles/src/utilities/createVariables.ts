import { CSSObject } from '@emotion/react';
import { hasIn, merge } from 'lodash';

export const createVariables = (
  tokens: Record<string, string | number | CSSObject>,
  prefix: string | symbol | number
) => {
  const cssVariables: CSSObject = {};

  for (const variable in tokens) {
    if (!hasIn(tokens, variable)) continue;

    const varName = `--${String(prefix)}-${variable}`;
    const valuesToRegister = tokens[variable];

    // For all variables in the theme scale add theme to the resulting CSS Object
    switch (typeof valuesToRegister) {
      // If the value is primitive just add it as is to the returned vars css object
      case 'number':
      case 'string':
        cssVariables[varName] = valuesToRegister;
        break;
      // If the value is an object then attempt to parse it as a resposnive property
      case 'object':
        const { base, ...rest } = valuesToRegister;

        // If base key is defined add it to the root values
        if (base) {
          cssVariables[varName] = base;
        }

        // If there are remaining selectors / queries that override the root value add them to style object
        const selectors = Object.keys(rest);
        if (selectors) {
          const overridesBySelector: CSSObject = {};
          selectors.forEach((selector) => {
            overridesBySelector[selector] = {
              [varName]: valuesToRegister[selector],
            };
          });

          // Merge with the base object.
          merge(cssVariables, overridesBySelector);
        }
        break;
      default:
        break;
    }
  }
  return cssVariables;
};
