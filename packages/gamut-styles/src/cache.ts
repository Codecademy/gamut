import createCache from '@emotion/cache';

export const EMOTION_KEY = 'css';
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

export const createEmotionCache = () =>
  createCache({
    key: EMOTION_KEY,
    speedy: false,
    container: getEmotionNode(),
  });
