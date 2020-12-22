const buildEnv = () => {

    cy.intercept()
        cy.intercept({
            method: 'POST',
            url: '/signin',
            response: {
                id: 1000,
                nome: 'Usuario falso',
                token: 'Uma string muito grande que nao deveria ser aceito, mas na verdade, vai'
            }
            
        }).as('signin')

        cy.intercept({
           method: 'GET',
           url: '/saldo',
           response: [{
            "conta_id": 999,
            "conta":"Carteira",
            "saldo":"100.00"
            },
            {
            "conta_id": 9909,
            "conta":"Banco",
            "saldo":"10000000000.00"
            }
            ]
        }).as('saldo')
        
        cy.intercept({
            method: 'GET',
            url: '/contas',
            response: [
                {"id":1,"nome":"Carteira","visivel":true,"usuario_id":11970},
                {"id":2,"nome":"Banco","visivel":true,"usuario_id":11970},
            
        ]
        }).as('contas')

        cy.intercept({
            method: 'GET',
            url: '/extrato/**',
            response: [{
                "conta":"Conta para movimentacoes","id":323314,"descricao":"Movimentacao para exclusao","envolvido":"AAA","observacao":null,"tipo":"DESP","data_transacao":"2020-12-15T03:00:00.000Z","data_pagamento":"2020-12-15T03:00:00.000Z","valor":"-1500.00","status":true,
                "conta_id":355059,"usuario_id":11970,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta com movimentacao","id":323315,"descricao":"Movimentacao de conta","envolvido":"BBB","observacao":null,"tipo":"DESP","data_transacao":"2020-12-15T03:00:00.000Z","data_pagamento":"2020-12-15T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":355060,"usuario_id":11970,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta para saldo","id":323316,"descricao":"Movimentacao 1, calculo saldo","envolvido":"CCC","observacao":null,"tipo":"REC","data_transacao":"2020-12-15T03:00:00.000Z","data_pagamento":"2020-12-15T03:00:00.000Z","valor":"3500.00","status":false,"conta_id":355061,"usuario_id":11970,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta para saldo","id":323317,"descricao":"Movimentacao 2, calculo saldo","envolvido":"DDD","observacao":null,"tipo":"DESP","data_transacao":"2020-12-15T03:00:00.000Z","data_pagamento":"2020-12-15T03:00:00.000Z","valor":"-1000.00","status":true,"conta_id":355061,"usuario_id":11970,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta para saldo","id":323318,"descricao":"Movimentacao 3, calculo saldo","envolvido":"EEE","observacao":null,"tipo":"REC","data_transacao":"2020-12-15T03:00:00.000Z","data_pagamento":"2020-12-15T03:00:00.000Z","valor":"1534.00","status":true,"conta_id":355061,"usuario_id":11970,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta para extrato","id":323319,"descricao":"Movimentacao para extrato","envolvido":"FFF","observacao":null,"tipo":"DESP","data_transacao":"2020-12-15T03:00:00.000Z","data_pagamento":"2020-12-15T03:00:00.000Z","valor":"-220.00","status":true,"conta_id":355062,"usuario_id":11970,"transferencia_id":null,"parcelamento_id":null}]
        })
         
}

export default buildEnv