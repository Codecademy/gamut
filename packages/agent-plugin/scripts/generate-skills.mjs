#!/usr/bin/env node
/**
 * Regenerates packages/agent-plugin/skills/<id>/SKILL.md from skills.manifest.json.
 * Run from repo root: node packages/agent-plugin/scripts/generate-skills.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PLUGIN_ROOT = path.resolve(__dirname, '..');
const REPO_ROOT = path.resolve(PLUGIN_ROOT, '../..');
const MANIFEST_PATH = path.join(PLUGIN_ROOT, 'skills', 'skills.manifest.json');

function yamlDescriptionBlock(description) {
  const lines = description.split('\n').map((l) => l.trimEnd());
  return lines.map((l) => `  ${l}`).join('\n');
}

function main() {
  const raw = fs.readFileSync(MANIFEST_PATH, 'utf8');
  const { canonicalDocsBase, skills } = JSON.parse(raw);
  const base = String(canonicalDocsBase).replace(/\/$/, '');
  if (!Array.isArray(skills) || skills.length === 0) {
    console.error(
      'error: skills.manifest.json must include a non-empty skills array'
    );
    process.exit(1);
  }

  for (const skill of skills) {
    const { id, docFile, title, description, detailLine } = skill;
    if (!id || !docFile || !title || !description || !detailLine) {
      console.error(
        'error: each skill needs id, docFile, title, description, detailLine'
      );
      process.exit(1);
    }
    const url = `${base}/${docFile}`;
    const descBlock = yamlDescriptionBlock(description);
    const body = `---
name: ${id}
description: >-
${descBlock}
---

# ${title}

Full guidance (tool-agnostic): **[${docFile}](${url})** in the Gamut repository.

This skill summarizes scope only; ${detailLine}
`;

    const dir = path.join(PLUGIN_ROOT, 'skills', id);
    fs.mkdirSync(dir, { recursive: true });
    const outPath = path.join(dir, 'SKILL.md');
    fs.writeFileSync(outPath, body, 'utf8');
    console.log('wrote', path.relative(REPO_ROOT, outPath));
  }
}

main();
