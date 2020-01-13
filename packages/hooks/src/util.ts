/* eslint-disable no-underscore-dangle */
export const isServer = () =>
  typeof window !== 'object' || Boolean(process.env.__SSR__);
