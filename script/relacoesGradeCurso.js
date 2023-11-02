const materiasRelacoes = new Map([
    //PRIMEIRO PERIODO
    //Programação 1
    ["P1", {
        depende: [],
        dependencias: ["ED", "RC"],
    }],
    //Lógica Aplicada a Computação
    ["LAC",{
        depende: [],
        dependencias: ["IA"],
    }], 
    //Cálculo Diferencial e Integral
    ["CDI",{
        depende: [],
        dependencias: ["PE", "C3"],
    }], 
    //Sociedade, Computação e Ética
    ["SCE",{
        depende: [],
        dependencias: [],
    }], 
    //Matemática Discreta
    ["MD",{
        depende: [],
        dependencias: ["TG"],
    }],
    //SEGUNDA PERIODO
    //Estrutura de Dados
    ["ED", {
        depende: ["P1"],
        dependencias: ["TG", "P2", "P3", "PAA","IA","COMPILADORES"],
    }],
    //Banco de Dados
    ["BD", {
        depende: [],
        dependencias:["P2","P3"],
    }],
    //Geometria Analítica
    ["GA",{
        depende: [],
        dependencias:["AL"], 
    }], 
    //Organização e Arquitetura de Computadores
    ["OAC",{
        depende: [],
        dependencias:["SO"],
    }], 
    //TERCEIRO PERIODO
   //Teoria dos Grafos
   ["TG", {
        depende: ["ED", "MD"],
        dependencias: [],
    }],
    //Redes de Computadores
    ["RC",{
        depende: ["P1"],
        dependencias: ["P2","P3"],
    }],
    //Probabilidade e Estatistica
    ["PE", {
        depende: ["CDI"],
        dependencias: [],
    }],
    //Álgebra Linear
    ["AL",{
        depende: ["GA"],
        dependencias: [],
    }],
    //QUARTO PERIODO
    //Programação 2
    ["P2",{
        depende: ["ED", "RC", "BD"],
        dependencias: [],
    }],
    //Programação 3
    ["P3",{
        depende: ["ED", "RC", "BD"],
        dependencias: [],
    }],
    //Projeto de Análise de Algoritmos
    ["PAA",{
        depende: ["ED", "TG"],
        dependencias: [],
    }],
    //Teoria da Computação
    ["TC",{
        depende: [],
        dependencias: ["COMPILADORES"],
    }],
    //QUINTO PERIODO
    //Compiladores
    ["COMPILADORES",{
        depende:  ["ED", "TC"],
        dependencias: [],
    }],
    //Inteligência Artificial 
    ["IA",{
        depende: ["LAC", "ED"],
        dependencias: [],
    }],
    //Sistemas Operacionais
    ["SO",{
        depende:  ["OAC"],
        dependencias: [],
    }],
    //Computação Gráfica
    ["CG",{
        depende:  ["OAC"],
        dependencias: [],
    }],
    //SEXTO PERIODO
    //Projeto e Desenvolvimento de Sistemas
    ["PDS", {
        depende: ["P1", "LAC", "CDI", "SCE", "MD", "ED", "BD", "GA", "OAC", "TG", "RC", "PE", "AL", "P2", "P3", "PAA", "TC", "COMPILADORES", "IA", "SO", "CG"],
        dependencias: [],
    }],//SETIMO PERIODO
    //Metodologia de Pesquisa e Trabalho Individual
    ["MPTI",{
        depende: [],
        dependencias: [],
    }],
    //Noções de Direito
    ["ND",{
        depende: [],
        dependencias: [],
    }],
    //OITAVO PERIODO
    //Trabalho de Conclusão de Curso
    ["TCC",{
        depende: [],
        dependencias: [],
    }],
    //ELETIVAS
    ["ELETIVA",{
        depende: [],
        dependencias: [],
    }],
    //Cálculo 3
    ["C3", {
        depende: ["CDI"],
        dependencias: ["AM", "SD"],
    }],
    //Compiladores de Linguagens de Programação
    ["CLP", {
        depende: [],
        dependencias: [],
    }],
    //Aprendizado de Máquina
    ["AM",{
        depende: ["C3"],
        dependencias: [],
    }],
    // Sistemas Digitais
    ["SD",{
        depende: ["C3"],
        dependencias: [],
    }],
    //Sistemas Distribuídos
    ["SDI", {
        depende: [],
        dependencias: [],
    }],
    //Redes Neurais Artificiais e Processamento de Linguagem Natural
    ["RNAP", {
        depende: [],
        dependencias: [],
    }],
    //FPGA
    ["FPGA", {
        depende: [],
        dependencias: [],
    }],
    //Interação Homem-Máquina
    ["IHM", {
        depende: ["P3"],
        dependencias: [],
    }],
    //Processamento Digital de Imagens
    ["PDI",{
        depende: ["PG"],
        dependencias: [],
    }],
    //Computação Evolucionária
    ["CE", {
        depende: [],
        dependencias: [],
    }],
    //Sistemas Embarcados
    ["SE", {
        depende: [],
        dependencias: [],
    }],
    //Gerência de Projetos
    ["GP", {
        depende: ["PDS"],
        dependencias: [],
    }],
    //Visão Computacional
    ["VC", {
        depende: [],
        dependencias: [],
    }],
    //Ciência de Dados
    ["CD",{
        depende: ["PE"],
        dependencias: [],
    }],
    //Microcontroladores e Aplicações
    ["MA", {
        depende: [],
        dependencias: [],
    }],
    //Segurança de Sistemas Computacionais
    ["SSC", {
        depende: ["RC"],
        dependencias: [],
    }], 
]);

const divMateria = document.querySelectorAll(".materia");
const overlay = document.getElementById("overlay");

const getMateriaSelecionadaRelacao = (materiaSelecionada) => {
    const { dependencias, depende } = materiasRelacoes.get(materiaSelecionada);
    return {
        dependencias: [...dependencias],
        depende: [...depende],
        materiaSelecionada,
    };
};

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

const removeHighlights = () => {
    divMateria.forEach((circle) => circle.classList.remove("highlight", "materiasDependencia", "materiasDepende"));
};

const showOverlay = () => {
    overlay.classList.add("visible");
};

const hideOverlay = () => {
    overlay.classList.remove("visible");
    removeHighlights();
};

divMateria.forEach((elemento) => {
    elemento.addEventListener("click", () => {
        const materiaSelecionada = elemento.getAttribute("data-div-materia");
        const materiaSelecionadaRelacao = getMateriaSelecionadaRelacao(materiaSelecionada);
        if (materiaSelecionadaRelacao.dependencias.length > 0 || materiaSelecionadaRelacao.depende.length > 0) {
            removeHighlights();
            console.log(materiaSelecionadaRelacao);
            highlightMateria(materiaSelecionadaRelacao);
            showOverlay();
        } else {
            console.error(`${materiaSelecionada} não tem dependências ou não é dependência de outras matérias`);
        }
    });
});

overlay.addEventListener("click", hideOverlay);
