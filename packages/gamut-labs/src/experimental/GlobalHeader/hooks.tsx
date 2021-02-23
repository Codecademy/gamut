export function getGlobalHeaderHeight(): number {
  return parseInt(
    getComputedStyle(document.documentElement).getPropertyValue(
      '--global-header-height'
    ),
    10
  );
}
