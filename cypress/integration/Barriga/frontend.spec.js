/// <reference types = "cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'
import buildEnv from '../../support/buildEnv'

describe('Testes funcionais', () => {

    after( () => { //This is being inserted because if we don't, the local storage will hang on to login credentials, and therefore
    //will skip over the login page every single time
        cy.clearLocalStorage()
    })

     beforeEach( () => {
        // cy.server()
        // cy.route({
        //     method: 'POST',
        //     url: '/signin',
        //     response: {
        //         id: 1000,
        //         nome: 'Usuario falso',
        //         token: 'Uma string muito grande que nao deveria ser aceito, mas na verdade, vai'
        //     }
            
        // }).as('signin')

        // cy.route({
        //    method: 'GET',
        //    url: '/saldo',
        //    response: [{
        //     "conta_id": 999,
        //     "conta":"Carteira",
        //     "saldo":"100.00"
        //     },
        //     {
        //     "conta_id": 9909,
        //     "conta":"Banco",
        //     "saldo":"10000000000.00"
        //     }
        //     ]
        // }).as('saldo')

        
        cy.login('madruga@chaves.com', 'aluguel') 
        
    //     cy.visit('https://barrigareact.wcaquino.me/')
    //     cy.get(loc.LOGIN.USER).type('madruga@chaves.com')
    //     cy.get(loc.LOGIN.PASSWORD).type('aluguel')
    //     cy.get(loc.LOGIN.BTN_LOGIN).click()

    //     cy.get(loc.MESSAGE).should('contain', 'Bem vindo')
    })

    beforeEach(() => {
        cy.get(loc.MENU.HOME).click()
        //cy.resetApp()
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

        // cy.route({
        //     method: 'GET',
        //     url: '/contas',
        //     response: [
        //         {"id":1,"nome":"Carteira","visivel":true,"usuario_id":11970},
        //         {"id":2,"nome":"Banco","visivel":true,"usuario_id":11970},
            
        // ]
        // }).as('contas')

        cy.intercept({
            method: 'POST',
            url: '/contas',
            response: {"id":3,"nome":"Conta de teste","visivel":true,"usuario_id":11970}
        }).as('saveConta')

        cy.acessarMenuConta()
        cy.intercept({
            method: 'GET',
            url: '/contas',
            response: [
                {"id":1,"nome":"Carteira","visivel":true,"usuario_id":11970},
                {"id":2,"nome":"Banco","visivel":true,"usuario_id":11970},
                {"id":3,"nome":"Conta de teste","visivel":true,"usuario_id":11970}
            
            ]
        }).as('contaSave')  

        cy.inserirConta('Conta de teste')

        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')

    })

    it('Deve alterar uma conta', () => {
        // cy.get(loc.MENU.SETTINGS).click()
        // cy.get(loc.MENU.CONTAS).click()
        cy.intercept({
            method: 'GET',
            url: '/contas',
            response: [
                {"id":1,"nome":"Carteira","visivel":true,"usuario_id":11970},
                {"id":2,"nome":"Banco","visivel":true,"usuario_id":11970},
            
        ]
        }).as('contas')

        cy.intercept({
            method: 'PUT',
            url: '/contas/**', //Originally it was "/1" but in order to simplify, it was altered like so
            response: [{"id":1,"nome":"Conta alterada","visivel":true,"usuario_id":11970}]
        })

        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Carteira')).click()
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
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Carteira')).should('contain', '100.00')

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