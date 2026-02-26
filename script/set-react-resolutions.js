#!/usr/bin/env node
/**
 * Sets package.json resolutions (and root dependencies) for React 18 or 19.
 * Usage: node script/set-react-resolutions.js <18|19>
 * Used by CI and by test:gamut:react18 / test:gamut:react19 for local runs.
 */

const fs = require('fs');
const path = require('path');

const version = process.argv[2];
if (version !== '18' && version !== '19') {
  console.error('Usage: node script/set-react-resolutions.js <18|19>');
  process.exit(1);
}

const pkgPath = path.join(__dirname, '..', 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

const resolutions = {
  18: {
    react: '^18.3.0',
    'react-dom': '^18.3.0',
    '@types/react': '^18.2.0',
    '@types/react-dom': '^18.2.0',
  },
  19: {
    react: '^19.0.0',
    'react-dom': '^19.0.0',
    '@types/react': '^19.0.0',
    '@types/react-dom': '^19.0.0',
  },
};

const next = resolutions[version];
if (!pkg.resolutions) pkg.resolutions = {};
Object.assign(pkg.resolutions, next);

if (pkg.dependencies) {
  if (pkg.dependencies.react) pkg.dependencies.react = next.react;
  if (pkg.dependencies['react-dom']) pkg.dependencies['react-dom'] = next['react-dom'];
}
if (pkg.devDependencies) {
  if (pkg.devDependencies['@types/react']) pkg.devDependencies['@types/react'] = next['@types/react'];
  if (pkg.devDependencies['@types/react-dom']) pkg.devDependencies['@types/react-dom'] = next['@types/react-dom'];
}

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log(`Set React resolutions to ${version}.x`);
