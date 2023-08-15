import { CaixaDaLanchonete } from "./caixa-da-lanchonete.js";

describe('CaixaDaLanchonete', () => {

    const validaTeste = (formaDePagamento, resultadoEsperado, itens) => {
        const resultado = new CaixaDaLanchonete()
            .calcularValorDaCompra(formaDePagamento, itens);

        expect(resultado.replace("\xa0", " ")).toEqual(resultadoEsperado);
    };
    const validaSeExisteItensTeste = (itens, resultadoEsperado) => {
        const resultado = new CaixaDaLanchonete()
            .validaSeExisteItens(itens);
        expect(resultado).toEqual(resultadoEsperado)
    }
    const validaFormatoDosItensTeste = (itens, resultadoEsperado) => {
        const resultado = new CaixaDaLanchonete()
            .validaFormatoDosItens(itens);
        expect(resultado).toEqual(resultadoEsperado)
    }
    const transformarArrayDeItensTeste = (itens, resultadoEsperado) => {
        const resultado = new CaixaDaLanchonete()
            .transformarArrayDeItens(itens);
        expect(resultado).toEqual(resultadoEsperado)
    }
    const validaMetodoDePagamentoTeste = (formaDePagamento, resultadoEsperado) => {
        const resultado = new CaixaDaLanchonete()
            .validaMetodoDePagamento(formaDePagamento);
        expect(resultado).toEqual(resultadoEsperado)
    }
    const validaItensTeste = (itens, resultadoEsperado) => {
        const resultado = new CaixaDaLanchonete()
            .validaItens(itens);
        expect(resultado).toEqual(resultadoEsperado)
    }
    const validaQuantidadeDosItensTeste = (itens, resultadoEsperado) => {
        const resultado = new CaixaDaLanchonete()
            .validaQuantidadeDosItens(itens);
        expect(resultado).toEqual(resultadoEsperado)
    }
    const validaSePodeAdicionarItemExtraTeste = (itens, resultadoEsperado) => {
        const resultado = new CaixaDaLanchonete()
            .validaSePodeAdicionarItemExtra(itens);
        expect(resultado).toEqual(resultadoEsperado)
    }
    const calculaPrecoParcialTeste = (itens, resultadoEsperado) => {
        const resultado = new CaixaDaLanchonete()
            .calculaPrecoParcial(itens);
        expect(resultado).toEqual(resultadoEsperado)
    }
    const calculaPrecoFinalTeste = (formaDePagamento, precoParcial, resultadoEsperado) => {
        const resultado = new CaixaDaLanchonete()
            .calculaPrecoFinal(precoParcial, formaDePagamento);
        expect(resultado).toEqual(resultadoEsperado)
    }
    // Testa o método calcularValorDaCompra
    test.each([
        ['com carrinho vazio', 'dinheiro', 'Não há itens no carrinho de compra!', []],
        ['com carrinho vazio', 'credito', 'Não há itens no carrinho de compra!', []],
        ['com carrinho vazio', 'debito', 'Não há itens no carrinho de compra!', []],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

    test.each([
        ['dinheiro', 'R$ 2,85', ['cafe,1']],
        ['credito', 'R$ 3,09', ['cafe,1']],
        ['debito', 'R$ 3,00', ['cafe,1']],
    ])('compra simples em %p deve resultar em %p', validaTeste);

    test.each([
        ['credito', 'R$ 11,85', ['cafe,1', 'sanduiche,1', 'queijo,1']],
        ['debito', 'R$ 11,50', ['cafe,1', 'sanduiche,1', 'queijo,1']],
    ])('compra de 3 itens em %p deve resultar em %p', validaTeste);

    test.each([
        ['dinheiro', 'R$ 33,73', ['cafe,4', 'sanduiche,3', 'queijo,2']],
        ['credito', 'R$ 36,56', ['cafe,4', 'sanduiche,3', 'queijo,2']],
        ['debito', 'R$ 35,50', ['cafe,4', 'sanduiche,3', 'queijo,2']],
    ])('compra de múltiplas quantidades em %p deve resultar em %p', validaTeste);

    test.each([
        ['com quantidade zero', 'dinheiro', 'Quantidade inválida!', ['cafe,0']],
        ['com um valor', 'credito', 'Item inválido!', ['1']],
        ['com código inexistente', 'debito', 'Item inválido!', ['pizza, 1']],
        ['com forma de pagamento inválida', 'especie', 'Forma de pagamento inválida!', ['cafe, 1']],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

    test.each([
        ['chantily', 'dinheiro', 'Item extra não pode ser pedido sem o principal', ['chantily,1']],
        ['queijo', 'credito', 'Item extra não pode ser pedido sem o principal', ['queijo,1']],
        ['chantily com outro item', 'credito', 'Item extra não pode ser pedido sem o principal', ['chantily,1', 'sanduiche,1']],
        ['queijo com outro item', 'debito', 'Item extra não pode ser pedido sem o principal', ['cafe,1', 'queijo,1']],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

    // Testa o método validaSeExisteItens
    test.each([
        [['suco,1'], true],
        [['salgado,1', 'sanduiche,2', 'queijo,2'], true],
        ['', false],
        [[], false],
        [{}, false]
    ])('Ao validar se existem itens com o valor %p deve resultar em %p', validaSeExisteItensTeste)

    // Testa o método validaFormatoDosItens
    test.each([
        [['suco, 1', 'cafe,2'], true],
        [['sanduiche,1', 'queijo,2'], true],
        [['1,suco', 'cafe,2'], false],
        [['chantily', 'suco,2'], false],
        [['combo1, 2', 'combo2, 1'], true],
        [['', 'combo1,2'], false],
    ])('Ao validar o formato dos itens %p deve resultar em %p', validaFormatoDosItensTeste)

    // Testa o método transformarArrayDeItens
    test.each([
        [['suco, 1', 'cafe,2'], "[{ nome: 'suco', quantidade: 1 }, { nome: 'cafe', quantidade: 2 }]", [{ nome: 'suco', quantidade: 1 }, { nome: 'cafe', quantidade: 2 }]],
        [['sanduiche, 1', 'queijo,2'], "[{ nome: 'cafe', quantidade: 1 }]", [{ nome: 'sanduiche', quantidade: 1 }, { nome: 'queijo', quantidade: 2 }]],
        [['suco, 1'], "[{ nome: 'cafe', quantidade: 1 }]", [{ nome: 'suco', quantidade: 1 }]],
        
    ])('Ao transformar o array de itens igual a %p deve resultar em %p', (itens,_, resultadoEsperado) => transformarArrayDeItensTeste(itens, resultadoEsperado))

    // Testa o método validaMetodoDePagamento
    test.each([
        ['debito', true],
        ['credito', true],
        ['dinheiro', true],
        ['pix', false],
        ['', false],
        [['dinheiro'], false],
    ])('Ao validar o método de pagamento igual a %p deve resultar em %p', validaMetodoDePagamentoTeste)

    // Testa o método validaItens
    test.each([
        ['cafe', true, [{ nome: 'cafe' }]],
        ['chantily', true, [{ nome: 'chantily' }]],
        ['suco', true, [{ nome: 'suco' }]],
        ['sanduiche', true, [{ nome: 'sanduiche' }]],
        ['queijo', true, [{ nome: 'queijo' }]],
        ['salgado', true, [{ nome: 'salgado' }]],
        ['combo1', true, [{ nome: 'combo1' }]],
        ['combo2', true, [{ nome: 'combo2' }]],
        ['pizza', false, [{ nome: 'pizza' }]],
        ['', false, [{ nome: '' }]],

    ])('Ao validar o item de nome igual a %p deve resultar em %p', (_, resultadoEsperado, itens) => validaItensTeste(itens, resultadoEsperado))

    // Testa o método validaQuantidadeDosItens
    test.each([
        ['1', true, [{ nome: 'cafe', quantidade: 1 }]],
        ['2', true, [{ nome: 'chantily', quantidade: 2 }]],
        ['-1', false, [{ nome: 'suco', quantidade: -1 }]],
        ['1', true, [{ nome: 'sanduiche', quantidade: 1 }]],
        ['2', true, [{ nome: 'queijo', quantidade: 2 }]],
        ['0', false, [{ nome: 'salgado', quantidade: 0 }]],
        ['1', true, [{ nome: 'combo1', quantidade: 1 }]],
        ['1', true, [{ nome: 'combo2', quantidade: 1 }]],
    ])('Ao validar a quantidade do item igual a %p deve resultar em %p', (_, resultadoEsperado, itens) => validaQuantidadeDosItensTeste(itens, resultadoEsperado));

    // Testa o método validaSePodeAdicionarItemExtra
    test.each([
        ["contendo chantily e cafe", true, [{ nome: 'chantily' }, { nome: 'cafe' }]],
        ["contendo queijo e sanduiche", true, [{ nome: 'queijo' }, { nome: 'sanduiche' }]],
        ["contendo queijo, sanduiche e chantily", false, [{ nome: 'sanduiche' }, { nome: 'queijo' }, { nome: 'chantily' }]],
        ["contendo queijo, cafe e chantily", false, [{ nome: 'cafe' }, { nome: 'queijo' }, { nome: 'chantily' }]],
        ["contendo chantily e sanduiche", false, [{ nome: 'chantily' }, { nome: 'sanduiche' }]],
        ["contendo queijo e cafe", false, [{ nome: 'queijo' }, { nome: 'cafe' }]],
        ["contendo chantily", false, [{ nome: 'chantily' }]],
        ["contendo queijo", false, [{ nome: 'queijo' }]],
    ])('Ao validar se pode adicionar extra no item %p deve resultar em %d', (_, resultadoEsperado, itens) => validaSePodeAdicionarItemExtraTeste(itens, resultadoEsperado));

    // Testa o método calculaPrecoParcial
    test.each([
        ['item contendo cafe(1)', 3.00, [{ nome: 'cafe', quantidade: 1 }]],
        ['item contendo cafe(1) e chantily(1)', 4.50, [{ nome: 'cafe', quantidade: 1 }, { nome: 'chantily', quantidade: 1 }]],
        ['item contendo cafe(2) e sanduiche(1)', 12.50, [{ nome: 'cafe', quantidade: 2 }, { nome: 'sanduiche', quantidade: 1 }]],
        ['item contendo suco(2)', 12.40, [{ nome: 'suco', quantidade: 2 }]],
        ['item contendo sanduiche(3)', 19.50, [{ nome: 'sanduiche', quantidade: 3 }]],
        ['item contendo queijo(2)', 4.00, [{ nome: 'queijo', quantidade: 2 }]],
        ['item contendo salgado(1)', 7.25, [{ nome: 'salgado', quantidade: 1 }]],
        ['item contendo combo1(1)', 9.50, [{ nome: 'combo1', quantidade: 1 }]],
        ['item contendo combo2(2)', 15.00, [{ nome: 'combo2', quantidade: 2 }]]
    ])('testar método calculaPrecoParcial com %p deve resultar em %p', (_, resultadoEsperado, itens) => calculaPrecoParcialTeste(itens, resultadoEsperado));

    // Testa o método calculaPrecoFinal
    test.each([
        ['dinheiro', 10.0, 9.5],
        ['credito', 10.0, 10.3],
        ['debito', 10.0, 10.0],
        ['dinheiro', 20.0, 19.0],
        ['credito', 20.0, 20.6],
        ['debito', 20.0, 20.0]
    ])('testar método calculaPrecoFinal para forma de pagamento %p e precoParcial %p, resultando em %p', calculaPrecoFinalTeste);
});
