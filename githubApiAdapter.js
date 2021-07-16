const URL = 'https://api.github.com/';

export default class githubApiAdapter {
    async getGithubStatus(username) {
        const urlUser = `${URL}users/${username}`
        return fetch(urlUser)
            .then(res => res.status)
    }
}