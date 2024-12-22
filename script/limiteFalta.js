/**
 * Este script serve para calcular o porcentagem de faltas em uma disciplina e mostrar o resultano na pagina
 * @summary Script para calcular o limite de faltas.
 * @since 1.0.0
 * @file Este script está localizado em /d:/guiaDoMochileiroDoIC/script/limiteFaltas.js
 */
/**
 * O elementos de entradas para as variaveis.
 * @type {HTMLElement}
 */
const cargaHorariaSlider = document.querySelector("[data-cargaHoraria-input]");
const cargaHorariaValorOutput = document.querySelector("[data-cargaHoraria-value]");
const faltasCargaHoraria = document.querySelector("[data-qtnFalta-input]");
const valorFalta = document.querySelector("[data-valor-faltas]");

/**
 * As mensagens exibidas ao usuário em diferentes cenários.
 * @type {Object}
 */
const mensagens = {
    limpaCampo: '',
    entradaInvalida: "<span class=''><i class='alerta'>Insira uma quantidade de faltas válida</i> para calcular o limite de faltas!</span>",
    cargaHorariaNaoDigitada: "<span class=''>Você precisa digitar a </span><span class='regular'>carga horária</span><span class=''> da matéria</span>",
    reprovadoPorFaltas: "<span class=''>Infelizmente </span><span class='alerta'>você está reprovado</span><span class=''> por faltas</span>"
};

/**
 * Limpa o conteúdo de um elemento HTML.
 * @param {HTMLElement} campo - O elemento HTML a ser limpo.
 * @returns {void}
 */
function limpar(campo) {
    campo.innerHTML = mensagens.limpaCampo;
}

/**
 * Calcula a porcentagem de faltas e exibe o resultado na página.
 * @param {string} tempoAula - O tempo total de aula em horas.
 * @param {string} faltas - O número de faltas.
 * @returns {void}
 */
function calculaFaltas(tempoAula, faltas) {
    let aulasQtn = parseFloat(tempoAula) / 0.5;
    let limiteFaltas = aulasQtn * 0.125;

    if (faltas < 0) {
        /**
         * Mensagem de erro exibida quando o número de faltas é negativo.
         * @type {string}
         */
        valorFalta.innerHTML = mensagens.entradaInvalida;
    } else if (tempoAula === "0" && faltas === "") {
        limpar(valorFalta);
    } else if (tempoAula === "0") {
        /**
        * Mensagem de erro exibida quando a carga horaria não for digitada.
        * @type {string}
        */
        valorFalta.innerHTML = mensagens.cargaHorariaNaoDigitada;
    } else if (faltas > limiteFaltas) {
        /**
        * Mensagem de erro exibida quando o aluno estiver reprovado por faltas.
        * @type {string}
        */
        valorFalta.innerHTML = mensagens.reprovadoPorFaltas;
    } else {
        faltas = faltas.trim() === '' ? 0 : parseFloat(faltas);
        let porcentagemFaltas = (faltas / limiteFaltas) * 100;
        mostrarResultado(porcentagemFaltas, faltas, limiteFaltas);
    }
}

/**
 * Exibe o resultado do cálculo na página.
 * @param {number} porcentagemFaltas - A porcentagem de faltas.
 * @param {number} faltas - O número de faltas.
 * @param {number} limiteFaltas - O número máximo de faltas permitidas.
 * @returns {void}
 */
function mostrarResultado(porcentagemFaltas, faltas, limiteFaltas) {
    const mensagemLimiteFaltasHTML =
        "<div class='slide-range-outinput'>" +
        "<div class='slider-value'>" + porcentagemFaltas.toFixed(2) + "%</div>" +
        "<div class='slider-value'>" + limiteFaltas + "</div>" +
        "</div>" +
        "<div class='slider-container'>" +
        "<input class='_range slider pontoFaltas no-thumb' name='limiteFaltas' type='range' min='0' max='" + limiteFaltas + "' value='" + faltas + "' step='1' style='background-image: -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(" + faltas / limiteFaltas + ", #698269), color-stop(" + faltas / limiteFaltas + ", #667074)); cursor: initial !important;' disabled>" +
        "</div>" +
        "<div class='' style='text-align: center;'>" +
        "<span class=''>você </span><span class='regular'>pode faltar " + (limiteFaltas - faltas) + "</span><span class=''> de " + limiteFaltas + "</span>" +
        "</div>";

    valorFalta.innerHTML = mensagemLimiteFaltasHTML;
}

/**
 * Exibe o valor do controle deslizante de carga horária.
 * @returns {void}
 */
function mostraValorCargaHoraria() {
    cargaHorariaValorOutput.textContent = cargaHorariaSlider.value;
    calculaFaltas(cargaHorariaSlider.value, faltasCargaHoraria.value);
}

cargaHorariaSlider.addEventListener("input", mostraValorCargaHoraria);
faltasCargaHoraria.addEventListener("input", function () {
    calculaFaltas(cargaHorariaSlider.value, faltasCargaHoraria.value);
});

document.querySelectorAll("[data-cargaHoraria-input]").forEach(function (el) {
    el.oninput = function () {
        var valPercent = (el.valueAsNumber - parseInt(el.min)) / (parseInt(el.max) - parseInt(el.min));
        /**
         * O estilo CSS para a imagem de fundo de um elemento, criado usando um gradiente webkit.
         * @type {string}
         */
        var style = 'background-image: -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(' + valPercent + ', #698269), color-stop(' + valPercent + ', #667074));';
        el.style = style;
    };
    el.oninput();
});
