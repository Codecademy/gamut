import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * Reads .claude-plugin/marketplace.json and returns a "name@marketplace" plugin spec.
 *
 * @param {string} sourceRoot
 * @returns {Promise<string>}
 */
export async function claudePluginSpec(sourceRoot) {
  const mp = join(sourceRoot, '.claude-plugin', 'marketplace.json');
  let text;
  try {
    text = await readFile(mp, 'utf8');
  } catch {
    throw new Error(
      `Missing ${mp}.\n` +
        `A .claude-plugin/marketplace.json is required for Claude Code installation.`
    );
  }

  const json =
    /** @type {{ name?: string; plugins?: Array<{ name?: string; source?: string }> }} */ (
      JSON.parse(text)
    );
  const { name: marketplaceName, plugins } = json;

  if (!marketplaceName || !Array.isArray(plugins) || plugins.length === 0) {
    throw new Error(
      `Invalid marketplace.json — needs "name" and "plugins[]": ${mp}`
    );
  }

  const entry =
    plugins.find(
      (p) => p.source === './' || p.source === '.' || p.source == null
    ) ?? plugins[0];

  if (!entry?.name) {
    throw new Error(
      `No plugin name found in marketplace.json plugins[]: ${mp}`
    );
  }

  return `${entry.name}@${marketplaceName}`;
}

/**
 * Returns just the marketplace name portion of a plugin spec ("name@marketplace").
 *
 * @param {string} spec
 * @returns {string}
 */
export function marketplaceName(spec) {
  const name = spec.split('@')[1];
  if (!name)
    throw new Error(
      `Could not parse marketplace name from plugin spec: ${spec}`
    );
  return name;
}
