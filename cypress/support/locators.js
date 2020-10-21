const locators = {
    LOGIN: {
        USER: '[data-test=email]',
        PASSWORD: '[data-test=passwd]',
        BTN_LOGIN: '.btn'
    },

    MESSAGE: '.toast-message',

    MENU: {
        SETTINGS: '[data-test=menu-settings]',
        CONTAS: '[href="/contas"]',
        RESET: '[href="/reset"]',
        MOVIMENTACAO: '[data-test=menu-movimentacao]',
        HOME: '[data-test=menu-home]',
        EXTRATO: '[data-test=menu-extrato]'

    },

    MOVIMENTACAO: {
        DESCRICAO: '[data-test=descricao]',
        VALOR: '[data-test=valor]',
        INTERESSADO: '[data-test=envolvido]',
        BTN_SALVAR: '.btn-primary',
        STATUS: '[data-test=status]',
        CONTA: '[data-test=conta]'

    },

    CONTAS: {
        NOME: '[data-test=nome]',
        BTN_SALVAR: '.btn',
        FN_XP_BTN_ALTERAR: nome => `//table//td[contains(., '${nome}')]/..//i[@class='far fa-edit']`

    },

    EXTRATO: {
        LINHAS: '.list-group > li',
        FN_XP_BUSCA_ELEMENTO:(desc, value) => `//span[contains(., '${desc}')]/following-sibling::small[contains(., '${value}')]`,
        FN_XP_REMOVER_ELEMENTO: conta => `//span[contains(., '${conta}')]/../../..//i[@class="far fa-trash-alt"]`,
        FN_XP_ALTERAR_ELEMENTO: conta => `//span[contains(., '${conta}')]/../../..//i[@class="fas fa-edit"]`
    },

    SALDO: {
        FN_XP_SALDO_CONTA: nome => `//td[contains(., '${nome}')]/../td[2]`
    }

}

export default locators;