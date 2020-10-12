/// <reference types = "cypress" />

describe('Ordem das buscas...', () => {
    
    before( () => { //Tmb pode se usar Before + um cy.reload() mais abaixo
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach( () => {
        cy.reload()
    })

    it('Using jQuery selectlr', () => {
        cy.get(':nth-child(1) > :nth-child(3) > [type="button"]')
        cy.get('table#tabelaUsuarios  tbody > tr:eq(0) td:nth-child(3) > input')
        cy.get('[onclick*="Francisco"]')
        //cy.get('#tabelaUsuarios td:contains("Doutorado"):eq(0)')
        cy.get('#tabelaUsuarios td:contains("Doutorado"):eq(0) ~ td:eq(3) > input') //This is to fetch the text input field to the right of the
        //"Clique aqui" button next to the first "Doutorado" on the table
        cy.get('#tabelaUsuarios tr:contains("Doutorado"):eq(0) td:eq(6) input') //Searching by table row
    })

    it('Using X-Path', () => {
        cy.xpath('//input[contains(@onclick, "Francisco")]')
        //It's probably best to begin X-Patch locators with double quotes
        cy.xpath("//table[@id='tabelaUsuarios']//td[contains(., 'Francisco')]/..//input[@type='text']")
        cy.xpath("//td[contains(., 'Usuario A')]/following-sibling::td[contains(., 'Mestrado')]/..//input[@type='text']").type('Encontrei!')

    })


})