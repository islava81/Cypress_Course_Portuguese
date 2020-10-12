/// <reference types = "cypress" />

//const { find } = require("cypress/types/lodash")

describe('Work with Pop-ups' ,() => {

    beforeEach( () => { 
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    it('Deve testar pop-up diretamente', () => {
        cy.visit('https://wcaquino.me/cypress/frame.html')  //Altered the site's URL to include "frame" rather than "componentes"
        //This was done because evidently both versions behave differently from each other
        cy.get('#otherButton').click()

        cy.on('window:alert', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Click OK!')
        })

    })
    
    it('Deve verificar se o pop-up foi invocado', () => {
        
        cy.window().then(win => {
            cy.stub(win, 'open').as('winOpen') //"winOpen" is an alias, in this case. It's apparently to prevent the site's pop up from ACTUALLY firing
        })
        cy.get('#buttonPopUp').click()
        cy.get('@winOpen').should('be.called') //The "@" is necessary to reference aliases

        //Apparently, we can only test if the pop-ups were triggered or not, but nothing else (i.e. manipulate the pop-up itself)
        
    })

describe('Pop-ups with links...', () => {
    
    it('Check pop-up URL', () => {

        cy.contains('Popup2').should('have.prop', 'href').and('equal', 'https://wcaquino.me/cypress/frame.html')

    })

    it('Should access pop-up dynamically' , () => {
        cy.contains('Popup2').then($a => { //The "$a" refers to "href" (a link)
            const href = $a.prop('href') //This fetches the link's actual path
            cy.visit(href)
        })
    })

    it('Should force link on same page' , () => {
        cy.contains('Popup2')
        .invoke('removeAttr', 'target') //This is jQuery to obtain the "/blank" property of the link to force it to open its target on
        //the same browser tab
        .click()
        cy.get('#tfield').type('funciona')
    })
})

   
})