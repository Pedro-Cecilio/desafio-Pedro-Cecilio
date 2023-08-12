class CaixaDaLanchonete {
    constructor(){
        this.precoDosItens = {
            cafe: 3.00,
            chantily: 1.50,
            suco: 6.20,
            sanduiche: 6.50,
            queijo: 2.00,
            salgado: 7.25,
            combo1: 9.50,
            combo2: 7.50
        };
    } 
    calcularValorDaCompra(metodoDePagamento, itens) {
        if (!this.validaSeExistemItens(itens)) {
            return "Não há itens no carrinho de compra!"
        }
        let novoArrayDeItens = this.transformarArrayDeItens(itens);

        if (!this.validaMetodoDePagamento(metodoDePagamento)) {
            return "Forma de pagamento inválida!"
        }
        if (!this.validaItens(novoArrayDeItens)) {
            return "Item inválido!"
        }
        if (!this.validaQuantidadeDeItens(novoArrayDeItens)) {
            return "Quantidade inválida!"
        }
        if (!this.validaSePodeAdicionarItemExtra(novoArrayDeItens)) {
            return "Item extra não pode ser pedido sem o principal"
        }
       
        const precoParcial = this.calculaPrecoParcial(novoArrayDeItens)
        const precoFinal = this.calculaPrecoFinal(precoParcial, metodoDePagamento)
        const precoFinalFormatado = precoFinal.toFixed(2).replaceAll('.', ',')
        return `R$ ${precoFinalFormatado}`
    }
    validaSeExistemItens(itens) {
        let existemItens = true;
        if (!itens.length || !itens) {
            existemItens = false;
        }
        return existemItens;
    }
    transformarArrayDeItens(itens) {
        const novoArrayDeItens = itens.map((item) => {
            const arrayDoItem = item.split(',');
            return { nome: arrayDoItem[0], quantidade: arrayDoItem[1] };
        })
        return novoArrayDeItens;
    }
    validaMetodoDePagamento(metodoPagamento) {
        let valido = false;
        if (metodoPagamento == 'debito' || metodoPagamento == 'credito' || metodoPagamento == 'dinheiro') {
            valido = true;
        }
        return valido
    }
    validaItens(itens) {
        let valido = true;
        for (const item of itens) {
            switch (item.nome) {
                case "cafe":
                    valido = true;
                    break;
                case "chantily":
                    valido = true;
                    break;
                case "suco":
                    valido = true;
                    break;
                case "sanduiche":
                    valido = true;
                    break;
                case "queijo":
                    valido = true;
                    break;
                case "salgado":
                    valido = true;
                    break;
                case "combo1":
                    valido = true;
                    break;
                case "combo2":
                    valido = true;
                    break;
                default:
                    valido = false;
                    break;
            }
            if (!valido) {
                break;
            }
        };
        return valido;
    }
    validaQuantidadeDeItens(itens) {
        let valido = true;
        for (const item of itens) {
            if (item.quantidade == 0) {
                valido = false;
                break;
            }
        }
        return valido;
    }
    validaSePodeAdicionarItemExtra(itens) {
        let podePedirChantily = true;
        let podePedirQueijo = true;

        for (const item of itens) {
            if (item.nome === "chantily" && !itens.some((i) => i.nome === "cafe")) {
                podePedirChantily = false;
            }
            if (item.nome === "queijo" && !itens.some((i) => i.nome === "sanduiche")) {
                podePedirQueijo = false;
            }
        }
        let podeItemExtra = podePedirChantily && podePedirQueijo
        return podeItemExtra;
    }
    calculaPrecoParcial(itens) {
        let precoParcial = 0;
        itens.forEach(item => {
            switch (item.nome) {
                case "cafe":
                    precoParcial += this.precoDosItens.cafe * item.quantidade;
                    break;
                case "chantily":
                    precoParcial += this.precoDosItens.chantily * item.quantidade;
                    break;
                case "suco":
                    precoParcial += this.precoDosItens.suco * item.quantidade;
                    break;
                case "sanduiche":
                    precoParcial += this.precoDosItens.sanduiche * item.quantidade;
                    break;
                case "queijo":
                    precoParcial += this.precoDosItens.queijo * item.quantidade;
                    break;
                case "salgado":
                    precoParcial += this.precoDosItens.salgado * item.quantidade;
                    break;
                case "combo1":
                    precoParcial += this.precoDosItens.combo1 * item.quantidade;
                    break;
                case "combo2":
                    precoParcial += this.precoDosItens.combo2 * item.quantidade;
                    break;
            }
        });
        return precoParcial;
    }
    calculaPrecoFinal(precoParcial, metodoDePagamento) {
        let precoFinal = 0;
        switch (metodoDePagamento) {
            case 'dinheiro':
                precoFinal = precoParcial - (precoParcial * 5 / 100);
                break;
            case 'credito':
                precoFinal = precoParcial + (precoParcial * 3 / 100);
                break;
            case 'debito':
                precoFinal = precoParcial;
                break;
        }
        return precoFinal;

    }
}

export { CaixaDaLanchonete };
