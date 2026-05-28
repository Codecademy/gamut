import { log } from '../../lib/io.mjs';
import { getFlag } from '../../lib/resolve-plugin-dir.mjs';
import install, { TARGETS } from './install.mjs';

export function help() {
  log(`
Usage:
  gamut plugin update [target] [options]

Update the Gamut plugin in an AI or design tool.
Equivalent to re-running install — replaces the existing installation in place.

Arguments:
  target               Tool to update (default: cursor)
                       cursor | claude

Options:
  --scope <scope>      Content to update (default: all)
                       all | skills | rules | agents
  --theme <theme>      Refresh ./DESIGN.md (same themes as install)
  --force              Overwrite existing DESIGN.md when using --theme
  --plugin-dir <path>  Override the bundled agent-tools directory
  -h, --help           Show this help message

Examples:
  gamut plugin update
  gamut plugin update claude
  gamut plugin update cursor --theme core --force
  gamut plugin update cursor --scope skills
`);
}

/**
 * gamut plugin update [cursor|claude] [--scope all|skills|rules|agents]
 *                                           [--plugin-dir <path>]
 *
 * Re-runs install with the same arguments. For Cursor this does an in-place
 * copy replacing any existing installation. For Claude Code it updates the
 * marketplace entry and re-installs.
 *
 * @param {string[]} args
 */
export default async function update(args) {
  const target = args.find((a) => !a.startsWith('-')) ?? 'cursor';
  const scope = getFlag(args, '--scope', 'all') ?? 'all';

  if (!TARGETS.includes(target)) {
    throw new Error(
      `Unknown target: "${target}". Choose from: ${TARGETS.join(', ')}`
    );
  }

  log(
    `Updating Gamut plugin for ${target}${
      scope !== 'all' ? ` (scope: ${scope})` : ''
    }…`
  );
  await install(args);
}
