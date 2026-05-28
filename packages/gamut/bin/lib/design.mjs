import { copyFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

/** @type {Record<string, { sourceFile: string, label: string }>} */
const THEME_ALIASES = {
  core: { sourceFile: 'DESIGN.Codecademy.md', label: 'Codecademy (Core)' },
  codecademy: {
    sourceFile: 'DESIGN.Codecademy.md',
    label: 'Codecademy (Core)',
  },
  cc: { sourceFile: 'DESIGN.Codecademy.md', label: 'Codecademy (Core)' },
  admin: { sourceFile: 'DESIGN.Codecademy.md', label: 'Codecademy (Admin)' },
  platform: {
    sourceFile: 'DESIGN.Codecademy.md',
    label: 'Codecademy (Platform)',
  },
  percipio: { sourceFile: 'DESIGN.Percipio.md', label: 'Percipio' },
  lxstudio: { sourceFile: 'DESIGN.LXStudio.md', label: 'LX Studio' },
  'lx-studio': { sourceFile: 'DESIGN.LXStudio.md', label: 'LX Studio' },
};

const CANONICAL_THEMES = ['core', 'admin', 'platform', 'percipio', 'lxstudio'];

/**
 * @param {string} name
 * @returns {{ sourceFile: string, label: string, alias: string }}
 */
export function resolveTheme(name) {
  const alias = name.trim().toLowerCase();
  const entry = THEME_ALIASES[alias];
  if (!entry) {
    throw new Error(
      `Unknown theme: "${name}". Choose from: ${CANONICAL_THEMES.join(', ')} ` +
        `(aliases: codecademy, cc, lx-studio, …).`
    );
  }
  return { ...entry, alias };
}

/** @returns {string[]} */
export function listCanonicalThemes() {
  return [...CANONICAL_THEMES];
}

/**
 * @param {string} sourceRoot agent-tools directory
 * @param {string} cwd destination directory (app repo root)
 * @param {string} theme
 * @param {{ force?: boolean }} [options]
 * @returns {Promise<{ dest: string, label: string }>}
 */
export async function installDesignMd(sourceRoot, cwd, theme, options = {}) {
  const { sourceFile, label } = resolveTheme(theme);
  const src = join(sourceRoot, sourceFile);
  const dest = join(cwd, 'DESIGN.md');

  const srcStat = await stat(src).catch(() => null);
  if (!srcStat?.isFile()) {
    throw new Error(`DESIGN source not found: ${src}`);
  }

  const destStat = await stat(dest).catch(() => null);
  if (destStat?.isFile() && !options.force) {
    throw new Error(
      `DESIGN.md already exists at ${dest}. Use --force to overwrite, or remove it first.`
    );
  }

  await copyFile(src, dest);
  return { dest, label };
}
