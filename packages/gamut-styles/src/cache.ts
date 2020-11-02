import createCache from '@emotion/cache';

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

export const emotionCache = createCache({
  key: EMOTION_KEY,
  speedy: false,
  container: getEmotionNode(),
});
