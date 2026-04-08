#!/usr/bin/env node
/**
 * Regenerates:
 * - packages/agent-plugin/skills/<id>/SKILL.md from skills/skills.manifest.json
 * - Monorepo Cursor skills from docs/agents/monorepo-skills.manifest.json
 * GitHub links use docs/agents/canonical-urls.json (docsAgentsBlobBaseOnMain).
 * Run from repo root: node packages/agent-plugin/scripts/generate-skills.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PLUGIN_ROOT = path.resolve(__dirname, '..');
const REPO_ROOT = path.resolve(PLUGIN_ROOT, '../..');
const MANIFEST_PATH = path.join(PLUGIN_ROOT, 'skills', 'skills.manifest.json');
const CANONICAL_URLS_PATH = path.join(
  REPO_ROOT,
  'docs',
  'agents',
  'canonical-urls.json'
);
const MONOREPO_MANIFEST_PATH = path.join(
  REPO_ROOT,
  'docs',
  'agents',
  'monorepo-skills.manifest.json'
);

function loadCanonicalBlobBase() {
  if (!fs.existsSync(CANONICAL_URLS_PATH)) {
    console.error(
      `error: missing ${path.relative(REPO_ROOT, CANONICAL_URLS_PATH)}`
    );
    process.exit(1);
  }
  const { docsAgentsBlobBaseOnMain } = JSON.parse(
    fs.readFileSync(CANONICAL_URLS_PATH, 'utf8')
  );
  if (!docsAgentsBlobBaseOnMain) {
    console.error(
      'error: canonical-urls.json must define docsAgentsBlobBaseOnMain'
    );
    process.exit(1);
  }
  return String(docsAgentsBlobBaseOnMain).replace(/\/$/, '');
}

function yamlDescriptionBlock(description) {
  const lines = description.split('\n').map((l) => l.trimEnd());
  return lines.map((l) => `  ${l}`).join('\n');
}

function generatePluginSkills(blobBase) {
  const raw = fs.readFileSync(MANIFEST_PATH, 'utf8');
  const { skills } = JSON.parse(raw);
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
        'error: each plugin skill needs id, docFile, title, description, detailLine'
      );
      process.exit(1);
    }
    const url = `${blobBase}/${docFile}`;
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

function generateMonorepoSkills() {
  if (!fs.existsSync(MONOREPO_MANIFEST_PATH)) {
    return;
  }
  const { skills } = JSON.parse(
    fs.readFileSync(MONOREPO_MANIFEST_PATH, 'utf8')
  );
  if (!Array.isArray(skills) || skills.length === 0) {
    return;
  }

  for (const skill of skills) {
    const {
      name,
      skillMdPath,
      canonicalDocPath,
      agentsPath,
      title,
      description,
      cursorRulesNote,
    } = skill;
    if (
      !name ||
      !skillMdPath ||
      !canonicalDocPath ||
      !agentsPath ||
      !title ||
      !description ||
      !cursorRulesNote
    ) {
      console.error(
        'error: each monorepo skill needs name, skillMdPath, canonicalDocPath, agentsPath, title, description, cursorRulesNote'
      );
      process.exit(1);
    }

    const outPath = path.join(REPO_ROOT, skillMdPath);
    const outDir = path.dirname(outPath);
    const docAbs = path.join(REPO_ROOT, canonicalDocPath);
    const agentsAbs = path.join(REPO_ROOT, agentsPath);
    const docRel = path.relative(outDir, docAbs).replace(/\\/g, '/');
    const agentsRel = path.relative(outDir, agentsAbs).replace(/\\/g, '/');

    const descBlock = yamlDescriptionBlock(description);
    const body = `---
name: ${name}
description: >-
${descBlock}
---

# ${title}

**Canonical guide (tool-agnostic):** [\`${canonicalDocPath}\`](${docRel})

**Repository index:** [\`${agentsPath}\`](${agentsRel})

${cursorRulesNote}
`;

    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(outPath, body, 'utf8');
    console.log('wrote', path.relative(REPO_ROOT, outPath));
  }
}

function main() {
  const blobBase = loadCanonicalBlobBase();
  generatePluginSkills(blobBase);
  generateMonorepoSkills();
}

main();
