import { zIndexes } from './zIndexes';

export const elements = {
  headerHeight: { base: '4rem', md: '5rem' },

  /**
   * z-index for global page headers. Aliases the `appBar` token from the `zIndexes`
   * scale so consumers still reading `elements.headerZ` stay in sync with the scale.
   * Prefer `zIndex="appBar"` in new code.
   */
  headerZ: zIndexes.appBar,
} as const;
