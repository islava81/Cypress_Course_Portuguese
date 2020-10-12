/// <reference types = "cypress" />

describe('Esperas...', () => {
    
    before( () => { //Tmb pode se usar Before + um cy.reload() mais abaixo
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach( () => {
        cy.reload()
    })
    
    it('Deve aguardar elemento estar disponivel', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo').type('funciona')
    })

    it('Deve fazer retentativas', () => {
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')
        
    })

    it('Uso do "find"', () => {
        cy.get('#buttonList').click()
        cy.get('#lista li').find('span')
        .should('contain', 'Item 1')      //Did it manually (esp. adding "span") this way so as to include both "<li>" within id="lista," rather than getting the
        //xpath individually through the Playground
        cy.get('#buttonList').click()
        cy.get('#lista li').find('span')
        .should('contain', 'Item 2')

        cy.get('#buttonListDOM').click()   //Apparently this button does the same as the one above; however, when "Item 2 appears"
        //onscreen, it removes "Item cy.get('#buttonListDOM').click()1" and then displays both items simultaneously, thus removing "li span" from the DOM temporarily,
        //and therefore would't find it if we tried the above approach       
        cy.get('#lista li').find('span')
        .should('contain', 'Item 1')
        cy.get('#lista li span')
        .should('contain', 'Item 2')

    })

    it('Uso do timeout', () => {
        // cy.get('#buttonDelay').click()
        // cy.get('#novoCampo').should('exist') //To make the test fail because it's expecting the field to appear sooner than normal
        cy.get('#buttonListDOM').click()
        //cy.wait(5000)
        cy.get('#lista li span')
        //.should('contain', 'Item 2')
        .should('have.length', 1)
        cy.get('#lista li span') //Had to insert this, because otherwise it will fail with these 2 consecutive asserts because of the changing behaviour of the Item elements
        .should('have.length', 2)
        //NOTE: cy.wait() will stop the execution based on the time value entered therin, regardless of how fast the system is performing.
        //NOTE 2: {timeout:xxxxx} will only set the maximum time limit that the system will wait for something to happen; it can end sooner than that
    })
    
    it('Click retry', () => {
        cy.get('#buttonCount').click().click()
        .should('have.value', '111')
    })

    it.only('Should vs Then', () => {
        // cy.get('#buttonListDOM').click()
        // // cy.get('#lista li span').debug
        // //.should('have.length', 1)   //This works with "then/should + expect etc..." as shown below
        // cy.get('#lista li span').then( $el => {
        //     //console.log($el)
        //     expect($el).to.have.length(1)
        // }).and('have.id', 'buttonListDOM')

        //The main difference between "Then" and "Should is that the former waits until the command is executed before doing any validations
        //or asserts, while the latter continues to retry the command until it times out to see of the expectations are met

        cy.get('#buttonListDOM').then( $el => {
            expect($el).to.have.length(1)
            //return 2
            cy.get('#buttonList')
        })//.and('not.have.id', 'buttonListDOM').and('eq', 2)

        //Outra coisa: se vai se precisar fazer novas buscas depois de uma busca, ter que usar "Then;" caso contrario, usar "Should" para aproveitar suas retentativas
    })
})
