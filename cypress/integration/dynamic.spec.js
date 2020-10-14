/// <reference types = "cypress" />

describe('Testes dinamicos...', () => {
    
    beforeEach( () => { 
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    const food = ['Carne', 'Frango', 'Pizza', 'Vegetariano']
    food.forEach( food => {

    
        it(`Casastro com a comida ${food}`, () => {

            cy.get('#formNome').type('Usuario')
            cy.get('#formSobrenome').type('Cualquer')
            cy.get('[name=formSexo][value=F]').click() //Notice how we used the other apostrophe (below as well)!!!
            cy.xpath(`//label[contains(., '${food}')]/preceding-sibling::input`).click()
            cy.get('#formEscolaridade').select('Superior')
            cy.get('#formEsportes').select('Corrida')

            cy.get('#formCadastrar').click()
            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
        })
    })

    it.only('Deve selecionar todos usando o "each', () => {

        cy.get('#formNome').type('Usuario')
            cy.get('#formSobrenome').type('Cualquer')
            cy.get('[name=formSexo][value=F]').click() //Notice how we used the other apostrophe (below as well)!!!
            //cy.get('[name=formComidaFavorita]').click({multiple:true}) //Did not use the "#{element name}" format this time....
            cy.get('[name=formComidaFavorita]').each($el => { //This does the same as the above, but with one fell swoop...
                //$el.click()
                if($el.val() != 'vegetariano')
                    cy.wrap($el).click() //And this is similar to the original approach...
            })
            
            cy.get('#formEscolaridade').select('Superior')
            cy.get('#formEsportes').select('Corrida')

            //The below is because if you select "Vegetariano" plus another non-vegetarian option, you will get an alert...
            cy.get('#formCadastrar').click()
            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
            //cy.clickAlert('#formCadastrar', 'Tem certeza que voce eh vegetariano?')
    })
})