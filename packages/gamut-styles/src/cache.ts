import createCache, { Options, StylisPlugin } from '@emotion/cache';

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

const focusVisible: StylisPlugin = (element) => {
  if (element.type === 'rule' && element.value.includes(':focus-visible')) {
    element.props = element.props.map((prop) =>
      prop.replace(/:focus-visible/g, '[data-focus-visible-added]')
    );
  }
  return undefined;
};

export const createEmotionCache = (optionOverrides?: Partial<Options>) =>
  createCache({
    key: EMOTION_KEY,
    speedy: true,
    container: getEmotionNode(),
    stylisPlugins: [focusVisible],
    ...optionOverrides,
  });
