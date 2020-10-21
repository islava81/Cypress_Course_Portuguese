/// <reference types = "cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Testes funcionais', () => {
     before( () => {
        cy.login('madruga@chaves.com', 'aluguel') 
    //     cy.visit('https://barrigareact.wcaquino.me/')
    //     cy.get(loc.LOGIN.USER).type('madruga@chaves.com')
    //     cy.get(loc.LOGIN.PASSWORD).type('aluguel')
    //     cy.get(loc.LOGIN.BTN_LOGIN).click()

    //     cy.get(loc.MESSAGE).should('contain', 'Bem vindo')
    })

    beforeEach(() => {
        cy.get(loc.MENU.HOME).click()
        cy.resetApp()
    })

    it('Deve criar uma conta', () => {
        // cy.get('.input-group > .form-control').type('madruga@chaves.com')
        // cy.get(':nth-child(2) > .form-control').type('aluguel')
        // cy.get('.btn').click()

        // cy.get('.toast-message').should('exist')
        // cy.get(loc.MENU.SETTINGS).click()
        // cy.get(loc.MENU.CONTAS).click()
        
        // cy.get(loc.CONTAS.NOME).type('Conta de teste')
        // cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.acessarMenuConta()
        cy.inserirConta('Conta de teste')

        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')

    })

    it('Deve alterar uma conta', () => {
        // cy.get(loc.MENU.SETTINGS).click()
        // cy.get(loc.MENU.CONTAS).click()
        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Conta para alterar')).click()
        cy.get(loc.CONTAS.NOME).clear().type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso')
    })

    it('Should not create duplicate accounts', () => {
        cy.acessarMenuConta()
        cy.get(loc.CONTAS.NOME).type('Conta mesmo nome')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'code 400')
    })

    it('Should create a transaction', () => {
        cy.get(loc.MENU.MOVIMENTACAO).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Senhor Barriga')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Conta para movimentacoes')

        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()

        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc', '123')).should('exist')
    })

    it('Deve pegar o saldo', () => {
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '534')

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()
        //cy.wait(1000)
        cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()

        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '4.034,00')
    })

    it('Deve remover uma movimentacao', () => {
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
    })
})