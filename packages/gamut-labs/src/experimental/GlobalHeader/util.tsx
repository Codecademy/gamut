import { headerHeightVarName } from './consts';

export function getGlobalHeaderHeight(): number {
  return parseInt(
    getComputedStyle(document.documentElement).getPropertyValue(
      headerHeightVarName
    ),
    10
  );
}
