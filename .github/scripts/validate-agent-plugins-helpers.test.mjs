import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  cmpSemver,
  escapeRe,
  extractFrontmatterBlockFromText,
  fmHasKey,
  SEMVER,
} from './validate-agent-plugins-helpers.mjs';

describe('cmpSemver', () => {
  it('returns 0 for equal versions', () => {
    assert.equal(cmpSemver('1.0.0', '1.0.0'), 0);
  });

  it('orders patch', () => {
    assert.ok(cmpSemver('1.0.1', '1.0.0') > 0);
    assert.ok(cmpSemver('1.0.0', '1.0.1') < 0);
  });

  it('orders minor and major', () => {
    assert.ok(cmpSemver('1.1.0', '1.0.9') > 0);
    assert.ok(cmpSemver('2.0.0', '1.99.99') > 0);
  });

  it('treats release as newer than prerelease', () => {
    assert.ok(cmpSemver('1.0.0', '1.0.0-alpha') > 0);
    assert.ok(cmpSemver('1.0.0-alpha', '1.0.0') < 0);
  });

  it('ignores build metadata', () => {
    assert.equal(cmpSemver('1.0.0+build1', '1.0.0+build2'), 0);
  });

  it('compares prerelease strings', () => {
    assert.ok(cmpSemver('1.0.0-beta', '1.0.0-alpha') > 0);
  });
});

describe('fmHasKey', () => {
  it('detects key at line start', () => {
    assert.equal(fmHasKey('description: hello', 'description'), true);
    assert.equal(fmHasKey('name: x\ndescription: y', 'description'), true);
  });

  it('does not match indented or inline keys', () => {
    assert.equal(fmHasKey('  description: no', 'description'), false);
    assert.equal(fmHasKey('text: description: no', 'description'), false);
  });

  it('escapes regex metacharacters in key', () => {
    assert.equal(fmHasKey('a.b: 1', 'a.b'), true);
    assert.equal(fmHasKey('ab: 1', 'a.b'), false);
  });
});

describe('escapeRe', () => {
  it('escapes metacharacters', () => {
    assert.equal(escapeRe('a+b'), 'a\\+b');
    assert.equal(escapeRe('x.y'), 'x\\.y');
  });
});

describe('extractFrontmatterBlockFromText', () => {
  it('returns block between first and second ---', () => {
    const r = extractFrontmatterBlockFromText(
      '---\ndescription: ok\n---\n# body\n'
    );
    assert.ok('block' in r);
    assert.equal(r.block, 'description: ok');
  });

  it('errors when file does not start with ---', () => {
    const r = extractFrontmatterBlockFromText('# no frontmatter\n');
    assert.ok('error' in r);
    assert.match(r.error, /YAML frontmatter/);
  });

  it('errors when closing --- is missing', () => {
    const r = extractFrontmatterBlockFromText('---\ndescription: x\n');
    assert.ok('error' in r);
    assert.match(r.error, /unclosed/);
  });
});

describe('SEMVER', () => {
  it('accepts common semver forms', () => {
    assert.equal(SEMVER.test('1.0.0'), true);
    assert.equal(SEMVER.test('0.1.0-rc.1'), true);
    assert.equal(SEMVER.test('10.20.30+meta'), true);
  });

  it('rejects invalid', () => {
    assert.equal(SEMVER.test('1.0'), false);
    assert.equal(SEMVER.test('v1.0.0'), false);
  });
});
