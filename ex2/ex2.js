//implémentation Axios
const axios = require('axios');

async function log(message) { // always returns a promise
    console.log(message);
    return "Done!";
}

async function timer() {
    return new Promise((resolve) => {
        console.log('Timer activated - waiting for 1s')
        setTimeout(resolve, 1000)
    })
}

// application of fetch
fetch('https://jsonplaceholder.typicode.com/users') // collects data from API, fetch() always returns a promise, so program goes on w/o waiting for result
    .then(response => response.json())
    // .then((json) => console.log(json));
    .then((json) => {
        console.log("Tableau des utilisateurs :", json)
        const usersNames = json.map(user => user.name); //display only the users' names
        console.log("Tableau des nomsdes utilisateurs :", usersNames);
    });



// application of axios (old ver of fetch)
async function main() {
    // let withErrors = false;

    try {
        await timer() // await can only be used in async func, pauses execution of func until the promise is resolved or rejected
            .then(() => axios.get('https://jsonplaceholder.typicode.com/posts?id=3'))
            .then(response => response.data) // display only the data
            .then(async function (data) { // anonymous func, for one-off usage
                console.log('Response with async..');
                console.log("Le post avec id 3 :", data);
                await timer();
                console.log('Response with await', data);
                const postsTitres = data.map(post => post.title);
                console.log("Son titre est :", postsTitres);
                await timer();


                // return timer().then(() => console.log('response with then', data));
            })
            .then(() => new Promise((_, reject) => reject(new Error('Boom !')))) // error testing
            .catch(function (error) {
                // withErrors = true;
                console.error('An error occured in the then/catch !', error);
                throw error; // bring error up along the code chain, thus catch() detects the error too
            });
    }
    catch (error2) {
        console.error('An error occured in the try/catch !', error2);
    }
}

main();