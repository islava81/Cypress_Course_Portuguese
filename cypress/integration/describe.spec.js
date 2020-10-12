/// <reference types = "cypress" />

it('Teste externo', () => {

})

describe('Deve agrupar os testes', () => {

    describe('Deve agrupar testes mais especificos', () => {
        it('Um teste especifico', () => {

        })

    })
    it('Um teste externo', () => {

    })

    describe('Deve agrupar testes mais especificos 2', () => {
        it('Um teste especifico 2', () => {

        })

    })
    it.only('Um teste interno ', () => {

    })
})