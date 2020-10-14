/// <reference types = "cypress" />

describe('Work with Fixtures...', () => {

    it('Get data from feature file', function () { //This is a bit different than usual; it's because of the "this" portions below...
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.fixture('userData').as('usuario').then(() => {

            cy.get('#formNome').type(this.usuario.nome)
            cy.get('#formSobrenome').type(this.usuario.sobrenome)
            cy.get(`[name=formSexo][value=${this.usuario.sexo}]`).click() //Notice how we used the other apostrophe (below as well)!!!
            cy.get(`[name=formComidaFavorita][value=${this.usuario.comida}]`).click()
            cy.get('#formEscolaridade').select(this.usuario.escolaridade)
            cy.get('#formEsportes').select(this.usuario.esportes)
            cy.get('#formCadastrar').click()
            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')

            //Since all the above commands are "cy.xx" we would have no synchronisation concerns, therefore the final 2 lines could be 
            //either within or without the promise (i.e. "then")
        })

        

    })
})