/// <reference types = "cypress" />

import loc from '../../support/locators'

describe('Testes funcionais', () => {
    before( () => { 
        cy.visit('https://barrigareact.wcaquino.me/')
        cy.get(loc.LOGIN.USER).type('madruga@chaves.com')
        cy.get(loc.LOGIN.PASSWORD).type('aluguel')
        cy.get(loc.LOGIN.BTN_LOGIN).click()

        cy.get(loc.MESSAGE).should('contain', 'Bem vindo')
    })

    it('Deve criar uma conta', () => {
        // cy.get('.input-group > .form-control').type('madruga@chaves.com')
        // cy.get(':nth-child(2) > .form-control').type('aluguel')
        // cy.get('.btn').click()

        // cy.get('.toast-message').should('exist')
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        
        cy.get(loc.CONTAS.NOME).type('Conta de teste')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')

    })

    it('Deve alterar uma conta', () => {
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.xpath(loc.CONTAS.XP_BTN_ALTERAR).click()
        cy.get(loc.CONTAS.NOME).clear().type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso')


    })
})