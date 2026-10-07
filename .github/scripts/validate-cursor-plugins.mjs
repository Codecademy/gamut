#!/usr/bin/env node
/**
 * Validate Gamut Cursor plugin layout for CI.
 * @see https://cursor.com/docs/reference/plugins.md
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  cmpSemver,
  extractFrontmatterBlockFromText,
  fmHasKey,
  SEMVER,
} from './validate-cursor-plugins-helpers.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const MARKETPLACE = path.join(ROOT, '.cursor-plugin', 'marketplace.json');

/** @param {string} msg */
function err(msg) {
  console.error(`error: ${msg}`);
}

/**
 * @param {string} sha
 * @param {string} posixPath repo-relative path with /
 */
function gitShow(sha, posixPath) {
  try {
    return execSync(`git show ${sha}:${posixPath}`, {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
  } catch {
    return null;
  }
}

/**
 * @returns {{ plugins: { name: string; source: string }[] } | null }
 */
function readMarketplacePluginEntries() {
  if (!fs.existsSync(MARKETPLACE)) return null;
  let data;
  try {
    data = JSON.parse(fs.readFileSync(MARKETPLACE, 'utf8'));
  } catch {
    return null;
  }
  const plugins = data.plugins;
  if (!Array.isArray(plugins)) return null;
  const out = [];
  for (const p of plugins) {
    if (
      p &&
      typeof p === 'object' &&
      typeof p.name === 'string' &&
      typeof p.source === 'string'
    ) {
      out.push({ name: p.name, source: p.source.replace(/\\/g, '/') });
    }
  }
  return { plugins: out };
}

/**
 * Changed files under a plugin require a strict semver bump in plugin.json.
 * Invoked via CLI flag; GitHub Actions runs that only on pull_request.
 */
function validatePrPluginVersionBumps() {
  const errors = [];
  const base = process.env.CURSOR_PR_BASE_SHA?.trim();
  const head = process.env.CURSOR_PR_HEAD_SHA?.trim();
  if (!base || !head) {
    errors.push(
      'version bump check: set CURSOR_PR_BASE_SHA and CURSOR_PR_HEAD_SHA (e.g. from github.event.pull_request)',
    );
    return errors;
  }

  let changed;
  try {
    changed = execSync(`git diff --name-only ${base} ${head}`, {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    })
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);
  } catch (e) {
    errors.push(`version bump check: git diff failed (${e})`);
    return errors;
  }

  const mp = readMarketplacePluginEntries();
  if (!mp) return errors;

  for (const { name: pname, source: src } of mp.plugins) {
    const prefix = src.endsWith('/') ? src : `${src}/`;
    const touched = changed.some((f) => f === src || f.startsWith(prefix));
    if (!touched) continue;

    const manifestPosix = path.posix.join(src, '.cursor-plugin', 'plugin.json');
    const baseRaw = gitShow(base, manifestPosix);
    const headRaw = gitShow(head, manifestPosix);
    if (!headRaw) {
      errors.push(
        `plugin '${pname}': cannot read ${manifestPosix} at PR head (required for version bump check)`,
      );
      continue;
    }

    let headVer;
    try {
      headVer = JSON.parse(headRaw).version;
    } catch {
      errors.push(`plugin '${pname}': invalid plugin.json at PR head`);
      continue;
    }
    if (typeof headVer !== 'string' || !SEMVER.test(headVer)) {
      errors.push(
        `plugin '${pname}': PR head plugin.json must have valid semver version`,
      );
      continue;
    }

    if (!baseRaw) {
      continue;
    }

    let baseVer;
    try {
      baseVer = JSON.parse(baseRaw).version;
    } catch {
      errors.push(
        `plugin '${pname}': invalid plugin.json on base ${base.slice(0, 7)}`,
      );
      continue;
    }
    if (typeof baseVer !== 'string' || !SEMVER.test(baseVer)) {
      errors.push(
        `plugin '${pname}': base plugin.json must have valid semver version`,
      );
      continue;
    }

    if (cmpSemver(headVer, baseVer) <= 0) {
      errors.push(
        `plugin '${pname}': files under ${src}/ changed vs ${base.slice(0, 7)} but version was not bumped (${baseVer} → ${headVer}); increase semver in .cursor-plugin/plugin.json`,
      );
    }
  }

  return errors;
}

/**
 * @param {string} filePath
 * @returns {{ block: string } | { error: string }}
 */
function extractFrontmatterBlock(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const rel = path.relative(ROOT, filePath);
  const parsed = extractFrontmatterBlockFromText(text);
  if ('error' in parsed) {
    return { error: `${rel}: ${parsed.error}` };
  }
  return { block: parsed.block };
}

/** @returns {string[]} */
function validateMarketplace() {
  const errors = [];
  if (!fs.existsSync(MARKETPLACE)) {
    errors.push(`missing ${path.relative(ROOT, MARKETPLACE)}`);
    return errors;
  }

  let data;
  try {
    data = JSON.parse(fs.readFileSync(MARKETPLACE, 'utf8'));
  } catch (e) {
    errors.push(`marketplace.json: invalid JSON (${e})`);
    return errors;
  }

  if (!data.name) errors.push('marketplace.json: missing name');
  const owner = data.owner || {};
  if (!owner.name) errors.push('marketplace.json: missing owner.name');

  const plugins = data.plugins;
  if (!Array.isArray(plugins) || plugins.length === 0) {
    errors.push('marketplace.json: plugins must be a non-empty array');
    return errors;
  }

  const seen = new Set();
  for (let i = 0; i < plugins.length; i++) {
    const entry = plugins[i];
    if (!entry || typeof entry !== 'object') {
      errors.push(`marketplace.json: plugins[${i}] must be an object`);
      continue;
    }
    const pname = entry.name;
    const src = entry.source;
    if (!pname || typeof pname !== 'string') {
      errors.push(`marketplace.json: plugins[${i}].name is required`);
    } else if (seen.has(pname)) {
      errors.push(`marketplace.json: duplicate plugin name '${pname}'`);
    } else {
      seen.add(pname);
    }
    if (!src || typeof src !== 'string') {
      errors.push(`marketplace.json: plugins[${i}].source is required`);
      continue;
    }

    const pluginRoot = path.join(ROOT, src);
    const manifest = path.join(pluginRoot, '.cursor-plugin', 'plugin.json');
    if (!fs.existsSync(pluginRoot) || !fs.statSync(pluginRoot).isDirectory()) {
      errors.push(`plugin '${pname}': directory missing: ${src}`);
      continue;
    }
    if (!fs.existsSync(manifest)) {
      errors.push(
        `plugin '${pname}': missing ${src}/.cursor-plugin/plugin.json`,
      );
      continue;
    }

    let pm;
    try {
      pm = JSON.parse(fs.readFileSync(manifest, 'utf8'));
    } catch (e) {
      errors.push(`plugin '${pname}': invalid plugin.json (${e})`);
      continue;
    }

    if (!pm.name || typeof pm.name !== 'string') {
      errors.push(`plugin '${pname}': plugin.json must include string name`);
    } else if (pm.name !== pname) {
      errors.push(
        `plugin '${pname}': plugin.json name '${pm.name}' must match marketplace entry`,
      );
    }

    const ver = pm.version;
    if (ver != null) {
      if (typeof ver !== 'string' || !SEMVER.test(ver)) {
        errors.push(
          `plugin '${pname}': plugin.json version must be semver (e.g. 1.0.0), got '${ver}'`,
        );
      }
    } else {
      errors.push(`plugin '${pname}': plugin.json should include semver version`);
    }

    const rulesDir = path.join(pluginRoot, 'rules');
    const skillsDir = path.join(pluginRoot, 'skills');
    const hasRules =
      fs.existsSync(rulesDir) && fs.statSync(rulesDir).isDirectory();
    const hasSkills =
      fs.existsSync(skillsDir) && fs.statSync(skillsDir).isDirectory();
    if (!hasRules && !hasSkills) {
      errors.push(
        `plugin '${pname}': expected rules/ and/or skills/ under ${src}`,
      );
    }

    if (hasRules) {
      const mdcs = fs
        .readdirSync(rulesDir)
        .filter((f) => f.endsWith('.mdc'))
        .map((f) => path.join(rulesDir, f));
      if (mdcs.length === 0) {
        errors.push(`plugin '${pname}': rules/ has no .mdc files`);
      }
      for (const mdc of mdcs) {
        const result = extractFrontmatterBlock(mdc);
        if ('error' in result) {
          errors.push(result.error);
        } else if (!fmHasKey(result.block, 'description')) {
          errors.push(
            `${path.relative(ROOT, mdc)}: frontmatter must include description (Cursor rules)`,
          );
        }
      }
    }

    if (hasSkills) {
      const skillMds = fs
        .readdirSync(skillsDir, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => path.join(skillsDir, d.name, 'SKILL.md'))
        .filter((p) => fs.existsSync(p));
      if (skillMds.length === 0) {
        errors.push(`plugin '${pname}': skills/*/SKILL.md not found`);
      }
      for (const sm of skillMds) {
        const result = extractFrontmatterBlock(sm);
        if ('error' in result) {
          errors.push(result.error);
          continue;
        }
        if (!fmHasKey(result.block, 'name')) {
          errors.push(
            `${path.relative(ROOT, sm)}: frontmatter must include name`,
          );
        }
        if (!fmHasKey(result.block, 'description')) {
          errors.push(
            `${path.relative(ROOT, sm)}: frontmatter must include description`,
          );
        }
      }
    }
  }

  return errors;
}

/** Monorepo `.cursor/rules` and `.cursor/skills` (not shipped via marketplace plugins). */
function validateMonorepoCursor() {
  const errors = [];
  const cursorRoot = path.join(ROOT, '.cursor');
  if (!fs.existsSync(cursorRoot)) return errors;

  const rulesDir = path.join(cursorRoot, 'rules');
  if (fs.existsSync(rulesDir) && fs.statSync(rulesDir).isDirectory()) {
    const mdcs = fs
      .readdirSync(rulesDir)
      .filter((f) => f.endsWith('.mdc'))
      .map((f) => path.join(rulesDir, f));
    for (const mdc of mdcs) {
      const result = extractFrontmatterBlock(mdc);
      if ('error' in result) {
        errors.push(result.error);
      } else if (!fmHasKey(result.block, 'description')) {
        errors.push(
          `${path.relative(ROOT, mdc)}: frontmatter must include description (Cursor rules)`,
        );
      }
    }
  }

  const skillsDir = path.join(cursorRoot, 'skills');
  if (fs.existsSync(skillsDir) && fs.statSync(skillsDir).isDirectory()) {
    const skillMds = fs
      .readdirSync(skillsDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => path.join(skillsDir, d.name, 'SKILL.md'))
      .filter((p) => fs.existsSync(p));
    for (const sm of skillMds) {
      const result = extractFrontmatterBlock(sm);
      if ('error' in result) {
        errors.push(result.error);
        continue;
      }
      if (!fmHasKey(result.block, 'name')) {
        errors.push(
          `${path.relative(ROOT, sm)}: frontmatter must include name`,
        );
      }
      if (!fmHasKey(result.block, 'description')) {
        errors.push(
          `${path.relative(ROOT, sm)}: frontmatter must include description`,
        );
      }
    }
  }

  return errors;
}

const PR_VERSION_BUMPS = '--pr-version-bumps';

if (process.argv.includes(PR_VERSION_BUMPS)) {
  const prErrors = validatePrPluginVersionBumps();
  if (prErrors.length) {
    for (const e of prErrors) err(e);
    console.error(`\n${prErrors.length} validation issue(s).`);
    process.exit(1);
  }
  console.log('Cursor plugins: PR semver bump check OK.');
} else {
  const errors = [...validateMarketplace(), ...validateMonorepoCursor()];
  if (errors.length) {
    for (const e of errors) err(e);
    console.error(`\n${errors.length} validation issue(s).`);
    process.exit(1);
  }
  console.log(
    'Cursor config: marketplace, plugins, and monorepo .cursor rules/skills OK.',
  );
}
