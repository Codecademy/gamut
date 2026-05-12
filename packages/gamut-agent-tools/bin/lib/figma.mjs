import { stat } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';

/**
 * Walk up from `startDir` looking for a `figma.config.json` file.
 * Returns the directory containing it, or null if not found before the filesystem root.
 *
 * @param {string} startDir
 * @returns {Promise<string | null>}
 */
export async function findFigmaConfigDir(startDir) {
  let dir = startDir;
  while (true) {
    const st = await stat(join(dir, 'figma.config.json')).catch(() => null);
    if (st?.isFile()) return dir;
    const parent = dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

/**
 * Resolves the destination directory for the guidelines/ folder.
 *
 * Priority:
 *   1. --output <path> if provided (treated as the parent directory)
 *   2. Directory containing the nearest figma.config.json (walking up from cwd)
 *
 * Throws with actionable guidance if neither resolves.
 *
 * @param {string | undefined} outputArg
 * @returns {Promise<{ path: string; discovered: boolean }>}
 */
export async function resolveFigmaOutput(outputArg) {
  if (outputArg) {
    return { path: resolve(outputArg), discovered: false };
  }

  const dir = await findFigmaConfigDir(process.cwd());
  if (dir) {
    return { path: join(dir, 'guidelines'), discovered: true };
  }

  throw new Error(
    `Could not find figma.config.json in ${process.cwd()} or any parent directory.\n` +
      `Provide the destination explicitly with --output:\n` +
      `  gamut-agent-tools plugin install figma --output /path/to/your/project/guidelines`
  );
}
