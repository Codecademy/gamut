#!/usr/bin/env node
/**
 * Run type-check (verify) with React 18 types to find components that still
 * require onScrollEnd/onScrollEndCapture for React 18 consumers.
 *
 * Usage: node script/verify-gamut-react18-types.js
 *
 * Switches to React 18, runs `yarn nx run gamut:verify` (or root verify),
 * then restores package.json. If type errors mention onScrollEnd or
 * onScrollEndCapture, those components need OptionalScrollProps (or to
 * extend a type that already has it).
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const repoRoot = path.join(__dirname, '..');
const pkgPath = path.join(repoRoot, 'package.json');
const pkgBackup = fs.readFileSync(pkgPath, 'utf8');

function run(cmd, args, opts = {}) {
  return spawnSync(cmd, args, {
    cwd: repoRoot,
    shell: true,
    encoding: 'utf8',
    ...opts,
  });
}

let exitCode = 0;
try {
  run('node', ['script/set-react-resolutions.js', '18']);
  run('yarn', ['install'], {
    stdio: 'pipe',
    env: { ...process.env, CI: undefined },
  });

  const result = run('yarn', ['nx', 'run', 'gamut:verify'], {
    encoding: 'utf8',
    stdio: 'pipe',
  });

  if (result.status !== 0 && result.stderr) {
    const out = (result.stderr + result.stdout).toLowerCase();
    if (out.includes('onscrollend')) {
      console.error(
        '\nReact 18 type check failed with onScrollEnd/onScrollEndCapture errors.\n' +
          'Search the output above for "onScrollEnd" to see which component props need OptionalScrollProps.\n'
      );
    }
  }
  exitCode = result.status;
} finally {
  fs.writeFileSync(pkgPath, pkgBackup);
  run('yarn', ['install'], {
    stdio: 'pipe',
    env: { ...process.env, CI: undefined },
  });
}

process.exit(exitCode);
