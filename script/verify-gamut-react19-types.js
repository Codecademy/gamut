#!/usr/bin/env node
/**
 * Run type-check (verify) with React 19 types so Gamut source stays valid
 * for consumers on React 19. Catches use of types/APIs that only exist in React 18.
 *
 * Usage: node script/verify-gamut-react19-types.js
 *
 * Switches to React 19 via set-react-resolutions.js, runs `yarn nx run gamut:verify`,
 * then restores package.json.
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
  run('node', ['script/set-react-resolutions.js', '19']);
  run('yarn', ['install'], {
    stdio: 'pipe',
    env: { ...process.env, CI: undefined },
  });

  const result = run('yarn', ['nx', 'run', 'gamut:verify'], {
    encoding: 'utf8',
    stdio: 'pipe',
  });

  exitCode = result.status;
  if (result.status !== 0 && (result.stderr || result.stdout)) {
    console.error(result.stderr || result.stdout);
  }
} finally {
  fs.writeFileSync(pkgPath, pkgBackup);
  run('yarn', ['install'], {
    stdio: 'pipe',
    env: { ...process.env, CI: undefined },
  });
}

process.exit(exitCode);
