import GithubApiAdapter from './githubApiAdapter.js';

class GithubUserNameChecker {
  constructor(username, accessToken) {
    this.username = username;
    this.accessToken = accessToken;
  }

  async isAvailable() {
    const apiStatus = await GithubApiAdapter.getGithubStatus(this.username, this.accessToken);
    if (apiStatus === 404) {
      return true;
    }
    return false;
  }
}

function nameGen2(firstName, lastName) {
  const result = [];
  const lastFirst = Math.max(firstName.length, lastName.length);
  for (let i = 1; i <= lastFirst; i++) {
    const x = firstName.slice(0, i) + lastName.slice(0, i);
    const y = lastName.slice(0, i) + firstName.slice(0, i);
    result.push(x) + result.push(y);
  }
  console.log(result);
  return result;
}

function numGen(x) {
  const result = [];
  for (let n = 0; n <= 9; n++) {
    for (let e = 0; e < x.length; e++) {
      for (let i = 0; i < x[e].length; i++) {
        const c = (function () {
          const str = x[e].split('');
          str[i] = n;
          return str.join('');
        }());
        result.push(c);
      }
    }
  }
  return result;
}

function number(array2, firstName, lastName, num) {
  console.log(array2);
  const lastFirst = Math.max(firstName.length, lastName.length);
  const result = [];
  for (let i = 1; i <= lastFirst; i++) {
    const g = firstName.substr(0, i) + lastName.substr(0, i) + num;
    const c = firstName.substr(0, i) + num + lastName.substr(0, i);
    const d = num + firstName.substr(0, i) + lastName.substr(0, i);
    const n = lastName.substr(0, i) + firstName.substr(0, i) + num;
    const z = lastName.substr(0, i) + num + firstName.substr(0, i);
    const b = num + lastName.substr(0, i) + firstName.substr(0, i);
    `${result.push(g)} ${result.push(c)} ${result.push(d)} ${result.push(n)} ${result.push(z)} ${result.push(b)}`;
  }
  return result;
}

console.log(number(numGen(nameGen2('artem', 'zaytsev')), 'artem', 'zaytsev', 2));

function num(x, num) {
  num = 4;
  x = ['ar'];
  const result = [];
  for (let i = 1; i <= num; i++) {
    result.push(Math.floor(Math.random() * 10));
  }
  return result.join('');
}

console.log(num());
