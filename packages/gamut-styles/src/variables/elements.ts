import { zIndices } from './zIndices';

export const elements = {
  headerHeight: { base: '4rem', md: '5rem' },

  /**
   * z-index for global page headers. Aliases the `appBar` token from the `zIndices`
   * scale so consumers still reading `elements.headerZ` stay in sync with the scale.
   * Prefer `zIndex="appBar"` in new code.
   */
  headerZ: zIndices.appBar,
} as const;
