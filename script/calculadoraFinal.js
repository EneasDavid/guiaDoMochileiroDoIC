// Declaração de media
let media=0;
let notaFinalAluno=5.5;

const startButton = document.querySelector("[data-calcular-button]");

// Recebendo as notas
const notaUm=document.querySelector("[data-notaUm-input]");
const notaDois=document.querySelector("[data-notaDois-input]");

// Recebendo o elemento onde você deseja mostrar a média
const valorMedia=document.querySelector("[data-valor-mediaRegular]");

// Recebendo o elemento onde você deseja mostrar a nota final
const valorNotaFinal=document.querySelector("[data-valor-NotaFinal]");

// usa if ternário para verificar situação do aluno em relação à média normal
function executa(){
    // Função para executar as funções de cálculo
    calcMedia();
    const final=media<7?1:0;
    if(final){
        calculaFinal();
    }else{
        valorNotaFinal.textContent="Parabéns, você conseguiu passar com a média regular!";
    }
    startButton.removeEventListener("click", executa);
}
function calcMedia(){
    // Função que calcula a média do aluno
    media=(parseFloat(notaUm.value)+parseFloat(notaDois.value))/2;
    valorMedia.textContent=media;
}

function calculaFinal(){
    // Função para calcular quanto o aluno precisa tirar na final com base na média regular
    notaFinalAluno=(notaFinalAluno-(media*.6))/.4;
    valorNotaFinal.textContent=notaFinalAluno;
}
startButton.addEventListener("click", executa);