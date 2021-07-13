class NameGen { 
    async loadUserData(user) {
        const URL = 'https://api.github.com/';
        const urls = [
            `${URL}users/${user}`,
        ];
        
        return fetch(urls)
            .then(res => console.log(res.ok))
    }
}
let nameGen = new NameGen
console.log(nameGen.loadUserData("anton"))




