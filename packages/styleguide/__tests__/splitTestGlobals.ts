// @ts-expect-error globals for storyshots splitting setup
global.STORYSHOTS_TOTAL = 9;

export const splitTestGlobals = (index: number) => {
  // @ts-expect-error globals for storyshots splitting setup
  global.STORYSHOTS_INDEX = index;
};
