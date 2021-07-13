const URL = 'https://api.github.com/';

export class GithubUserNameChecker {
    async isAvailable(username) {
        const urls =  `${URL}users/${username}`
        return fetch(urls)
            .then(res => res.ok)
    }
}