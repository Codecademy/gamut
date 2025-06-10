import { timingValues } from '@codecademy/gamut-styles';

export const runWithDelay = (func: () => void) => {
  return setTimeout(func, timingValues?.base);
};

export const escapeKeyPressHandler = (
  event: React.KeyboardEvent<HTMLDivElement>
) => {
  if (event.key === 'Escape') {
    (event.target as HTMLElement).blur();
  }
};
