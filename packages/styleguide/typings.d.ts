declare module 'global';

declare namespace NodeJS {
  interface Global {
    STORYSHOTS_TOTAL: number;
    STORYSHOTS_INDEX: number;
  }
}
