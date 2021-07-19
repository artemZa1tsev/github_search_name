import GithubApiAdapter from './githubApiAdapter.js';

async function isAvailable(username) {
  const apiStatus = await GithubApiAdapter.getGithubStatus(username);
  if (apiStatus === 404) {
    return true;
  }
  return false;
}
