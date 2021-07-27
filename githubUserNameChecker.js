import GithubApiAdapter from './githubApiAdapter.js';

class GithubUserNameChecker {
  constructor(firstName, lastName, accessToken, favoriteNumber = '', numberOfdigits = 0) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.favoriteNumber = favoriteNumber;
    this.numberOfdigits = numberOfdigits;
    this.accessToken = accessToken;
    this.numberOfdigits = numberOfdigits;
    this.username = this.userNameGenerater(this.firstName, this.lastName);
    this.usernameFavoriteNumber = this.appendNumber();
    this.symbolReplace = this.symbolReplace();
    this.randomNumber = this.randomNumber();
  }

  async isAvailable(username) {
    const apiStatus = await GithubApiAdapter.getGithubStatus(username, this.accessToken);
    if (apiStatus === 404) {
      return true;
    }
    return false;
  }

  async parameterCheck() {
    if (this.favoriteNumber === '' && this.numberOfdigits === 0) {
      return this.searchName(this.username);
    }
    if (this.favoriteNumber === '' && this.numberOfdigits >= 1) {
      return this.searchName(this.symbolReplace);
    }
    if (this.favoriteNumber !== '' && this.numberOfdigits === 0) {
      return this.searchName(this.usernameFavoriteNumber);
    }
    if (this.favoriteNumber !== '' && this.numberOfdigits >= 1) {
      return this.searchName(this.usernameFavoriteNumber);
    }
  }

  async searchName(username) {
    let i = 0;
    while (i <= username.length - 1) {
      // eslint-disable-next-line no-await-in-loop
      if (await this.isAvailable(username[i] + this.randomNumber)) {
        return username[i] + this.randomNumber;
      }
      i += 1;
    }
    return 'No free name. Entered full name and surname? For a shorter username, add numeric parameters.';
  }

  userNameGenerater() {
    const result = [];
    const maxLength = Math.max(this.firstName.length, this.lastName.length);
    for (let i = 1; i <= maxLength; i += 1) {
      result.push(this.firstName.slice(0, i) + this.lastName.slice(0, i));
      result.push(this.lastName.slice(0, i) + this.firstName.slice(0, i));
    }
    return result;
  }

  symbolReplace() {
    const name = this.username;
    const result = [];
    for (let n = 0; n <= 9; n += 1) {
      for (let e = 0; e < name.length; e += 1) {
        for (let i = 0; i < name[e].length; i += 1) {
          const replace = (function substitution() {
            const str = name[e].split('');
            str[i] = n;
            return str.join('');
          }());
          result.push(replace);
        }
      }
    }
    result.sort((a, b) => b.length - a.length);
    return result.reverse();
  }

  appendNumber() {
    const { firstName } = this;
    const { lastName } = this;
    const num = this.favoriteNumber;
    const maxLength = Math.max(firstName.length, lastName.length);
    const result = [];
    for (let i = 1; i <= maxLength; i += 1) {
      for (let e = 0; e <= 2; e += 1) {
        const addNum = [firstName.substr(0, i), lastName.substr(0, i)];
        addNum.splice(e, 0, num);
        result.push(addNum.join(''));
      }
    }
    return result;
  }

  randomNumber() {
    let num = this.numberOfdigits;

    if (this.favoriteNumber === '' && num >= 1) {
      num -= 1;
    }
    const result = [];
    for (let i = 1; i <= num; i += 1) {
      result.push(Math.floor(Math.random() * 10));
    }
    return result.join('');
  }
}
