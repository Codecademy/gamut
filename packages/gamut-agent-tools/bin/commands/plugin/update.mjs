import { getFlag } from '../../lib/resolve-plugin-dir.mjs';
import install, { TARGETS } from './install.mjs';

export function help() {
  console.log(`
Usage: gamut-agent-tools plugin update [cursor|claude|figma] [options]

Full reference: https://github.com/Codecademy/gamut/tree/main/packages/gamut-agent-tools#readme
`);
}

/**
 * gamut-agent-tools plugin update [cursor|claude|figma] [--scope …] [--plugin-dir …]
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

  console.log(
    `Updating Gamut plugin for ${target}${
      scope !== 'all' ? ` (scope: ${scope})` : ''
    }…`
  );
  await install(args);
}
