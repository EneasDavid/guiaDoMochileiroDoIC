const cargaHorariaSlider = document.querySelector("[cargaHorariaSlider]");
const cargaHorariaValue = document.querySelector("[cargaHorariaValue]");

function  mostraValorCargaHoraria() {
    cargaHorariaValue.textContent = cargaHorariaSlider.value;
}
cargaHorariaSlider.addEventListener("input", mostraValorCargaHoraria);
mostraValorCargaHoraria();