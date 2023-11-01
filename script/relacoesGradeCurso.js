const divMateria = document.querySelectorAll(".materia");
const overlay = document.getElementById("overlay");

const relations = {
    //PRIMEIRO PERIODO
    P1: ["ED", "RC"],
    LAC: ["IA"],
    CDI: ["PE"],
    SCE: [],
    MD: ["TG"],
    //SEGUNDA PERIODO
    ED: ["P1", "TG", "P1", "P2", "PAA","IA","COMPILADORES"],
    BD: ["P2","P3"],
    GA: ["AL"],
    OAC: ["SO"],
    //TERCEIRO PERIODO
    TG: ["ED"],
    RC: ["P1", "P2","P3"],
    PE: ["CDI"],
    AL: ["GA"],
    //QUARTO PERIODO
    P2: ["ED", "RC", "BD"],
    P3: ["ED", "RC", "BD"],
    PAA: ["ED", "TG"],
    TC: ["COMPILADORES"],
    //QUINTO PERIODO
    COMPILADORES: ["ED", "TC"],
    IA: ["LAC", "ED"],
    SO: ["OAC"],
    CG: [],
    //SEXTO PERIODO
    PDS: ["P1", "LAC", "CDI", "SCE", "MD", "ED", "BD", "GA", "OAC", "TG", "RC", "PE", "AL", "P2", "P3", "PAA", "TC", "COMPILADORES", "IA", "SO", "CG"],
    //SETIMO PERIODO
    MPTI: [],
    ND: [],
    //OITAVO PERIODO
    TCC: [],
    ELETIVA: [],
};

let isOverlayVisible = false;

const highlightCircles = (divMateriaExpecifica) => {
    const relatedCircles = relations[divMateriaExpecifica];
    relatedCircles.push(divMateriaExpecifica); // Adicione o próprio divMateriaExpecifica à lista de relacionados
    divMateria.forEach((circle) => {
        const currentCircle = circle.getAttribute("data-div-materia"); // Correção aqui
        if (relatedCircles.includes(currentCircle)) {
            circle.classList.add("highlight");
        } else {
            circle.classList.remove("highlight");
        }
    });
};

const removeHighlights = () => {
    divMateria.forEach((circle) => circle.classList.remove("highlight"));
};

divMateria.forEach((circle) => {
    circle.addEventListener("click", () => {
        const circleName = circle.getAttribute("data-div-materia"); // Correção aqui
        if (relations[circleName] && relations[circleName].length > 0) {
            if (isOverlayVisible) {
                overlay.style.display = "none";
                isOverlayVisible = false;
                removeHighlights();
            } else {
                overlay.style.display = "block";
                isOverlayVisible = true;
                highlightCircles(circleName);
            }
        }
    });
});

overlay.addEventListener("click", () => {
    overlay.style.display = "none";
    isOverlayVisible = false;
    removeHighlights();
});