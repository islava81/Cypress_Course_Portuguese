//const { resolve, reject, some } = require("cypress/types/bluebird");

it('sem testes, ainda', () => { })

//const getSomething = () => 1;

// const system = () => {
//     console.log('init');
//     const something = getSomething();
//     console.log("Something is " +something);
//     console.log('end')
// }

// const getSomething = callback => {
//     setTimeout( () => {
//         callback(12); 
//     }, 1000)
// };

//Agora usando Promise...

const getSomething = () => {
    return new Promise((resolve, reject) => {
        setTimeout( () => {
            resolve(13); 
        }, 1000)
    })
}

const system = async () => {
    console.log('init');
    
    //getSomething(some => {
    //    console.log("Something is " +some);
    //    console.log('end')
    
    // Pode ser tmb... Dessa maneira, o valor do Callback vai aparecer ao final
    // getSomething(some => console.log("Something is " +some));
    // console.log('end')
    
    //})

    //const prom = getSomething();
    // prom.then(some => {
    //     console.log("Something is " +some)
    //     console.log('end')
    // })

    //Outra maneira mais, utilizando o "async" na linha 30...

    const some = await getSomething()
    console.log("Something is " +some)
    console.log('end')

}

system();