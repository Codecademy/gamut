import gamutImportPaths from './gamut-import-paths';
import noCssStandalone from './no-css-standalone';
import preferThemed from './prefer-themed';
import recommended from './recommended';

const rules = {
  'import-paths': gamutImportPaths,
  'no-css-standalone': noCssStandalone,
  'prefer-themed': preferThemed,
};

export { rules, recommended };
