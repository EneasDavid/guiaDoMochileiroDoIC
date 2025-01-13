/**
 * 
 * Este script contém um mapa que relaciona as matérias do curso com suas dependências e 
 * dependências diretas, bem como funções para destacar e remover destaques das matérias 
 * na grade do curso e mostrar/ocultar um overlay com as dependências e matérias dependentes 
 * quando uma matéria é clicada. Também seleciona todos os elementos com a classe "enfaseSeletor" 
 * e adiciona um ouvinte de eventos para armazenar seus valores selecionados em um mapa.
 * 
 * @summary Script para as dependências e matérias dependentes da grade do curso.
 * @since 1.0.0
 */

const materiasRelacoes = new Map([
    /**
     * Mapa que relaciona as matérias do curso com suas dependências e dependências diretas.
     * @type {Map<string, {depende: string[], dependencias: string[], enfase?: string[]}>}
     */
    // PRIMEIRO PERIODO
    // Programação 1
    ["P1", {
        depende: [],
        dependencias: ["ED", "RC"],
    }],
    // Lógica Aplicada a Computação
    ["LAC", {
        depende: [],
        dependencias: ["IA"],
    }],
    // Cálculo Diferencial e Integral
    ["CDI", {
        depende: [],
        dependencias: ["PE", "C3"],
    }],
    // Computação, Sociedade e Ética
    ["CSE", {
        depende: [],
        dependencias: [],
    }],
    // Matemática Discreta
    ["MD", {
        depende: [],
        dependencias: ["TG"],
    }],
    // SEGUNDA PERIODO
    // Estrutura de Dados
    ["ED", {
        depende: ["P1"],
        dependencias: ["TG", "P2", "P3", "PAA", "IA", "COMPILADORES"],
    }],
    // Banco de Dados
    ["BD", {
        depende: [],
        dependencias: ["P2", "P3"],
    }],
    // Geometria Analítica
    ["GA", {
        depende: [],
        dependencias: ["AL"],
    }],
    // Organização e Arquitetura de Computadores
    ["OAC", {
        depende: [],
        dependencias: ["SO"],
    }],
    // TERCEIRO PERIODO
    // Teoria dos Grafos
    ["TG", {
        depende: ["ED", "MD"],
        dependencias: ["PAA"],
    }],
    // Redes de Computadores
    ["RC", {
        depende: ["P1"],
        dependencias: ["P2", "P3"],
    }],
    // Probabilidade e Estatistica
    ["PE", {
        depende: ["CDI"],
        dependencias: [],
    }],
    // Álgebra Linear
    ["AL", {
        depende: ["GA"],
        dependencias: [],
    }],
    // QUARTO PERIODO
    // Programação 2
    ["P2", {
        depende: ["ED", "RC", "BD"],
        dependencias: [],
    }],
    // Programação 3
    ["P3", {
        depende: ["ED", "RC", "BD"],
        dependencias: ["IHM"],

    }],
    // Projeto de Análise de Algoritmos
    ["PAA", {
        depende: ["ED", "TG"],
        dependencias: [],
    }],
    // Teoria da Computação
    ["TC", {
        depende: [],
        dependencias: ["COMPILADORES"],
    }],
    // QUINTO PERIODO
    // Compiladores
    ["COMPILADORES", {
        depende: ["ED", "TC"],
        dependencias: [],
    }],
    // Inteligência Artificial
    ["IA", {
        depende: ["LAC", "ED"],
        dependencias: [],
    }],
    // Sistemas Operacionais
    ["SO", {
        depende: ["OAC"],
        dependencias: [],
    }],
    // Computação Gráfica
    ["CG", {
        depende: [],
        dependencias: ["PDI"],
    }],
    // SEXTO PERIODO
    // Projeto e Desenvolvimento de Sistemas
    ["PDS", {
        depende: ["P1", "CSE", "LAC", "CDI", "MD", "ED", "BD", "GA", "OAC", "TG", "RC", "PE", "AL", "P2", "P3", "PAA", "TC", "COMPILADORES", "IA", "SO", "CG"],
        dependencias: [],
    }],
    // SETIMO PERIODO
    // Metodologia de Pesquisa e Trabalho Individual
    ["MPTI", {
        depende: [],
        dependencias: [],
    }],
    // Noções de Direito
    ["ND", {
        depende: [],
        dependencias: [],
    }],
    // OITAVO PERIODO
    // Trabalho de Conclusão de Curso
    ["TCC", {
        depende: [],
        dependencias: [],
    }],
]);
const enfase_SC = new Map([
    /**
     * Sistemas Computacional
     * @type {Map<string, {depende: string[], dependencias: string[]}>}
    */
    // Cálculo 3
    ["C3",{
        nome: "Caculo 3",
        depende: ["CDI"],
        dependencias: ["AM", "SD"],
    }],
    // Sistemas Digitais
    ["SD", {
        nome: "Sistemas Digitais",
        depende: ["C3"],
        dependencias: [],
    }],
    // FPGA
    ["FPGA", {
        nome: "Field Programmable Gate Array",
        depende: [],
        dependencias: [],
    }],
    // Sistemas Embarcados
    ["SE", {
        nome: "Sistemas Embarcados",
        depende: [],
        dependencias: [],
    }],
    // Microcontroladores e Aplicações
    ["MA", {
        nome: "Microcontroladores e Aplicações",
        depende: [],
        dependencias: [],
    }],
]);
const enfase_SI = new Map([
    /**
     * Sistemas de Informação
     * @type {Map<string, {depende: string[], dependencias: string[]}>}
    */
    // Conceitos de Linguagens de Programação
    ["CLP", {
        nome: "Conceitos de Linguagem de Programação",
        depende: [],
        dependencias: [],
    }],
    // Sistemas Distribuídos
    ["SDI", {
        nome: "Sistemas Distribuidos",
        depende: [],
        dependencias: [],
    }],
    // INTERAÇÃO HOMEM MAQUINA
    ["IHM", {
        nome: "Interação Homem Maquina",
        depende: ["P3"],
        dependencias: [],
    }],
    // Gerência de Projetos
    ["GP", {
        nome: "Gerencia de projetos",
        depende: ["PDS"],
        dependencias: [],
    }],
    // Segurança de Sistemas Computacionais
    ["SSC", {
        nome: "Segurança de sistemas computacionais",
        depende: ["RC"],
        dependencias: [],
    }],
]);
const enfase_SInt = new Map([
    /**
     * Sistemas Inteligentes
     * @type {Map<string, {depende: string[], dependencias: string[]}>}
    */
    // Cálculo 3
    ["C3", {
        nome: "Caculo 3",
        depende: ["CDI"],
        dependencias: ["AM", "SD"],
    }],
    // Aprendizado de Máquina
    ["AM", {
        nome: "Aprendizado de Maquina",
        depende: ["C3"],
        dependencias: [],
    }],
    // Redes Neurais Artificiais e Processamento de Linguagem Natural
    ["RNAP", {
        nome: "Redes Neurais e Aprendizado Profundo",
        depende: [],
        dependencias: [],
    }],
    // Computação Evolucionária
    ["CE", {
        nome: "Computação Evolucionaria",
        depende: [],
        dependencias: [],
    }],
    // Ciência de Dados
    ["CD", {
        nome: "Ciencia de Dados",
        depende: ["PE"],
        dependencias: [],
    }],

]);
const enfase_CV = new Map([
    /**
     * Computação Visual
     * @type {Map<string, {depende: string[], dependencias: string[]}>}
    */
    // Cálculo 3
    ["C3", {
        nome: "Caculo 3",
        depende: ["CDI"],
        dependencias: ["AM", "SD"],
    }],
    // Redes Neurais Artificiais e Processamento de Linguagem Natural
    ["RNAP", {
        nome: "Redes Neurais e Aprendizado Profundo",
        depende: [],
        dependencias: [],
    }],
    //PROCESSAMENTO DIGITAL DE IMAGENS
    ["PDI", {
        nome: "Processamento Digital de Imagens",
        depende: ["CG"],
        dependencias: [],
    }],
    // Aprendizado de Máquina
    ["AM", {
        nome: "Aprendizado de Maquina",
        depende: ["C3"],
        dependencias: [],
    }],
    // Visão Computacional
    ["CV", {
        nome: "Computação Visual",
        depende: [],
        dependencias: [],
    }],
]);

//Dicionario com os significados das enfases
const enfases = {
    SC: enfase_SC,
    SI: enfase_SI,
    SInt: enfase_SInt,
    CV: enfase_CV,
};

const divMateria = document.querySelectorAll(".materia");
const overlay = document.getElementById("overlay");
const eletiva = document.querySelectorAll(".enfaseSeletor");
const eletivasArmazena = new Map();

/**
 * Adiciona ouvintes de eventos aos elementos "eletiva" e atualiza as "eletivas" selecionadas.*
 * @function
 * @returns {void}
 */
function adicionarListenersEletivas() {
    eletiva.forEach((elemento) => {
        elemento.addEventListener("click", () => {
            const valorAtual = elemento.getAttribute("data-eletiva-relacoes");
            let fila = eletivasArmazena.get(elemento) || [];

            if (fila.includes(valorAtual)) return;

            if (eletivasArmazena.size >= 2) {
                const divMaisAntiga = eletivasArmazena.entries().next().value[0];
                divMaisAntiga.classList.remove("selecionado");

                const primeiroItem = eletivasArmazena.get(divMaisAntiga);
                primeiroItem.shift();
                if (primeiroItem.length === 0) {
                    eletivasArmazena.delete(divMaisAntiga);
                }
            }

            fila.push(valorAtual);
            eletivasArmazena.set(elemento, fila);
            elemento.classList.add("selecionado");
            const materiaInfo = construirMateriaInfo(eletivasArmazena);
            atualizarMateriasEletivas(document.querySelectorAll('.eletiva'), materiaInfo, 0);
        });
    });
}

/**
 * Constrói um array de objetos contendo informações sobre cada referência de curso no conjunto de eletivas fornecido.
 * @param {Set} eletivasArmazena - Um conjunto contendo matrizes de referências de curso, agrupadas por ênfase.
 * @returns {Array} Um array de objetos, cada um contendo uma referência de curso.
 */
function construirMateriaInfo(eletivasArmazena) {
    const materiaInfo = [];
    for (const fila of eletivasArmazena.values()) {
        const chaveEnfase = fila[0];
        if (enfases.hasOwnProperty(chaveEnfase)) {
            const enfaseMap = enfases[chaveEnfase];
            for (const [referencia] of enfaseMap) {
                const referenciaExistente = materiaInfo.find((info) => info.ref === referencia);
                if (!referenciaExistente) {
                    const info = {
                        ref: referencia,
                        nome: enfaseMap.get(referencia)?.nome || "Nome não encontrado",
                    };
                    materiaInfo.push(info);
                }
            }
        } else {
            console.error(`Erro ao selecionar ${chaveEnfase} como ênfase`);
        }
    }
    return materiaInfo;
}
/**
 * Atualiza as matérias eletivas com as informações fornecidas.
 *
 * @param {Array} materiasEletivas - Array de elementos HTML que representam as matérias eletivas.
 * @param {Array} materiaInfo - Array de objetos que contêm informações sobre as matérias.
 * @returns {void}
 */
function atualizarMateriasEletivas(materiasEletivas, materiaInfo, contador) {

    materiasEletivas.forEach((materiaEletiva) => {
        if (contador < materiaInfo.length) {
            console.log(materiaInfo);
            const novaMateriaSigla = materiaInfo[contador].ref;
            const novaMateriaNome=materiaInfo[contador].nome;
            // Verifica se a matéria é diferente antes de atribuir
            if (materiaEletiva.getAttribute('data-div-materia') !== novaMateriaSigla) {
                materiaEletiva.setAttribute('data-div-materia', novaMateriaSigla);
                materiaEletiva.innerHTML = `<span class='nomeMateria'>${novaMateriaSigla}</span> <span class='nomeMateriaHover'>${novaMateriaNome}</span>`;
            }

            contador++;
        } else {
            // Se não houver mais informações, atualize para a mensagem padrão
            const valorPadrao = 'ELETIVA';
            if (materiaEletiva.getAttribute('data-div-materia') !== valorPadrao) {
                materiaEletiva.setAttribute('data-div-materia', valorPadrao);
                materiaEletiva.innerHTML = `<span class="nomeMateria nomeMateriaLager">${valorPadrao}</span> <span class='nomeMateriaHover'>${valorPadrao}</span>`;
            }
        }
    });
}

/**
 * Retorna um objeto contendo as dependências e matérias dependentes de uma matéria selecionada.
 * @param {string} materiaSelecionada - A matéria selecionada.
 * @returns {{dependencias: string[], depende: string[], materiaSelecionada: string}} - Um objeto contendo as dependências e matérias dependentes da matéria selecionada.
 */
function getMateriaSelecionadaRelacao(materiaSelecionada) {
    const { dependencias, depende } = materiasRelacoes.get(materiaSelecionada) || enfase_SC.get(materiaSelecionada) || enfase_SI.get(materiaSelecionada) || enfase_SInt.get(materiaSelecionada) || enfase_CV.get(materiaSelecionada) || { dependencias: [], depende: [] };
    return { dependencias: [...dependencias], depende: [...depende], materiaSelecionada };
}

/**
 * Destaca uma matéria selecionada e suas dependências/dependentes.
 *
 * @param {Object} materiaSelecionadaRelacao - Um objeto contendo informações sobre a matéria selecionada e suas dependências/dependentes.
 * @param {string} materiaSelecionadaRelacao.materiaSelecionada - A matéria selecionada.
 * @param {Array} materiaSelecionadaRelacao.dependencias - Um array de matérias nas quais a matéria selecionada depende.
 * @param {Array} materiaSelecionadaRelacao.depende - Um array de matérias que dependem da matéria selecionada.
 * @returns {void}
 */
function destacarMateria(materiaSelecionadaRelacao) {
    divMateria.forEach((elemento) => {
        const materiaSelecionada = elemento.getAttribute("data-div-materia");
        const isDependencia = materiaSelecionadaRelacao.dependencias.includes(materiaSelecionada);
        const isPendencia = materiaSelecionadaRelacao.depende.includes(materiaSelecionada);
        elemento.classList.remove("highlight", "materiasDependencia", "materiasDepende");
        if (materiaSelecionada === materiaSelecionadaRelacao.materiaSelecionada) {
            elemento.classList.add("highlight");
        } else if (isDependencia) {
            elemento.classList.add("highlight", "materiasDependencia");
        } else if (isPendencia) {
            elemento.classList.add("highlight", "materiasDepende");
        }
    });
}
/**
 * Remove as classes de destaque de todos os círculos no array divMateria.
 * @function
 * @name removerDestaques
 * @returns {void}
 */
function removerDestaques() {
    divMateria.forEach((circle) => circle.classList.remove("highlight", "materiasDependencia", "materiasDepende"));
}

/**
 * Exibe a sobreposição adicionando a classe "visivel" a ela.
 */
function exibirSobreposicao() {
    overlay.classList.add("visible");
}

/**
 * Oculta a sobreposição e remove qualquer destaque.
 * @function
 * @name ocultarSobreposicao
 * @returns {void}
 */
function ocultarSobreposicao() {
    overlay.classList.remove("visible");
    removerDestaques();
}

divMateria.forEach((elemento) => {
    elemento.addEventListener("click", () => {
        const materiaSelecionada = elemento.getAttribute("data-div-materia");
        /**
         * Obtém a relação da matéria selecionada.
         * @param {string} materiaSelecionada - A matéria selecionada.
         * @returns {object} - A relação da matéria selecionada.
         */
        const materiaSelecionadaRelacao = getMateriaSelecionadaRelacao(materiaSelecionada);
        if (materiaSelecionadaRelacao.dependencias.length > 0 || materiaSelecionadaRelacao.depende.length > 0) {
            removerDestaques();
            destacarMateria(materiaSelecionadaRelacao);
            exibirSobreposicao();
        } else {
            console.error(`${materiaSelecionada} não tem dependências ou não é dependência de outras matérias`);
        }
    });
});

overlay.addEventListener("click", ocultarSobreposicao);

adicionarListenersEletivas();
