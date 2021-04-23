import createCache, { Options, StylisPlugin } from '@emotion/cache';
import { prefixer } from 'stylis';

import { focusVisible } from './stylisPlugins';

export const EMOTION_KEY = 'gamut';
export const EMOTION_CONTAINER = 'emotion-styles';

const getEmotionNode = () => {
  if (typeof document === 'undefined') {
    return;
  }

  let node = document.getElementById(EMOTION_CONTAINER);
  if (node) return node;

  node = document.createElement('div');
  node.setAttribute('id', EMOTION_CONTAINER);

  // if this has not been created add it to the DOM at the top of the body
  document.getElementsByTagName('body')[0].prepend(node);
  return node;
};

export const createEmotionCache = (overrides?: Partial<Options>) =>
  createCache({
    key: EMOTION_KEY,
    speedy: process.env.NODE_ENV !== 'development',
    container: overrides?.container ?? getEmotionNode(),
    ...overrides,
    stylisPlugins: [
      ...(overrides?.stylisPlugins ?? []),
      focusVisible,
      prefixer as StylisPlugin,
    ],
  });
