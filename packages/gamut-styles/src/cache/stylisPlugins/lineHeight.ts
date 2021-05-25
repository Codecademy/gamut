import { StylisPlugin } from '@emotion/cache';

import { EMOTION_KEY } from '../createEmotionCache';

export const lineHeight: StylisPlugin = (element) => {
  if (
    element.type === 'decl' &&
    element.value.includes('line-height') &&
    (element as any)?.parent?.value?.includes(EMOTION_KEY)
  ) {
    // Do some stuff here
  }
  return undefined;
};
