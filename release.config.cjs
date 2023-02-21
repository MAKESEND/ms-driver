const { execSync } = require('child_process');

const isDryRun = (process.argv ?? []).includes('--dry-run');

function getLocalRepoUrl() {
  const topLevelDir = execSync('git rev-parse --show-toplevel')
    .toString()
    .trim();

  return `file://${topLevelDir}/.git`;
}

const dryRunPlugins = [
  '@semantic-release/changelog',
  '@semantic-release/release-notes-generator',
  '@semantic-release/commit-analyzer',
  '@semantic-release/git',
];

// TODO: setup ci process with GH actions
const allPlugins = [
  ...dryRunPlugins,
  '@semantic-release/github',
  [
    '@semantic-release/npm',
    {
      npmPublish: false,
    },
  ],
];

module.exports = {
  plugins: isDryRun ? dryRunPlugins : allPlugins,
  release: {
    branches: ['master'],
    prepare: [
      '@semantic-release/changelog',
      {
        path: '@semantic-release/git',
        assets: ['package.json', 'CHANGELOG.md'],
        message:
          'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.version}',
      },
    ],
  },
  ...(isDryRun && { repositoryUrl: getLocalRepoUrl() }),
};
