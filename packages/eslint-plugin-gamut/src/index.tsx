import gamutImportPaths from './gamut-import-paths';
import noCssStandalone from './no-css-standalone';
import preferThemed from './prefer-themed';
import recommended from './recommended';

const rules = {
  'no-css-standalone': noCssStandalone,
  'prefer-themed': preferThemed,
  'gamut-import-paths': gamutImportPaths,
};

export { rules, recommended };
