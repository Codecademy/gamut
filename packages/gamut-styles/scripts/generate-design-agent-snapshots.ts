/**
 * Generates theme-aware YAML frontmatter for packages/gamut/agent-tools/DESIGN.*.md
 * from built Gamut themes (single source of truth in src/themes).
 *
 * Preserves each file's Markdown body (everything after the closing --- of frontmatter).
 */

import { flattenScale } from '@codecademy/variance';
import fs from 'fs';
import path from 'path';

import { adminTheme } from '../src/themes/admin';
import { coreTheme } from '../src/themes/core';
import { lxStudioTheme } from '../src/themes/lxStudio';
import { percipioTheme } from '../src/themes/percipio';
import { platformTheme } from '../src/themes/platform';

const ROOT = path.join(__dirname, '..');
const AGENT_TOOLS_DIR = path.join(ROOT, '../gamut/agent-tools');
const COMPONENTS_FRAGMENT = path.join(
  AGENT_TOOLS_DIR,
  'design-snapshots/components.fragment.yml'
);

type TokenTheme = {
  name?: string;
  borderRadii: Record<string, string>;
  breakpoints: Record<string, string>;
  borders: Record<string, string>;
  spacing: Record<string, string>;
  fontFamily: Record<string, string>;
  fontSize: Record<string, string>;
  fontWeight: Record<string, string | number>;
  lineHeight: Record<string, number>;
  elements: Record<string, string>;
  modes: Record<string, Record<string, unknown>>;
  _tokens?: {
    colors?: Record<string, string>;
    modes?: Record<string, Record<string, string>>;
    elements?: Record<string, unknown>;
  };
};

type ThemeEntry = {
  theme: TokenTheme;
  file: string;
  name: string;
  description: string;
  defaultBody: string | null;
};

const THEME_CONFIG: ThemeEntry[] = [
  {
    theme: coreTheme as TokenTheme,
    file: 'DESIGN.Codecademy.md',
    name: 'Codecademy Design System',
    description: 'Design tokens for codecademy.com (Core theme)',
    defaultBody: null,
  },
  {
    theme: percipioTheme as TokenTheme,
    file: 'DESIGN.Percipio.md',
    name: 'Percipio Design System',
    description: 'Design tokens for the Skillsoft Percipio platform',
    defaultBody: null,
  },
  {
    theme: lxStudioTheme as TokenTheme,
    file: 'DESIGN.LXStudio.md',
    name: 'LX Studio Design System',
    description: 'Design tokens for the Skillsoft LX Studio authoring platform',
    defaultBody: null,
  },
  {
    theme: adminTheme as TokenTheme,
    file: 'DESIGN.Admin.md',
    name: 'Codecademy Admin Design System',
    description: 'Design tokens for Codecademy admin tools (Admin theme)',
    defaultBody: `# Admin

Design guidance for Codecademy **Admin** mirrors Core unless noted in \`@codecademy/gamut-styles\` (\`adminTheme\`). See [DESIGN.Codecademy.md](./DESIGN.Codecademy.md) for shared patterns, components, and layout rules.

The YAML frontmatter above is the machine-readable token snapshot for \`adminTheme\`.

---

## Admin-specific notes

- Overrides Core primary interactive colors in **light** mode only (\`semantic-to-palette.light.primary\`).
`,
  },
  {
    theme: platformTheme as TokenTheme,
    file: 'DESIGN.Platform.md',
    name: 'Codecademy Platform Design System',
    description:
      'Design tokens for the Codecademy learning environment (Platform theme)',
    defaultBody: `# Platform

Design guidance for the Codecademy **Platform** learning environment mirrors Core unless noted in \`@codecademy/gamut-styles\` (\`platformTheme\`). See [DESIGN.Codecademy.md](./DESIGN.Codecademy.md) for shared patterns.

The YAML frontmatter above includes **editor-*** semantic tokens used by the code workspace in addition to standard UI aliases.

---

## Platform-specific notes

- Extends Core with editor syntax/UI colors and adjusted \`background.primary\` in light mode — see \`semantic-colors\` / \`semantic-to-palette\`.
`,
  },
];

function yamlScalar(value: unknown): string {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value);
  }
  return JSON.stringify(value === undefined ? null : String(value));
}

function sortKeys<T extends Record<string, unknown>>(obj: T): T {
  const out = {} as T;
  for (const key of Object.keys(obj).sort((a, b) => a.localeCompare(b))) {
    out[key as keyof T] = obj[key] as T[keyof T];
  }
  return out;
}

function sortModeKeys(obj: Record<string, unknown>): string[] {
  const keys = Object.keys(obj);
  const preferred = ['light', 'dark'];
  const head = preferred.filter((k) => keys.includes(k));
  const tail = keys
    .filter((k) => !preferred.includes(k))
    .sort((a, b) => a.localeCompare(b));
  return [...head, ...tail];
}

function emitYamlValue(
  value: unknown,
  indent: number,
  options?: { sortKeys?: boolean }
): string {
  const pad = '  '.repeat(indent);
  const alphabetize = options?.sortKeys !== false;
  if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
    const rec = value as Record<string, unknown>;
    const keys = alphabetize
      ? Object.keys(rec).sort((a, b) => a.localeCompare(b))
      : Object.keys(rec);
    const lines: string[] = [];
    for (const key of keys) {
      const v = rec[key];
      if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
        lines.push(`${pad}${key}:`);
        lines.push(emitYamlValue(v, indent + 1, { sortKeys: true }));
      } else {
        lines.push(`${pad}${key}: ${yamlScalar(v)}`);
      }
    }
    return lines.join('\n');
  }
  return `${pad}${yamlScalar(value)}`;
}

function readComponentsFragment(): string {
  const raw = fs.readFileSync(COMPONENTS_FRAGMENT, 'utf8').trimEnd();
  return raw
    .split(/\r?\n/)
    .map((line) => (line.length ? `  ${line}` : line))
    .join('\n');
}

function buildFrontmatter(
  theme: TokenTheme,
  meta: { name: string; description: string }
): string {
  const palette = theme._tokens?.colors ?? {};
  const semanticColors = theme._tokens?.modes ?? {};
  const semanticToPalette: Record<string, Record<string, string>> = {};

  for (const modeName of sortModeKeys(theme.modes ?? {})) {
    const modeConfig = theme.modes[modeName];
    if (!modeConfig || typeof modeConfig !== 'object') continue;
    semanticToPalette[modeName] = flattenScale(modeConfig) as Record<
      string,
      string
    >;
  }

  const sortedPalette = sortKeys({ ...palette }) as Record<string, string>;
  const sortedSemanticColors: Record<string, Record<string, string>> = {};
  for (const mode of sortModeKeys(semanticColors)) {
    sortedSemanticColors[mode] = sortKeys({
      ...(semanticColors[mode] ?? {}),
    }) as Record<string, string>;
  }

  const elementsSource =
    theme._tokens?.elements ??
    (theme.elements as unknown as Record<string, unknown>);

  const headerLines = [
    '# Generated by packages/gamut-styles/scripts/generate-design-agent-snapshots.ts — do not edit by hand.',
    '# Source: packages/gamut-styles/src/themes/*.ts',
    '# Refresh: yarn nx run gamut-styles:generate-agent-design-docs',
    '',
    `version: generated`,
    `name: ${yamlScalar(meta.name)}`,
    `description: ${yamlScalar(meta.description)}`,
    `gamutTheme: ${yamlScalar(theme.name ?? '')}`,
    '',
    'palette:',
    emitYamlValue(sortedPalette, 1),
    '',
    'semantic-colors:',
    emitYamlValue(sortedSemanticColors, 1, { sortKeys: false }),
    '',
    'semantic-to-palette:',
    emitYamlValue(semanticToPalette, 1, { sortKeys: false }),
    '',
    'fontFamily:',
    emitYamlValue(sortKeys({ ...theme.fontFamily }), 1),
    '',
    'fontSize:',
    emitYamlValue(sortKeys({ ...theme.fontSize }), 1),
    '',
    'fontWeight:',
    emitYamlValue(sortKeys({ ...theme.fontWeight }), 1),
    '',
    'lineHeight:',
    emitYamlValue(sortKeys({ ...theme.lineHeight }), 1),
    '',
    'rounded:',
    emitYamlValue(sortKeys({ ...theme.borderRadii }), 1),
    '',
    'spacing:',
    emitYamlValue(sortKeys({ ...theme.spacing }), 1),
    '',
    'breakpoints:',
    emitYamlValue(sortKeys({ ...theme.breakpoints }), 1),
    '',
    'borders:',
    emitYamlValue(sortKeys({ ...theme.borders }), 1),
    '',
    'elements:',
    emitYamlValue(sortKeys({ ...(elementsSource ?? {}) }), 1),
    '',
    'components:',
    readComponentsFragment(),
  ];

  return headerLines.join('\n');
}

const FRONTMATTER_REGEX = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;

function extractBody(
  markdownPath: string,
  fallbackBody: string | null
): string {
  if (!fs.existsSync(markdownPath)) {
    if (!fallbackBody) {
      throw new Error(`Missing ${markdownPath} and no defaultBody`);
    }
    return fallbackBody.endsWith('\n') ? fallbackBody : `${fallbackBody}\n`;
  }
  const content = fs.readFileSync(markdownPath, 'utf8');
  const m = content.match(FRONTMATTER_REGEX);
  if (!m) {
    throw new Error(
      `${markdownPath}: expected YAML frontmatter delimited by ---`
    );
  }
  return m[2];
}

function generateOne(entry: ThemeEntry): string {
  const markdownPath = path.join(AGENT_TOOLS_DIR, entry.file);
  const body = extractBody(markdownPath, entry.defaultBody);
  const fm = buildFrontmatter(entry.theme, {
    name: entry.name,
    description: entry.description,
  });
  return `---\n${fm}\n---\n${body}`;
}

function generateAll(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const cfg of THEME_CONFIG) {
    const markdownPath = path.join(AGENT_TOOLS_DIR, cfg.file);
    out[markdownPath] = generateOne(cfg);
  }
  return out;
}

function main() {
  const check = process.argv.includes('--check');
  const files = generateAll();
  let dirty = false;
  for (const [markdownPath, next] of Object.entries(files)) {
    const normalized = next.replace(/\r\n/g, '\n');
    const prev = fs.existsSync(markdownPath)
      ? fs.readFileSync(markdownPath, 'utf8').replace(/\r\n/g, '\n')
      : '';
    if (normalized !== prev) {
      dirty = true;
      if (!check) {
        fs.writeFileSync(markdownPath, normalized, 'utf8');
        process.stdout.write(
          `updated ${path.relative(process.cwd(), markdownPath)}\n`
        );
      }
    }
  }
  if (check && dirty) {
    process.stderr.write(
      'DESIGN agent snapshots are out of date. Run: yarn nx run gamut-styles:generate-agent-design-docs\n'
    );
    process.exit(1);
  }
  if (check && !dirty) {
    process.stdout.write('DESIGN agent snapshots are up to date.\n');
  }
}

main();
