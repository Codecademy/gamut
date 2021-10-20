/**
 * @returns Whether the site is running both in ChromeOS and in PWA mode.
 */
export const isChromeOSPWA = () =>
  isChromeOS() &&
  'getDigitalGoodsService' in window &&
  // https://stackoverflow.com/questions/41742390/javascript-to-check-if-pwa-or-mobile-web
  window.matchMedia('(display-mode: standalone)').matches;

/**
 * @returns Whether the site is running in ChromeOS
 */
export const isChromeOS = () =>
  typeof navigator !== 'undefined' &&
  // https://stackoverflow.com/questions/29657165/detecting-chrome-os-with-javascript
  /\bCrOS\b/.test(navigator.userAgent);

export const DeviceAttributes = {
  ChromeOS: 'chrome',
  PWA: 'pwa',
  Default: 'default',
};
