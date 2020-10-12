/// <reference types = "cypress" />

describe('Work with basic elements' ,() => {

    beforeEach( () => { //Tmb pode se usar Before + um cy.reload() mais abaixo
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })
    
    it('Text', () => {

        cy.get('body').should('contain', 'Cuidado')
        cy.get('span').should('contain', 'Cuidado')
        cy.get('[class="facilAchar"]').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
    })

    it('Links', () => {
        cy.get('[href="#"]').click()    //Usar a funcionalidade de Playground
        cy.get('#resultado').should('have.text', 'Voltou!') //Aqui tambem

        cy.reload()
        cy.get('#resultado').should('have.not.text', 'Voltou!')
        cy.contains('Volt').click()
        cy.get('#resultado').should('have.text', 'Voltou!')
    })

    it('Campos de texto' , () => {
        cy.get('#formNome').type('Cypress Test')
        cy.get('#formNome').should('have.value', 'Cypress Test') //"have.text" doesn't work here because it is for static content, not
        //field input values
        cy.get('#elementosForm\\:sugestoes').type('text area') //The "\:" bit was provided by the Cypress runner Playground, but an
        //additional slash was required in order to avoid confusion by the tool
        .should('have.value', 'text area')
        
        cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input').type('???')

        cy.get('[data-cy=dataSobrenome]').type('12345{backspace}{backspace}') //"{backspace}" is to delete the previous character using backspace
        .should('have.value', '123')

        cy.get('#elementosForm\\:sugestoes')
        .clear()
        .type('Erro{selectall}acerto', {delay:100}) //"{selectall}" is to simulate selecting all the characters within a field in order to wipe them out on the next keystroke
        .should('have.value', 'acerto')

            
    })

    it('RadioButton', () => {
        cy.get('#formSexoFem').click()
        .should('be.checked')

        cy.get('#formSexoMasc').should('not.be.checked')

        cy.get('[name="formSexo"]').should('have.length', 2) //Para validar que existem 2 radio buttons

    })

    it('CheckBoxes', () => {
        cy.get('#formComidaPizza')
        .click()
        .should('be.checked')

        cy.get('[name="formComidaFavorita"]').click({multiple:true}) //Adicionando "multiple:true" porque temos varios elementos dentro de "formComidaRapida"
        cy.get('#formComidaPizza').should('not.be.checked')
        cy.get('#formComidaVegetariana').should('be.checked')
    })

    it('ComboBox', () => {
        cy.get('[data-test=dataEscolaridade]').select('2o grau completo')
        .should('have.value', '2graucomp') //Apparently, for combo boxes you cannot create assertions for selected items using
        //the "text" value you selected, but rather, to validate that the hard-coded HTML value is actually appearing, which is not always the same

        cy.get('[data-test=dataEscolaridade]').select('1graucomp')
        .should('have.value', '1graucomp')

        cy.get('[data-test=dataEscolaridade] option') //RETROACTIVE... This is to check against the contents of the ComboBox to validate the amount of options, as well as the actual options' texts
        .should('have.length', 8)
        cy.get('[data-test=dataEscolaridade] option').then($arr => {
            const values = []
            $arr.each(function() {
                values.push(this.innerHTML)
            })
            expect(values).to.include.members(["Superior", "Mestrado"])
        })
    })

    it.only('ComboMultiplo', () => {
        cy.get('[data-testid=dataEsportes]').select(['natacao', 'Corrida', 'nada']) //As above, in order to select multiple values, we need to
        //use the HTML value name instead of the actual visible "text" name

        //TO DO: to validate the selected options on line 77
        //cy.get('[data-testid=dataEsportes]').should('have.value', ['natacao', 'Corrida', 'nada'])
        cy.get('[data-testid=dataEsportes]').then($el => {
            expect($el.val()).to.be.deep.equal(['natacao', 'Corrida', 'nada'])
            expect($el.val()).to.have.length(3)
        })

        cy.get('[data-testid=dataEsportes]').invoke('val').should('eql', ['natacao', 'Corrida', 'nada']) //"eql" could be used instead of "deep equal"
    })
})