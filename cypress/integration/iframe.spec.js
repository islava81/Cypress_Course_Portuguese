/// <reference types = "cypress" />

//const { find } = require("cypress/types/lodash")

describe('Work with iFrames' ,() => {

    beforeEach( () => { 
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    it('Deve preencher campo de texto', () => {
        cy.get('#frame1').then(iframe => {
            const body = iframe.contents().find('body')
            cy.wrap(body).find('#tfield').type('funciona?')
            .should('have.value', 'funciona?') //Since this is NOT a text field really, it has to be "have.value" as opposed to "contains", etc
            
            cy.on('window:alert', msg => {
                console.log(msg)
                expect(msg).to.be.equal('Alert Simples')
            })
            //cy.wrap(body).find('#otherButton').click()
            
        })
              
    })

    it('Deve testar iFrame diretamente', () => {
        cy.visit('https://wcaquino.me/cypress/frame.html')  //Altered the site's URL to include "frame" rather than "componentes"
        //This was done because evidently both versions behave differently from each other
        cy.get('#otherButton').click()

        cy.on('window:alert', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Click OK!')
        })

    })
})