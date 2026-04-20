import { copyFile, cp, mkdir, rm, symlink } from 'node:fs/promises';
import { join, resolve } from 'node:path';

import { claudePluginSpec, marketplaceName } from '../../lib/claude.mjs';
import { cursorDestPath } from '../../lib/cursor.mjs';
import { getFlag, resolvePluginDir } from '../../lib/resolve-plugin-dir.mjs';
import { runCommand } from '../../lib/run-command.mjs';

export const TARGETS = ['cursor', 'claude', 'figma'];
export const SCOPES = ['all', 'skills', 'rules', 'commands', 'agents'];

export function help() {
  console.log(`
Usage:
  gamut plugin install [target] [options]

Install the Gamut plugin into an AI or design tool.

Arguments:
  target               Tool to install into (default: cursor)
                       cursor | claude | figma

Options:
  --scope <scope>      Content to install (default: all)
                       all | skills | rules | commands | agents
  --output <path>      [figma] Destination for DESIGN.md (default: ./DESIGN.md)
  --plugin-dir <path>  Override the bundled agent-tools directory
  -h, --help           Show this help message

Examples:
  gamut plugin install
  gamut plugin install claude
  gamut plugin install figma
  gamut plugin install figma --output ./docs/DESIGN.md
  gamut plugin install cursor --scope skills
  gamut plugin install cursor --plugin-dir ./my-agent-tools
`);
}

// ---------------------------------------------------------------------------

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

  await cp(`${sourceRoot}/.cursor-plugin`, `${dest}/.cursor-plugin`, { recursive: true });

  const dirs = scope === 'all' ? ['skills', 'rules', 'commands', 'agents'] : [scope];
  for (const dir of dirs) {
    await cp(`${sourceRoot}/${dir}`, `${dest}/${dir}`, { recursive: true }).catch(() => {
      // directory may be empty/missing — not an error
    });
  }

  const scopeLabel = scope === 'all' ? 'all content' : scope;
  console.log(`Cursor: installed (${scopeLabel}) → ${dest}`);
}

/** @param {string} sourceRoot */
async function installClaude(sourceRoot) {
  const spec = await claudePluginSpec(sourceRoot);
  const mpName = marketplaceName(spec);
  const root = resolve(sourceRoot);

  let code = await runCommand('claude', ['plugin', 'marketplace', 'add', root, '--scope', 'user']);
  if (code !== 0) {
    console.warn(
      `warning: "claude plugin marketplace add" exited ${code} — ` +
        `if it's already registered this is safe to ignore.`,
    );
    code = await runCommand('claude', ['plugin', 'marketplace', 'update', mpName]);
    if (code !== 0) {
      throw new Error(
        `claude plugin marketplace add/update failed (exit ${code}).\n` +
          `Try manually: claude plugin marketplace add ${root}`,
      );
    }
  }

  code = await runCommand('claude', ['plugin', 'install', spec, '--scope', 'user']);
  if (code !== 0) {
    throw new Error(
      `claude plugin install failed (exit ${code}).\n` +
        `Try manually: claude plugin install ${spec} --scope user`,
    );
  }

  console.log(`Claude Code: installed ${spec} (user scope)`);
  console.log(`  Tip: run /reload-plugins in Claude Code if skills don't appear immediately.`);
  console.log(`  One-off without install: claude --plugin-dir ${root}`);
}

/**
 * @param {string} sourceRoot
 * @param {string | undefined} outputArg
 */
async function installFigma(sourceRoot, outputArg) {
  const src = join(sourceRoot, 'DESIGN.md');
  const dest = resolve(outputArg ?? join(process.cwd(), 'DESIGN.md'));

  await copyFile(src, dest);
  console.log(`Figma: installed DESIGN.md → ${dest}`);
  console.log(`  Open this file in your design tool or share it with Figma AI for design system context.`);
}

// ---------------------------------------------------------------------------

/**
 * gamut plugin install [cursor|claude|figma] [--scope all|skills|rules|commands|agents]
 *                                            [--plugin-dir <path>]
 *
 * @param {string[]} args
 */
export default async function install(args) {
  const target = args.find((a) => !a.startsWith('-')) ?? 'cursor';
  const scope = getFlag(args, '--scope', 'all') ?? 'all';

  if (!TARGETS.includes(target)) {
    throw new Error(`Unknown target: "${target}". Choose from: ${TARGETS.join(', ')}`);
  }
  if (!SCOPES.includes(scope)) {
    throw new Error(`Unknown scope: "${scope}". Choose from: ${SCOPES.join(', ')}`);
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
