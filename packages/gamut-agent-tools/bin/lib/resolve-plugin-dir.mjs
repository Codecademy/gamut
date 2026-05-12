import { existsSync } from 'node:fs';
import { stat } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Package root for @codecademy/gamut-agent-tools (this file lives in bin/lib/).
 *
 * @returns {string}
 */
function bundledPackageRoot() {
  return dirname(dirname(dirname(fileURLToPath(import.meta.url))));
}

/**
 * Returns the absolute path to the @codecademy/gamut-agent-tools package
 * root (the installed assets directory), or the value of --plugin-dir if provided.
 *
 * @param {string[]} args
 * @returns {Promise<string>}
 */
export async function resolvePluginDir(args) {
  const override = getFlag(args, '--plugin-dir');
  if (override) {
    const abs = resolve(override);
    const st = await stat(abs).catch(() => null);
    if (!st?.isDirectory()) {
      throw new Error(`--plugin-dir path not found: ${abs}`);
    }
    return abs;
  }

  const root = bundledPackageRoot();
  const pkgJson = join(root, 'package.json');
  if (!existsSync(pkgJson)) {
    throw new Error(
      'Could not locate @codecademy/gamut-agent-tools package root. Pass --plugin-dir <path> to your agent-tools directory.'
    );
  }

  const st = await stat(root).catch(() => null);
  if (!st?.isDirectory()) {
    throw new Error(`Invalid package root: ${root}`);
  }

  return root;
}

/**
 * @param {string[]} argv
 * @param {string} flag
 * @param {string} [fallback]
 * @returns {string | undefined}
 */
export function getFlag(argv, flag, fallback) {
  const idx = argv.indexOf(flag);
  return idx !== -1 ? argv[idx + 1] : fallback;
}
