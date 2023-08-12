import { CaixaDaLanchonete } from "./caixa-da-lanchonete.js";

const seila = new CaixaDaLanchonete()

const array = seila.transformarArrayDeItens(['cafe,1', 'suco,2'])
const calculo = seila.calculaPrecoParcial(array)
const fds = seila.validaItens(array)
console.log(calculo)