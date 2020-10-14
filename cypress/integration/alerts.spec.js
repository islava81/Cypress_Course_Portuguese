/// <reference types = "cypress" />

describe('Work with alerts' ,() => {

    beforeEach( () => { 
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it.only('Alert', () => {
        // cy.get('#alert').click()
        // cy.on('window:alert', msg => {
        //     console.log(msg)
        //     expect(msg).to.be.equal('Alert Simples')
        // })
        //The above lines were instead stored in the "commands.js" file to simplify and parameterise...
        cy.clickAlert('#alert', 'Alert Simples')
    })

    it('Alert com mock', () => {

        const stub = cy.stub().as('alerta')  //It adds this "tag" in the Cypress runner
        cy.on('window:alert', stub)
        cy.get('#alert').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples') //GetCall is indexed, because there can be many in any given test.
            //Check the SPIES/STUBS section of the runner
        })
        
    })

    it('Confirm', () => {
        cy.get('#confirm').click()
        cy.on('window:confirm', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Confirm Simples')
        })

        
        cy.on('window:alert', msg => {
                console.log(msg)
                expect(msg).to.be.equal('Confirmado')
        })

          
    })

    it('Deny', () => {
        
        cy.on('window:confirm', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Confirm Simples')
            return false //This would be in lieu of clicking on the "Cancel" button, it seems
        })

        
        cy.on('window:alert', msg => {
                console.log(msg)
                expect(msg).to.be.equal('Negado')
        })
        cy.get('#confirm').click() //Due to Cypress' asynchronicity, this command can go after the assertions above it
        
    })

    it('Prompt', () => {
        
        cy.on('window:confirm', msg => { //It has to be done this way since Cypress does not yet have the ability to interact with browser
            //popups, therefore the browser's console has to intervene
            console.log(msg)
            expect(msg).to.be.equal('Era 39?')
        })

        
        cy.on('window:alert', msg => {
                console.log(msg)
                expect(msg).to.be.equal(':D')
        })
        cy.window().then(win => {
            cy.stub(win, 'prompt').returns('39')
        })
        cy.get('#prompt').click()
       
    })

    it.only('Desafio', () => {
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)
        cy.get('#formCadastrar').click()
        .then( () => expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio'))
        
        cy.get('#formNome').type('Felix')
        cy.get('#formCadastrar').click()
        .then( () => expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio'))

        cy.get('[data-cy=dataSobrenome]').type('Islava')
        cy.get('#formCadastrar').click()
        .then( () => expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio'))

        cy.get('#formSexoMasc').click()
        cy.get('#formCadastrar').click()
        
        // cy.on('window:alert', msg => {
         cy.get('#resultado > :nth-child(1)').should('exist')
         .and('have.text', 'Cadastrado!')
        //     console.log(msg)
        //     expect(msg).to.be.equal('Sobrenome eh obrigatorio')
        // })
    })
})