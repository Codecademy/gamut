import { readFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';

/** @returns {string} */
export function cursorPluginsRoot() {
  return process.env.CURSOR_PLUGINS_LOCAL ?? join(homedir(), '.cursor', 'plugins', 'local');
}

/**
 * Reads the .cursor-plugin/plugin.json manifest and derives a folder name.
 * Falls back to "gamut-agent-tools" if no manifest is found.
 *
 * @param {string} sourceRoot
 * @returns {Promise<string>}
 */
export async function cursorFolderName(sourceRoot) {
  const manifest = join(sourceRoot, '.cursor-plugin', 'plugin.json');
  try {
    const text = await readFile(manifest, 'utf8');
    const json = /** @type {{ name?: string }} */ (JSON.parse(text));
    if (json.name && typeof json.name === 'string') {
      return json.name.replace(/^@/, '').replace(/\//g, '-');
    }
  } catch {
    // no manifest — use default
  }
  return 'gamut-agent-tools';
}

/**
 * Returns the absolute path where the plugin is/should be installed for Cursor.
 *
 * @param {string} sourceRoot
 * @returns {Promise<string>}
 */
export async function cursorDestPath(sourceRoot) {
  const folderName = await cursorFolderName(sourceRoot);
  return join(cursorPluginsRoot(), folderName);
}
