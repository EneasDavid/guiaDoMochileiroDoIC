let media=0;
let notaFinalAluno = 0;
let notaUm = document.querySelector('input[name="notaUm"]');
let notaDois = document.querySelector('input[name="notaDois"]');
const valorMedia = document.querySelector("[data-valor-mediaRegular]");
const valorNotaFinal = document.querySelector("[data-valor-notaFinal]");

function limpar(campo){
    // Limpa o conteúdo anterior
    campo.innerHTML='';
}

function calcMedia() {
    media=(parseFloat(notaUm.value)+parseFloat(notaDois.value))/2;   
    // Cria uma string HTML com as mensagens da média
    const mensagemMediaHTML="<span class=''>Sua média regular é: </span><span class='regular'>" + media.toFixed(2) + "</span>";
    valorMedia.innerHTML=mensagemMediaHTML;
}

function calculaFinal() {
    const mediaFinal=5.5;
    notaFinalAluno=(mediaFinal-(media*.6))/.4;
    // Cria uma string HTML com as mensagens da nota final
    const mensagemNotaFinalHTML="<span class=''>Você precisa tirar: </span><span class='alerta'>" + notaFinalAluno.toFixed(2) + "</span>";
    valorNotaFinal.innerHTML=mensagemNotaFinalHTML;
}

function executa() {
    limpar(valorNotaFinal);
    // Verificar se os campos de nota estão vazios
    if (notaUm.value.trim() === '' || notaDois.value.trim() === '') {
        const mensagemMediaHTML="<span class=''><i class='regular'>Insira as duas notas</i> para calcular a média regular!</span>";
        valorMedia.innerHTML = mensagemMediaHTML;
        return; // Sai da função se um ou ambos os campos estiverem vazios
    }else if(parseFloat(notaDois.value)<0||parseFloat(notaDois.value)>10 || parseFloat(notaUm.value)<0||parseFloat(notaUm.value)>10){
        const mensagemMediaHTML="<span class=''><i class='alerta'>Insira notas válidas</i> para calcular a média regular!</span>";
        valorMedia.innerHTML=mensagemMediaHTML;
        return;
    }else{
        // Função para executar as funções de cálculo
        calcMedia();
        const final=media>=5&&media<7;
        if(final) calculaFinal();
        else{
            if(media<5){
                const mensagemMediaHTML="<span class=''>Infelizmente você <bold class='alerta'>não pode fazer a final!</bold></span>";
                valorMedia.innerHTML=mensagemMediaHTML;
            }else{
                const mensagemMediaHTML="<span>Parabéns, <i class='regular'>você passou!</i></span>";
                const mensagemFinalHTML="<span>Com média de: <i class='regular'>" + media.toFixed(2) + "</i></span>";
                valorMedia.innerHTML=mensagemMediaHTML;
                valorNotaFinal.innerHTML=mensagemFinalHTML;
            }
        }
    }
}

// Ouvinte de eventos de entrada para cada campo de nota
notaUm.addEventListener("input", executa);
notaDois.addEventListener("input", executa);
executa();