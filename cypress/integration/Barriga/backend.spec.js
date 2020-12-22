/// <reference types = "cypress" />



describe('Testes funcionais', () => {
    
    let token //Declarando uma variavel global para poder reutilizar nos testes todos
    
    before( () => {
     //   cy.login('madruga@chaves.com', 'aluguel') 
        cy.getToken('madruga@chaves.com', 'aluguel') 
        .then(tkn => {
            token = tkn
        })   
    })

    beforeEach(() => {
    //      cy.resetApp()
        cy.resetRest()
    })

    it('Deve criar uma conta', () => {
        // cy.request( {
        //     method: 'POST',
        //     url: 'https://barrigarest.wcaquino.me/signin',
        //     body: {
        //         email: "madruga@chaves.com",
        //         redirecionar: false,
        //         senha: "aluguel"
        //     }
        // }).its('body.token').should('not.be.empty')
        
            // Originally the below request was being done separately; however, it was determined that it was needed for it to be included
            //within the previous request so as to leverage the login and its associated token; that's why it was included within the same
            //string of commands
        cy.request({
                url: 'https://barrigarest.wcaquino.me/contas',
                method: 'POST',
                //headers: {Authorization: `JWT ${token}`}, //it could be either "JWT" or "bearer"
                body: {
                    nome: 'Conta via rest'
                }
    
        }).as('response') //this apparently captures the response's contents
        

        cy.get('@response').then(res => { //calling on the response here with the "@" sign...
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta via rest')
        })
        
    })

    it('Deve alterar uma conta', () => {
        cy.getContaByName('Conta para alterar').then(contaId => {
            cy.request({
            url: `/contas/${contaId}`,
            method: 'PUT',
            body: {
                nome: 'Conta alterada via rest'
            },
            //headers: { Authorization: `JWT ${token}`} //THIS HAS BEEN PUT IN PLACE FROM THE "commands.js" file
            }).as('response')

        
       })
       cy.get('@response').its('status').should('be.equal', 200)
    })

    it('Should not create duplicate accounts', () => {
        cy.request({
            url: '/contas',
            method: 'POST',
            //headers: {Authorization: `JWT ${token}`}, //it could be either "JWT" or "bearer"
            body: {
                nome: 'Conta mesmo nome'
            },
            failOnStatusCode: false //Apparently this allows tests to proceed even if a "failed" status code (e.g. 400 or 500) is returned

        }).as('response') //this apparently captures the response's contents
    

        cy.get('@response').then(res => { //calling on the response here with the "@" sign...
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.equal('Já existe uma conta com esse nome!')
        
        })
    })

    it('Should create a transaction', () => {
        cy.getContaByName('Conta para movimentacoes')
            .then(contaId => {

        
                cy.request({
                    method: 'POST',
                    url: '/transacoes',
                    //headers: {Authorization: `JWT ${token}`},
                    body: {
                        conta_id: contaId,
                        data_pagamento: Cypress.moment().add({days: 1}).format('DD/MM/YYYY'),
                        data_transacao: Cypress.moment().format('DD/MM/YYYY'),
                        descricao: "desc",
                        envolvido: "inter",
                        status: true,
                        tipo: "REC",
                        valor: "123",
                    }
                }).as('response')
            })
        
        cy.get('@response').its('status').should('be.equal', 201)
        cy.get('@response').its('body.id').should('exist')
            
    })

    it('Deve pegar o saldo', () => {
        cy.request({
            method: 'GET',
            url: '/saldo',
            //headers: {Authorization: `JWT ${token}`}
        }).then(res => {
            let saldoConta = null
            res.body.forEach(c => {
                if(c.conta === 'Conta para saldo') saldoConta = c.saldo
            })
            expect(saldoConta).to.be.equal('534.00')
        })

        cy.request({
            method: 'GET',
            url: '/transacoes',
            qs: {                                                   //"qs" stands for "query string"!!!
                descricao: 'Movimentacao 1, calculo saldo'
            },
            headers: {Authorization: `JWT ${token}`}
        }).then(res => {
             cy.request({
                url: `https://barrigarest.wcaquino.me/transacoes/${res.body[0].id}`,
                method: 'PUT',
                //headers: {Authorization: `JWT ${token}`},
                body: {
                    status: true,
                    //The below values are mandatory; if they are absent, the test executions will fail
                    data_transacao: Cypress.moment(res.body[0].data_transacao).format('DD/MM/YYYY'),
                    data_pagamento: Cypress.moment(res.body[0].data_pagamento).format('DD/MM/YYYY'),
                    descricao: res.body[0].descricao,
                    envolvido: res.body[0].envolvido,
                    valor: res.body[0].valor,
                    conta_id: res.body[0].conta_id
                }

            }).its('status').should('be.equal', 200)
        })

        cy.request({
            method: 'GET',
            url: '/saldo',
            //headers: {Authorization: `JWT ${token}`}
        }).then(res => {
            let saldoConta = null
            res.body.forEach(c => {
                if(c.conta === 'Conta para saldo') saldoConta = c.saldo
            })
            expect(saldoConta).to.be.equal('4034.00')
        })
        
       
    })

    it('Deve remover uma movimentacao', () => {
        cy.request({
            method: 'GET',
            url: '/transacoes',
            //headers: {Authorization: `JWT ${token}`},
            qs: {descricao: 'Movimentacao para exclusao' }
        }).then(res => {
            cy.request( {
                url: `/transacoes/${res.body[0].id}`,
                method: 'DELETE',
                headers: {Authorization: `JWT ${token}`},
            }).its('status').should('be.equal', 204)
        })
    })
})