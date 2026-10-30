// Per-component doc discovery + guidelines copy. Heuristic probe (sibling →
// docsDir → stories.mdx) with cfg overrides (docsMap, docsDir, guidelinesGlob),
// plus a minimal-transform .md/.mdx ingester. The output goes into <Name>.prompt.md
// so the design agent gets usage judgment alongside the structured API contract.

import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  realpathSync,
  writeFileSync,
} from 'node:fs';
import {
  basename,
  dirname,
  extname,
  isAbsolute,
  join,
  relative,
  sep,
} from 'node:path';
import { walk } from '../../.ds-sync/lib/common.mjs';

// FORK NOTE (see .design-sync/config.json libOverrides): appends a fixed
// footer to every ingested component doc, after truncation so it always
// survives regardless of doc length — the fast path (setup doc → one
// component's .prompt.md → build) skips guidelines/conventions.md, so this
// is the one reinforcement that path can't skip.
const COLOR_FOOTER =
  '\n\n---\n\nColors & backgrounds: semantic tokens only (`guidelines/design-tokens/colors.md`); never hex, never inline `style`.';

// Per-component injected blocks, keyed by the component name derived from
// the doc's own filename (see nameFromDocPath below). Two purposes:
// (1) layout primitives are where a purpose-built-component miss actually
// happens — catch it in the file being read at that moment, not just in a
// guideline the fast path skips; (2) icon-prop components: a builder who
// can't find the icon list drops icons entirely rather than guessing.
const REACH_FOR_THIS_INSTEAD =
  '\n\n---\n\n**Before composing with this, check whether a purpose-built component already covers it**: rows of data → `List`/`DataList`/`DataTable`; on/off → `Toggle`; nav/actions → `Menu`; status banner → `Alert`; status/category label → `Badge`/`Tag`. See `guidelines/components/index.md`.';
const ICON_NOTE =
  "\n\n---\n\n**Icon prop**: pick from `guidelines/components/icons.md`'s 371 names — don't guess or grep the bundle for icon exports.";
const PER_COMPONENT_NOTES = {
  Box: REACH_FOR_THIS_INSTEAD,
  FlexBox: REACH_FOR_THIS_INSTEAD,
  GridBox: REACH_FOR_THIS_INSTEAD,
  FillButton: ICON_NOTE,
  StrokeButton: ICON_NOTE,
  TextButton: ICON_NOTE,
  IconButton: ICON_NOTE,
  Badge: ICON_NOTE,
  Tag: ICON_NOTE,
  Menu: ICON_NOTE,
};

// Prepended (not appended) — for warnings that must be seen before the rest
// of the doc, not discovered after reading past it. List gets read for
// "rows with controls" and "large sortable tabular data" alike; the latter
// should have stopped at DataTable/DataList before reaching this file.
const PER_COMPONENT_PREPEND = {
  List: '**When to reach for `DataTable` / `DataList` instead**: `List` is for mixed-content rows with controls. If the view is primarily tabular data, has many rows, or needs column sorting/pagination, use `DataTable` (metrics-heavy, sortable columns) or `DataList` (large data sets with built-in sort/pagination) — they carry sorting, pagination, and accessibility a hand-managed `List` does not.\n\n---\n\n',
  Menu: '**Use `Menu` for navigation and action lists — do not hand-build them.** Sidebar/section navigation, account menus, kebab/overflow actions, and any repeated list of links or actions should be composed with `Menu`, not rebuilt from `Box`/`FlexBox` rows with `as="a"`/`as="button"`. A hand-built version loses `Menu`\'s keyboard navigation, focus management, active/selected state, and ARIA roles. If a design shows a vertical nav rail or an actions dropdown, that is a `Menu`.\n\n---\n\n',
};

// Best-effort component-name guess from the doc's own filename — ingestDoc
// only receives a path (package-build.mjs's call site is unforked), so this
// is the only signal available. False negatives (name doesn't match) just
// mean no per-component block is added — safe, not a crash.
const nameFromDocPath = (path) =>
  basename(path).replace(/\.(stories\.mdx|docs\.mdx|mdx|md)$/i, '');

// Cap on the doc body that lands in <Name>.prompt.md — the design agent reads
// every .prompt.md, so one huge doc would crowd out the rest.
export const DOC_BODY_CAP = 8000;

// Repo-meta files the DEFAULT guidelinesGlob should skip; user-supplied globs
// are honored as-is.
const GUIDELINE_EXCLUDE =
  /^(CHANGELOG|CONTRIBUTING|MIGRATION|MIGRATING|LICENSE|LICENCE|CODE_OF_CONDUCT|SECURITY|AUTHORS|NOTICE)\b/i;

const isDocExt = (p) => /\.(md|mdx)$/i.test(p);

const slug = (s) =>
  String(s ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');

// Find the doc file for one component. First match wins.
function findComponentDoc(c, { docsDirFiles, mapped, cfgPath }) {
  // cfg.docsMap value: explicit path → bounded via the same cfgPath/outside
  // validation tsconfig/cssEntry/extraFonts use; null excludes. Extension-
  // gated so a config-supplied path can't point at e.g. `.env`.
  if (mapped !== undefined) {
    if (!mapped) return null;
    if (!isDocExt(mapped)) {
      console.error(
        `  ! docsMap.${c.name}: ${mapped} is not .md/.mdx — skipped`
      );
      return null;
    }
    return cfgPath(mapped, `docsMap.${c.name}`) ?? null;
  }
  // Sibling of the component's source. The storybook shape has no srcPath
  // (components come from index.json) — the story source's directory is the
  // stand-in; stories are conventionally colocated with the component, so a
  // sibling Button.mdx is found either way. README.md only counts when the
  // source dir is component-named (e.g. Button/README.md) — a flat-layout
  // components/ui/README.md would otherwise match every component.
  const near = c.srcPath ?? c.storySrc;
  const dir = near ? dirname(near) : null;
  if (dir) {
    const dirIsOwn = slug(basename(dir)) === slug(c.name);
    for (const f of [`${c.name}.md`, `${c.name}.mdx`, `${c.name}.docs.mdx`]) {
      const p = join(dir, f);
      if (existsSync(p)) return p;
    }
    if (dirIsOwn) {
      const p = join(dir, 'README.md');
      if (existsSync(p)) return p;
    }
  }
  // Under docsDir — basename match, case/kebab/space-insensitive. Exact
  // match wins over a plural filename (`alerts.mdx` for Alert) so that when
  // both `Tab` and `Tabs` exist, `tabs.mdx` maps to Tabs. Multiple exact
  // matches are announced — first-match-wins must never be silent, because
  // the fix (a docsMap pin) only happens if someone hears about it.
  const want = slug(c.name);
  let plural = null;
  const exact = [];
  for (const p of docsDirFiles) {
    const s = slug(basename(p).replace(/\.(md|mdx)$/i, ''));
    if (s === want) exact.push(p);
    else if (!plural && s === `${want}s`) plural = p;
  }
  if (exact.length > 1) {
    console.error(
      `[DOCS_AMBIGUOUS] ${c.name}: ${exact.length} docs slug-match (${exact
        .map((p) => basename(p))
        .join(', ')}) — using ${basename(exact[0])}; pin cfg.docsMap.${
        c.name
      } to choose`
    );
  }
  if (exact.length) return exact[0];
  if (plural) return plural;
  // <Name>.stories.mdx alongside the source.
  if (dir) {
    const p = join(dir, `${c.name}.stories.mdx`);
    if (existsSync(p)) return p;
  }
  return null;
}

// Run discovery once; attach c.docPath per component, log summary. cfgPath is
// the bounded validator from package-build.mjs (same one tsconfig/cssEntry/
// extraFonts route through) — outside-workspace paths are skipped + logged.
export function discoverDocs({ components, PKG_DIR, cfg, cfgPath }) {
  const docsDir = cfg.docsDir
    ? cfgPath(cfg.docsDir, 'docsDir')
    : ['docs', 'documentation'].map((d) => join(PKG_DIR, d)).find(existsSync) ??
      null;
  const docsDirFiles = docsDir
    ? walk(docsDir, (n) => /\.(md|mdx)$/i.test(n))
    : [];
  let matched = 0;
  let viaMap = 0;
  let excluded = 0;
  const missed = [];
  for (const c of components) {
    const mapped = cfg.docsMap?.[c.name];
    // `docsMap.<Name> = null` is a deliberate exclusion — not an unmapped
    // component, so no [DOCS_UNMAPPED] nudge to map what was just excluded.
    if (mapped === null) {
      excluded++;
      continue;
    }
    const p = findComponentDoc(c, { docsDirFiles, mapped, cfgPath });
    if (p && existsSync(p)) {
      c.docPath = p;
      matched++;
      if (mapped !== undefined) viaMap++;
    } else missed.push(c.name);
  }
  // Attribution makes enumeration-smell visible: "62 via docsMap, 0
  // discovered" says the map duplicates what discovery already does —
  // config expresses conventions and exceptions, never enumerations.
  console.error(
    `  docs: ${matched}/${components.length} components matched${
      docsDir ? ` (cfg.docsDir=${relative(PKG_DIR, docsDir) || '.'})` : ''
    }${
      viaMap ? ` — ${viaMap} via docsMap, ${matched - viaMap} discovered` : ''
    }${excluded ? `, ${excluded} excluded (docsMap null)` : ''}`
  );
  if (matched > 0)
    for (const n of missed) console.error(`[DOCS_UNMAPPED] ${n}`);
}

// Minimal transform — NOT a parser. Strip frontmatter (parsing just
// category/keywords), drop the .mdx import block and JSX-only lines.
export function ingestDoc(path) {
  let txt = readFileSync(path, 'utf8');
  let category, keywords;
  const fm = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(txt);
  if (fm) {
    txt = txt.slice(fm[0].length);
    const cat = /^\s*(?:category|group)\s*:\s*(.+)$/m.exec(fm[1]);
    if (cat) category = cat[1].trim().replace(/^['"]|['"]$/g, '');
    const kw = /^\s*(?:keywords|tags)\s*:\s*(.+)$/m.exec(fm[1]);
    if (kw) {
      const v = kw[1].trim();
      keywords = v.startsWith('[')
        ? v
            .slice(1, v.endsWith(']') ? -1 : undefined)
            .split(',')
            .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
            .filter(Boolean)
        : [v.replace(/^['"]|['"]$/g, '')];
    }
  }
  // Drop noise that applies to .md and .mdx alike: HTML comments, raw
  // <style>/<script> blocks, and VuePress/dumi-style `:::tip … :::`
  // admonition fences (keep the content between the fences).
  txt = txt
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(style|script)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
    .replace(/^:::.*$/gm, '');
  if (/\.mdx$/i.test(path)) {
    const lines = txt.split('\n');
    // Drop the leading import block. A prettier-wrapped multi-line import
    // (`import {\n  X,\n} from '…';`) spans until the `from '…';` line. A
    // terminated single line (side-effect `import './x';` — no `from`) does
    // NOT enter multi-line mode.
    let i = 0,
      inImport = false;
    while (i < lines.length) {
      const l = lines[i];
      if (inImport) {
        i++;
        if (/\bfrom\s+['"][^'"]+['"];?\s*$/.test(l)) inImport = false;
        continue;
      }
      if (/^\s*import\b/.test(l)) {
        i++;
        if (!/\bfrom\s+['"][^'"]+['"];?\s*$/.test(l) && !/['"];?\s*$/.test(l))
          inImport = true;
        continue;
      }
      if (/^\s*$/.test(l)) {
        i++;
        continue;
      }
      break;
    }
    // Drop JSX component blocks. Depth-track on PascalCase open/close tags so
    // a multi-line <Canvas>\n <Story …/>\n</Canvas> is dropped in full. Only
    // count tags on block-level-JSX lines (or inside an open block) so inline
    // `` `<Button>` `` mentions and fenced code don't poison depth.
    const out = [];
    let depth = 0,
      fenced = false;
    for (const l of lines.slice(i)) {
      if (/^\s*```/.test(l)) {
        fenced = !fenced;
        if (depth === 0) out.push(l);
        continue;
      }
      if (fenced) {
        if (depth === 0) out.push(l);
        continue;
      }
      const blk = /^\s*<\/?[A-Z]/.test(l);
      const track = depth > 0 || blk;
      const opens = track
        ? (l.match(/<[A-Z][\w.]*[^>]*>/g) ?? []).filter(
            (t) => !t.endsWith('/>')
          ).length
        : 0;
      const closes = track ? (l.match(/<\/[A-Z][\w.]*\s*>/g) ?? []).length : 0;
      if (depth === 0 && !blk) out.push(l);
      depth = Math.max(0, depth + opens - closes);
    }
    txt = out.join('\n');
  }
  let body = txt.trim();
  if (body.length > DOC_BODY_CAP) {
    const orig = body.length;
    // Cut at a word boundary so the tail isn't a half-word; fall back to a
    // hard cut when the nearest boundary is unreasonably far back.
    const cut = body.slice(0, DOC_BODY_CAP).replace(/\s+\S*$/, '');
    body =
      (cut.length > DOC_BODY_CAP - 500 ? cut : body.slice(0, DOC_BODY_CAP)) +
      `\n\n_(truncated — see ${basename(path)} for full)_`;
    console.error(
      `  docs: ${basename(path)} truncated (${orig} → ${body.length})`
    );
  }
  const perComponentPrepend = PER_COMPONENT_PREPEND[nameFromDocPath(path)];
  if (perComponentPrepend) body = perComponentPrepend + body;
  const perComponentNote = PER_COMPONENT_NOTES[nameFromDocPath(path)];
  if (perComponentNote) body += perComponentNote;
  body += COLOR_FOOTER;
  return { body, category, keywords };
}

// Tiny glob: `**` → any depth, `*` → any chars in one segment. Anchored under
// PKG_DIR. The walk base and any literal (no-wildcard) entry are bounded via
// cfgPath; matched files whose realpath escapes workspaceRoot are dropped.
function matchGlob(glob, { PKG_DIR, cfgPath, quiet }) {
  if (!glob.includes('*')) {
    if (!isDocExt(glob)) {
      if (!quiet)
        console.error(`  ! guidelinesGlob: ${glob} is not .md/.mdx — skipped`);
      return [];
    }
    const p = cfgPath(glob, 'guidelinesGlob');
    return p ? [p] : [];
  }
  const parts = glob.split('/');
  const i = parts.findIndex((p) => p.includes('*'));
  // Bound the walk base too — `../**/*.md` would otherwise walk arbitrary
  // directories. Falls back to PKG_DIR (always in-bounds) when i === 0.
  // `quiet` (default globs the user never set) skips the not-found warning.
  if (quiet && i > 0 && !existsSync(join(PKG_DIR, ...parts.slice(0, i))))
    return [];
  const base =
    i > 0 ? cfgPath(parts.slice(0, i).join('/'), 'guidelinesGlob') : PKG_DIR;
  if (!base) return [];
  // `**/` → zero-or-more directory segments (so `docs/**/*.md` matches both
  // `docs/x.md` and `docs/sub/x.md`); `**` elsewhere → any depth; `*` →
  // any chars within a segment.
  const rx = new RegExp(
    '^' +
      glob
        .replace(/[.+^${}()|[\]\\]/g, '\\$&')
        .replace(/\*\*\//g, '§§/')
        .replace(/\*\*/g, '§§')
        .replace(/\*/g, '[^/]*')
        .replace(/§§\//g, '(?:[^/]+/)*')
        .replace(/§§/g, '.*') +
      '$'
  );
  return walk(base, () => true).filter(
    (p) => isDocExt(p) && rx.test(relative(PKG_DIR, p).split(sep).join('/'))
  );
}

// Copy matched guidelines into OUT/guidelines/ preserving relative subpath; emit
// a small index.md listing them. No-op when nothing matches.
export function emitGuidelines({ cfg, PKG_DIR, OUT, cfgPath, workspaceRoot }) {
  const usingDefault = cfg.guidelinesGlob == null;
  const globs = []
    .concat(
      cfg.guidelinesGlob ?? [
        'docs/guides/**/*.md',
        'docs/*.md',
        'guides/**/*.md',
      ]
    )
    .filter(Boolean);
  const seen = new Set();
  const dests = new Set();
  const copied = [];
  for (const g of globs) {
    for (const p of matchGlob(g, { PKG_DIR, cfgPath, quiet: usingDefault })) {
      if (seen.has(p)) continue;
      seen.add(p);
      if (usingDefault && GUIDELINE_EXCLUDE.test(basename(p))) {
        console.error(
          `  guidelines: skipping ${basename(p)} (repo-meta, default glob)`
        );
        continue;
      }
      // Belt-and-suspenders: drop any matched file whose realpath escapes the
      // workspace root (a symlink under an in-bounds dir could otherwise point
      // outside). cfgPath does the same realpath check for the walk base and
      // literal entries.
      let real;
      try {
        real = realpathSync(p);
      } catch {
        continue;
      }
      const wsRel = relative(workspaceRoot, real);
      if (wsRel.startsWith('..') || isAbsolute(wsRel)) {
        console.error(
          `  ! guidelinesGlob: matched ${p} resolves outside the workspace root — skipped`
        );
        continue;
      }
      // Dest preserves PKG_DIR-relative subpath when the file is inside the
      // package; otherwise (in-workspace but outside the package — e.g. a
      // sibling docs package) collapses to basename so the dest can never
      // escape OUT/guidelines/.
      let rel = relative(PKG_DIR, p).split(sep).join('/');
      if (rel.startsWith('../') || isAbsolute(rel)) rel = basename(p);
      const dest = join(OUT, 'guidelines', rel);
      if (dests.has(dest)) {
        console.error(
          `  ! guidelines: ${rel} would overwrite an earlier file with the same dest — skipped`
        );
        continue;
      }
      dests.add(dest);
      mkdirSync(dirname(dest), { recursive: true });
      cpSync(p, dest);
      copied.push(rel);
    }
  }
  if (copied.length) {
    writeFileSync(
      join(OUT, 'guidelines', 'index.md'),
      `# Guidelines\n\n${copied
        .map((r) => `- [${basename(r, extname(r))}](./${r})`)
        .join('\n')}\n`
    );
    console.error(`  guidelines: ${copied.length} file(s) → guidelines/`);
  }
  return copied;
}

// Read PascalCase named exports from a preview .tsx (either home — the caller
// picks owned-first) as fenced JSX blocks for the synthesized ## Examples
// section. Gracefully empty when the file/dir doesn't exist.
export function previewExamples(previewPath) {
  if (!existsSync(previewPath)) return [];
  const src = readFileSync(previewPath, 'utf8');
  const out = [];
  for (const m of src.matchAll(
    /export\s+const\s+([A-Z][A-Za-z0-9_]*)\s*=\s*([\s\S]*?)(?=\n\s*export\s+const\s+[A-Z]|\n*$)/g
  )) {
    out.push(
      `### ${m[1]}\n\n\`\`\`jsx\n${m[2].trim().replace(/;$/, '')}\n\`\`\``
    );
  }
  return out;
}
