import { stat } from 'node:fs/promises';

import { cursorDestPath } from '../../lib/cursor.mjs';
import { findFigmaConfigDir } from '../../lib/figma.mjs';
import { getFlag, resolvePluginDir } from '../../lib/resolve-plugin-dir.mjs';

export function help() {
  console.log(`
Usage:
  gamut plugin list [options]

Show installation status for all supported targets.

Options:
  --output <path>      [figma] Explicit path to DESIGN.md.
                       If omitted, walks up from cwd to find figma.config.json.
  --plugin-dir <path>  Override the bundled agent-tools directory
  -h, --help           Show this help message

Examples:
  gamut plugin list
  gamut plugin list --output ./docs/DESIGN.md
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

/** @param {string | undefined} outputArg */
async function figmaStatus(outputArg) {
  let dest;
  if (outputArg) {
    dest = outputArg;
  } else {
    const dir = await findFigmaConfigDir(process.cwd());
    dest = dir ? `${dir}/DESIGN.md` : null;
  }

  if (!dest) {
    return {
      target: 'figma',
      status: '? unknown',
      notes: 'figma.config.json not found — run from your project root or use --output',
    };
  }

  const installed = !!(await stat(dest).catch(() => null));
  return {
    target: 'figma',
    status: installed ? '✓ installed' : '✗ not installed',
    notes: installed ? dest : `run: gamut plugin install figma`,
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
  const output = getFlag(args, '--output', undefined);

  const rows = await Promise.all([
    cursorStatus(pluginDir),
    claudeStatus(),
    figmaStatus(output),
  ]);

  const col0 = Math.max(...rows.map((r) => r.target.length));
  const col1 = Math.max(...rows.map((r) => r.status.length));

  const header = `${'Target'.padEnd(col0)}  ${'Status'.padEnd(col1)}  Path / Notes`;
  const rule = '─'.repeat(header.length);

  console.log(`\n${header}`);
  console.log(rule);
  for (const row of rows) {
    console.log(`${row.target.padEnd(col0)}  ${row.status.padEnd(col1)}  ${row.notes}`);
  }
  console.log();
}
