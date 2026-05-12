/**
 * Pure helpers for agent plugin layout validation (unit-tested).
 * @see validate-agent-plugins.mjs
 */

export const SEMVER = /^\d+\.\d+\.\d+(-[a-zA-Z0-9.-]+)?(\+[a-zA-Z0-9.-]+)?$/;

/** @param {string} key */
export function escapeRe(key) {
  return key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * @param {string} block
 * @param {string} key
 */
export function fmHasKey(block, key) {
  return new RegExp(`^${escapeRe(key)}:\\s`, 'm').test(block);
}

/**
 * Semver ordering: numeric core, then prerelease (release beats prerelease).
 * @returns {number} positive if a > b, negative if a < b, 0 if equal
 */
export function cmpSemver(a, b) {
  const stripBuild = (v) => v.split('+')[0];
  const splitPre = (v) => {
    const s = stripBuild(v);
    const i = s.indexOf('-');
    if (i === -1) return { core: s, pre: null };
    return { core: s.slice(0, i), pre: s.slice(i + 1) };
  };
  const A = splitPre(a);
  const B = splitPre(b);
  const pa = A.core.split('.').map((n) => parseInt(n, 10));
  const pb = B.core.split('.').map((n) => parseInt(n, 10));
  for (let i = 0; i < 3; i++) {
    if (pa[i] !== pb[i]) return pa[i] - pb[i];
  }
  if (A.pre === B.pre) return 0;
  if (A.pre === null && B.pre !== null) return 1;
  if (A.pre !== null && B.pre === null) return -1;
  return A.pre.localeCompare(B.pre);
}

/**
 * @param {string} text full file contents
 * @returns {{ block: string } | { error: string }} error message without path prefix
 */
export function extractFrontmatterBlockFromText(text) {
  if (!text.startsWith('---')) {
    return {
      error: 'must start with YAML frontmatter (---)',
    };
  }
  const rest = text.slice(3);
  const end = rest.indexOf('\n---');
  if (end === -1) {
    return { error: 'unclosed frontmatter' };
  }
  return { block: rest.slice(0, end).replace(/^\n|\n$/g, '') };
}
