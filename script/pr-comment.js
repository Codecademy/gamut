const GitHub = require('github-api');
const minimist = require('minimist');

const argv = minimist(process.argv.slice(2));
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const PR_NUMBER = process.env.CIRCLE_PR_NUMBER || 115;

// basic auth
const gh = new GitHub({
  token: GITHUB_TOKEN,
});

// const repo = gh.getRepo('RyzacInc', 'gamut');
const repoIssues = gh.getIssues('RyzacInc', 'gamut');

if (!argv.comment) throw new Error('--comment argument is required');

const comment = `
  PUBLISHED CANARY VERSION
  ----------------
  ${argv.comment}
`;

async function createIssueComment() {
  try {
    const createdComment = await repoIssues.createIssueComment(
      PR_NUMBER,
      comment
    );
    console.log(createdComment);
  } catch (e) {
    console.error(e);
  }
}

createIssueComment();
