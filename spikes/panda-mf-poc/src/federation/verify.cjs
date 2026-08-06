/* eslint-disable no-console, @typescript-eslint/no-var-requires */

/* Does the RUNTIME styling engine survive a Module Federation boundary?
 *
 * rspack-mf-spike.md answered this for the STATIC path (Panda recipes + a
 * complete staticCss sheet). It did not answer it for the runtime injector that
 * panda-via-gamut-option-a.md introduces, which is now the thing consumer-authored
 * styles depend on.
 *
 * Hand-written CommonJS on purpose: it needs to `require` two independently
 * bundled copies of the engine, which is only meaningful across separate module
 * scopes. React is external to both bundles, so there is exactly one React —
 * matching MF with react as a shared singleton.
 *
 * Run: yarn nx run panda-mf-poc:federation */

const path = require('node:path');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { JSDOM, VirtualConsole } = require('jsdom');

const A = require(path.join(__dirname, '../../.mf/copyA.cjs'));
const B = require(path.join(__dirname, '../../.mf/copyB.cjs'));

const checks = [];
const check = (label, ok, detail) => checks.push({ label, ok, detail });
const h = React.createElement;

const HOST_THEME = { marker: 'HOST-THEME', colors: {}, breakpoints: {} };

// ---------------------------------------------------------------------------
// 1. Class-name determinism across independent copies
// ---------------------------------------------------------------------------
const sample = { padding: '1rem', color: 'red', '&:hover': { color: 'blue' } };
const classA = A.inject({ ...sample });
const classB = B.inject({ ...sample });

check(
  'identical styles produce the identical class name in both copies',
  classA === classB && classA.length > 0,
  `${classA} vs ${classB}`
);

// ---------------------------------------------------------------------------
// 2. SSR registries are per-copy, so the same rule is emitted twice
// ---------------------------------------------------------------------------
const cssA = A.extractStyles();
const cssB = B.extractStyles();

check(
  'each copy keeps its OWN SSR registry (rule emitted by both)',
  cssA.includes(classA) && cssB.includes(classB),
  `${Buffer.byteLength(cssA)}B + ${Buffer.byteLength(
    cssB
  )}B for one logical rule`
);
check(
  'duplicate SSR output is byte-identical, so it is idempotent not conflicting',
  cssA === cssB,
  'same selector, same declarations — safe to ship both, just wasteful'
);

// ---------------------------------------------------------------------------
// 3. React context does NOT cross the boundary
// ---------------------------------------------------------------------------
const sameCopy = renderToStaticMarkup(
  h(A.ThemeProvider, { theme: HOST_THEME }, h(A.ThemeProbe))
);
const crossCopy = renderToStaticMarkup(
  h(A.ThemeProvider, { theme: HOST_THEME }, h(B.ThemeProbe))
);

check(
  'provider and consumer in the SAME copy: theme flows',
  sameCopy.includes('HOST-THEME'),
  sameCopy
);
check(
  'provider and consumer in DIFFERENT copies: theme is LOST (falls back)',
  crossCopy.includes('DEFAULT-THEME'),
  `${crossCopy} — this is the load-bearing finding`
);

// ---------------------------------------------------------------------------
// 4. In a real DOM, do the copies converge on one <style> tag?
// ---------------------------------------------------------------------------
/* Quiet virtual console: jsdom's CSSOM rejects `@layer`, so `insertRule` throws
 * and the engine's `appendChild` fallback takes over. That's expected here and
 * asserted explicitly below rather than left as stderr noise. */
const dom = new JSDOM(
  '<!doctype html><html><head></head><body></body></html>',
  {
    virtualConsole: new VirtualConsole(),
  }
);
global.document = dom.window.document;

const domSample = { margin: '2rem', outlineColor: 'green' };
const domClassA = A.inject({ ...domSample });
const domClassB = B.inject({ ...domSample });

const styleTags = dom.window.document.querySelectorAll('style[data-gamut]');
const sheetText = [...styleTags].map((tag) => tag.textContent ?? '').join('');
const occurrences = (
  sheetText.match(new RegExp(`\\.${domClassA}\\b`, 'g')) ?? []
).length;

check(
  'both copies write into ONE <style data-gamut> tag',
  styleTags.length === 1,
  `${styleTags.length} tag(s)`
);
check(
  "the second copy adopts the first copy's rules instead of duplicating",
  domClassA === domClassB && occurrences <= 1,
  `rule appears ${occurrences}x for class ${domClassA}`
);

/* jsdom's CSSOM does not implement `@layer`, so `insertRule` throws and the
 * engine falls back to appending a text node. Worth asserting because mono runs a
 * large jest suite on jsdom — the fallback is what will actually execute there,
 * and it needs to work. Real browsers take the insertRule path. */
const usedTextFallback = (styleTags[0].childNodes.length ?? 0) > 0;
check(
  'jsdom (jest) falls back from insertRule to text append, and still works',
  usedTextFallback && sheetText.includes(domClassA),
  "mono's jest suite runs on jsdom, so this is the path its tests will take"
);

// ---------------------------------------------------------------------------
console.log('\n=== Runtime engine across a Module Federation boundary ===');
console.log('Two independently bundled engine copies, one shared React.\n');
checks.forEach(({ label, ok, detail }) =>
  console.log(
    `${ok ? 'PASS' : 'FAIL'}  ${label}${detail ? `\n        ${detail}` : ''}`
  )
);

const failed = checks.filter((entry) => !entry.ok);
console.log(
  `\n${checks.length - failed.length}/${checks.length} checks passed`
);

console.log(`
CONCLUSION

  Deterministic hashing means duplicated CSS across MF copies is idempotent,
  never conflicting — strictly better than Emotion, whose two-cache setup in
  front <-> TI can produce competing insertion orders, and far better than CSS
  Modules, which hash per build.

  BUT React context does not cross a federation boundary. A remote bundling its
  own copy of the engine cannot see the host's ThemeProvider and silently falls
  back to the default theme. Emotion has this exact problem today, which is why
  platform declares '@emotion/react' a singleton.

  => Gamut MUST be a shared singleton across host and remotes. That is a
     REQUIREMENT of the runtime engine, not a nicety. front's
     sharedDependencies.js omits gamut and emotion today and needs to change.
`);

process.exit(failed.length === 0 ? 0 : 1);
