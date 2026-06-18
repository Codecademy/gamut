#!/usr/bin/env node
/* eslint-disable no-console */
/* Syncs local-skills/ → .claude/skills/ and .cursor/rules/
 *
 * Usage:
 *   node scripts/sync-local-skills.mjs          # write/remove generated files
 *   node scripts/sync-local-skills.mjs --check  # exit 1 if generated files are stale
 */
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE_DIR = join(ROOT, 'local-skills');
const CLAUDE_SKILLS_DIR = join(ROOT, '.claude', 'skills');
const CURSOR_RULES_DIR = join(ROOT, '.cursor', 'rules');

const isCheck = process.argv.includes('--check');

async function readSkills() {
  const entries = await readdir(SOURCE_DIR, { withFileTypes: true });
  const results = await Promise.all(
    entries
      .filter((e) => e.isDirectory())
      .map(async (entry) => {
        const content = await readFile(
          join(SOURCE_DIR, entry.name, 'SKILL.md'),
          'utf8'
        ).catch(() => null);
        return content !== null ? { name: entry.name, content } : null;
      })
  );
  return results.filter(Boolean);
}

async function checkFile(path, expected) {
  const actual = await readFile(path, 'utf8').catch(() => null);
  return actual === expected;
}

async function main() {
  const skills = await readSkills();
  const activeNames = new Set(skills.map((s) => s.name));

  // Orphans: directories in .claude/skills/ with no matching local-skills/ source
  const claudeEntries = await readdir(CLAUDE_SKILLS_DIR, {
    withFileTypes: true,
  }).catch(() => []);
  const orphans = claudeEntries
    .filter((e) => e.isDirectory() && !activeNames.has(e.name))
    .map((e) => e.name);

  if (isCheck) {
    const staleArrays = await Promise.all(
      skills.map(async ({ name, content }) => {
        const claudeDest = join(CLAUDE_SKILLS_DIR, name, 'SKILL.md');
        const cursorDest = join(CURSOR_RULES_DIR, `${name}.mdc`);
        const [claudeOk, cursorOk] = await Promise.all([
          checkFile(claudeDest, content),
          checkFile(cursorDest, content),
        ]);
        const stale = [];
        if (!claudeOk) stale.push(claudeDest);
        if (!cursorOk) stale.push(cursorDest);
        return stale;
      })
    );

    const stale = [
      ...staleArrays.flat(),
      ...orphans.flatMap((name) => [
        join(CLAUDE_SKILLS_DIR, name, 'SKILL.md'),
        join(CURSOR_RULES_DIR, `${name}.mdc`),
      ]),
    ];

    if (stale.length > 0) {
      console.error(
        'Stale generated files (run `yarn sync-skills` to update):'
      );
      stale.forEach((f) => console.error(` ${f}`));
      process.exit(1);
    } else {
      console.log('All generated skill files are up to date.');
    }
    return;
  }

  await Promise.all(
    orphans.map((name) =>
      Promise.all([
        rm(join(CLAUDE_SKILLS_DIR, name), { recursive: true, force: true }),
        rm(join(CURSOR_RULES_DIR, `${name}.mdc`), { force: true }),
      ]).then(() => console.log(`removed: ${name}`))
    )
  );

  await Promise.all(
    skills.map(async ({ name, content }) => {
      const claudeDest = join(CLAUDE_SKILLS_DIR, name, 'SKILL.md');
      const cursorDest = join(CURSOR_RULES_DIR, `${name}.mdc`);
      await mkdir(dirname(claudeDest), { recursive: true });
      await Promise.all([
        writeFile(claudeDest, content, 'utf8'),
        writeFile(cursorDest, content, 'utf8'),
      ]);
      console.log(`synced: ${name}`);
    })
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
