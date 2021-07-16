const URL = 'https://api.github.com/';

export default class githubApiAdapter {
    async getGithubStatus(username) {
        const urlUser = `${URL}users/${username}?access_token=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`
        return fetch(urlUser)
            .then(res => res.status)
    }
}