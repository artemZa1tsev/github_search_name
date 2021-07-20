import GithubApiAdapter from './githubApiAdapter.js';

class GithubUserNameChecker {
  constructor(username, accessToken) {
    this.username = username;
    this.accessToken = accessToken;
  }

  async isAvailable() {
    const apiStatus = await GithubApiAdapter.getGithubStatus(this.username, this.accessToken);
    if (apiStatus === 404) {
      return true;
    }
    return false;
  }
}
