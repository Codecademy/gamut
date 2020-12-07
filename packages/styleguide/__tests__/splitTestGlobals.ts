// @ts-expect-error we using janky globals
global.STORYSHOTS_TOTAL = 5;

export const splitTestGlobals = (index: number) => {
  // @ts-expect-error we using janky globals
  global.STORYSHOTS_INDEX = index;
};
