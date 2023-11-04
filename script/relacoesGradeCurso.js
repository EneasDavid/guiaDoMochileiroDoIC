/**
 * Este script contém um mapa que relaciona as matérias do curso com suas dependências e dependências diretas, bem 
 * como funções para destacar e remover destaques das matérias na grade do curso e mostrar/ocultar um overlay com 
 * as dependências e matérias dependentes quando uma matéria é clicada. Também seleciona todos os elementos com a 
 * classe "enfaseSeletor" e adiciona um ouvinte de eventos para armazenar seus valores selecionados em um mapa.
 * 
 * @summary Script para as dependências e matérias dependentes da grade do curso.
 * @since 1.0.0
 * @file Este script está localizado em /d:/guiaDoMochileiroDoIC/script/relacoesGradeCurso.js
 */

/**
 * Mapa que relaciona as matérias do curso com suas dependências e dependências diretas.
 * @type {Map<string, {depende: string[], dependencias: string[], enfase?: string[]}>}
 */
const materiasRelacoes = new Map([
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
        dependencias: [],
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
        dependencias: [],
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
        depende: ["OAC"],
        dependencias: [],
    }],
    // SEXTO PERIODO
    // Projeto e Desenvolvimento de Sistemas
    ["PDS", {
        depende: ["P1", "LAC", "CDI", "SCE", "MD", "ED", "BD", "GA", "OAC", "TG", "RC", "PE", "AL", "P2", "P3", "PAA", "TC", "COMPILADORES", "IA", "SO", "CG"],
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
    // ELETIVAS
    ["ELETIVA", {
        depende: [],
        dependencias: [],
    }],
    // Cálculo 3
    ["C3", {
        depende: ["CDI"],
        dependencias: ["AM", "SD"],
        enfase: ["SInf", "SC", "CV"],
    }],
    // Compiladores de Linguagens de Programação
    ["CLP", {
        depende: [],
        dependencias: [],
        enfase: ["SInf", "SC", "CV"],
    }],
    // Aprendizado de Máquina
    ["AM", {
        depende: ["C3"],
        dependencias: [],
        enfase: ["SInf", "CV"],
    }],
    // Sistemas Digitais
    ["SD", {
        depende: ["C3"],
        dependencias: [],
        enfase: ["SC"],
    }],
    // Sistemas Distribuídos
    ["SDI", {
        depende: [],
        dependencias: [],
        enfase: ["SI"],
    }],
    // Redes Neurais Artificiais e Processamento de Linguagem Natural
    ["RNAP", {
        depende: [],
        dependencias: [],
        enfase: ["SInf", "SC", "CV"],
    }],
    // FPGA
    ["FPGA", {
        depende: [],
        dependencias: [],
    }],
    // Interação Homem-Máquina
    ["IHM", {
        depende: ["P3"],
        dependencias: [],
        enfase: ["SI"],
    }],
    // Processamento Digital de Imagens
    ["PDI", {
        depende: ["PG"],
        dependencias: [],
    }],
    // Computação Evolucionária
    ["CE", {
        depende: [],
        dependencias: [],
    }],
    // Sistemas Embarcados
    ["SE", {
        depende: [],
        dependencias: [],
    }],
    // Gerência de Projetos
    ["GP", {
        depende: ["PDS"],
        dependencias: [],
        enfase: ["SI"],
    }],
    // Visão Computacional
    ["VC", {
        depende: [],
        dependencias: [],
    }],
    // Ciência de Dados
    ["CD", {
        depende: ["PE"],
        dependencias: [],
        enfase: ["SInf"],
    }],
    // Microcontroladores e Aplicações
    ["MA", {
        depende: [],
        dependencias: [],
    }],
    // Segurança de Sistemas Computacionais
    ["SSC", {
        depende: ["RC"],
        dependencias: [],
        enfase: ["SI"],
    }],
]);

/**
 * Seleciona todos os elementos com a classe "enfaseSeletor".
 * @type {NodeListOf<Element>}
 */
const divMateria = document.querySelectorAll(".materia");
const overlay = document.getElementById("overlay");


const eletiva = document.querySelectorAll(".enfaseSeletor");
const eletivasArmazena = new Map();

eletiva.forEach((elemento) => {
    elemento.addEventListener("click", () => {
        /**
         * Valor atual do atributo "data-eletiva-relacoes" do elemento.
         * @type {string}
         */
        const valorAtual = elemento.getAttribute("data-eletiva-relacoes");
        let fila = eletivasArmazena.get(elemento) || [];
        if (fila.includes(valorAtual)) {
            return;
        }
        if (eletivasArmazena.size >= 2) {
            const divMaisAntiga = eletivasArmazena.entries().next().value[0];
            divMaisAntiga.classList.remove("selecionado");

            const primeiroItem = eletivasArmazena.get(divMaisAntiga);
            primeiroItem.shift();
            if (primeiroItem.length === 0) {
                eletivasArmazena.delete(divMaisAntiga);
            }
        }
        console.log(eletivasArmazena.size);
        fila.push(valorAtual);
        eletivasArmazena.set(elemento, fila);
        elemento.classList.add("selecionado");
        for (const fila of eletivasArmazena.values()) {
            console.log(fila);
        }
    });
});

/**
 * Retorna um objeto contendo as dependências e dependências de uma matéria selecionada.
 * @param {string} materiaSelecionada - A matéria selecionada.
 * @returns {Object} - Objeto contendo as dependências, dependências e a matéria selecionada.
 */
const getMateriaSelecionadaRelacao = (materiaSelecionada) => {
    const { dependencias, depende } = materiasRelacoes.get(materiaSelecionada);
    return {
        dependencias: [...dependencias],
        depende: [...depende],
        materiaSelecionada,
    };
};

/**
 * Destaca uma matéria selecionada e suas dependências ou dependentes na grade do curso.
 *
 * @param {Object} materiaSelecionadaRelacao - Um objeto contendo informações sobre a matéria selecionada e suas dependências ou dependentes.
 * @param {string} materiaSelecionadaRelacao.materiaSelecionada - O código da matéria selecionada.
 * @param {Array<string>} materiaSelecionadaRelacao.dependencias - Uma matriz contendo os códigos das dependências da matéria selecionada.
 * @param {Array<string>} materiaSelecionadaRelacao.depende - Uma matriz contendo os códigos das matérias dependentes da matéria selecionada.
 */
const highlightMateria = (materiaSelecionadaRelacao) => {
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
};

/**
 * Remove destaques de todos os elementos divMateria.
 * @function
 * @returns {void}
 */
const removeHighlights = () => {
    divMateria.forEach((circle) => circle.classList.remove("highlight", "materiasDependencia", "materiasDepende"));
};

/**
 * Adiciona a classe "visible" ao elemento overlay para exibi-lo.
 */
const showOverlay = () => {
    overlay.classList.add("visible");
};

/**
 * Remove a classe "visible" do elemento overlay e remove qualquer destaque.
 */
const hideOverlay = () => {
    overlay.classList.remove("visible");
    removeHighlights();
};

divMateria.forEach((elemento) => {
    elemento.addEventListener("click", () => {
        const materiaSelecionada = elemento.getAttribute("data-div-materia");
        /**
         * Representa a relação da matéria selecionada.
         * @type {Object}
         */
        const materiaSelecionadaRelacao = getMateriaSelecionadaRelacao(materiaSelecionada);
        if (materiaSelecionadaRelacao.dependencias.length > 0 || materiaSelecionadaRelacao.depende.length > 0) {
            removeHighlights();
            highlightMateria(materiaSelecionadaRelacao);
            showOverlay();
        } else {
            console.error(`${materiaSelecionada} não tem dependências ou não é dependência de outras matérias`);
        }
    });
});

overlay.addEventListener("click", hideOverlay);
