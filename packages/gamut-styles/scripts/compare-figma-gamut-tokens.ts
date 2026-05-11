/**
 * Compares a Figma variables/local JSON export to Core theme tokens (light semantics + border radii).
 *
 * Usage:
 *   node --require @swc-node/register packages/gamut-styles/scripts/compare-figma-gamut-tokens.ts [path/to/export.json]
 * Flags: --require-export (exit 1 if export missing), --verbose
 */

import fs from 'fs';
import path from 'path';

import { coreTheme } from '../src/themes/core';
import {
  FIGMA_BORDER_RADIUS_TO_GAMUT,
  figmaVariableLookupKeys,
  gamutSemanticForFigmaPath,
} from './figma-gamut-token-map';

const DEFAULT_EXPORT = path.join(
  __dirname,
  'figma-exports/gamut-variables.local.json'
);

type Rgba = { r: number; g: number; b: number; a: number };

type LocalVariableCollection = {
  id: string;
  name: string;
  modes: { modeId: string; name: string }[];
  defaultModeId: string;
};

type LocalVariable = {
  id: string;
  name: string;
  variableCollectionId: string;
  resolvedType: string;
  valuesByMode: Record<string, unknown>;
};

type VariablesExport = {
  meta?: {
    variables?: Record<string, LocalVariable>;
    variableCollections?: Record<string, LocalVariableCollection>;
  };
};

function isRgba(v: unknown): v is Rgba {
  if (typeof v !== 'object' || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.r === 'number' &&
    typeof o.g === 'number' &&
    typeof o.b === 'number' &&
    typeof o.a === 'number'
  );
}

function isVariableAlias(v: unknown): v is { type: string; id: string } {
  return (
    typeof v === 'object' &&
    v !== null &&
    (v as { type?: string }).type === 'VARIABLE_ALIAS' &&
    typeof (v as { id?: string }).id === 'string'
  );
}

function rgbaToGamutColor(rgba: Rgba): string {
  const { r: rf, g: gf, b: bf, a } = rgba;
  const r = Math.round(rf * 255);
  const g = Math.round(gf * 255);
  const b = Math.round(bf * 255);
  if (a < 1 - 1e-6) {
    return `rgba(${r},${g},${b},${a})`;
  }
  const hex = [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
  return `#${hex}`;
}

function normalizeCssColor(s: string): string {
  const t = s.trim().toLowerCase();
  if (t.startsWith('#') && t.length === 7) return t;
  return t.replace(/\s*,\s*/g, ',').replace(/\s+/g, ' ');
}

function resolveVariableValue(
  val: unknown,
  variables: Record<string, LocalVariable>,
  modeId: string,
  depth = 0
): unknown {
  if (depth > 30) return val;
  if (isRgba(val)) return val;
  if (
    typeof val === 'number' ||
    typeof val === 'string' ||
    typeof val === 'boolean'
  ) {
    return val;
  }
  if (isVariableAlias(val)) {
    const target = variables[val.id];
    if (!target) return val;
    const next = target.valuesByMode[modeId];
    return resolveVariableValue(next, variables, modeId, depth + 1);
  }
  return val;
}

function pickLightModeId(collection: LocalVariableCollection): string {
  const light = collection.modes.find((m) => /light/i.test(m.name));
  return light?.modeId ?? collection.defaultModeId;
}

function collectionLooksLikeRadius(name: string): boolean {
  return /radius|corner|rounded/i.test(name);
}

function normalizeDimension(v: unknown): string | null {
  if (typeof v === 'number') return `${v}px`;
  if (typeof v === 'string') return v.trim();
  return null;
}

function compareExports(data: VariablesExport, verbose: boolean): string[] {
  const variables = data.meta?.variables ?? {};
  const collections = data.meta?.variableCollections ?? {};
  const mismatches: string[] = [];

  const theme = coreTheme as {
    borderRadii: Record<string, string>;
    _tokens?: {
      modes?: { light?: Record<string, string> };
    };
  };

  const lightSemantics = theme._tokens?.modes?.light ?? {};

  const collectionById = collections;

  for (const variable of Object.values(variables)) {
    const col = collectionById[variable.variableCollectionId];
    if (!col) continue;

    const modeId = pickLightModeId(col);
    const modeVal = variable.valuesByMode[modeId];
    const rawVal = resolveVariableValue(modeVal, variables, modeId);

    if (
      variable.resolvedType === 'FLOAT' ||
      variable.resolvedType === 'STRING'
    ) {
      if (
        !collectionLooksLikeRadius(col.name) &&
        !/^border[\s-]*radius/i.test(col.name)
      ) {
        continue;
      }

      const figLabel = variable.name.trim().toLowerCase();
      const gamutKey =
        FIGMA_BORDER_RADIUS_TO_GAMUT[figLabel] ??
        FIGMA_BORDER_RADIUS_TO_GAMUT[figLabel.replace(/\s+/g, '-')];

      if (!gamutKey) continue;

      const expected = theme.borderRadii[gamutKey];
      if (!expected) continue;

      const actual = normalizeDimension(rawVal);
      if (!actual) {
        mismatches.push(
          `border radius "${variable.name}" (${col.name}): could not read value`
        );
        continue;
      }

      const normActual = actual.toLowerCase();
      const normExpected = expected.toLowerCase();
      if (normActual !== normExpected) {
        mismatches.push(
          `border radius ${gamutKey}: Figma "${normActual}" vs Gamut "${normExpected}" (${col.name}/${variable.name})`
        );
      } else if (verbose) {
        process.stdout.write(
          `OK radius ${gamutKey} ${normActual} (${col.name}/${variable.name})\n`
        );
      }
      continue;
    }

    if (variable.resolvedType === 'COLOR') {
      const resolved = rawVal;
      if (!isRgba(resolved)) {
        if (verbose) {
          process.stdout.write(
            `skip COLOR ${col.name}/${variable.name}: non-RGBA resolved value\n`
          );
        }
        continue;
      }

      const figmaCss = normalizeCssColor(rgbaToGamutColor(resolved));
      const keys = figmaVariableLookupKeys(col.name, variable.name);
      let gamutSemantic: string | undefined;
      for (const k of keys) {
        gamutSemantic = gamutSemanticForFigmaPath(k);
        if (gamutSemantic) break;
      }

      if (!gamutSemantic) {
        if (verbose) {
          process.stdout.write(
            `skip COLOR ${col.name}/${
              variable.name
            }: no semantic map (keys: ${keys.join(', ')})\n`
          );
        }
        continue;
      }

      const expectedRaw = lightSemantics[gamutSemantic];
      if (!expectedRaw) {
        mismatches.push(
          `semantic "${gamutSemantic}": missing in Core theme light snapshot (${col.name}/${variable.name})`
        );
        continue;
      }

      const expected = normalizeCssColor(expectedRaw);
      if (figmaCss !== expected) {
        mismatches.push(
          `semantic ${gamutSemantic}: Figma "${figmaCss}" vs Gamut "${expected}" (${col.name}/${variable.name})`
        );
      } else if (verbose) {
        process.stdout.write(`OK ${gamutSemantic} ${figmaCss}\n`);
      }
    }
  }

  return mismatches;
}

function main() {
  const args = process.argv.slice(2).filter((a) => !a.startsWith('--'));
  const requireExport = process.argv.includes('--require-export');
  const verbose = process.argv.includes('--verbose');

  const exportPath = path.resolve(args[0] ?? DEFAULT_EXPORT);

  if (!fs.existsSync(exportPath)) {
    const msg = `No Figma export at ${exportPath}. Run: yarn nx run gamut-styles:fetch-figma-variables\n`;
    if (requireExport) {
      process.stderr.write(msg);
      process.exit(1);
    }
    process.stdout.write(msg);
    process.exit(0);
  }

  const raw = fs.readFileSync(exportPath, 'utf8');
  const data = JSON.parse(raw) as VariablesExport;

  if (!data.meta?.variables || !data.meta?.variableCollections) {
    process.stderr.write(
      `Invalid export (expected meta.variables + meta.variableCollections): ${exportPath}\n`
    );
    process.exit(1);
  }

  const mismatches = compareExports(data, verbose);

  if (mismatches.length) {
    process.stderr.write(`Figma vs Gamut: ${mismatches.length} mismatch(es)\n`);
    for (const m of mismatches) {
      process.stderr.write(`  - ${m}\n`);
    }
    process.exit(1);
  }

  process.stdout.write(
    `Figma vs Gamut: no mismatches among mapped border-radius + semantic COLOR tokens.\n`
  );
}

main();
