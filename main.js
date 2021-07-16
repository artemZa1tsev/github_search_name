import GithubApiAdapter from "./githubApiAdapter.js";
import GithubUserNameChecker from "./githubUserNameChecker.js";



const api = new GithubApiAdapter()
const username = "anton"
const githubUserNameChecker = new GithubUserNameChecker(api, username)
githubUserNameChecker.isAvailable()