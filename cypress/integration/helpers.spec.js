/// <reference types = "cypress" />

//const { resolve, reject } = require("cypress/types/bluebird")

describe('Helpers, etc..', () => 
{
    it('Wrap', () => {
        const obj = {nome: 'User', idade: 20}
        expect(obj).to.have.property('nome')  //Assertions with "should" cannot be used for this format (non cy commands)
        cy.wrap(obj).should('have.property', 'nome')

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        // //cy.get('#formNome').type('funciona?')
        // cy.get('#formNome').then($el => {
        //     //$el.val('funciona via jquery') //This is an alternative method to typing while not using cy.get + type()
        //     cy.wrap($el).type('funciona via cypress')
        // })

        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(10)
            }, 500)
        })

        cy.get('#buttonSimple').then(() => console.log('Encontrei o primeiro botao'))
        //promise.then(num => console.log(num))
        cy.wrap(promise).then(ret => console.log(ret)) //this was inserted in order to synchronise the execution steps to be in the order they were coded
        cy.get('#buttonList').then(() => console.log('Encontrei o segundo botao'))

        // cy.wrap(1).then( num => { //Thanks to "then" return and should were in concert, ignoring "wrap(1)"
        //     return 2
        // }).should('be.equal', 2)

        cy.wrap(1).should( num => { //If "should" is used, the "return" is bypassed and ignored
            return 2
        }).should('be.equal', 1)
    })

    it('Its...', () => {
        const obj = {nome: 'User', idade: 20}
        cy.wrap(obj).should('have.property', 'nome', 'User')
        cy.wrap(obj).its('nome').should('be.equal', 'User')

        const obj2 = {nome: 'User', idade: 20, endereco: {rua: 'dos bobos'}}
        cy.wrap(obj2).its('endereco').should('have.property', 'rua')
        cy.wrap(obj2).its('endereco').its('rua').should('contain', 'bobos')
        cy.wrap(obj2).its('endereco.rua').should('contain', 'bobos')

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.title().its('length').should('be.equal', 20)
        
    })

    it.only('Invoke...', () =>  {
        const getValue = () => 1;
        const soma = (a, b) => a + b;

        cy.wrap({ fn: getValue}).invoke('fn').should('be.equal', 1)
        cy.wrap({ fn: soma}).invoke('fn', 2, 5).should('be.equal', 7)

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('#formNome').invoke('val', 'Texto via invoke') //Ver linhas 14 & 15
        cy.window().invoke('alert', 'Da pra ver?')
        cy.get('#resultado').invoke('html', '<input type="button", value="hacked"/>') //This evidently inserts a button on the site

    })
})