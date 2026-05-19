import { stat } from 'node:fs/promises';

import { cursorDestPath } from '../../lib/cursor.mjs';
import { log } from '../../lib/io.mjs';
import { resolvePluginDir } from '../../lib/resolve-plugin-dir.mjs';

export function help() {
  log(`
Usage:
  gamut plugin list [options]

Show installation status for all supported targets.

Options:
  --plugin-dir <path>  Override the bundled agent-tools directory
  -h, --help           Show this help message

Examples:
  gamut plugin list
`);
}

// ---------------------------------------------------------------------------

/** @param {string} sourceRoot */
async function cursorStatus(sourceRoot) {
  const dest = await cursorDestPath(sourceRoot);
  const installed = !!(await stat(dest).catch(() => null));
  return {
    target: 'cursor',
    status: installed ? '✓ installed' : '✗ not installed',
    notes: installed ? dest : 'run: gamut plugin install cursor',
  };
}

async function claudeStatus() {
  // Claude Code doesn't expose a stable filesystem path we can check.
  return {
    target: 'claude',
    status: '? unknown',
    notes: 'run: claude plugin list',
  };
}

// ---------------------------------------------------------------------------

/**
 * gamut plugin list
 *
 * Shows installation status for each supported target.
 *
 * @param {string[]} args
 */
export default async function list(args) {
  const pluginDir = await resolvePluginDir(args);

  const rows = await Promise.all([cursorStatus(pluginDir), claudeStatus()]);

  const col0 = Math.max(...rows.map((r) => r.target.length));
  const col1 = Math.max(...rows.map((r) => r.status.length));

  const header = `${'Target'.padEnd(col0)}  ${'Status'.padEnd(
    col1
  )}  Path / Notes`;
  const rule = '─'.repeat(header.length);

  log(`\n${header}`);
  log(rule);
  for (const row of rows) {
    log(`${row.target.padEnd(col0)}  ${row.status.padEnd(col1)}  ${row.notes}`);
  }
  log('');
}
