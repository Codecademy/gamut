#!/usr/bin/env node
/**
 * Run the Gamut test suite with a specific React major (18 or 19), then restore package.json.
 * Usage: node script/test-gamut-react-version.js <18|19>
 * Used by yarn test:gamut:react18 and yarn test:gamut:react19.
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const version = process.argv[2];
if (version !== '18' && version !== '19') {
  console.error('Usage: node script/test-gamut-react-version.js <18|19>');
  process.exit(1);
}

const repoRoot = path.join(__dirname, '..');
const pkgPath = path.join(repoRoot, 'package.json');
const pkgBackup = fs.readFileSync(pkgPath, 'utf8');

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, {
    stdio: 'inherit',
    cwd: repoRoot,
    shell: true,
    ...opts,
  });
  return r.status;
}

let exitCode = 0;
try {
  run('node', ['script/set-react-resolutions.js', version]);
  // Allow lockfile to change when switching React version (avoid immutable install failure)
  const installStatus = run('yarn', ['install'], {
    env: { ...process.env, CI: undefined },
  });
  if (installStatus !== 0) {
    console.error('yarn install failed');
    exitCode = installStatus;
  } else {
    exitCode = run('yarn', ['test:gamut']);
  }
} finally {
  fs.writeFileSync(pkgPath, pkgBackup);
  run('yarn', ['install'], {
    stdio: 'pipe',
    env: { ...process.env, CI: undefined },
  });
}
process.exit(exitCode);
