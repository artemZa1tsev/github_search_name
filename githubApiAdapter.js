const URL = 'https://api.github.com/';

export class GithubUserNameChecker {
    async isAvailable(username) {
        const urlUser =  `${URL}users/${username}`
        return fetch(urlUser)
            .then(res => res.ok)
    }
}