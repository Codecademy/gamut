const GitHub = require('github-api');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const PR_NUMBER = process.env.CIRCLE_PR_NUMBER || 124;
const codeBlock = '```';

const gh = new GitHub({
  token: GITHUB_TOKEN,
});

const repoIssues = gh.getIssues('RyzacInc', 'gamut');

function parseVersionsComment() {
  const versions = require('../.published-versions.json');

  if (!versions) return '';

  return versions
    .filter(v => !v.private)
    .map(v => `${v.name}: ${v.version}`)
    .join('\n');
}

async function createIssueComment() {
  try {
    const versions = parseVersionsComment();
    if (!versions) console.log('No packages published, skipping PR comment');

    const comment = `
Published:
${codeBlock}
${versions}
${codeBlock}
`;
    await repoIssues.createIssueComment(PR_NUMBER, comment);
    console.log('created comment:', parseVersionsComment());
  } catch (e) {
    console.error(e);
  }
}

createIssueComment();
