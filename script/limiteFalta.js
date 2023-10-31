const cargaHorariaSlider = document.querySelector("[data-cargaHoraria-input]");
const cargaHorariaValorOutput = document.querySelector("[data-cargaHoraria-value]");
const faltasCargaHoraria = document.querySelector("[data-qtnFalta-input]");
const valorFalta = document.querySelector("[data-valor-faltas]");

function limpar(campo) {
    campo.innerHTML = '';
}

/**
 * Calculates the maximum number of absences allowed based on the total class time and the number of absences.
 * @param {string} tempoAula - The total class time in hours.
 * @param {number} faltas - The number of absences.
 */
function calculaFaltas(tempoAula, faltas) {
    let aulasQtn = parseFloat(tempoAula) / 0.5;
    let limiteFaltas = aulasQtn * 0.125;
    if (faltas < 0) {
        /**
         * Error message displayed when the number of absences is negative.
         * @type {string}
         */
        const mensagemLimiteFaltasHTML = "<span class=''><i class='alerta'>Insira uma quantidade de faltas valida</i> para calcular o limite de faltas!</span>";
        valorFalta.innerHTML = mensagemLimiteFaltasHTML;
    }
    else if (tempoAula === "0" && faltas === "") {
        limpar(valorFalta);
    } else if (tempoAula === "0") {
        /**
         * Error message displayed when the class time is not entered.
         * @type {string}
         */
        const mensagemLimiteFaltasHTML = "<span class=''>Você precisa digitar: </span><span class='regular'>carga horária de aula</span><span class=''> da matéria</span>";
        valorFalta.innerHTML = mensagemLimiteFaltasHTML;
    } else if (faltas > limiteFaltas) {
        /**
         * Error message displayed when the number of absences exceeds the maximum allowed.
         * @type {string}
         */
        const mensagemLimiteFaltasHTML = "<span class=''>Infelizmente </span><span class='alerta'>você está reprovado</span><span class=''> por faltas</span>";
        valorFalta.innerHTML = mensagemLimiteFaltasHTML;
    } else {
        faltas = faltas.trim() === '' ? 0 : parseFloat(faltas);
        let porcentagemFaltas = ((faltas / limiteFaltas) * 100);
        mostrarResultado(porcentagemFaltas, faltas, limiteFaltas);
    }
}

function mostrarResultado(porcentagemFaltas, faltas, limiteFaltas) {
    const mensagemLimiteFaltasHTML =
        "<div class='slide-range-outinput'>" +
        "<div class='slider-value''>" + porcentagemFaltas.toFixed(2) + "%</div>" +
        "<div class='slider-value''>" + limiteFaltas + "</div>" +
        "</div>" +
        "<div class='slider-container'>" +
        "<input class='_range slider' name='limiteFaltas' type='range' min='0' max='" + limiteFaltas + "' value='" + faltas + "' step='1' style='background-image: -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(" + faltas / limiteFaltas + ", rgb(207, 203, 203)), color-stop(" + faltas / limiteFaltas + ", #667074));cursor: initial !important;' disabled>" +
        "</div>" +
        "<div class='' style='text-align: center;'>" +
        "<span class=''>você </span><span class='regular'>pode faltar " + (limiteFaltas - faltas) + "</span><span class=''> de " + limiteFaltas + "</span>";
    "</div>"
        ;
    valorFalta.innerHTML = mensagemLimiteFaltasHTML;
}

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
        var style = 'background-image: -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(' + valPercent + ', rgb(207, 203, 203)), color-stop(' + valPercent + ', #667074));';
        el.style = style;
    };
    el.oninput();
});