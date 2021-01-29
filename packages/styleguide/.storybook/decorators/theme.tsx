import React from 'react';
import { CacheProvider, ThemeContext } from '@emotion/react';

import { theme, createEmotionCache } from '@codecademy/gamut-styles';
import { focusVisible } from '@codecademy/gamut-styles/src/cache/stylisPlugins';

const pseudos = [':active', ':hover', ':focus', ':active', ':focus-visible'];
const pseudoTest = new RegExp(/:hover|:focus|:active|:focus-visible/g);

export const pseudoStates = (element: any) => {
  if (pseudoTest.test(element.value)) {
    console.log(element);
    const newProps = [] as any;
    element.props.forEach((prop: any) => {
      newProps.push(prop);
      pseudos.forEach((pseudo) => {
        if (prop.includes(pseudo)) {
          newProps.push(
            `${pseudo.replace(':', '.')} ${prop.replace(pseudo, '')}`
          );
        }
      });
    });

    element.props = newProps;
    console.log(element);
  }
  return undefined;
};

const cache = createEmotionCache({
  speedy: false,
  stylisPlugins: [pseudoStates, focusVisible],
} as any);

/**
 * Story functions must be called as a regular function to avoid full-remounts
 * See: https://github.com/storybookjs/storybook/issues/12255
 */
export const withEmotion = (Story: any) => (
  <CacheProvider value={cache}>
    <ThemeContext.Provider value={theme}>{Story()}</ThemeContext.Provider>
  </CacheProvider>
);

export const withPseudoStates = (Story: any, { parameters }: any) => (
  <div className={(parameters.pseudos ?? []).join(' ')}>{Story()}</div>
);
