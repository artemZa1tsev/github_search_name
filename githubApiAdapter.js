import accessToken from './accessToken.js';

const URL = 'https://api.github.com/';

export default class githubApiAdapter {
  static async getGithubStatus(username) {
    const urlUser = `${URL}users/${username}${accessToken}`;
    return fetch(urlUser)
      .then((res) => res.status);
  }
}
