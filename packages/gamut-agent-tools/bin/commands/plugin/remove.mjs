import { rm, stat } from 'node:fs/promises';

import { claudePluginSpec, marketplaceName } from '../../lib/claude.mjs';
import { cursorDestPath } from '../../lib/cursor.mjs';
import { resolveFigmaOutput } from '../../lib/figma.mjs';
import { getFlag, resolvePluginDir } from '../../lib/resolve-plugin-dir.mjs';
import { runCommand } from '../../lib/run-command.mjs';
import { TARGETS } from './install.mjs';

export function help() {
  console.log(`
Usage: gamut-agent-tools plugin remove [cursor|claude|figma] [options]

Full reference: https://github.com/Codecademy/gamut/tree/main/packages/gamut-agent-tools#readme
`);
}

// ---------------------------------------------------------------------------

/** @param {string} sourceRoot */
async function removeCursor(sourceRoot) {
  const dest = await cursorDestPath(sourceRoot);
  const st = await stat(dest).catch(() => null);

  if (!st) {
    console.log(`Cursor: nothing to remove — ${dest} does not exist.`);
    return;
  }

  await rm(dest, { recursive: true, force: true });
  console.log(`Cursor: removed ${dest}`);
}

/** @param {string} sourceRoot */
async function removeClaude(sourceRoot) {
  const spec = await claudePluginSpec(sourceRoot);
  const mpName = marketplaceName(spec);
  const pluginName = spec.split('@')[0];

  let code = await runCommand('claude', [
    'plugin',
    'remove',
    pluginName,
    '--scope',
    'user',
  ]);
  if (code !== 0) {
    console.warn(
      `warning: "claude plugin remove" exited ${code} — the plugin may not have been installed.`
    );
  } else {
    console.log(`Claude Code: removed plugin "${pluginName}"`);
  }

  code = await runCommand('claude', [
    'plugin',
    'marketplace',
    'remove',
    mpName,
  ]);
  if (code !== 0) {
    console.warn(
      `warning: "claude plugin marketplace remove" exited ${code} — ` +
        `the marketplace entry may not exist or the command syntax may differ. ` +
        `Run "claude plugin marketplace list" to check.`
    );
  } else {
    console.log(`Claude Code: removed marketplace "${mpName}"`);
  }
}

/** @param {string | undefined} outputArg */
async function removeFigma(outputArg) {
  const { path: dest } = await resolveFigmaOutput(outputArg);
  const st = await stat(dest).catch(() => null);

  if (!st) {
    console.log(`Figma: nothing to remove — ${dest} does not exist.`);
    return;
  }

  await rm(dest, { force: true });
  console.log(`Figma: removed ${dest}`);
}

// ---------------------------------------------------------------------------

/**
 * gamut-agent-tools plugin remove [cursor|claude|figma] [--plugin-dir <path>]
 *
 * @param {string[]} args
 */
export default async function remove(args) {
  const target = args.find((a) => !a.startsWith('-')) ?? 'cursor';

  if (!TARGETS.includes(target)) {
    throw new Error(
      `Unknown target: "${target}". Choose from: ${TARGETS.join(', ')}`
    );
  }

  const pluginDir = await resolvePluginDir(args);

  if (target === 'cursor') {
    await removeCursor(pluginDir);
  } else if (target === 'claude') {
    await removeClaude(pluginDir);
  } else if (target === 'figma') {
    const output = getFlag(args, '--output', undefined);
    await removeFigma(output);
  }
}
