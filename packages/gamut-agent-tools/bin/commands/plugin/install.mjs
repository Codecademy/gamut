import { cp, mkdir, readdir, rm, symlink } from 'node:fs/promises';
import { join, resolve } from 'node:path';

import { claudePluginSpec, marketplaceName } from '../../lib/claude.mjs';
import { cursorDestPath } from '../../lib/cursor.mjs';
import { resolveFigmaOutput } from '../../lib/figma.mjs';
import { getFlag, resolvePluginDir } from '../../lib/resolve-plugin-dir.mjs';
import { runCommand } from '../../lib/run-command.mjs';

export const TARGETS = ['cursor', 'claude', 'figma'];
export const SCOPES = ['all', 'skills', 'rules', 'commands', 'agents'];

export function help() {
  console.log(`
Usage: gamut-agent-tools plugin install [cursor|claude|figma] [options]

Full reference (targets, scopes, figma --output, --plugin-dir, examples):
  https://github.com/Codecademy/gamut/tree/main/packages/gamut-agent-tools#readme
`);
}

// ---------------------------------------------------------------------------

/** Directories in the plugin source that should not be installed to Cursor. */
const CURSOR_IGNORE = new Set([
  '.claude-plugin', // Claude Code manifest — not a Cursor concept
  'guidelines', // Figma Make only
]);

/** @param {string} sourceRoot @param {string} scope */
async function installCursor(sourceRoot, scope) {
  const dest = await cursorDestPath(sourceRoot);

  if ((process.env.CURSOR_INSTALL_METHOD ?? 'copy') !== 'copy') {
    // Symlink the whole plugin dir (dev convenience)
    await rm(dest, { recursive: true, force: true });
    await symlink(resolve(sourceRoot), dest, 'dir');
    console.log(`Cursor: symlinked to ${dest}`);
    return;
  }

  // Selective copy: always include the cursor manifest, then scoped content dirs
  await rm(dest, { recursive: true, force: true });
  await mkdir(dest, { recursive: true });

  await cp(`${sourceRoot}/.cursor-plugin`, `${dest}/.cursor-plugin`, {
    recursive: true,
  });

  let dirs;
  if (scope === 'all') {
    const entries = await readdir(sourceRoot, { withFileTypes: true });
    dirs = entries
      .filter(
        (e) =>
          e.isDirectory() &&
          !e.name.startsWith('.') &&
          !CURSOR_IGNORE.has(e.name)
      )
      .map((e) => e.name);
  } else {
    dirs = [scope];
  }

  for (const dir of dirs) {
    await cp(`${sourceRoot}/${dir}`, `${dest}/${dir}`, {
      recursive: true,
    }).catch(() => {
      // directory may be empty/missing — not an error
    });
  }

  const scopeLabel = scope === 'all' ? 'all content' : scope;
  console.log(`Cursor: installed (${scopeLabel}) → ${dest}`);
}

// Claude Code only loads from recognized plugin directories: skills/, commands/, agents/.
// rules/ is Cursor-specific (.mdc format); .cursor-plugin/ and guidelines/ are also
// present in sourceRoot but ignored by Claude Code.

/** @param {string} sourceRoot */
async function installClaude(sourceRoot) {
  const spec = await claudePluginSpec(sourceRoot);
  const mpName = marketplaceName(spec);
  const root = resolve(sourceRoot);

  let code = await runCommand('claude', [
    'plugin',
    'marketplace',
    'add',
    root,
    '--scope',
    'user',
  ]);
  if (code !== 0) {
    console.warn(
      `warning: "claude plugin marketplace add" exited ${code} — ` +
        `if it's already registered this is safe to ignore.`
    );
    code = await runCommand('claude', [
      'plugin',
      'marketplace',
      'update',
      mpName,
    ]);
    if (code !== 0) {
      throw new Error(
        `claude plugin marketplace add/update failed (exit ${code}).\n` +
          `Try manually: claude plugin marketplace add ${root}`
      );
    }
  }

  code = await runCommand('claude', [
    'plugin',
    'install',
    spec,
    '--scope',
    'user',
  ]);
  if (code !== 0) {
    throw new Error(
      `claude plugin install failed (exit ${code}).\n` +
        `Try manually: claude plugin install ${spec} --scope user`
    );
  }

  console.log(`Claude Code: installed ${spec} (user scope)`);
  console.log(
    `  Tip: run /reload-plugins in Claude Code if skills don't appear immediately.`
  );
  console.log(`  One-off without install: claude --plugin-dir ${root}`);
}

/**
 * @param {string} sourceRoot
 * @param {string | undefined} outputArg
 */
async function installFigma(sourceRoot, outputArg) {
  const src = join(sourceRoot, 'guidelines');
  const { path: dest, discovered } = await resolveFigmaOutput(outputArg);

  if (discovered) {
    console.log(`Figma: found figma.config.json — installing to ${dest}`);
  }

  await rm(dest, { recursive: true, force: true });
  await cp(src, dest, { recursive: true });
  console.log(`Figma: installed guidelines/ → ${dest}`);
  console.log(
    `  In Figma Make, point your kit at this guidelines/ directory for design system context.`
  );
}

// ---------------------------------------------------------------------------

/**
 * gamut-agent-tools plugin install [cursor|claude|figma] [--scope …] [--plugin-dir …]
 *
 * @param {string[]} args
 */
export default async function install(args) {
  const target = args.find((a) => !a.startsWith('-')) ?? 'cursor';
  const scope = getFlag(args, '--scope', 'all') ?? 'all';

  if (!TARGETS.includes(target)) {
    throw new Error(
      `Unknown target: "${target}". Choose from: ${TARGETS.join(', ')}`
    );
  }
  if (!SCOPES.includes(scope)) {
    throw new Error(
      `Unknown scope: "${scope}". Choose from: ${SCOPES.join(', ')}`
    );
  }

  const pluginDir = await resolvePluginDir(args);

  if (target === 'cursor') {
    await installCursor(pluginDir, scope);
  } else if (target === 'claude') {
    await installClaude(pluginDir);
  } else if (target === 'figma') {
    const output = getFlag(args, '--output', undefined);
    await installFigma(pluginDir, output);
  }
}
