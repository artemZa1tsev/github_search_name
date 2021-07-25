import GithubApiAdapter from './githubApiAdapter.js';

class GithubUserNameChecker {
  constructor(firstName, lastName, accessToken, favoriteNumber = '', numberOfdigits = 0) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.favoriteNumber = favoriteNumber;
    this.numberOfdigits = numberOfdigits;
    this.accessToken = accessToken;
    this.username = this.userNameGenerater(this.firstName, this.lastName);
    this.usernameFavoriteNumber = this.appendNumber();
    this.numberOfdigits = numberOfdigits;
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

  async searchName() {
    const name = this.username;
    const nameAndfavoriteNumber = this.usernameFavoriteNumber;
    const nameSymbolReplace = this.numberOfdigits;
    if (this.favoriteNumber === '' && nameSymbolReplace === 0) {
      for (let i = 1; i <= name.length; i += 1) {
        if (await this.isAvailable(name[i])) {
          if (name[i] === undefined) {
            return 'No free name. Entered full name and surname? For a shorter username, add numeric parameters.';
          }
          return name[i];
        }
      }
    }
    if (this.favoriteNumber !== '' && nameSymbolReplace === 0) {
      for (let i = 1; i <= nameAndfavoriteNumber.length; i += 1) {
        if (await this.isAvailable(nameAndfavoriteNumber[i])) {
          return nameAndfavoriteNumber[i];
        }
      }
    }
    if (this.favoriteNumber !== '' && nameSymbolReplace === 1) {
      for (let i = 1; i <= this.symbolReplace.length; i += 1) {
        if (await this.isAvailable(this.symbolReplace[i])) {
          return this.symbolReplace[i];
        }
      }
    }
    if (this.favoriteNumber !== '' && nameSymbolReplace > 1) {
      for (let i = 1; i <= this.symbolReplace.length; i += 1) {
        if (await this.isAvailable(this.symbolReplace[i])) {
          return this.symbolReplace[i];
        } for (let e = 1; e <= this.symbolReplace.length; e += 1) {
          const x = this.symbolReplace[e] + this.randomNumber;
          if (await this.isAvailable(x)) {
            return x;
          }
        }
      }
    }
  }

  userNameGenerater() {
    const result = [];
    const maxLength = Math.max(this.firstName.length, this.lastName.length);
    for (let i = 1; i <= maxLength; i += 1) {
      const userName = result.push(this.firstName.slice(0, i) + this.lastName.slice(0, i));
      const reversUsername = result.push(this.lastName.slice(0, i) + this.firstName.slice(0, i));
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
        const g = [firstName.substr(0, i), lastName.substr(0, i)];
        g.splice(e, 0, num);
        result.push(g.join(''));
      }
    }
    return result;
  }

  randomNumber() {
    const num = this.numberOfdigits;
    const result = [];
    for (let i = 1; i <= num - 1; i += 1) {
      result.push(Math.floor(Math.random() * 10));
    }
    return result.join('');
  }
}
