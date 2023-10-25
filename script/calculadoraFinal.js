let media=0;
let notaFinalAluno=0;

// Selecionar os elementos
const notaUm=document.querySelector("[data-notaUm-input]");
const notaDois=document.querySelector("[data-notaDois-input]");
const valorMedia=document.querySelector("[data-valor-mediaRegular]");
const valorNotaFinal=document.querySelector("[data-valor-NotaFinal]");

function calcMedia(){
    media=(parseFloat(notaUm.value)+parseFloat(notaDois.value))/2;
    valorMedia.textContent=media;
}

function calculaFinal(){
    const mediaFinal=5.5;
    notaFinalAluno=(mediaFinal-(media*.6))/.4;
    valorNotaFinal.textContent = notaFinalAluno;
}

function executa(){
    // Verificar se os campos de nota estão vazios
    if (notaUm.value.trim()==='' || notaDois.value.trim()===''){
        valorMedia.textContent="";
        valorNotaFinal.textContent="Digite ambas as notas para podermos calcular";
        return; // Sai da função se um ou ambos os campos estiverem vazios
    }
    // Função para executar as funções de cálculo
    calcMedia();
    const final=media>=5&&media<7?1:0;
    if(final){
        calculaFinal();
    }else{
        if(media<5){
            valorNotaFinal.textContent="Infelizmente você não pode fazer a final!";
        }else{
            valorNotaFinal.textContent="Parabéns, você conseguiu passar com a média regular!";
        }
    }
}

//ouvinte de eventos de entrada para cada campo de nota
notaUm.addEventListener("input", executa);
notaDois.addEventListener("input", executa);

executa();