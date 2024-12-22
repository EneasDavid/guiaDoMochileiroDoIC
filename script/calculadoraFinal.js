/**
 * Este script serve para calcular a média de um aluno e a nota que ele precisa tirar na final.
 * @summary Script para calcular a média do aluno.
 * @since 1.0.0
 * @file Este script está localizado em /d:/guiaDoMochileiroDoIC/script/calculadoraFinal.js
 */

let media = 0;
let notaFinalAluno = 0;
let notaUm = document.querySelector('input[name="notaUm"]');
let notaDois = document.querySelector('input[name="notaDois"]');
let notaReav = document.querySelector("[data-notaReav-input]");
const valorMedia = document.querySelector("[data-valor-mediaRegular]");
const valorNotaFinal = document.querySelector("[data-valor-notaFinal]");

/**
 * Objeto que contém mensagens utilizadas na calculadora.
 * @typedef {Object} Mensagens
 * @property {string} limpaCampo - Mensagem vazia para limpar o campo.
 * @property {string} entradaVazia - Mensagem exibida quando as notas não são inseridas.
 * @property {string} valorInvalido - Mensagem exibida quando as notas inseridas são inválidas.
 * @property {string} precisaReav - Mensagem exibida quando é necessário inserir a nota da REAV.
 * @property {string} finalAprovado - Mensagem exibida quando o aluno é aprovado na final.
 * @property {string} finalReprovado - Mensagem exibida quando o aluno não pode fazer a final.
 */
const mensagens = {
    limpaCampo: '',
    entradaVazia: "<span class=''><i class='regular'>Insira as duas notas</i> para calcular a média regular!</span>",
    valorInvalido: "<span class=''><i class='alerta'>Insira notas válidas</i> para calcular a média regular!</span>",
    precisaReav: "<span class=''>Insira a <i class='regular'>nota da REAV </i> para calcular a média regular!</span>",
    finalAprovado: "<span>Parabéns, <i class='regular'>você passou!</i></span>",
    finalReprovado: "<span class=''>Infelizmente você <bold class='alerta'>não pode fazer a final!</bold></span>"
};

/**
 * Limpa o conteúdo de um elemento HTML e insere a mensagem "limpaCampo".
 * @param {HTMLElement} campo - O elemento HTML a ser limpo.
 */
function limpar(campo) {
    campo.innerHTML = mensagens.limpaCampo;
}

/**
 * Calcula a média de duas notas e exibe na página.
 *
 * @param {number} nota1 - Primeira maior nota.
 * @param {number} nota2 - Segunda maior nota.
 * @param {number} [notaReav] - A nota de reavaliação (opcional).
 */
function calcMedia(nota1, nota2, notaReav) {
    let notaUm = parseFloat(nota1);
    let notaDois = parseFloat(nota2);
    let notaReavaliacao = parseFloat(notaReav);

    if (!isNaN(notaReavaliacao)) {
        console.log(notaUm, notaDois);
        if (notaUm > notaDois) {
            if (notaReavaliacao > notaDois) {
                console.log("chegamos aqui");
                notaDois = notaReavaliacao;
            }
        } else if (notaReavaliacao > notaUm) {
            notaUm = notaReavaliacao;
        }
    }
    console.log(notaUm, notaDois);
    media = (notaUm + notaDois) / 2;
    /**
    * Mensagem de erro exibida quando as notas são inválidas.
    * @type {string}
    */
    const mensagemMediaHTML = `<span class=''>Sua média regular é: <span class='regular'>${media.toFixed(2)}</span></span>`;
    valorMedia.innerHTML = mensagemMediaHTML;
}


/**
 * Calcula a nota final do aluno com base na média atual e na nota mínima necessária na final.
 */
function calculaFinal() {
    const mediaFinal = 5.5;
    notaFinalAluno = (mediaFinal-(media*.6))/.4;
    /**
    * Mensagem de erro exibida quando as notas são inválidas.
    * @type {string}
    */
    const mensagemNotaFinalHTML = `<span class=''>Você precisa tirar: <span class='alerta'>${notaFinalAluno.toFixed(2)}</span> na final.</span>`;
    valorNotaFinal.innerHTML = mensagemNotaFinalHTML;
}

/**
 * Verifica se uma variável está vazia.
 * @param {Object} variavel - A variável a ser verificada.
 * @returns {boolean} Retorna true se a variável estiver vazia, caso contrário retorna false.
 */
function verificaVazio(variavel) {
    return variavel.value.trim() === '';
}

/**
 * Verifica se o valor de uma variável está dentro de um intervalo específico.
 * @param {HTMLInputElement} variavel - O elemento HTML que contém o valor a ser verificado.
 * @param {number} minValor - O valor mínimo do intervalo.
 * @param {number} maxValor - O valor máximo do intervalo.
 * @returns {boolean} - Retorna true se o valor da variável estiver dentro do intervalo, caso contrário, retorna false.
 */
function verificaIntervalo(variavel, minValor, maxValor) {
    return parseFloat(variavel.value) >= minValor && parseFloat(variavel.value) <= maxValor;
}
function verificaIntervaloReav(nota, media) {
    return parseFloat(nota.value) < media;
}

/**
 * Executa a função de cálculo de média e exibe o resultado na página.
 * @function
 * @returns {void}
 */
function executa() {
    limpar(valorNotaFinal);
    if (verificaVazio(notaUm) || verificaVazio(notaDois)) {
        valorMedia.innerHTML = mensagens.entradaVazia;
        notaReav.classList.remove('visible');
        notaReav.value = '';
        media = 0;
    } else if (verificaIntervalo(notaUm, 0, 10) && verificaIntervalo(notaDois, 0, 10)) {
        if (!(verificaVazio(notaUm)) && !(verificaVazio(notaDois))) {
            if (notaUm.value < 7 || notaDois.value < 7) {
                valorMedia.innerHTML = mensagens.precisaReav;
                notaReav.classList.add('visible');
                if (verificaVazio(notaReav)) {
                        return;
                }else if(!verificaIntervalo(notaReav, 0, 10)){
                        valorMedia.innerHTML = mensagens.valorInvalido;
                        return;
                }
            } else {
                notaReav.classList.remove('visible');
                notaReav.value = '';
            }
            calcMedia(notaUm.value, notaDois.value, notaReav.value);
            const final = media >= 5 && media < 7;
            if (final) calculaFinal();
            else {
                if (media < 5) {
                    valorMedia.innerHTML = mensagens.finalReprovado;
                } else {
                    const mensagemMediaHTML = `${mensagens.finalAprovado}<br><span>Com média de: <i class='regular'>${media.toFixed(2)}</i></span>`;
                    valorMedia.innerHTML = mensagemMediaHTML;
                }
            }
        }
    } else {
        valorMedia.innerHTML = mensagens.valorInvalido;
    }
}

// Adicione um evento que verifica se a notaReav está vazia quando notaUm ou notaDois são digitadas
notaUm.addEventListener("input", function(){
    notaUm = document.querySelector('input[name="notaUm"]');
    notaDois = document.querySelector('input[name="notaDois"]');
    executa();
});
notaDois.addEventListener("input",  function(){
    notaUm = document.querySelector('input[name="notaUm"]');
    notaDois = document.querySelector('input[name="notaDois"]');
    executa();
});

notaReav.addEventListener("input", executa);

executa();
