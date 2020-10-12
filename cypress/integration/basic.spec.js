/// <reference types = "cypress" />

describe('Cypress basics', () => {
    it.only('Should visit a page and assert title', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        // const title = cy.title()
        // console.log(title)

        //Don't forget: you can user "debug()" to view stuff on the browser's console

        //cy.pause()  When using this, you need to click "Play" on the Cypress runner in order to proceed with the test

        cy.title()
        .should('be.equal', 'Campo de Treinamento')
        .and('contain', 'Campo') //Pode ser "and" ao inves de outro "should"

        let syncTitle

        cy.title().then( title => {  //Pode se substituir "then" por "should" pras Promises
            console.log(title)
            cy.get('#formNome').type(title)

            syncTitle = title
        })

        cy.get('[data-cy=dataSobrenome]').then($el => {
            $el.val('syncTitle')
        })

        cy.get('#elementosForm\\:sugestoes').then($el => { //Don't forget the double backward slashes!!!
            cy.wrap($el).type(syncTitle)
        })

        //cy.title().debug() //This is another alternative to the above method

    })

    it('Should find and interact with an element', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('#buttonSimple').click()
        cy.get('#buttonSimple').should('have.value', 'Obrigado!')
    })
})