export default class GithubUserNameChecker {
    constructor(api, username) {
        this.username = username
        this.api = api.getGithubStatus(username)
        this.isAvailable.bind(this)
    }

    async isAvailable() {
        const apiStatus = await this.api
        if (apiStatus === 404) {
            return true
        } else {
            return false
        }
    }
}