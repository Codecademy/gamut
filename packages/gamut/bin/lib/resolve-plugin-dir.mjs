import { stat } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Returns the absolute path to the bundled agent-tools directory, or the
 * value of --plugin-dir if provided.
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

  // agent-tools/ is bundled at <package-root>/agent-tools/ relative to bin/lib/
  return resolve(__dirname, '..', '..', 'agent-tools');
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
