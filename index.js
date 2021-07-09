 async function nameGen(str) {
     let result = [] 
     let resultFree = []  
     const name = str.split(' ');   
     const firstName = name[0].split('')  
     const lastName = name[1].split('')
     const firstLenght = firstName.join("").length
     const lastLenght = lastName.join("").length
     const lastFirst = Math.ceil((firstLenght + lastLenght) / 2 + 1)
     for (let i = 1; i <= lastFirst; i++) {
         const x = firstName.join('').substr(0, i) + lastName.join('').substr(0, i)
         result.push(x)
     }
     for (let i = 0; i <= result.length; i++) {
         const requestURL = "https://api.github.com/users/" + result[i]    
         const xhr = new XMLHttpRequest()
         xhr.open('GET', requestURL, true)    
         xhr.responseType = 'json'
         xhr.onloadend = async () => {
             if (xhr.status == 404) {
                  resultFree.push(result[i])
                 
                 console.log(resultFree[0])
             } 
         }
         xhr.send();
     }
 }
 console.log(nameGen("Nata Petr"))
