/**
 * Downloads local variables for the Gamut Figma file via REST API.
 * @see https://www.figma.com/developers/api#get-local-variables-endpoint
 */

import fs from 'fs';
import path from 'path';

const GAMUT_FILE_KEY = 'ReGfRNillGABAj5SlITalN';
const OUT_FILE = path.join(
  __dirname,
  'figma-exports/gamut-variables.local.json'
);

export type FigmaLocalVariablesExport = {
  status: number;
  error: boolean;
  meta: {
    variables: Record<string, unknown>;
    variableCollections: Record<string, unknown>;
  };
};

async function main() {
  const token = process.env.FIGMA_ACCESS_TOKEN ?? process.env.FIGMA_TOKEN ?? '';
  if (!token) {
    process.stderr.write(
      'Missing FIGMA_ACCESS_TOKEN (or FIGMA_TOKEN). See scripts/figma-exports/README.md\n'
    );
    process.exit(1);
  }

  const url = `https://api.figma.com/v1/files/${GAMUT_FILE_KEY}/variables/local`;
  const res = await fetch(url, {
    headers: { 'X-Figma-Token': token },
  });

  const body = (await res.json()) as FigmaLocalVariablesExport & {
    message?: string;
    err?: string;
  };

  if (!res.ok) {
    process.stderr.write(
      `Figma API ${res.status}: ${JSON.stringify(body, null, 2)}\n`
    );
    process.exit(1);
  }

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, `${JSON.stringify(body, null, 2)}\n`, 'utf8');
  process.stdout.write(`Wrote ${OUT_FILE}\n`);
}

void main();
