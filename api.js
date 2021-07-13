const URL = 'https://api.github.com/';

export class SaerchByName {
    async checkName(user) {
        const urls = [
            `${URL}users/${user}`,
        ];
        return fetch(urls)
            .then(res => res.ok)
    }
}