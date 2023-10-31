const circles = document.querySelectorAll(".circle");
const overlay = document.getElementById("overlay");

const relations = {
    A: ["F"],
    B: [],
    C: [],
    D: [],
    E: [],
    F: ["A", "L", "M", "P", "S"],
    G: [],
    H: [],
    I: ["M", "S"],
    J: [],
    K: [],
    L: [],
    M: [],
    N: [],
    O: [],
    P: [],
    Q: [],
    R: [],
    S: [],
    T: [],
};

let isOverlayVisible = false;

const highlightCircles = (circleName) => {
    const relatedCircles = relations[circleName];
    relatedCircles.push(circleName); // Adicione o próprio circleName à lista de relacionados
    circles.forEach((circle) => {
        const currentCircle = circle.getAttribute("data-circle");
        if (relatedCircles.includes(currentCircle)) {
            circle.classList.add("highlight");
        } else {
            circle.classList.remove("highlight");
        }
    });
};

const removeHighlights = () => {
    circles.forEach((circle) => circle.classList.remove("highlight"));
};

circles.forEach((circle) => {
    circle.addEventListener("click", () => {
        const circleName = circle.getAttribute("data-circle");
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