const URL = 'https://api.github.com/';

export default class githubApiAdapter {
  static async getGithubStatus(username, accessToken) {
    const urlUser = `${URL}users/${username}?access_token=${accessToken}`;
    return fetch(urlUser)
      .then((res) => res.status);
  }
}
