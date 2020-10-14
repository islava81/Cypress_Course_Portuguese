/// <reference types = "cypress" />
describe('Clocks...', () => {
    
    beforeEach( () => { 
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

   it('Voltando ao passado...', () => {
    cy.get('#buttonNow').click()
    cy.get('#resultado > span').should('contain', '12/10/2020') //This is obviously going to fail on the next calendar name...
    // cy.clock()
    // cy.get('#buttonNow').click()
    // cy.get('#resultado > span').should('contain', '31/12/1969')

    const dt = new Date(2012, 3, 10, 15, 23, 50)
    cy.clock(dt.getTime())

    cy.get('#buttonNow').click()
    cy.get('#resultado > span').should('contain', '10/04/2012')
   })

   it.only('Indo ao futuro...', () => {
    cy.get('#buttonTimePassed').click()
    cy.get('#resultado > span').should('contain', '16025')
    cy.get('#resultado > span').invoke('text').then(t => {
        const number = parseInt(t)
        cy.wrap(number).should('gt', 1602559982344) //gt = greater than
    })
    cy.clock()
    cy.get('#buttonTimePassed').click()
    cy.get('#resultado > span').invoke('text').then(t => {
        const number = parseInt(t)
        cy.wrap(number).should('lte', 0)  ///lte = lower than or equal
    })
    cy.wait(1000)
    cy.get('#buttonTimePassed').click()
    cy.get('#resultado > span').invoke('text').then(t => {
        const number = parseInt(t)
        cy.wrap(number).should('lte', 1000)
    })

    cy.tick(5000)  //This command moves the clock forward
    cy.get('#buttonTimePassed').click()
    cy.get('#resultado > span').invoke('text').then(t => {
        const number = parseInt(t)
        cy.wrap(number).should('gte', 5000)
    })
   })
})